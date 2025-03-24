'use client'

import { cn } from '@/lib/utils'
import { Clock, ArrowUpRight, Tag, MessageCircle, Bookmark } from 'lucide-react'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../ui/button'

interface NewsCardProps {
  title: string
  source: string
  date: Date
  tickers: string[]
  sentiment: 'positive' | 'negative' | 'neutral'
  url?: string
  imageUrl?: string
  summary?: string
}

const NewsCard = ({
  title,
  source,
  date,
  tickers,
  sentiment,
  url = '#',
  imageUrl,
  summary,
}: NewsCardProps) => {
  const sentimentColor = {
    positive:
      'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    negative: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    neutral: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
  }

  const sentimentText = {
    positive: 'Bullish',
    negative: 'Bearish',
    neutral: 'Neutral',
  }

  // Generate a gradient based on the sentiment
  const gradientByType = {
    positive: 'bg-gradient-to-br from-green-400 to-blue-500',
    negative: 'bg-gradient-to-br from-red-400 to-pink-500',
    neutral: 'bg-gradient-to-br from-gray-400 to-blue-300',
  }

  return (
    <div className='bg-background group flex h-full flex-col overflow-hidden rounded-lg border transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-800'>
      <div className='relative h-48 w-full overflow-hidden'>
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={title}
              fill
              className='object-cover transition-transform duration-500 group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70'></div>
            <div className='absolute bottom-3 left-3'>
              <Badge className='border-0 bg-black/40 text-xs font-medium text-white backdrop-blur-sm'>
                {source}
              </Badge>
            </div>
          </>
        ) : (
          <div
            className={cn(
              'flex h-full w-full items-center justify-center p-4 text-center',
              gradientByType[sentiment],
            )}
          >
            <span className='text-lg font-semibold text-white opacity-90 drop-shadow-sm'>
              {source}
            </span>
          </div>
        )}
        <Badge
          variant='outline'
          className={cn(
            'absolute top-3 right-3 backdrop-blur-sm',
            sentimentColor[sentiment],
          )}
        >
          {sentimentText[sentiment]}
        </Badge>
      </div>

      <div className='flex flex-1 flex-col p-4'>
        <div className='mb-2 flex items-start justify-between gap-2'>
          <h3 className='line-clamp-2 text-base leading-tight font-medium'>
            {title}
          </h3>
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-muted-foreground hover:bg-secondary hover:text-foreground flex-shrink-0 rounded-full p-1 transition-colors'
          >
            <ArrowUpRight className='h-4 w-4' />
          </a>
        </div>

        {summary && (
          <p className='text-muted-foreground mb-3 line-clamp-2 text-sm'>
            {summary}
          </p>
        )}

        <div className='mt-auto space-y-3 text-sm'>
          <div className='flex flex-wrap items-center gap-2'>
            <div className='text-muted-foreground flex items-center gap-1'>
              <Clock className='h-3.5 w-3.5' />
              <span>{date.toLocaleDateString()}</span>
            </div>

            {tickers.length > 0 && (
              <div className='text-muted-foreground flex items-center gap-1'>
                <Tag className='h-3.5 w-3.5' />
                <div className='flex flex-wrap gap-1'>
                  {tickers.map((ticker) => (
                    <span
                      key={ticker}
                      className='font-medium'
                    >
                      ${ticker}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className='flex gap-2 pt-2'>
            <Link
              href={`/berry?newsTitle=${encodeURIComponent(title)}`}
              passHref
              className='flex-1'
            >
              <Button
                variant='outline'
                size='sm'
                className='flex w-full items-center gap-2'
              >
                <MessageCircle className='h-3.5 w-3.5' />
                <span>Explain This</span>
              </Button>
            </Link>
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8'
              title='Save for later'
            >
              <Bookmark className='h-3.5 w-3.5' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
