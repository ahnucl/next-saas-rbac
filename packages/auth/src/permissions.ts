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
  ADMIN: (user, { can, cannot }) => {
    can('manage', 'all')

    /**
     * Após dar uma permissão, as remoções de permissão subsequentes que envolvem
     * a mesma permissão NÃO PODEM TER NEGAÇÕES - linha abaixo não funciona
     */
    // cannot('transfer_ownership', 'Organization', { ownerId: { $ne: user.id } })
    // can('transfer_ownership', 'Organization', { ownerId: { $eq: user.id } })
    cannot(['transfer_ownership', 'update'], 'Organization')
    can(['transfer_ownership', 'update'], 'Organization', {
      ownerId: { $eq: user.id },
    })
  },
  MEMBER(user, { can }) {
    can('get', 'User')
    can(['create', 'get'], 'Project')
    can(['update', 'delete'], 'Project', { ownerId: { $eq: user.id } })
  },
  BILLING(_, { can }) {
    can('manage', 'Billing')
  },
}
