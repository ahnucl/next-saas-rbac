import { ability } from '@saas/auth'



const userCanInviteSomeoneEles = ability.can('invite', 'User')



const userCanDeleteOtherUser = ability.can('delete', 'User')



const userCannotDeleteOtherUsers = ability.cannot('delete', 'User')



console.log(

  userCanInviteSomeoneEles,



  userCanDeleteOtherUser,



  userCannotDeleteOtherUsers,

)

