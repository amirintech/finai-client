import Link from 'next/link'
import { useSidebar } from '../ui/sidebar'
import { cn } from '@/lib/utils'

type Props = {
  icon: React.ReactNode
  label: string
  isActive: boolean
  href: string
}

const SidebarRoute = ({ href, icon, isActive, label }: Props) => {
  const { state } = useSidebar()
  return (
    <Link
      href={href}
      className={cn(
        'flex w-full items-center gap-x-3 rounded-md px-2 py-2 text-sm font-bold text-gray-700 hover:text-gray-900 dark:text-gray-200',
        state == 'collapsed' && 'w-fit justify-center',
        isActive &&
          'bg-violet-50 text-violet-600 ring-1 ring-violet-200 dark:bg-violet-700/5 dark:text-violet-300 dark:ring-violet-500/30',
      )}
    >
      <span>{icon}</span>
      <span className={cn(state == 'collapsed' && 'hidden')}>{label}</span>
    </Link>
  )
}

export default SidebarRoute
