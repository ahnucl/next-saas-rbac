import { api } from './api-client'

export async function apiRejectInvite(inviteId: string): Promise<void> {
  await api.post(`invites/${inviteId}/reject`)
}
