import { XCircle } from 'lucide-react'
import { redirect } from 'next/navigation'

import { getCurrentOrg } from '@/auth'
import { Button } from '@/components/ui/button'
import { apiShutdownOrganization } from '@/http/shutdown-organization'

export function ShutdownOrganizationButton() {
  async function shutdownOrganizationAction() {
    'use server'

    const currentOrg = getCurrentOrg()

    await apiShutdownOrganization({ org: currentOrg! })

    redirect('/')
  }

  return (
    <form action={shutdownOrganizationAction}>
      <Button variant="destructive" className="w-56" type="submit">
        <XCircle className="mr-2 size-4" />
        Shutdown organization
      </Button>
    </form>
  )
}
