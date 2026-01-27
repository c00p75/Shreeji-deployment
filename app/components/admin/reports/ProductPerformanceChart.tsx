'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { currencyFormatter } from '@/app/components/checkout/currency-formatter'

interface ProductPerformanceChartProps {
  data: Array<{
    name: string
    revenue: number
    quantity?: number
  }>
  height?: number
  type?: 'revenue' | 'quantity'
  limit?: number
}

export default function ProductPerformanceChart({ 
  data, 
  height = 300, 
  type = 'revenue',
  limit = 10 
}: ProductPerformanceChartProps) {
  const sortedData = [...data]
    .sort((a, b) => (type === 'revenue' ? b.revenue - a.revenue : (b.quantity || 0) - (a.quantity || 0)))
    .slice(0, limit)

  const formatCurrency = (value: number) => currencyFormatter(value)

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart 
        data={sortedData} 
        margin={{ top: 5, right: 30, left: 20, bottom: 80 }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          type="number"
          tick={{ fontSize: 12 }}
          tickFormatter={type === 'revenue' ? formatCurrency : undefined}
        />
        <YAxis 
          type="category"
          dataKey="name" 
          tick={{ fontSize: 12 }}
          width={150}
        />
        <Tooltip 
          formatter={(value: number) => 
            type === 'revenue' ? formatCurrency(value) : value.toLocaleString()
          }
          labelStyle={{ color: '#374151' }}
        />
        <Legend />
        {type === 'revenue' ? (
          <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
        ) : (
          <Bar dataKey="quantity" fill="#10b981" name="Quantity Sold" />
        )}
      </BarChart>
    </ResponsiveContainer>
  )
}

