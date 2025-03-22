'use client'

import { cn } from '@/lib/utils'
import { User, Bot } from 'lucide-react'
import { Avatar, AvatarFallback } from '../ui/avatar'

interface MessageProps {
  content: string
  isUser: boolean
  timestamp?: Date
}

const Message = ({ content, isUser, timestamp = new Date() }: MessageProps) => {
  return (
    <div
      className={cn(
        'mb-3 flex w-full gap-x-4 py-2',
        isUser ? 'justify-end' : '',
      )}
    >
      {!isUser && (
        <Avatar className='bg-primary/10 h-8 w-8 rounded-md'>
          <AvatarFallback className='p-0'>
            <Bot className='text-primary h-full w-full p-1.5' />
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          'flex max-w-[80%] flex-col',
          isUser ? 'items-end' : 'items-start',
        )}
      >
        <div
          className={cn(
            'rounded-lg px-4 py-3',
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-gray-100 dark:bg-neutral-800',
          )}
        >
          <p className='text-sm font-medium'>{content}</p>
        </div>
        <span className='text-muted-foreground mt-1 text-xs'>
          {timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>

      {isUser && (
        <Avatar className='bg-primary/10 h-8 w-8 rounded-md'>
          <AvatarFallback className='p-0'>
            <User className='text-primary h-full w-full p-1.5' />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

export default Message
