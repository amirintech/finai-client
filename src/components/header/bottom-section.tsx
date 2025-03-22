import { Button } from '../ui/button'
import Image from 'next/image'

const BottomSection = () => {
  return (
    <section className='flex h-16 items-center border-b'>
      <div className='flex w-full items-center justify-between pl-3'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>

        <Button
          asChild
          variant='ghost'
          className='h-auto w-auto px-3.5 py-1.5'
        >
          <div>
            <div className='relative size-10 overflow-hidden rounded-full'>
              <Image
                fill
                alt=''
                src='/imgs/avatar.jpg'
                className='object-cover'
              />
            </div>

            <div className='flex flex-col'>
              <span className='text-sm font-extrabold'>Amir Mohamed</span>
              <span className='text-xs text-gray-500'>amir@gmail.com</span>
            </div>
          </div>
        </Button>
      </div>
    </section>
  )
}

export default BottomSection
