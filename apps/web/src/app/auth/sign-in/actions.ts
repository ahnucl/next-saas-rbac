'use server'

import { apiSingInWithEmailAndPassword } from '@/http/sign-in-with-email-and-password'

/**
 * Com o JS desabilitado no navegador, não foi enviado o ACTION ID
 *
 */

export async function ssSingInWithEmailAndPassword(data: FormData) {
  const { email, password } = Object.fromEntries(data)

  const result = await apiSingInWithEmailAndPassword({
    email: email.toString(),
    password: password.toString(),
  })

  console.log(result)
}
