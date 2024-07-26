import { api } from './api-client'

interface CreateProjectRequest {
  org: string
  name: string
  description: string
}

type CreateProjectResponse = void

export async function apiCreateProject({
  org,
  name,
  description,
}: CreateProjectRequest): Promise<CreateProjectResponse> {
  await api.post(`organizations/${org}/projects`, {
    json: {
      name,
      description,
    },
  })
}
