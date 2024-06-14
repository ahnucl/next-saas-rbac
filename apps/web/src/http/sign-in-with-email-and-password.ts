import { api } from './api-client'

interface SingInWithEmailAndPasswordRequest {
  email: string
  password: string
}
interface SingInWithEmailAndPasswordResponse {
  token: string
}

/**
 * Não tem sentido validar a resposta da api porque NÃO VEM DO USUÁRIO
 * Eu tenho controle sobre a api, não faz sentido validar o que eu tenho controle
 */

export async function apiSingInWithEmailAndPassword({
  email,
  password,
}: SingInWithEmailAndPasswordRequest) {
  const result = await api
    .post('sessions/password', {
      json: { email, password },
    })
    .json<SingInWithEmailAndPasswordResponse>()

  return result
}
