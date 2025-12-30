// components/common/page-header.tsx
import Link from 'next/link'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Action =
  | {
      label: string
      href: string
      variant?: 'default' | 'outline'
      icon?: LucideIcon
    }
  | {
      label: string
      onClick: () => void
      variant?: 'default' | 'outline'
      icon?: LucideIcon
    }

export default function PageHeader({
  badge,
  title,
  description,
  actions,
  className
}: {
  badge?: { label: string; icon?: LucideIcon }
  title: string
  description?: string
  actions?: Action[]
  className?: string
}) {
  return (
    <section className={cn('space-y-5', className)}>
      {badge ? (
        <Badge variant='secondary' className='gap-2'>
          {badge.icon ? <badge.icon className='h-3.5 w-3.5' /> : null}
          {badge.label}
        </Badge>
      ) : null}

      <h1 className='font-heading text-4xl font-extrabold tracking-tight sm:text-5xl'>
        {title}
      </h1>

      {description ? (
        <p className='max-w-2xl text-muted-foreground sm:text-lg'>
          {description}
        </p>
      ) : null}

      {actions?.length ? (
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
          {actions.map((a, idx) => {
            const Icon = a.icon ?? ArrowRight
            if ('href' in a) {
              return (
                <Button
                  key={idx}
                  asChild
                  size='lg'
                  variant={a.variant ?? 'default'}
                >
                  <Link href={a.href}>
                    {a.label} <Icon className='ml-2 size-4' />
                  </Link>
                </Button>
              )
            }
            return (
              <Button
                key={idx}
                size='lg'
                variant={a.variant ?? 'default'}
                onClick={a.onClick}
              >
                {a.label} <Icon className='ml-2 size-4' />
              </Button>
            )
          })}
        </div>
      ) : null}
    </section>
  )
}
