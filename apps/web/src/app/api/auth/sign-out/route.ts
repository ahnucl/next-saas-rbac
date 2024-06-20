import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectURL = request.nextUrl.clone()

  redirectURL.password = '/auth/sign-in'
  redirectURL.search = ''

  cookies().delete('token')

  return NextResponse.redirect(redirectURL)
}
