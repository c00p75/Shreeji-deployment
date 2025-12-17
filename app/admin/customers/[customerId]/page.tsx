'use client'

import ProtectedRoute from '@/app/components/admin/ProtectedRoute'
import CustomerAnalyticsPage from '@/app/components/admin/CustomerAnalyticsPage'

interface CustomerDetailPageProps {
  params: { customerId: string }
}

export default function AdminCustomerDetailPage({ params }: CustomerDetailPageProps) {
  return (
    <ProtectedRoute>
      <CustomerAnalyticsPage customerId={params.customerId} />
    </ProtectedRoute>
  )
}


