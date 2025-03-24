'use client'

import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ChatInput from './chat-input'
import Message from './message'

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

const ChatContainer = () => {
  const searchParams = useSearchParams()
  const newsTitle = searchParams.get('newsTitle')

  const [messages, setMessages] = useState<Message[]>([])

  // Initialize messages based on whether we have a news title or not
  useEffect(() => {
    if (newsTitle) {
      setMessages([
        {
          id: '1',
          content: `I'd like to understand more about: "${newsTitle}"`,
          isUser: true,
          timestamp: new Date(Date.now() - 2000),
        },
        {
          id: '2',
          content: `I'd be happy to explain the news about "${newsTitle}". This article discusses important financial developments that could impact markets. What specific aspects would you like me to clarify?`,
          isUser: false,
          timestamp: new Date(Date.now() - 1000),
        },
      ])
    } else {
      // Default welcome message
      setMessages([
        {
          id: '1',
          content: 'Hello! How can I help you today?',
          isUser: false,
          timestamp: new Date(),
        },
      ])
    }
  }, [newsTitle])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])

    // Simulate AI response after a short delay
    setTimeout(() => {
      // If discussing news, provide a more specific response
      let responseContent =
        'Thank you for your message. This is a simulated response.'

      if (newsTitle) {
        responseContent = `Regarding "${newsTitle}", the article highlights important market trends. In financial terms, this could affect investment strategies by shifting focus to different sectors. Would you like me to analyze potential market impacts in more detail?`
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <div
      ref={containerRef}
      className='flex h-full flex-col'
    >
      {/* Scrollable messages container */}
      <div className='flex-1 overflow-hidden'>
        <div className='mx-auto h-full w-full max-w-2xl px-4'>
          <div className='h-full overflow-y-auto pb-20'>
            <div className='flex flex-col space-y-2 pt-4'>
              {messages.map((message) => (
                <Message
                  key={message.id}
                  content={message.content}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed chat input at bottom */}
      <div className='bg-background sticky bottom-0 border-t py-3'>
        <div className='mx-auto w-full max-w-2xl px-4'>
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  )
}

export default ChatContainer
