'use server'

import { revalidateTag } from 'next/cache'

import { getCurrentOrg } from '@/auth'
import { apiRemoveMember } from '@/http/remove-member'

export async function removeMemberAction(memberId: string) {
  const currentOrg = getCurrentOrg()

  await apiRemoveMember({ org: currentOrg!, memberId })

  revalidateTag(`${currentOrg}/members`)
}
