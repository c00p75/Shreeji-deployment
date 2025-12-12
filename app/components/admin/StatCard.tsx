'use client'

interface StatCardProps {
  title: string
  value: string
  change?: number
  changeLabel?: string
  subtitle?: string
}

export default function StatCard({ title, value, change, changeLabel, subtitle }: StatCardProps) {
  const showChange = change !== undefined && change !== 0
  const showLabel = changeLabel && changeLabel.trim() !== ''
  const isPositive = change !== undefined ? change >= 0 : true
  
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="stat-label">{title}</p>
          <p className="stat-value">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        {(showChange || showLabel) && (
          <div className="text-right">
            {showChange && (
              <p className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
                {isPositive ? '+' : ''}{change}%
              </p>
            )}
            {showLabel && (
              <p className="text-xs text-gray-500">{changeLabel}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
