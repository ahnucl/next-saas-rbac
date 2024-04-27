import { z } from 'zod'

/**
 * Billing não vai ser uma entidade a ser presistida, vai ser um cálculo
 *
 * Subjects não são necessariamente entidades a serem persistidas, são elementos aos quais quero permissionar o acesso
 */

export const billingSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('export'),
    z.literal('delete'),
  ]),
  z.literal('Billing'),
])

export type BillingSubject = z.infer<typeof billingSubject>
