import { defineAbilityFor } from '@saas/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { apiGetMembership } from '@/http/get-membership'
import { apiGetProfile } from '@/http/get-profile'

export function isAuthenticated() {
  return !!cookies().get('token')?.value
}

export function getCurrentOrg() {
  return cookies().get('org')?.value ?? null
}

export async function getCurrentMembership() {
  const org = getCurrentOrg()

  if (!org) {
    return null
  }

  const { membership } = await apiGetMembership(org)

  return membership
}

export async function ability() {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })

  return ability
}

// use server only
export async function auth() {
  const token = cookies().get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await apiGetProfile()

    return { user }
  } catch {
    // cookies().delete('token')
  }

  redirect('/auth/sign-out')
}
