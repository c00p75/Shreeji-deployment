'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { currencyFormatter } from '@/app/components/checkout/currency-formatter'

interface RevenueChartProps {
  data: Array<{
    period: string
    revenue: number
    previousRevenue?: number
  }>
  height?: number
  showComparison?: boolean
}

export default function RevenueChart({ data, height = 300, showComparison = false }: RevenueChartProps) {
  const formatCurrency = (value: number) => currencyFormatter(value)

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="period" 
          tick={{ fontSize: 12 }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          tickFormatter={formatCurrency}
        />
        <Tooltip 
          formatter={(value: number) => formatCurrency(value)}
          labelStyle={{ color: '#374151' }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke="#3b82f6" 
          strokeWidth={2}
          name="Revenue"
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        {showComparison && (
          <Line 
            type="monotone" 
            dataKey="previousRevenue" 
            stroke="#94a3b8" 
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Previous Period"
            dot={{ r: 4 }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}

