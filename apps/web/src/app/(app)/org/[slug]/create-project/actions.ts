'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCurrentOrg } from '@/auth'
import { apiCreateProject } from '@/http/create-project'

const createProjectSchema = z.object({
  name: z.string().min(4, { message: 'Please include at least 4 characters.' }),
  description: z.string(),
})

export async function ssCreateProject(data: FormData) {
  const result = createProjectSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, description } = result.data

  const currentOrg = getCurrentOrg()!

  try {
    await apiCreateProject({
      org: currentOrg, // A página que chama essa função não pode ter org nulo (contexto)
      name,
      description,
    })

    revalidateTag(`${currentOrg}/projects`)
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return { success: false, message, errors: null }
    }

    console.error(error)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the project!',
    errors: null,
  }
}
