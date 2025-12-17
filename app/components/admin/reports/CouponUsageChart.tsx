'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts'
import { currencyFormatter } from '@/app/components/checkout/currency-formatter'

interface CouponUsageChartProps {
  data: Array<{
    name: string
    usage: number
    discountAmount: number
    revenue?: number
  }>
  height?: number
  type?: 'usage' | 'effectiveness' | 'trend'
}

export default function CouponUsageChart({ 
  data, 
  height = 300,
  type = 'usage'
}: CouponUsageChartProps) {
  const formatCurrency = (value: number) => currencyFormatter(value)

  if (type === 'trend') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip labelStyle={{ color: '#374151' }} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="usage" 
            stroke="#3b82f6" 
            strokeWidth={2}
            name="Usage Count"
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart 
        data={data} 
        margin={{ top: 5, right: 30, left: 20, bottom: 80 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12 }}
          angle={-45}
          textAnchor="end"
          height={100}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          yAxisId="left"
        />
        {type === 'effectiveness' && (
          <YAxis 
            yAxisId="right" 
            orientation="right"
            tick={{ fontSize: 12 }}
            tickFormatter={formatCurrency}
          />
        )}
        <Tooltip 
          formatter={(value: number, name: string) => {
            if (name === 'discountAmount' || name === 'revenue') {
              return formatCurrency(value)
            }
            return value.toLocaleString()
          }}
          labelStyle={{ color: '#374151' }}
        />
        <Legend />
        {type === 'usage' ? (
          <>
            <Bar yAxisId="left" dataKey="usage" fill="#3b82f6" name="Usage Count" />
            <Bar yAxisId="left" dataKey="discountAmount" fill="#10b981" name="Discount Amount" />
          </>
        ) : (
          <>
            <Bar yAxisId="left" dataKey="usage" fill="#3b82f6" name="Usage Count" />
            <Bar yAxisId="right" dataKey="revenue" fill="#10b981" name="Revenue Generated" />
          </>
        )}
      </BarChart>
    </ResponsiveContainer>
  )
}

