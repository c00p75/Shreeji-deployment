'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import api from '@/app/lib/admin/api'

interface SalesChartProps {
  period?: 'daily' | 'weekly' | 'monthly'
}

export default function SalesChart({ period = 'weekly' }: SalesChartProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSalesData()
  }, [period])

  const fetchSalesData = async () => {
    try {
      setLoading(true)
      const endDate = new Date()
      const startDate = new Date()
      
      // Calculate date range based on period
      if (period === 'daily') {
        startDate.setDate(endDate.getDate() - 7) // Last 7 days
      } else if (period === 'weekly') {
        startDate.setDate(endDate.getDate() - 42) // Last 6 weeks
      } else {
        startDate.setMonth(endDate.getMonth() - 6) // Last 6 months
      }

      const analytics = await api.getOrderAnalytics({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        groupBy: period === 'daily' ? 'day' : period === 'weekly' ? 'week' : 'month'
      })

      // Transform analytics data for chart
      const chartData = analytics?.data || []
      setData(chartData)
    } catch (error) {
      console.error('Error fetching sales data:', error)
      // Fallback to empty data
      setData([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        <p>No sales data available</p>
      </div>
    )
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="period" 
            stroke="#6b7280"
            fontSize={12}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
            tickFormatter={(value) => `K${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value: number) => `K${value.toLocaleString()}`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            name="Revenue"
            stroke="#807045" 
            strokeWidth={2}
            dot={{ fill: '#807045', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#807045', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="orders" 
            name="Orders"
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
