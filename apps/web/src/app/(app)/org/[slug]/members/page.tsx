import { ability } from '@/auth'

import { Invites } from './invites'
import { MemberList } from './member-list'

export default async function MembersPage() {
  const permisions = await ability()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold"></h1>

      <div className="space-y-4">
        {permisions?.can('get', 'Invite') && <Invites />}
        {permisions?.can('get', 'User') && <MemberList />}
      </div>
    </div>
  )
}
