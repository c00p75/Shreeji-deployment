'use client'

import ContentManagement from '@/app/components/admin/ContentManagement'
import ProtectedRoute from '@/app/components/admin/ProtectedRoute'

export default function ContentManagementPage() {
  return (
    <ProtectedRoute>
      <ContentManagement />
    </ProtectedRoute>
  )
}

