'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface OrdersChartProps {
  data: Array<{
    period: string
    orders: number
    previousOrders?: number
  }>
  height?: number
  showComparison?: boolean
}

export default function OrdersChart({ data, height = 300, showComparison = false }: OrdersChartProps) {
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
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip 
          labelStyle={{ color: '#374151' }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="orders" 
          stroke="#10b981" 
          strokeWidth={2}
          name="Orders"
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        {showComparison && (
          <Line 
            type="monotone" 
            dataKey="previousOrders" 
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

