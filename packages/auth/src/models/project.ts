import { z } from 'zod'

/**
 * O model deve apenas guardar informações que são relevantes para o permissionamento
 */

export const projectSchema = z.object({
  __typename: z.literal('Project').default('Project'),
  id: z.string(),
  ownerId: z.string(),
})

export type Project = z.infer<typeof projectSchema>
