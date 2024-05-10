import 'fastify'

/**
 * No typesript interfaces são extensíveis automaticamente:
 *
 * interface User {
 *  id: string
 * }
 * interface User {
 *  name: string
 * }
 *
 * const user: User = {
 *  id: 'foo',
 *  name: 'John Doe'
 * }
 *
 * Com type isso não é possível
 */

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUserId(): Promise<string>
  }
}
