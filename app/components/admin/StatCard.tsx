'use client'

interface StatCardProps {
  title: string
  value: string
  change: number
  changeLabel: string
}

export default function StatCard({ title, value, change, changeLabel }: StatCardProps) {
  const isPositive = change >= 0
  
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="stat-label">{title}</p>
          <p className="stat-value">{value}</p>
        </div>
        <div className="text-right">
          <p className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '+' : ''}{change}%
          </p>
          <p className="text-xs text-gray-500">{changeLabel}</p>
        </div>
      </div>
    </div>
  )
}
