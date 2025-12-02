'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useClientAuth } from '@/app/contexts/ClientAuthContext'
import clientApi from '@/app/lib/client/api'
import { ArrowLeft, Package, MapPin, CreditCard, Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function OrderDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const { loading: authLoading, isAuthenticated } = useClientAuth()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/portal/login')
    }
  }, [authLoading, isAuthenticated, router])

  useEffect(() => {
    if (isAuthenticated && id) {
      fetchOrder()
    }
  }, [isAuthenticated, id])

  const fetchOrder = async () => {
    try {
      setLoading(true)
      const response = await clientApi.getOrder(id as string)
      setOrder(response.data)
    } catch (error: any) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'refunded':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f1e8]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f1e8]">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Order not found</p>
          <Link
            href="/portal/orders"
            className="text-primary-600 hover:text-primary-700"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/portal/orders"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Link>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Order #{order.orderNumber || order.id}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className="text-right">
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.orderStatus)}`}>
                  {order.orderStatus || 'pending'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Order Items */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items
              </h2>
              <div className="space-y-4">
                {order.orderItems && order.orderItems.length > 0 ? (
                  order.orderItems.map((item: any, index: number) => {
                    const product = item.product || item.productSnapshot || {}
                    const imageUrl = product.images?.[0]?.url || product.imageUrl
                    return (
                      <div key={index} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                        {imageUrl && (
                          <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={imageUrl}
                              alt={product.name || 'Product'}
                              fill
                              className="object-cover"
                              unoptimized={imageUrl.startsWith('http')}
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{product.name || 'Product'}</h3>
                          <p className="text-sm text-gray-500">SKU: {product.sku || 'N/A'}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Quantity: {item.quantity} × K{item.unitPrice?.toLocaleString() || item.price?.toLocaleString() || '0'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            K{((item.quantity || 1) * (item.unitPrice || item.price || 0)).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <p className="text-gray-500">No items found</p>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            {order.shippingAddress && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </h2>
                <div className="p-4 bg-[#f5f1e8] rounded-lg">
                  <p className="text-gray-900">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </p>
                  <p className="text-gray-600">
                    {order.shippingAddress.addressLine1}
                    {order.shippingAddress.addressLine2 && `, ${order.shippingAddress.addressLine2}`}
                  </p>
                  <p className="text-gray-600">
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                  </p>
                  <p className="text-gray-600">{order.shippingAddress.country}</p>
                  {order.shippingAddress.phone && (
                    <p className="text-gray-600 mt-2">Phone: {order.shippingAddress.phone}</p>
                  )}
                </div>
              </div>
            )}

            {/* Tracking Information */}
            {order.trackingNumber && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Tracking Information
                </h2>
                <div className="p-4 bg-[#f5f1e8] rounded-lg">
                  <p className="text-gray-900">
                    <span className="font-medium">Tracking Number:</span> {order.trackingNumber}
                  </p>
                  {order.estimatedDelivery && (
                    <p className="text-gray-600 mt-2">
                      <span className="font-medium">Estimated Delivery:</span>{' '}
                      {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                  {order.shippedAt && (
                    <p className="text-gray-600 mt-2">
                      <span className="font-medium">Shipped on:</span>{' '}
                      {new Date(order.shippedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                  {order.deliveredAt && (
                    <p className="text-green-600 mt-2">
                      <span className="font-medium">Delivered on:</span>{' '}
                      {new Date(order.deliveredAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Payment Details */}
            {order.payments && order.payments.length > 0 && (
              <div className="mb-6 border-t border-gray-200 pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Details
                </h2>
                <div className="space-y-4">
                  {order.payments.map((payment: any, index: number) => {
                    const paymentMethodLabels: Record<string, string> = {
                      credit_card: 'Credit Card',
                      debit_card: 'Debit Card',
                      bank_transfer: 'Bank Transfer',
                      mobile_money: 'Mobile Money',
                      cash_on_delivery: 'Cash on Delivery',
                    };

                    const paymentMethod = paymentMethodLabels[payment.paymentMethod] || payment.paymentMethod || 'Unknown';

                    return (
                      <div key={payment.id || index} className="p-4 bg-[#f5f1e8] rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-gray-900">Payment {order.payments.length > 1 ? `#${index + 1}` : ''}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Method: <span className="font-medium">{paymentMethod}</span>
                            </p>
                          </div>
                          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getPaymentStatusColor(payment.paymentStatus)}`}>
                            {payment.paymentStatus || 'pending'}
                          </span>
                        </div>
                        <div className="mt-3 space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Amount:</span>
                            <span className="font-medium text-gray-900">
                              {payment.currency || 'ZMW'} {payment.amount?.toLocaleString() || '0'}
                            </span>
                          </div>
                          {payment.transactionId && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Transaction ID:</span>
                              <span className="font-mono text-gray-900">{payment.transactionId}</span>
                            </div>
                          )}
                          {payment.processedAt && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Processed on:</span>
                              <span className="text-gray-900">
                                {new Date(payment.processedAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Show message if no payments found but payment status exists */}
            {(!order.payments || order.payments.length === 0) && order.paymentStatus && (
              <div className="mb-6 border-t border-gray-200 pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </h2>
                <div className="p-4 bg-[#f5f1e8] rounded-lg">
                  <p className="text-gray-600">
                    Payment status: <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ml-2 ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Payment details will be available once payment is processed.
                  </p>
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Order Summary
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>K{order.subtotal?.toLocaleString() || '0'}</span>
                </div>
                {order.shippingAmount > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>K{order.shippingAmount?.toLocaleString() || '0'}</span>
                  </div>
                )}
                {order.taxAmount > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>K{order.taxAmount?.toLocaleString() || '0'}</span>
                  </div>
                )}
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-K{order.discountAmount?.toLocaleString() || '0'}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>K{order.totalAmount?.toLocaleString() || '0'}</span>
                </div>
                <div className="mt-4">
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                    Payment: {order.paymentStatus || 'pending'}
                  </span>
                </div>
              </div>
            </div>

            {order.notes && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <span className="font-medium">Order Notes:</span> {order.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

