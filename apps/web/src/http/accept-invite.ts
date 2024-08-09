import { api } from './api-client'

export async function apiAcceptInvite(inviteId: string): Promise<void> {
  await api.post(`invites/${inviteId}/accept`)
}
