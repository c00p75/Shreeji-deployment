'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts'
import { currencyFormatter } from '@/app/components/checkout/currency-formatter'

interface CustomerSegmentationChartProps {
  data: Array<{
    segment: string
    count: number
    totalValue: number
    avgValue: number
  }>
  height?: number
  type?: 'bar' | 'pie'
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

export default function CustomerSegmentationChart({ 
  data, 
  height = 300,
  type = 'bar'
}: CustomerSegmentationChartProps) {
  const formatCurrency = (value: number) => currencyFormatter(value)

  if (type === 'pie') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ segment, percent }) => `${segment} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="count"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="segment" 
          tick={{ fontSize: 12 }}
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
        <Bar dataKey="totalValue" fill="#3b82f6" name="Total Value" />
        <Bar dataKey="avgValue" fill="#10b981" name="Average Value" />
      </BarChart>
    </ResponsiveContainer>
  )
}

