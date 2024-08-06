import { api } from './api-client'

interface RevokeInviteRequest {
  org: string
  inviteId: string
}

export async function apiRevokeInvite({ org, inviteId }: RevokeInviteRequest) {
  await api.delete(`organizations/${org}/invites/${inviteId}`)
}
