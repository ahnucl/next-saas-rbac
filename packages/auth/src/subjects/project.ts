import { z } from 'zod'

import { projectSchema } from '../models/project'

// Usamos array quando não sabemos o número total de elementos -> dois elementos = tupla (programação funcional?)

export const projectSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Project'), projectSchema]),
])

export type ProjectSubject = z.infer<typeof projectSubject>
