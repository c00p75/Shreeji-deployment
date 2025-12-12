"use client";

import { useState, useEffect } from 'react';
import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import api from '@/app/lib/admin/api';
import toast from 'react-hot-toast';

interface Product {
  id: number;
  name: string;
  sku?: string;
}

interface Warehouse {
  id: number;
  name: string;
}

interface StockAdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  warehouseId?: number | null;
  onSuccess: () => void;
}

type AdjustmentType = 'INCREASE' | 'DECREASE' | 'SET';

export default function StockAdjustmentModal({
  isOpen,
  onClose,
  product,
  warehouseId,
  onSuccess,
}: StockAdjustmentModalProps) {
  const [formData, setFormData] = useState({
    adjustmentType: 'INCREASE' as AdjustmentType,
    quantity: 0,
    reason: '',
    notes: '',
    warehouseId: warehouseId || null,
  });
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      fetchWarehouses();
      setFormData({
        adjustmentType: 'INCREASE',
        quantity: 0,
        reason: '',
        notes: '',
        warehouseId: warehouseId || null,
      });
      setErrors({});
    }
  }, [isOpen, warehouseId]);

  const fetchWarehouses = async () => {
    try {
      const response = await api.getWarehouses({ isActive: true });
      setWarehouses(response.data || []);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  const handleInputChange = (field: string, value: string | number | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!product) {
      newErrors.product = 'Product is required';
    }

    if (formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }

    if (formData.adjustmentType === 'DECREASE' && formData.quantity <= 0) {
      newErrors.quantity = 'Decrease quantity must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !product) {
      return;
    }

    setLoading(true);
    try {
      await api.adjustStock({
        productId: product.id,
        warehouseId: formData.warehouseId,
        adjustmentType: formData.adjustmentType,
        quantity: formData.quantity,
        reason: formData.reason || undefined,
        notes: formData.notes || undefined,
      });
      toast.success('Stock adjusted successfully');
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error adjusting stock:', error);
      toast.error(error.message || 'Failed to adjust stock');
      setErrors({ submit: error.message || 'Failed to adjust stock' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Adjust Stock</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-4">
            {errors.submit && (
              <div className="mb-4 rounded-md bg-red-50 p-4">
                <div className="flex">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{errors.submit}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {/* Product Info */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                {product.sku && <p className="text-xs text-gray-500">SKU: {product.sku}</p>}
              </div>

              {/* Warehouse Selection */}
              {warehouses.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Warehouse (Optional)
                  </label>
                  <select
                    value={formData.warehouseId || ''}
                    onChange={(e) =>
                      handleInputChange('warehouseId', e.target.value ? parseInt(e.target.value, 10) : null)
                    }
                    className="input-field"
                  >
                    <option value="">Default Warehouse</option>
                    {warehouses.map((warehouse) => (
                      <option key={warehouse.id} value={warehouse.id}>
                        {warehouse.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Adjustment Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adjustment Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['INCREASE', 'DECREASE', 'SET'] as AdjustmentType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleInputChange('adjustmentType', type)}
                      className={`px-4 py-2 text-sm font-medium rounded-md border ${
                        formData.adjustmentType === type
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
                  className={`input-field ${errors.quantity ? 'border-red-500' : ''}`}
                  required
                />
                {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
                <p className="mt-1 text-xs text-gray-500">
                  {formData.adjustmentType === 'INCREASE' && 'Add this quantity to current stock'}
                  {formData.adjustmentType === 'DECREASE' && 'Remove this quantity from current stock'}
                  {formData.adjustmentType === 'SET' && 'Set stock to this exact quantity'}
                </p>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <select
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select a reason</option>
                  <option value="Stock received">Stock received</option>
                  <option value="Stock count">Stock count</option>
                  <option value="Damaged items">Damaged items</option>
                  <option value="Theft/Loss">Theft/Loss</option>
                  <option value="Returned items">Returned items</option>
                  <option value="Expired items">Expired items</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={3}
                  className="input-field"
                  placeholder="Additional notes about this adjustment..."
                />
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Adjusting...' : 'Adjust Stock'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

