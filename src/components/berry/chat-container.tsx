'use client'

import { useState, useRef, useEffect } from 'react'
import ChatInput from './chat-input'
import Message from './message'

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! How can I help you today?',
      isUser: false,
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      content:
        "I need some advice on investing. I have some money saved up and I'm not sure where to put it.",
      isUser: true,
      timestamp: new Date(Date.now() - 3550000),
    },
    {
      id: '3',
      content:
        "That's a great step! Before recommending specific investments, I'd need to understand your financial goals. Are you investing for retirement, a major purchase, or something else?",
      isUser: false,
      timestamp: new Date(Date.now() - 3500000),
    },
    {
      id: '4',
      content:
        "I'm mainly looking to grow my wealth over the long term, maybe 10-15 years. I don't have any specific purchases in mind.",
      isUser: true,
      timestamp: new Date(Date.now() - 3450000),
    },
    {
      id: '5',
      content:
        'For long-term growth, a diversified portfolio is typically recommended. Have you considered index funds, ETFs, or a mix of stocks and bonds?',
      isUser: false,
      timestamp: new Date(Date.now() - 3400000),
    },
    {
      id: '6',
      content:
        "I've heard about index funds, but I'm not sure how they work exactly. Can you explain the benefits?",
      isUser: true,
      timestamp: new Date(Date.now() - 3350000),
    },
    {
      id: '7',
      content:
        'Index funds track a specific market index, like the S&P 500. They offer several benefits: low fees, broad diversification, and they historically outperform actively managed funds over the long term. They\'re a "set it and forget it" approach to investing.',
      isUser: false,
      timestamp: new Date(Date.now() - 3300000),
    },
    {
      id: '8',
      content:
        'That sounds promising. What about ETFs? How are they different?',
      isUser: true,
      timestamp: new Date(Date.now() - 3250000),
    },
    {
      id: '9',
      content:
        'ETFs (Exchange-Traded Funds) are similar to index funds in that they can track an index, but they trade like stocks throughout the day. They often have lower investment minimums than mutual funds and can be more tax-efficient. Many ETFs also track specific sectors or asset classes, giving you more flexibility.',
      isUser: false,
      timestamp: new Date(Date.now() - 3200000),
    },
    {
      id: '10',
      content:
        "What allocation would you recommend for someone my age? I'm 35 and have a moderate risk tolerance.",
      isUser: true,
      timestamp: new Date(Date.now() - 3150000),
    },
    {
      id: '11',
      content:
        'For a 35-year-old with moderate risk tolerance and a 10-15 year horizon, a common starting point is 70-80% in stocks (through index funds/ETFs) and 20-30% in bonds. You might consider allocating a portion to international markets for additional diversification. As you get closer to needing the money, you would gradually shift to more conservative investments.',
      isUser: false,
      timestamp: new Date(Date.now() - 3100000),
    },
    {
      id: '12',
      content:
        'That makes sense. Are there any specific funds you would recommend looking into?',
      isUser: true,
      timestamp: new Date(Date.now() - 3050000),
    },
    {
      id: '13',
      content:
        "While I can't provide specific investment advice, many investors start with broad market funds like those tracking the S&P 500, total US stock market, or total international stock market. For bonds, a total bond market fund can provide broad exposure. Look for funds with low expense ratios from reputable providers. Would you like to learn about specific metrics to evaluate when choosing funds?",
      isUser: false,
      timestamp: new Date(Date.now() - 3000000),
    },
    {
      id: '14',
      content: 'Yes, that would be helpful. What metrics should I look at?',
      isUser: true,
      timestamp: new Date(Date.now() - 2950000),
    },
    {
      id: '15',
      content:
        "Key metrics to evaluate include: 1) Expense ratio - lower is better, ideally under 0.2% for index funds. 2) Fund size - larger funds tend to be more stable. 3) Tracking error - how closely the fund follows its index. 4) Historical performance - while past performance doesn't guarantee future results, it's useful to see how the fund has done in different market conditions. 5) Tax efficiency - important for taxable accounts.",
      isUser: false,
      timestamp: new Date(Date.now() - 2900000),
    },
    {
      id: '16',
      content:
        'This is very helpful information. One more question - should I invest all at once or spread it out over time?',
      isUser: true,
      timestamp: new Date(Date.now() - 2850000),
    },
    {
      id: '17',
      content:
        "That's a great question. Research shows that investing a lump sum historically outperforms dollar-cost averaging (spreading investments over time) in the long run. However, many people prefer dollar-cost averaging psychologically, as it reduces the risk of investing everything right before a market drop. If you're concerned about market timing, investing gradually over 6-12 months can be a reasonable compromise.",
      isUser: false,
      timestamp: new Date(Date.now() - 2800000),
    },
    {
      id: '18',
      content:
        'Thanks for all this advice! I feel much more confident about getting started with investing now.',
      isUser: true,
      timestamp: new Date(Date.now() - 2750000),
    },
    {
      id: '19',
      content:
        "You're welcome! Investing is a journey, and it's great that you're taking a thoughtful approach. Remember to periodically review your portfolio and make adjustments as needed, especially if your goals or time horizon change. Is there anything else you'd like to know about investing?",
      isUser: false,
      timestamp: new Date(Date.now() - 2700000),
    },
  ])

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
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Thank you for your message. This is a simulated response.',
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <div
      ref={containerRef}
      className='flex h-full w-full flex-col'
    >
      {/* Scrollable messages container */}
      <div className='flex-1'>
        <div className='mx-auto h-full w-full max-w-2xl'>
          <div className='h-full px-4 pb-14'>
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
      <div className='sticky bottom-0 bg-transparent py-3'>
        <div className='mx-auto w-full max-w-2xl'>
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  )
}

export default ChatContainer
