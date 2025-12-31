"use client";

import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import api from '@/app/lib/admin/api';
import toast from 'react-hot-toast';

interface Order {
  id: number;
  orderId?: number;
  orderNumber: string;
  status?: string;
  orderStatus?: string;
  paymentStatus?: string;
  trackingNumber?: string;
  estimatedDelivery?: string | Date;
  shippedAt?: string | Date;
  deliveredAt?: string | Date;
  notes?: string;
  internalNotes?: string;
  rawOrder?: any;
}

interface EditOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onSave: () => void;
}

const ORDER_STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'refunded', label: 'Refunded' },
];

const PAYMENT_STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
  { value: 'partially-paid', label: 'Partially Paid' },
  { value: 'failed', label: 'Failed' },
  { value: 'refunded', label: 'Refunded' },
  { value: 'partially-refunded', label: 'Partially Refunded' },
];

export default function EditOrderModal({ isOpen, onClose, order, onSave }: EditOrderModalProps) {
  const [formData, setFormData] = useState({
    orderStatus: '',
    paymentStatus: '',
    trackingNumber: '',
    estimatedDelivery: '',
    shippedAt: '',
    deliveredAt: '',
    notes: '',
    internalNotes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  // Load order details when modal opens
  useEffect(() => {
    if (isOpen && order) {
      loadOrderDetails();
    }
  }, [isOpen, order]);

  // Initialize form data when order details are loaded
  useEffect(() => {
    if (orderDetails) {
      const orderStatus = orderDetails.orderStatus || orderDetails.status || '';
      const estimatedDelivery = orderDetails.estimatedDelivery
        ? new Date(orderDetails.estimatedDelivery).toISOString().split('T')[0]
        : '';
      const shippedAt = orderDetails.shippedAt
        ? new Date(orderDetails.shippedAt).toISOString().split('T')[0]
        : '';
      const deliveredAt = orderDetails.deliveredAt
        ? new Date(orderDetails.deliveredAt).toISOString().split('T')[0]
        : '';

      setFormData({
        orderStatus,
        paymentStatus: orderDetails.paymentStatus || '',
        trackingNumber: orderDetails.trackingNumber || '',
        estimatedDelivery,
        shippedAt,
        deliveredAt,
        notes: orderDetails.notes || '',
        internalNotes: orderDetails.internalNotes || '',
      });
    }
  }, [orderDetails]);

  const loadOrderDetails = async () => {
    if (!order) return;

    try {
      setLoading(true);
      const orderId = order.orderId || order.id || order.rawOrder?.id;
      
      if (!orderId) {
        console.error('Order ID not found');
        return;
      }

      // Try to get full order details from API
      try {
        const response = await api.getOrder(orderId);
        setOrderDetails(response.data);
      } catch (error: any) {
        console.error('Error loading order details:', error);
        // Fallback to using order data directly
        if (order.rawOrder) {
          setOrderDetails(order.rawOrder);
        } else {
          setOrderDetails(order);
        }
      }
    } catch (error: any) {
      console.error('Error loading order:', error);
      toast.error('Failed to load order details');
      // Fallback to using order data directly
      if (order.rawOrder) {
        setOrderDetails(order.rawOrder);
      } else {
        setOrderDetails(order);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Tracking number validation (optional but if provided, should be reasonable)
    if (formData.trackingNumber && formData.trackingNumber.length > 100) {
      newErrors.trackingNumber = 'Tracking number must be 100 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    if (!order) return;

    try {
      setLoading(true);
      const orderId = order.orderId || order.id || order.rawOrder?.id;

      if (!orderId) {
        toast.error('Order ID not found');
        return;
      }

      // Prepare update payload
      const updateData: any = {};

      if (formData.orderStatus && formData.orderStatus !== orderDetails?.orderStatus && formData.orderStatus !== orderDetails?.status) {
        updateData.orderStatus = formData.orderStatus;
      }

      if (formData.paymentStatus && formData.paymentStatus !== orderDetails?.paymentStatus) {
        updateData.paymentStatus = formData.paymentStatus;
      }

      if (formData.trackingNumber !== (orderDetails?.trackingNumber || '')) {
        updateData.trackingNumber = formData.trackingNumber || null;
      }

      if (formData.estimatedDelivery) {
        const estimatedDeliveryDate = new Date(formData.estimatedDelivery);
        if (!isNaN(estimatedDeliveryDate.getTime())) {
          updateData.estimatedDelivery = estimatedDeliveryDate.toISOString();
        }
      } else if (orderDetails?.estimatedDelivery && !formData.estimatedDelivery) {
        // Clear estimated delivery if it was removed
        updateData.estimatedDelivery = null;
      }

      if (formData.shippedAt) {
        const shippedAtDate = new Date(formData.shippedAt);
        if (!isNaN(shippedAtDate.getTime())) {
          updateData.shippedAt = shippedAtDate.toISOString();
        }
      } else if (orderDetails?.shippedAt && !formData.shippedAt) {
        updateData.shippedAt = null;
      }

      if (formData.deliveredAt) {
        const deliveredAtDate = new Date(formData.deliveredAt);
        if (!isNaN(deliveredAtDate.getTime())) {
          updateData.deliveredAt = deliveredAtDate.toISOString();
        }
      } else if (orderDetails?.deliveredAt && !formData.deliveredAt) {
        updateData.deliveredAt = null;
      }

      if (formData.notes !== (orderDetails?.notes || '')) {
        updateData.notes = formData.notes || null;
      }

      if (formData.internalNotes !== (orderDetails?.internalNotes || '')) {
        updateData.internalNotes = formData.internalNotes || null;
      }

      // Only update if there are changes
      if (Object.keys(updateData).length === 0) {
        toast.error('No changes to save');
        setLoading(false);
        return;
      }

      await api.updateOrder(orderId, updateData);

      toast.success('Order updated successfully');
      onSave();
      onClose();
    } catch (error: any) {
      console.error('Error updating order:', error);
      toast.error(error.message || 'Failed to update order');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        orderStatus: '',
        paymentStatus: '',
        trackingNumber: '',
        estimatedDelivery: '',
        shippedAt: '',
        deliveredAt: '',
        notes: '',
        internalNotes: '',
      });
      setErrors({});
      setOrderDetails(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleClose}
        />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white max-h-[90vh] overflow-y-auto rounded-2xl text-left overflow-visible shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <form onSubmit={handleSubmit} className="relative">
            {/* Header */}
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Edit Order {order?.orderNumber || `#${order?.id}`}
                </h3>
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none disabled:opacity-50"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="bg-white px-4 pt-5 sm:p-6">
              {loading && !orderDetails ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Order Status */}
                  <div>
                    <label htmlFor="orderStatus" className="block text-sm font-medium text-gray-700 mb-1">
                      Order Status
                    </label>
                    <select
                      id="orderStatus"
                      name="orderStatus"
                      value={formData.orderStatus}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                      <option value="">Select Status</option>
                      {ORDER_STATUSES.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Payment Status */}
                  <div>
                    <label htmlFor="paymentStatus" className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Status
                    </label>
                    <select
                      id="paymentStatus"
                      name="paymentStatus"
                      value={formData.paymentStatus}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                      <option value="">Select Payment Status</option>
                      {PAYMENT_STATUSES.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Pickup Details Section */}
                  {orderDetails && (
                    (orderDetails.paymentMethod === 'cash_on_pickup' || orderDetails.payments?.[0]?.paymentMethod === 'cash_on_pickup') &&
                    orderDetails.preferredPickupDate && (
                      <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          📦 Pickup Collection Details
                        </h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Preferred Pickup Date</p>
                              <p className="text-sm text-gray-900 font-semibold">
                                {orderDetails.preferredPickupDate 
                                  ? new Date(orderDetails.preferredPickupDate).toLocaleDateString('en-US', {
                                      weekday: 'long',
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                    })
                                  : 'N/A'}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">Preferred Pickup Time</p>
                              <p className="text-sm text-gray-900 font-semibold">
                                {orderDetails.preferredPickupTime || 'N/A'}
                              </p>
                            </div>
                          </div>

                          {(orderDetails.collectingPersonName || orderDetails.collectingPersonPhone) && (
                            <div className="border-t border-amber-200 pt-4">
                              <p className="text-sm font-medium text-gray-700 mb-2">Person Collecting</p>
                              <div className="space-y-1">
                                {orderDetails.collectingPersonName && (
                                  <p className="text-sm text-gray-900">
                                    <span className="font-medium">Name:</span> {orderDetails.collectingPersonName}
                                  </p>
                                )}
                                {orderDetails.collectingPersonPhone && (
                                  <p className="text-sm text-gray-900">
                                    <span className="font-medium">Phone:</span> {orderDetails.collectingPersonPhone}
                                  </p>
                                )}
                                {orderDetails.collectingPersonRelationship && (
                                  <p className="text-sm text-gray-900">
                                    <span className="font-medium">Relationship:</span> {orderDetails.collectingPersonRelationship.replace('_', ' ')}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}

                          <div className="border-t border-amber-200 pt-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">ID Verification</p>
                            <div className="space-y-1">
                              {orderDetails.idType && (
                                <p className="text-sm text-gray-900">
                                  <span className="font-medium">ID Type:</span> {orderDetails.idType.toUpperCase().replace('_', ' ')}
                                </p>
                              )}
                              {orderDetails.idNumber && (
                                <p className="text-sm text-gray-900">
                                  <span className="font-medium">ID Number:</span> {orderDetails.idNumber}
                                </p>
                              )}
                            </div>
                          </div>

                          {orderDetails.vehicleInfo && (
                            <div className="border-t border-amber-200 pt-4">
                              <p className="text-sm font-medium text-gray-700 mb-1">Vehicle Information</p>
                              <p className="text-sm text-gray-900">{orderDetails.vehicleInfo}</p>
                            </div>
                          )}

                          {orderDetails.pickupSpecialInstructions && (
                            <div className="border-t border-amber-200 pt-4">
                              <p className="text-sm font-medium text-gray-700 mb-1">Special Instructions</p>
                              <p className="text-sm text-gray-900 whitespace-pre-wrap">{orderDetails.pickupSpecialInstructions}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  )}

                  {/* Tracking Number */}
                  <div>
                    <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Tracking Number
                    </label>
                    <input
                      type="text"
                      id="trackingNumber"
                      name="trackingNumber"
                      value={formData.trackingNumber}
                      onChange={handleChange}
                      maxLength={100}
                      placeholder="Enter tracking number"
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                        errors.trackingNumber ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.trackingNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.trackingNumber}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Adding a tracking number will automatically set the order status to "Shipped" and set the shipped date.
                    </p>
                  </div>

                  {/* Estimated Delivery */}
                  <div>
                    <label htmlFor="estimatedDelivery" className="block text-sm font-medium text-gray-700 mb-1">
                      Estimated Delivery Date
                    </label>
                    <input
                      type="date"
                      id="estimatedDelivery"
                      name="estimatedDelivery"
                      value={formData.estimatedDelivery}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>

                  {/* Shipped At */}
                  <div>
                    <label htmlFor="shippedAt" className="block text-sm font-medium text-gray-700 mb-1">
                      Shipped Date
                    </label>
                    <input
                      type="date"
                      id="shippedAt"
                      name="shippedAt"
                      value={formData.shippedAt}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>

                  {/* Delivered At */}
                  <div>
                    <label htmlFor="deliveredAt" className="block text-sm font-medium text-gray-700 mb-1">
                      Delivered Date
                    </label>
                    <input
                      type="date"
                      id="deliveredAt"
                      name="deliveredAt"
                      value={formData.deliveredAt}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Notes visible to customer"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>

                  {/* Internal Notes */}
                  <div>
                    <label htmlFor="internalNotes" className="block text-sm font-medium text-gray-700 mb-1">
                      Internal Notes
                    </label>
                    <textarea
                      id="internalNotes"
                      name="internalNotes"
                      value={formData.internalNotes}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Internal notes (not visible to customer)"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Floating actions */}
            <div className="sticky bottom-0 z-20 mt-6 px-4 pb-4 sm:px-6">
              <div className="flex flex-wrap items-center justify-end gap-3 rounded-2xl p-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-primary-500/40 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="inline-flex items-center rounded-xl border border-primary-100 bg-white px-5 py-3 text-sm font-semibold text-primary-700 shadow-sm hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

