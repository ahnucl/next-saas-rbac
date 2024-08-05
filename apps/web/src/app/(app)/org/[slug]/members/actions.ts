'use server'

import { Role } from '@saas/auth'
import { revalidateTag } from 'next/cache'

import { getCurrentOrg } from '@/auth'
import { apiRemoveMember } from '@/http/remove-member'
import { apiUpdateMember } from '@/http/update-member'

export async function removeMemberAction(memberId: string) {
  const currentOrg = getCurrentOrg()

  await apiRemoveMember({ org: currentOrg!, memberId })

  revalidateTag(`${currentOrg}/members`)
}

export async function updateMemberAction(memberId: string, role: Role) {
  const currentOrg = getCurrentOrg()

  await apiUpdateMember({ org: currentOrg!, memberId, role })

  revalidateTag(`${currentOrg}/members`)
}
