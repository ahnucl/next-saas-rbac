import { api } from './api-client'

interface ShutdownOrganizationRequest {
  org: string
}

export async function apiShutdownOrganization({
  org,
}: ShutdownOrganizationRequest) {
  await api.delete(`organizations/${org}`)
}
