import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Check, UserPlus2, X } from 'lucide-react'

import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

dayjs.extend(relativeTime)

export function PendingInvites() {
  const invite = {
    author: {
      name: 'John Doe',
    },
    organization: {
      name: 'Acmie Inco.',
    },
    createdAt: '2024-08-09T16:02:17.001Z',
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <UserPlus2 className="size-4" />
          <span className="sr-only">Pending invites</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 space-y-2">
        <span className="block text-sm font-medium">Pending invites (2)</span>

        <div className="space-y-2">
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">
              {invite.author?.name ?? 'Someone'}
            </span>{' '}
            invited you to join{' '}
            <span className="font-medium text-foreground">
              {invite.organization.name}
            </span>{' '}
            <span className="">{dayjs(invite.createdAt).fromNow()}</span>
          </p>

          <div className="flex gap-1">
            <Button size="xs" variant="outline">
              <Check className="mr-1.5 size-3" />
              Accept
            </Button>

            <Button size="xs" variant="ghost" className="text-muted-foreground">
              <X className="mr-1.5 size-3" />
              Revoke
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}