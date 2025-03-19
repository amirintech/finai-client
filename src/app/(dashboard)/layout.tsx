import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className='w-full'>
      <div className='flex'>
        <SidebarProvider className='m-0 w-fit border-0 p-0'>
          <Sidebar />
        </SidebarProvider>
        <Header />
      </div>
      {/* <main>{children}</main> */}
    </div>
  )
}

export default Layout
