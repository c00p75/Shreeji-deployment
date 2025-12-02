'use client'

import PaymentManagement from '@/app/components/admin/PaymentManagement'
import ProtectedRoute from '@/app/components/admin/ProtectedRoute'

export default function AdminPaymentsPage() {
  return (
    <ProtectedRoute>
      <PaymentManagement />
    </ProtectedRoute>
  )
}

