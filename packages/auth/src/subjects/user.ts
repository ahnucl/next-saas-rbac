import { z } from 'zod'

// Usamos array quando não sabemos o número total de elementos -> dois elementos = tupla (programação funcional?)

export const userSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.literal('User'),
])

export type UserSubject = z.infer<typeof userSubject>
