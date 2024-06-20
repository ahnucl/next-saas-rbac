import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { apiGetProfile } from '@/http/get-profile'

export function isAuthenticated() {
  return !!cookies().get('token')?.value
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
