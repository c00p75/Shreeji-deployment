'use client'

import InventoryAlertsSettings from '@/app/components/admin/InventoryAlertsSettings'
import ProtectedRoute from '@/app/components/admin/ProtectedRoute'

export default function AdminInventoryAlertsSettingsPage() {
  return (
    <ProtectedRoute>
      <InventoryAlertsSettings />
    </ProtectedRoute>
  )
}

