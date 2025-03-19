import { Bot, CircleDollarSign, Gauge, Newspaper } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import SidebarRoute from './sidebar-route'

const RouteList = () => {
  const pathname = usePathname()
  const routes = useMemo(
    () => [
      {
        label: 'Dashboard',
        href: '/',
        icon: <Gauge />,
        isActive: pathname === '/',
      },
      {
        label: 'Portfolio',
        href: '/portfolio',
        icon: <CircleDollarSign />,
        isActive: pathname === '/portfolio',
      },
      {
        label: 'News',
        href: '/news',
        icon: <Newspaper />,
        isActive: pathname === '/news',
      },
      {
        label: 'Berry',
        href: '/berry',
        icon: <Bot />,
        isActive: pathname === '/berry',
      },
    ],
    [pathname],
  )
  return (
    <nav className='flex w-full flex-col items-center gap-y-2'>
      {routes.map((route) => (
        <SidebarRoute
          key={route.href}
          {...route}
        />
      ))}
    </nav>
  )
}

export default RouteList
