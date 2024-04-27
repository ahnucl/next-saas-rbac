import { z } from 'zod'

// Usamos array quando não sabemos o número total de elementos -> dois elementos = tupla (programação funcional?)

export const inviteSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('delete'),
  ]),
  z.literal('Invite'),
])

export type InviteSubject = z.infer<typeof inviteSubject>
