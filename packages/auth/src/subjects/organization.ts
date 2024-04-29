import { z } from 'zod'

import { organizationSchema } from '../models/organization'

// Usamos array quando não sabemos o número total de elementos -> dois elementos = tupla (programação funcional?)

export const organizationSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('transfer_ownership'),
  ]),
  z.union([z.literal('Organization'), organizationSchema]),
])

export type OrganizationSubject = z.infer<typeof organizationSubject>
