'use client'

import AdminUserManagement from '@/app/components/admin/AdminUserManagement'
import ProtectedRoute from '@/app/components/admin/ProtectedRoute'

export default function AdminUsersPage() {
  return (
    <ProtectedRoute>
      <AdminUserManagement />
    </ProtectedRoute>
  )
}

