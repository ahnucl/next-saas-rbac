import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from '.'
import { User } from './models/user'

type Role = 'ADMIN' | 'MEMBER'

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
  MEMBER(_, { can }) {
    can('invite', 'User')
    can('manage', 'Project')
  },
}
