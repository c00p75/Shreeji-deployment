'use client'


import ProtectedRoute from '@/app/components/admin/ProtectedRoute'
import Dashboard from '@/app/components/admin/Dashboard'

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  )
}

