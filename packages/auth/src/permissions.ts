import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from '.'
import { User } from './models/user'
import { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

// Tudo que está sendo seguido está na documentação do CASL
// role => funcão que configura permissões
export const permissions: Record<Role, PermissionsByRole> = {
  // Duas sinxates possíveis para atributos de objetos que são funções.
  // Acho a segunda ruim
  ADMIN: (_, { can }) => {
    can('manage', 'all')
  },
  MEMBER(user, { can }) {
    // can('invite', 'User')
    can('delete', 'Organization')
    can(['create', 'get'], 'Project')
    can(['update', 'delete'], 'Project', {
      ownerId: { $eq: user.id },
    })
  },
  BILLING() {},
}
