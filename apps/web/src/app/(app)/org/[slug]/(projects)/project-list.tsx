import { AvatarFallback } from '@radix-ui/react-avatar'
import { ArrowRight } from 'lucide-react'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function ProjectList() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Projeto 01</CardTitle>
          <CardDescription className="line-clamp-3 leading-relaxed">
            Lorem Lorem asdomasodm asd asd aLorem asdomasodm asd asd a Lorem
            asdomasodm asd asd a Lorem asdomasodm asd asd a Lorem asdomasodm asd
            asd a Lorem asdomasodm asd asd a asdomasodm asd asd a
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center gap-1.5">
          <Avatar className="size-4">
            <AvatarImage src="https://github.com/ahnucl.png" />
            <AvatarFallback />
          </Avatar>

          <span className="text-xs text-muted-foreground">
            Create by{' '}
            <span className="font-medium text-foreground">Leonardo Cunha</span>{' '}
            a day ago
          </span>

          <Button className="ml-auto" size="xs" variant="outline">
            View <ArrowRight className="ml-2 size-3" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
