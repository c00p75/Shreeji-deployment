'use client'

import SettingsPage from '@/app/components/admin/SettingsPage'
import ProtectedRoute from '@/app/components/admin/ProtectedRoute'

export default function AdminSettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsPage />
    </ProtectedRoute>
  )
}

