import { z } from 'zod'

// Usamos array quando não sabemos o número total de elementos -> dois elementos = tupla (programação funcional?)

export const organizationSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('transfer_ownership'),
  ]),
  z.literal('Organization'),
])

export type OrganizationSubject = z.infer<typeof organizationSubject>
