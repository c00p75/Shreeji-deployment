'use client'

import LowStockAlerts from '@/app/components/admin/LowStockAlerts'
import ProtectedRoute from '@/app/components/admin/ProtectedRoute'

export default function AdminInventoryAlertsPage() {
  return (
    <ProtectedRoute>
      <LowStockAlerts />
    </ProtectedRoute>
  )
}

