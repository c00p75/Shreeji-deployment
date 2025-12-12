'use client'

import CouponManagement from '@/app/components/admin/CouponManagement'
import ProtectedRoute from '@/app/components/admin/ProtectedRoute'

export default function CouponsPage() {
  return (
    <ProtectedRoute>
      <CouponManagement />
    </ProtectedRoute>
  )
}

