'use client'

import { useState } from 'react'
import { CalendarIcon } from '@heroicons/react/24/outline'

interface DatePreset {
  label: string
  getDates: () => { start: string; end: string }
}

const datePresets: DatePreset[] = [
  {
    label: 'Today',
    getDates: () => {
      const today = new Date()
      return {
        start: today.toISOString().split('T')[0],
        end: today.toISOString().split('T')[0]
      }
    }
  },
  {
    label: 'Last 7 Days',
    getDates: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(end.getDate() - 7)
      return {
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0]
      }
    }
  },
  {
    label: 'Last 30 Days',
    getDates: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(end.getDate() - 30)
      return {
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0]
      }
    }
  },
  {
    label: 'Last 90 Days',
    getDates: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(end.getDate() - 90)
      return {
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0]
      }
    }
  },
  {
    label: 'This Month',
    getDates: () => {
      const now = new Date()
      const start = new Date(now.getFullYear(), now.getMonth(), 1)
      return {
        start: start.toISOString().split('T')[0],
        end: now.toISOString().split('T')[0]
      }
    }
  },
  {
    label: 'Last Month',
    getDates: () => {
      const now = new Date()
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      const end = new Date(now.getFullYear(), now.getMonth(), 0)
      return {
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0]
      }
    }
  }
]

interface ReportFiltersProps {
  dateRange: { start: string; end: string }
  onDateRangeChange: (range: { start: string; end: string }) => void
  period?: 'daily' | 'weekly' | 'monthly'
  onPeriodChange?: (period: 'daily' | 'weekly' | 'monthly') => void
  showPeriodSelector?: boolean
  showComparison?: boolean
  comparisonEnabled?: boolean
  onComparisonToggle?: (enabled: boolean) => void
  additionalFilters?: React.ReactNode
}

export default function ReportFilters({
  dateRange,
  onDateRangeChange,
  period,
  onPeriodChange,
  showPeriodSelector = true,
  showComparison = true,
  comparisonEnabled = false,
  onComparisonToggle,
  additionalFilters
}: ReportFiltersProps) {
  const [showPresets, setShowPresets] = useState(false)

  const handlePresetClick = (preset: DatePreset) => {
    const dates = preset.getDates()
    onDateRangeChange(dates)
    setShowPresets(false)
  }

  return (
    <div className="card p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Range
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <span className="self-center text-gray-500">to</span>
            <div className="flex-1 relative">
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setShowPresets(!showPresets)}
                className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center"
                title="Quick date presets"
              >
                <CalendarIcon className="w-5 h-5 text-gray-500" />
              </button>
              {showPresets && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowPresets(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 border border-gray-200">
                    <div className="py-1">
                      {datePresets.map((preset) => (
                        <button
                          key={preset.label}
                          onClick={() => handlePresetClick(preset)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Period Selector */}
        {showPeriodSelector && period && onPeriodChange && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Period
            </label>
            <select
              value={period}
              onChange={(e) => onPeriodChange(e.target.value as 'daily' | 'weekly' | 'monthly')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        )}

        {/* Comparison Toggle */}
        {showComparison && onComparisonToggle && (
          <div className="flex items-end">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={comparisonEnabled}
                onChange={(e) => onComparisonToggle(e.target.checked)}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Compare with previous period</span>
            </label>
          </div>
        )}

        {/* Additional Filters */}
        {additionalFilters && (
          <div className="lg:col-span-4">
            {additionalFilters}
          </div>
        )}
      </div>
    </div>
  )
}

