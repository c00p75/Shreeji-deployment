'use client'

import { ReactNode } from 'react'
import Link from 'next/link'

interface StatCardProps {
  title: string
  value: string
  change?: number
  changeLabel?: string
  subtitle?: string
  icon?: ReactNode
  iconBgColor?: string
  iconColor?: string
  href?: string
}

export default function StatCard({ 
  title, 
  value, 
  change, 
  changeLabel, 
  subtitle,
  icon,
  iconBgColor = 'bg-blue-100',
  iconColor = 'text-blue-600',
  href
}: StatCardProps) {
  const showChange = change !== undefined && change !== 0
  const showLabel = changeLabel && changeLabel.trim() !== ''
  const isPositive = change !== undefined ? change >= 0 : true
  
  const cardContent = (
    <div className="stat-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          {icon && (
            <div className="flex-shrink-0 mr-4">
              <div className={`w-10 h-10 ${iconBgColor} rounded-full flex items-center justify-center`}>
                <div className={iconColor}>
                  {icon}
                </div>
              </div>
            </div>
          )}
          <div className="flex-1">
            <p className="stat-label">{title}</p>
            <p className="stat-value">{value}</p>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
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

  if (href) {
    return (
      <Link href={href} className="block hover:opacity-90 transition-opacity cursor-pointer">
        {cardContent}
      </Link>
    )
  }

  return cardContent
}
