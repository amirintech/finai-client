import { Search } from 'lucide-react'
import { ModeToggle } from '../shared/mode-toggle'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

const TopSection = () => {
  return (
    <section className='flex items-center justify-between px-3 py-2'>
      <div>
        <Badge
          variant='secondary'
          className='font-medium'
        >
          {new Date().toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Badge>
      </div>

      <div className='flex items-center gap-x-3'>
        <div>
          {/* TODO: build search component */}
          <Button
            size='icon'
            variant='secondary'
            className='cursor-pointer'
          >
            <Search />
          </Button>
        </div>

        <ModeToggle />
      </div>
    </section>
  )
}

export default TopSection
