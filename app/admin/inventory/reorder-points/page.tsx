'use client'

import ReorderPointsManagement from '@/app/components/admin/ReorderPointsManagement'
import ProtectedRoute from '@/app/components/admin/ProtectedRoute'

export default function AdminReorderPointsPage() {
  return (
    <ProtectedRoute>
      <ReorderPointsManagement />
    </ProtectedRoute>
  )
}

