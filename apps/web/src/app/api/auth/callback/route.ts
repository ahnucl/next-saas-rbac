import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { apiSignInWithGithub } from '@/http/sign-in-with-github'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { message: 'Github OAuth code not found.' },
      {
        status: 400,
      },
    )
  }

  const { token } = await apiSignInWithGithub({ code })

  cookies().set('token', token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  const redirectURL = request.nextUrl.clone()

  redirectURL.password = '/'
  redirectURL.search = ''

  return NextResponse.redirect(redirectURL)
}
