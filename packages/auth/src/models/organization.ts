import { z } from 'zod'

/**
 * O model deve apenas guardar informações que são relevantes para o permissionamento
 */

export const organizationSchema = z.object({
  __typename: z.literal('Organization').default('Organization'),
  id: z.string(),
  ownerId: z.string(),
})

export type Organization = z.infer<typeof organizationSchema>
