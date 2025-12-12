'use client'

import InventoryReports from '@/app/components/admin/InventoryReports'
import ProtectedRoute from '@/app/components/admin/ProtectedRoute'

export default function AdminInventoryReportsPage() {
  return (
    <ProtectedRoute>
      <InventoryReports />
    </ProtectedRoute>
  )
}

