'use client'

import { currencyFormatter } from '@/app/components/checkout/currency-formatter'

interface SummaryCard {
  label: string
  value: string | number
  change?: {
    value: number
    isPositive: boolean
  }
  icon?: React.ReactNode
}

interface ReportSummaryCardsProps {
  cards: SummaryCard[]
}

export default function ReportSummaryCards({ cards }: ReportSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="card p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500">{card.label}</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {typeof card.value === 'number' && card.label.toLowerCase().includes('revenue')
                  ? currencyFormatter(card.value)
                  : typeof card.value === 'number' && card.label.toLowerCase().includes('amount')
                  ? currencyFormatter(card.value)
                  : typeof card.value === 'number' && card.label.toLowerCase().includes('value')
                  ? currencyFormatter(card.value)
                  : typeof card.value === 'number' && card.label.toLowerCase().includes('spent')
                  ? currencyFormatter(card.value)
                  : card.value.toLocaleString()}
              </p>
              {card.change && (
                <div className="mt-2 flex items-center">
                  <span
                    className={`text-sm font-medium ${
                      card.change.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {card.change.isPositive ? '↑' : '↓'} {Math.abs(card.change.value).toFixed(1)}%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs previous period</span>
                </div>
              )}
            </div>
            {card.icon && (
              <div className="ml-4 text-gray-400">
                {card.icon}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

