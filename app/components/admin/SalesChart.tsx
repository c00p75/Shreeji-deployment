'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', total: 4000, cancelled: 400 },
  { name: 'Feb', total: 3000, cancelled: 300 },
  { name: 'Mar', total: 5000, cancelled: 500 },
  { name: 'Apr', total: 4500, cancelled: 450 },
  { name: 'May', total: 6000, cancelled: 600 },
  { name: 'Jun', total: 5500, cancelled: 550 },
  { name: 'Jul', total: 7000, cancelled: 700 },
]

export default function SalesChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            stroke="#6b7280"
            fontSize={12}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="total" 
            stroke="#807045" 
            strokeWidth={2}
            dot={{ fill: '#807045', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#807045', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="cancelled" 
            stroke="#ef4444" 
            strokeWidth={2}
            dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-primary-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Total Order</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Cancelled Order</span>
        </div>
      </div>
    </div>
  )
}
