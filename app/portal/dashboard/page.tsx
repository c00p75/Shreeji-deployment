'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useClientAuth } from '@/app/contexts/ClientAuthContext'
import clientApi from '@/app/lib/client/api'

export default function PortalDashboardPage() {
  const { user, loading: authLoading, isAuthenticated } = useClientAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/portal/login')
    }
  }, [authLoading, isAuthenticated, router])

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders()
    }
  }, [isAuthenticated])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await clientApi.getOrders({ 
        pagination: { page: 1, pageSize: 5 },
        populate: ['orderItems']
      })
      setOrders(response.data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.firstName || user?.email || 'Customer'}
          </h1>
          <p className="mt-2 text-gray-600">Manage your account and orders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{orders.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <p className="mt-2 text-lg text-gray-900">{user?.email}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Account Status</h3>
            <p className="mt-2 text-lg text-gray-900">
              {user?.blocked ? (
                <span className="text-red-600">Blocked</span>
              ) : (
                <span className="text-green-600">Active</span>
              )}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          </div>
          <div className="p-6">
            {orders.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No orders yet</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order: any) => (
                  <div key={order.id} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Order #{order.orderNumber || order.id}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          K{order.totalAmount?.toLocaleString() || '0'}
                        </p>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.orderStatus === 'processing' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.orderStatus || 'pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

