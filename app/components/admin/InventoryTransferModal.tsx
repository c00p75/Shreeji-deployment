"use client";

import { useState, useEffect } from 'react';
import { XMarkIcon, ExclamationTriangleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
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

interface InventoryTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSuccess: () => void;
}

export default function InventoryTransferModal({
  isOpen,
  onClose,
  product,
  onSuccess,
}: InventoryTransferModalProps) {
  const [formData, setFormData] = useState({
    fromWarehouseId: null as number | null,
    toWarehouseId: null as number | null,
    quantity: 0,
    reason: '',
  });
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      fetchWarehouses();
      setFormData({
        fromWarehouseId: null,
        toWarehouseId: null,
        quantity: 0,
        reason: '',
      });
      setErrors({});
    }
  }, [isOpen]);

  const fetchWarehouses = async () => {
    try {
      const response: any = await api.getWarehouses({ isActive: true });
      setWarehouses(response?.data || []);
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

    if (!formData.fromWarehouseId) {
      newErrors.fromWarehouseId = 'Source warehouse is required';
    }

    if (!formData.toWarehouseId) {
      newErrors.toWarehouseId = 'Destination warehouse is required';
    }

    if (formData.fromWarehouseId === formData.toWarehouseId) {
      newErrors.toWarehouseId = 'Source and destination warehouses must be different';
    }

    if (formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
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
      await api.transferStock({
        productId: product.id,
        fromWarehouseId: formData.fromWarehouseId!,
        toWarehouseId: formData.toWarehouseId!,
        quantity: formData.quantity,
        reason: formData.reason || undefined,
      });
      toast.success('Stock transferred successfully');
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error transferring stock:', error);
      toast.error(error.message || 'Failed to transfer stock');
      setErrors({ submit: error.message || 'Failed to transfer stock' });
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
            <h3 className="text-lg font-semibold text-gray-900">Transfer Stock</h3>
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

              {/* From Warehouse */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Warehouse <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.fromWarehouseId || ''}
                  onChange={(e) =>
                    handleInputChange('fromWarehouseId', e.target.value ? parseInt(e.target.value, 10) : null)
                  }
                  className={`input-field ${errors.fromWarehouseId ? 'border-red-500' : ''}`}
                  required
                >
                  <option value="">Select source warehouse</option>
                  {warehouses.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.name}
                    </option>
                  ))}
                </select>
                {errors.fromWarehouseId && (
                  <p className="mt-1 text-sm text-red-600">{errors.fromWarehouseId}</p>
                )}
              </div>

              {/* Arrow Icon */}
              <div className="flex justify-center">
                <ArrowRightIcon className="h-6 w-6 text-gray-400" />
              </div>

              {/* To Warehouse */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To Warehouse <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.toWarehouseId || ''}
                  onChange={(e) =>
                    handleInputChange('toWarehouseId', e.target.value ? parseInt(e.target.value, 10) : null)
                  }
                  className={`input-field ${errors.toWarehouseId ? 'border-red-500' : ''}`}
                  required
                >
                  <option value="">Select destination warehouse</option>
                  {warehouses
                    .filter((w) => w.id !== formData.fromWarehouseId)
                    .map((warehouse) => (
                      <option key={warehouse.id} value={warehouse.id}>
                        {warehouse.name}
                      </option>
                    ))}
                </select>
                {errors.toWarehouseId && (
                  <p className="mt-1 text-sm text-red-600">{errors.toWarehouseId}</p>
                )}
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
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <input
                  type="text"
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  className="input-field"
                  placeholder="e.g., Stock redistribution, fulfillment needs"
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
                {loading ? 'Transferring...' : 'Transfer Stock'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

