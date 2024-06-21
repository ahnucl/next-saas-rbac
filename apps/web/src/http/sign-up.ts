import { api } from './api-client'

interface SignUpRequest {
  name: string
  email: string
  password: string
}
// type SignUpResponse = never // Pegar esse valor dá um erro - o resultado da função nunca pode ser utilizado
type SignUpResponse = void

/**
 * Não tem sentido validar a resposta da api porque NÃO VEM DO USUÁRIO
 * Eu tenho controle sobre a api, não faz sentido validar o que eu tenho controle
 */

export async function apiSingUP({
  name,
  email,
  password,
}: SignUpRequest): Promise<SignUpResponse> {
  await api
    .post('users', {
      json: { name, email, password },
    })
    .json<SignUpResponse>()
}
