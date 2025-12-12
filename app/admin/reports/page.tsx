'use client'

import AdminReports from '@/app/components/admin/AdminReports'
import ProtectedRoute from '@/app/components/admin/ProtectedRoute'

export default function ReportsPage() {
  return (
    <ProtectedRoute>
      <AdminReports />
    </ProtectedRoute>
  )
}

