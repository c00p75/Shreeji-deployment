'use client'

import ProductManagement from '@/app/components/admin/ProductManagement'
import ProtectedRoute from '@/app/components/admin/ProtectedRoute'

export default function AdminProductsPage() {
  return (
    <ProtectedRoute>
      <ProductManagement />
    </ProtectedRoute>
  )
}

