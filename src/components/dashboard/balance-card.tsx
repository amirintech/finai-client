'use client'

import { Badge } from '../ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart'

const portfolioData = [
  { month: 'January', portfolio: 100000 },
  { month: 'February', portfolio: 135000 },
  { month: 'March', portfolio: 102500 },
  { month: 'April', portfolio: 95000 },
  { month: 'May', portfolio: 115000 },
  { month: 'June', portfolio: 120000 },
]

const chartConfig = {
  portfolio: {
    label: 'Portfolio Value',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig

const BalanceCard = () => {
  return (
    <Card className='max-w-sm gap-0 py-4 shadow-none'>
      <CardHeader>
        <CardTitle className='text-sm text-gray-500'>Total Balance</CardTitle>
      </CardHeader>

      <CardContent>
        <div className='flex items-center gap-x-4'>
          <div className='flex items-center'>
            <span className='text-3xl font-medium'>$</span>
            <div className='text-3xl font-black'>
              <span>19,381</span>
              <span className='text-gray-400'>.91</span>
            </div>
          </div>

          <Badge className='rounded-full bg-green-50 pr-3 font-bold text-green-600'>
            +2.89%
          </Badge>
        </div>

        <ChartContainer
          config={chartConfig}
          className='mt-4 h-32 w-full'
        >
          <AreaChart
            accessibilityLayer
            data={portfolioData}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              orientation='bottom'
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <defs>
              <linearGradient
                id='fillPortfolio'
                x1='0'
                y1='0'
                x2='0'
                y2='1'
              >
                <stop
                  offset='5%'
                  stopColor='var(--chart-2)'
                  stopOpacity={0.5}
                />
                <stop
                  offset='95%'
                  stopColor='var(--chart-2)'
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey='portfolio'
              type='natural'
              fill='url(#fillPortfolio)'
              fillOpacity={0.4}
              stroke='var(--chart-2)'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default BalanceCard
