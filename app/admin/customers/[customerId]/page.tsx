import ProtectedRoute from '@/app/components/admin/ProtectedRoute'
import CustomerAnalyticsPage from '@/app/components/admin/CustomerAnalyticsPage'

export default async function AdminCustomerDetailPage({
  params,
}: {
  params: Promise<{ customerId: string }>
}) {
  const { customerId } = await params

  return (
    <ProtectedRoute>
      <CustomerAnalyticsPage customerId={customerId} />
    </ProtectedRoute>
  )
}


