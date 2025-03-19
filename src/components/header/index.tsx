import { Separator } from '../ui/separator'
import BottomSection from './bottom-section'
import TopSection from './top-section'

const Header = () => {
  return (
    <header className='w-full'>
      <TopSection />
      <Separator />
      <BottomSection />
    </header>
  )
}

export default Header
