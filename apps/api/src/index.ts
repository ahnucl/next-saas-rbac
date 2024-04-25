import { defineAbilityFor } from '@saas/auth'

const ability = defineAbilityFor({ role: 'MEMBER' })

const userCanInviteSomeoneEles = ability.can('invite', 'User')
const userCanDeleteOtherUser = ability.can('delete', 'User')
const userCannotDeleteOtherUsers = ability.cannot('delete', 'User')

console.log(
  userCanInviteSomeoneEles,
  userCanDeleteOtherUser,
  userCannotDeleteOtherUsers,
)
