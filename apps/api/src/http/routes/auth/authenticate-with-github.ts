import { env } from '@saas/env'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

// Test url:
// https://github.com/login/oauth/authorize?client_id=Ov23lirUO0uY4wKPxUye&redirect_uri=http://localhost:3000/api/auth/callback&scope=user:email

export async function authenticateWithGithub(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/github',
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate with Github',
        body: z.object({
          code: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { code } = request.body

      const githubOAuthURL = new URL(
        'https://github.com/login/oauth/access_token',
      )

      // prettier-ignore
      // eslint-disable-next-line no-lone-blocks
      {
      githubOAuthURL.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
      githubOAuthURL.searchParams.set('client_secret', env.GITHUB_OAUTH_CLIENT_SECRET)
      githubOAuthURL.searchParams.set('redirect_uri', env.GITHUB_OAUTH_CLIENT_REDIRECT_URI)
      githubOAuthURL.searchParams.set('code', code)
      }

      const githubAccessTokenResponse = await fetch(githubOAuthURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      })

      const githubAccessTokenData = await githubAccessTokenResponse.json()

      //   console.log(githubAccessTokenData)

      // Expired code. TODO
      //   {
      //     error: 'bad_verification_code',
      //     error_description: 'The code passed is incorrect or expired.',
      //     error_uri: 'https://docs.github.com/apps/managing-oauth-apps/troubleshooting-oauth-app-access-token-request-errors/#bad-verification-code'
      //   }

      // Success
      //   {
      //     access_token: '',
      //     token_type: 'bearer',
      //     scope: 'user:email'
      //   }

      const { access_token: githubAccessToken } = z
        .object({
          access_token: z.string(),
          token_type: z.literal('bearer'),
          scope: z.string(),
        })
        .parse(githubAccessTokenData)

      const githubUserResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${githubAccessToken}`,
        },
      })

      const githubUserData = await githubUserResponse.json()

      //   console.log(githubUserData)
      //   {
      //     login: 'ahnucl',
      //     id: 44876357,
      //     node_id: 'MDQ6VXNlcjQ0ODc2MzU3',
      //     avatar_url: 'https://avatars.githubusercontent.com/u/44876357?v=4',
      //     gravatar_id: '',
      //     url: 'https://api.github.com/users/ahnucl',
      //     html_url: 'https://github.com/ahnucl',
      //     followers_url: 'https://api.github.com/users/ahnucl/followers',
      //     following_url: 'https://api.github.com/users/ahnucl/following{/other_user}',
      //     gists_url: 'https://api.github.com/users/ahnucl/gists{/gist_id}',
      //     starred_url: 'https://api.github.com/users/ahnucl/starred{/owner}{/repo}',
      //     subscriptions_url: 'https://api.github.com/users/ahnucl/subscriptions',
      //     organizations_url: 'https://api.github.com/users/ahnucl/orgs',
      //     repos_url: 'https://api.github.com/users/ahnucl/repos',
      //     events_url: 'https://api.github.com/users/ahnucl/events{/privacy}',
      //     received_events_url: 'https://api.github.com/users/ahnucl/received_events',
      //     type: 'User',
      //     site_admin: false,
      //     name: 'Leonardo Cunha',
      //     company: null,
      //     blog: '',
      //     location: 'Brasília DF, Brasil',
      //     email: 'lalmcunha@gmail.com',
      //     hireable: null,
      //     bio: null,
      //     twitter_username: null,
      //     public_repos: 78,
      //     public_gists: 1,
      //     followers: 7,
      //     following: 12,
      //     created_at: '2018-11-08T17:21:28Z',
      //     updated_at: '2024-03-13T23:47:31Z'
      //   }

      const {
        id: githubId,
        name,
        email,
        avatar_url: avatarUrl,
      } = z
        .object({
          id: z.number().int().transform(String),
          avatar_url: z.string().url(),
          name: z.string().nullable(),
          email: z.string().nullable(),
        })
        .parse(githubUserData)

      if (email === null) {
        throw new BadRequestError(
          'Your GitHub account must have an email to authenticate.',
        )
      }

      let user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        user = await prisma.user.create({
          data: {
            name,
            email,
            avatarUrl,
          },
        })
      }

      let account = await prisma.account.findUnique({
        where: {
          provider_userId: {
            provider: 'GITHUB',
            userId: user.id,
          },
        },
      })

      if (!account) {
        account = await prisma.account.create({
          data: {
            provider: 'GITHUB',
            providerAccountId: githubId,
            userId: user.id,
          },
        })
      }

      const token = await reply.jwtSign(
        {
          sub: user.id,
        },
        {
          sign: {
            expiresIn: '7d',
          },
        },
      )

      return reply.status(201).send({ token })
    },
  )
}
