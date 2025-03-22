'use client'

import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react'
import { Brain, Plus, Send, Telescope } from 'lucide-react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

interface ChatInputProps {
  onSendMessage: (message: string) => void
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [value, setValue] = useState('')

  const adjustHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      const newHeight = Math.min(textarea.scrollHeight, 150)
      textarea.style.height = `${newHeight}px`
    }
  }

  useEffect(() => adjustHeight(), [value])

  const handleSend = () => {
    if (value.trim()) {
      onSendMessage(value)
      setValue('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className='w-full rounded-lg bg-gray-100 px-4 py-3 shadow-xl shadow-violet-700/5 dark:bg-neutral-800'>
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setValue(e.target.value)
        }
        onKeyDown={handleKeyDown}
        placeholder='Ask anything'
        className='mb-2 max-h-[150px] min-h-10 w-full resize-none overflow-y-auto border-0 !bg-transparent p-0 font-medium shadow-none focus-visible:ring-0'
      />

      <div className='flex flex-wrap items-center gap-x-2 gap-y-2'>
        <Button
          size='icon'
          variant='outline'
          className='border-muted-foreground text-muted-foreground h-auto w-auto rounded-md border bg-transparent p-1.5'
        >
          <Plus className='h-4 w-4' />
        </Button>

        <Button
          size='icon'
          variant='outline'
          className='border-muted-foreground text-muted-foreground h-auto w-auto rounded-md border bg-transparent p-1.5'
        >
          <Telescope className='h-4 w-4' />
        </Button>

        <Button
          size='icon'
          variant='outline'
          className='border-muted-foreground text-muted-foreground h-auto w-auto rounded-md border bg-transparent p-1.5'
        >
          <Brain className='h-4 w-4' />
        </Button>

        <Button
          size='icon'
          variant='outline'
          className='border-muted-foreground text-muted-foreground ml-auto h-auto w-auto rounded-md border bg-transparent p-1.5'
          onClick={handleSend}
        >
          <Send className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}

export default ChatInput
