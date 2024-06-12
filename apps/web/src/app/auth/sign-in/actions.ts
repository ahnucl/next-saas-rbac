'use server'

/**
 * Com o JS desabilitado no navegador, não foi enviado o ACTION ID
 *
 */

export async function singInWithEmailAndPassword(data: FormData) {
  console.log(Object.fromEntries(data))
}
