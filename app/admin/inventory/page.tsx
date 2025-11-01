'use client'

import InventoryManagement from '@/app/components/admin/InventoryManagement'
import ProtectedRoute from '@/app/components/admin/ProtectedRoute'

export default function AdminInventoryPage() {
  return (
    <ProtectedRoute>
      <InventoryManagement />
    </ProtectedRoute>
  )
}

