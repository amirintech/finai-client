'use client'

import Logo from '../header/logo'
import {
  Sidebar as SidebarContainter,
  SidebarTrigger,
  useSidebar,
} from '../ui/sidebar'
import { cn } from '@/lib/utils'
import RouteList from './route-list'

const Sidebar = () => {
  const { state } = useSidebar()
  return (
    <SidebarContainter
      collapsible='icon'
      className={cn('w-full max-w-[260px]', state == 'collapsed' && '!w-14')}
    >
      <div
        className={cn(
          'flex w-full max-w-xs flex-col items-start px-3 py-2',
          state == 'collapsed' && 'items-center px-0',
        )}
      >
        <Logo />
        <SidebarTrigger />
        <RouteList />
      </div>
    </SidebarContainter>
  )
}

export default Sidebar
