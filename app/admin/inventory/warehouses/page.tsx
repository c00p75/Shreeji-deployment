'use client'

import WarehouseManagement from '@/app/components/admin/WarehouseManagement'
import ProtectedRoute from '@/app/components/admin/ProtectedRoute'

export default function AdminWarehousesPage() {
  return (
    <ProtectedRoute>
      <WarehouseManagement />
    </ProtectedRoute>
  )
}

