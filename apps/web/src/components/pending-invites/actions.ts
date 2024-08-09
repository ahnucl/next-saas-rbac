'use server'

import { revalidateTag } from 'next/cache'

import { apiAcceptInvite } from '@/http/accept-invite'
import { apiRejectInvite } from '@/http/reject-invite'

export async function acceptInviteAction(inviteId: string) {
  await apiAcceptInvite(inviteId)

  revalidateTag('organizations')
}

export async function rejectInviteAction(inviteId: string) {
  await apiRejectInvite(inviteId)
}
