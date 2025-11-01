'use client'

import OrderManagement from '@/app/components/admin/OrderManagement'
import ProtectedRoute from '@/app/components/admin/ProtectedRoute'

export default function AdminOrdersPage() {
  return (
    <ProtectedRoute>
      <OrderManagement />
    </ProtectedRoute>
  )
}

