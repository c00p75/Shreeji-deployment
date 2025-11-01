'use client'

import CustomerManagement from '@/app/components/admin/CustomerManagement'
import ProtectedRoute from '@/app/components/admin/ProtectedRoute'

export default function AdminCustomersPage() {
  return (
    <ProtectedRoute>
      <CustomerManagement />
    </ProtectedRoute>
  )
}

