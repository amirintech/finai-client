'use client'

import { useState, useEffect } from 'react'
import NewsCard from './news-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Mock data for demonstration
const trendingNews = [
  {
    id: '1',
    title:
      'Federal Reserve holds interest rates steady, signals potential cuts later this year',
    source: 'Financial Times',
    date: new Date(2023, 6, 15),
    tickers: ['SPY', 'QQQ', 'DIA'],
    sentiment: 'positive' as const,
    url: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1607768178747-3a2c5c1d291b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    summary:
      'Fed Chair Powell indicated that inflation is moving in the right direction, potentially setting the stage for rate cuts later in the year.',
    featured: true,
  },
  {
    id: '2',
    title: 'Tech giants report stronger than expected earnings amid AI boom',
    source: 'Wall Street Journal',
    date: new Date(2023, 6, 14),
    tickers: ['MSFT', 'NVDA', 'GOOGL'],
    sentiment: 'positive' as const,
    url: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1581094794329-c8112a89f12e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    summary:
      'Major tech companies exceeded analyst expectations, with AI-related revenue streams showing particularly strong performance.',
  },
  {
    id: '3',
    title:
      'Inflation cools to 3.2% in latest CPI report, below analyst expectations',
    source: 'Bloomberg',
    date: new Date(2023, 6, 13),
    tickers: ['SPY', 'TLT', 'GLD'],
    sentiment: 'positive' as const,
    url: '#',
    summary:
      'The Consumer Price Index came in lower than expected, suggesting inflationary pressures may be easing faster than anticipated.',
  },
  {
    id: '4',
    title: 'Oil prices drop on concerns about global demand and oversupply',
    source: 'Reuters',
    date: new Date(2023, 6, 12),
    tickers: ['XLE', 'USO', 'XOM'],
    sentiment: 'negative' as const,
    url: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1582584881642-spf4311189ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    summary:
      'Crude oil futures fell as demand forecasts were cut in response to economic slowdown concerns in major economies.',
  },
  {
    id: '13',
    title:
      'Housing market shows signs of recovery with increase in new home sales',
    source: 'CNBC',
    date: new Date(2023, 6, 11),
    tickers: ['XHB', 'HD', 'TOL'],
    sentiment: 'positive' as const,
    url: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    summary:
      'New home sales increased by 5.8% in June, exceeding economist forecasts and suggesting resilience in the housing sector.',
  },
  {
    id: '14',
    title:
      'European Central Bank maintains current policy stance amid mixed economic signals',
    source: 'The Economist',
    date: new Date(2023, 6, 10),
    tickers: ['FXE', 'EZU', 'VGK'],
    sentiment: 'neutral' as const,
    url: '#',
    summary:
      'The ECB kept rates unchanged as expected, while acknowledging both inflation concerns and growth challenges in the eurozone.',
  },
]

const portfolioNews = {
  AAPL: [
    {
      id: '5',
      title: 'Apple unveils new AI features for upcoming iPhone models',
      source: 'TechCrunch',
      date: new Date(2023, 6, 15),
      tickers: ['AAPL'],
      sentiment: 'positive' as const,
      url: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      summary:
        'New AI capabilities include improved voice recognition, predictive typing, and advanced photo editing tools.',
    },
    {
      id: '6',
      title: 'Apple supplier reports strong orders for upcoming product cycle',
      source: 'Nikkei Asia',
      date: new Date(2023, 6, 13),
      tickers: ['AAPL', 'TSM'],
      sentiment: 'positive' as const,
      url: '#',
      summary:
        "Key supplier TSMC has reportedly increased production capacity allocation for Apple's next-generation chips.",
    },
  ],
  TSLA: [
    {
      id: '7',
      title:
        "Tesla's Cybertruck production ramps up, deliveries to begin next quarter",
      source: 'Electrek',
      date: new Date(2023, 6, 14),
      tickers: ['TSLA'],
      sentiment: 'positive' as const,
      url: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1620891549027-942faa8ccbfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      summary:
        'Production issues appear to be resolved as Tesla prepares for its first major Cybertruck deliveries in Q3.',
    },
    {
      id: '8',
      title: 'Tesla faces increased competition in European EV market',
      source: 'Automotive News',
      date: new Date(2023, 6, 12),
      tickers: ['TSLA', 'STLA', 'VWAGY'],
      sentiment: 'negative' as const,
      url: '#',
      summary:
        "European automakers are gaining market share in the EV segment, challenging Tesla's dominance in the region.",
    },
  ],
  AMZN: [
    {
      id: '9',
      title: 'Amazon AWS announces new data centers in Asia Pacific region',
      source: 'Cloud Computing News',
      date: new Date(2023, 6, 15),
      tickers: ['AMZN'],
      sentiment: 'positive' as const,
      url: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1607893378714-007fd47c8719?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      summary:
        'The expansion will increase AWS capacity by 30% in the region, supporting growing cloud computing demand.',
    },
    {
      id: '10',
      title:
        'Amazon Prime Day sales exceed expectations, analysts raise price targets',
      source: 'CNBC',
      date: new Date(2023, 6, 14),
      tickers: ['AMZN'],
      sentiment: 'positive' as const,
      url: '#',
      summary:
        'Prime Day generated an estimated $12.7 billion in sales, up 12% from last year, leading to analyst upgrades.',
    },
  ],
  MSFT: [
    {
      id: '11',
      title:
        'Microsoft Cloud revenue grows 25% year over year, beating expectations',
      source: 'ZDNet',
      date: new Date(2023, 6, 15),
      tickers: ['MSFT'],
      sentiment: 'positive' as const,
      url: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1583267746897-2cf66b8d9ef1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      summary:
        'Azure and cloud services continue to drive growth for Microsoft, with AI solutions seeing particularly strong adoption.',
    },
    {
      id: '12',
      title:
        'Microsoft partners with OpenAI to expand AI capabilities in Office suite',
      source: 'The Verge',
      date: new Date(2023, 6, 13),
      tickers: ['MSFT'],
      sentiment: 'positive' as const,
      url: '#',
      summary:
        'New AI-powered features in Microsoft 365 include advanced content generation, summarization, and data analysis tools.',
    },
  ],
}

// Mock market data
const marketData = [
  { ticker: 'SPY', price: 478.92, change: 1.23, percentChange: 0.42 },
  { ticker: 'QQQ', price: 427.15, change: 2.87, percentChange: 0.65 },
  { ticker: 'IWM', price: 202.34, change: -0.76, percentChange: -0.37 },
  { ticker: 'DIA', price: 384.56, change: 0.91, percentChange: 0.24 },
  { ticker: 'GLD', price: 198.77, change: -1.12, percentChange: -0.58 },
]

// Hot tickers
const trendingTickers = [
  { ticker: 'NVDA', mentions: 234, sentiment: 'positive' },
  { ticker: 'META', mentions: 187, sentiment: 'positive' },
  { ticker: 'TSLA', mentions: 156, sentiment: 'neutral' },
  { ticker: 'AMD', mentions: 123, sentiment: 'positive' },
  { ticker: 'BABA', mentions: 98, sentiment: 'negative' },
]

const NewsFeed = () => {
  const [visibleNewsCount, setVisibleNewsCount] = useState(6)
  const [selectedCategory, setSelectedCategory] = useState('all')

  // State to track if user has scrolled
  const [hasScrolled, setHasScrolled] = useState(false)

  // Add an effect to detect scrolling
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const loadMoreNews = () => {
    setVisibleNewsCount((prev) => prev + 3)
  }

  // Get the featured news for the hero section
  const featuredNews = trendingNews.find((news) => news.featured)

  // Filter the remaining trending news (excluding featured)
  const regularTrendingNews = trendingNews.filter((news) => !news.featured)

  return (
    <div className='h-full w-full overflow-y-auto pt-4 pb-10'>
      <div className='mx-auto max-w-[1920px] px-4'>
        <Tabs defaultValue='trending'>
          <div
            className={`bg-background/95 sticky top-0 z-10 mb-6 backdrop-blur-sm transition-all duration-200 ${hasScrolled ? 'py-2 shadow-sm' : 'py-3'}`}
          >
            <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
              <div>
                <h2 className='text-2xl font-semibold'>Financial News</h2>
                <p className='text-muted-foreground'>
                  Stay updated with the latest market news and insights
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <TabsList>
                  <TabsTrigger value='trending'>Trending</TabsTrigger>
                  <TabsTrigger value='portfolio'>My Portfolio</TabsTrigger>
                </TabsList>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className='w-[140px]'>
                    <SelectValue placeholder='Category' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Categories</SelectItem>
                    <SelectItem value='markets'>Markets</SelectItem>
                    <SelectItem value='technology'>Technology</SelectItem>
                    <SelectItem value='economy'>Economy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6 lg:grid-cols-4'>
            {/* Left column - News content */}
            <div className='lg:col-span-3'>
              <TabsContent
                value='trending'
                className='mt-0 space-y-8'
              >
                {/* Featured News - Hero Section */}
                {featuredNews && (
                  <div className='relative mb-8 overflow-hidden rounded-xl border'>
                    <div className='relative h-64 w-full sm:h-80'>
                      <Image
                        src={
                          featuredNews.imageUrl ||
                          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop'
                        }
                        alt={featuredNews.title}
                        fill
                        className='object-cover'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent'></div>
                      <div className='absolute bottom-0 left-0 p-6'>
                        <div className='mb-2 flex items-center gap-2'>
                          <Badge className='bg-primary'>
                            {featuredNews.source}
                          </Badge>
                          <Badge
                            variant='outline'
                            className='border-none bg-black/50 text-white'
                          >
                            {featuredNews.tickers[0]}
                          </Badge>
                        </div>
                        <h3 className='mb-2 text-2xl font-bold text-white'>
                          {featuredNews.title}
                        </h3>
                        <p className='mb-4 max-w-3xl text-gray-200'>
                          {featuredNews.summary}
                        </p>
                        <div className='flex gap-2'>
                          <Link
                            href={`/berry?newsTitle=${encodeURIComponent(featuredNews.title)}`}
                            passHref
                          >
                            <Button variant='default'>Explain This</Button>
                          </Link>
                          <Button variant='secondary'>Read More</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* News Grid */}
                <div>
                  <div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
                    {regularTrendingNews
                      .slice(0, visibleNewsCount)
                      .map((news) => (
                        <NewsCard
                          key={news.id}
                          title={news.title}
                          source={news.source}
                          date={news.date}
                          tickers={news.tickers}
                          sentiment={news.sentiment}
                          url={news.url}
                          imageUrl={news.imageUrl}
                          summary={news.summary}
                        />
                      ))}
                  </div>

                  {visibleNewsCount < regularTrendingNews.length && (
                    <div className='mt-8 flex justify-center'>
                      <Button
                        onClick={loadMoreNews}
                        variant='outline'
                        className='gap-2'
                      >
                        <span>Load More News</span>
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent
                value='portfolio'
                className='mt-0 space-y-8'
              >
                {Object.entries(portfolioNews).map(([ticker, news]) => (
                  <div
                    key={ticker}
                    className='space-y-4'
                  >
                    <div className='flex items-center justify-between'>
                      <h3 className='text-lg font-medium'>${ticker} News</h3>
                      <Badge variant='outline'>{news.length} articles</Badge>
                    </div>
                    <div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
                      {news.map((item) => (
                        <NewsCard
                          key={item.id}
                          title={item.title}
                          source={item.source}
                          date={item.date}
                          tickers={item.tickers}
                          sentiment={item.sentiment}
                          url={item.url}
                          imageUrl={item.imageUrl}
                          summary={item.summary}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>
            </div>

            {/* Right sidebar - Market data and insights */}
            <div className='space-y-6 lg:sticky lg:top-24 lg:self-start'>
              <Card className='overflow-hidden border-none shadow-md'>
                <CardHeader className='bg-muted/50 pb-2'>
                  <CardTitle className='flex items-center justify-between text-base'>
                    <span>Market Snapshot</span>
                    <span className='text-muted-foreground text-xs'>
                      Last updated: {new Date().toLocaleTimeString()}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4 pt-4'>
                  {marketData.map((item) => (
                    <div
                      key={item.ticker}
                      className='hover:bg-muted/30 flex items-center justify-between rounded-md p-2 transition-colors'
                    >
                      <div className='font-medium'>${item.ticker}</div>
                      <div className='flex items-center gap-2'>
                        <div className='font-mono tabular-nums'>
                          ${item.price.toFixed(2)}
                        </div>
                        <div
                          className={`flex items-center ${
                            item.change >= 0 ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {item.change >= 0 ? (
                            <ArrowUp className='mr-1 h-3 w-3' />
                          ) : (
                            <ArrowDown className='mr-1 h-3 w-3' />
                          )}
                          <span className='font-mono tabular-nums'>
                            {Math.abs(item.percentChange).toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className='overflow-hidden border-none shadow-md'>
                <CardHeader className='bg-muted/50 pb-2'>
                  <CardTitle className='flex items-center gap-2 text-base'>
                    <TrendingUp className='h-4 w-4' />
                    <span>Trending Tickers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className='pt-4'>
                  <div className='space-y-3'>
                    {trendingTickers.map((item) => (
                      <div
                        key={item.ticker}
                        className='hover:bg-muted/30 flex items-center justify-between rounded-md p-2 transition-colors'
                      >
                        <div className='font-medium'>${item.ticker}</div>
                        <div className='flex items-center gap-2'>
                          <Badge
                            variant='outline'
                            className={` ${
                              item.sentiment === 'positive'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                : item.sentiment === 'negative'
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                            } `}
                          >
                            {item.mentions} mentions
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className='overflow-hidden border-none shadow-md'>
                <CardHeader className='bg-muted/50 pb-2'>
                  <CardTitle className='text-base'>Economic Calendar</CardTitle>
                </CardHeader>
                <CardContent className='pt-4'>
                  <div className='space-y-3'>
                    <div className='hover:bg-muted/30 rounded-md border-b p-2 pb-2 transition-colors'>
                      <div className='font-medium'>CPI Data Release</div>
                      <div className='text-muted-foreground text-xs'>
                        Tomorrow, 8:30 AM ET
                      </div>
                    </div>
                    <div className='hover:bg-muted/30 rounded-md border-b p-2 pb-2 transition-colors'>
                      <div className='font-medium'>FOMC Meeting</div>
                      <div className='text-muted-foreground text-xs'>
                        Jul 28, 2:00 PM ET
                      </div>
                    </div>
                    <div className='hover:bg-muted/30 rounded-md p-2 transition-colors'>
                      <div className='font-medium'>GDP Preliminary</div>
                      <div className='text-muted-foreground text-xs'>
                        Jul 30, 8:30 AM ET
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default NewsFeed
