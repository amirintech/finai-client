import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className='h-full w-full'>
      <div className='grid h-full grid-cols-[auto_1fr]'>
        <SidebarProvider className='m-0 w-fit border-0 p-0'>
          <Sidebar />
        </SidebarProvider>

        {/* TODO: fix the pl-1 hack and see what's wrong with the sidebar  */}
        <div className='grid h-full w-full grid-rows-[auto_1fr] overflow-hidden pl-1'>
          <div className='bg-background z-50'>
            <Header />
          </div>

          <main className='h-full w-full overflow-y-auto p-3'>{children}</main>
        </div>
      </div>
    </div>
  )
}

export default Layout
