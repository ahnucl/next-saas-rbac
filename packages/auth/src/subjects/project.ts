import { z } from 'zod'

// Usamos array quando não sabemos o número total de elementos -> dois elementos = tupla (programação funcional?)

export const projectSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.literal('Project'),
])

export type ProjectSubject = z.infer<typeof projectSubject>