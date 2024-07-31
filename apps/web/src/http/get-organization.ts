import { api } from './api-client'

interface GetOrganizationResponse {
  organization: {
    id: string
    slug: string
    name: string
    domain: string | null
    shouldAttachUsersByDomain: boolean
    avatarUrl: string | null
    createdAt: string
    updatedAt: string
    ownerId: string
  }
}

export async function apiGetOrganization(orgSlug: string) {
  const result = await api
    .get(`organizations/${orgSlug}`)
    .json<GetOrganizationResponse>()

  return result
}
