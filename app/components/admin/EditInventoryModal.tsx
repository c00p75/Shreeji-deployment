"use client";

import { useState, useEffect } from 'react';
import { XMarkIcon, ExclamationTriangleIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import api from '@/app/lib/admin/api';
import toast from 'react-hot-toast';

interface Product {
  id: number;
  documentId?: string;
  name: string;
  brand?: string | null;
  category?: string | null;
  SKU?: string | null;
  stockQuantity: number;
  minStockLevel: number;
  maxStockLevel: number;
  stockStatus: string;
  basePrice: number;
  weight: number;
  images?: Array<{ url: string; alt: string; isMain?: boolean }>;
}

interface EditInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: () => void;
  warehouseId?: number | null;
  warehouses?: Array<{ id: number; name: string }>;
  onTransfer?: (product: Product) => void;
}

export default function EditInventoryModal({
  isOpen,
  onClose,
  product,
  onSave,
  warehouseId,
  warehouses = [],
  onTransfer,
}: EditInventoryModalProps) {
  const [formData, setFormData] = useState({
    stockQuantity: 0,
    minStockLevel: 0,
    maxStockLevel: 0,
    stockStatus: 'in-stock',
    basePrice: 0,
    weight: 0,
    adjustmentType: 'INCREASE' as 'INCREASE' | 'DECREASE' | 'SET',
    adjustQuantity: 0,
    adjustNotes: '',
    adjustWarehouseId: null as number | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product && isOpen) {
      // Preselect warehouse: use provided warehouseId, or find "Shreeji House", or null
      let defaultWarehouseId = warehouseId ?? null;
      if (!defaultWarehouseId && warehouses.length > 0) {
        const shreejiHouse = warehouses.find(wh => 
          wh.name.toLowerCase().includes('shreeji house')
        );
        if (shreejiHouse) {
          defaultWarehouseId = shreejiHouse.id;
        }
      }

      setFormData({
        stockQuantity: product.stockQuantity || 0,
        minStockLevel: product.minStockLevel || 0,
        maxStockLevel: product.maxStockLevel || 0,
        stockStatus: product.stockStatus && product.stockStatus.trim() ? product.stockStatus : 'in-stock',
        basePrice: product.basePrice || 0,
        weight: product.weight || 0,
        adjustmentType: 'INCREASE',
        adjustQuantity: 0,
        adjustNotes: '',
        adjustWarehouseId: defaultWarehouseId,
      });
      setErrors({});
    }
  }, [product, isOpen, warehouseId, warehouses]);

  const handleInputChange = (field: string, value: string | number | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleIncrement = (field: string, step: number = 1) => {
    const currentValue = formData[field as keyof typeof formData] as number;
    const newValue = currentValue + step;
    handleInputChange(field, Math.max(0, newValue));
  };

  const handleDecrement = (field: string, step: number = 1) => {
    const currentValue = formData[field as keyof typeof formData] as number;
    const newValue = currentValue - step;
    handleInputChange(field, Math.max(0, newValue));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.stockQuantity < 0) {
      newErrors.stockQuantity = 'Stock quantity cannot be negative';
    }

    if (formData.minStockLevel < 0) {
      newErrors.minStockLevel = 'Min stock level cannot be negative';
    }

    if (formData.maxStockLevel < 0) {
      newErrors.maxStockLevel = 'Max stock level cannot be negative';
    }

    if (formData.minStockLevel >= formData.maxStockLevel && formData.maxStockLevel > 0) {
      newErrors.minStockLevel = 'Min stock level must be less than max stock level';
    }

    if (formData.basePrice < 0) {
      newErrors.basePrice = 'Base price cannot be negative';
    }

    if (formData.weight < 0) {
      newErrors.weight = 'Weight cannot be negative';
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
      // Calculate stock status if not explicitly set
      let calculatedStockStatus = formData.stockStatus;
      if (formData.stockQuantity === 0) {
        calculatedStockStatus = 'out-of-stock';
      } else if (formData.stockQuantity <= formData.minStockLevel) {
        calculatedStockStatus = 'low-stock';
      } else if (calculatedStockStatus === 'out-of-stock' && formData.stockQuantity > 0) {
        calculatedStockStatus = 'in-stock';
      }

      // Update product inventory fields
      // Note: stockStatus is calculated automatically by backend based on stockQuantity and minStockLevel
      const updatePayload = {
        stockQuantity: Number(formData.stockQuantity) || 0,
        minStockLevel: Number(formData.minStockLevel) || 0,
        maxStockLevel: Number(formData.maxStockLevel) || 0,
        basePrice: Number(formData.basePrice) || 0,
        weight: Number(formData.weight) || 0,
      };
      
      console.log('[EditInventoryModal] Sending update payload:', updatePayload);
      
      await api.updateProduct(product.id, updatePayload);

      // If adjustment fields are filled, also perform stock adjustment
      if (formData.adjustQuantity > 0 && formData.adjustWarehouseId) {
        try {
          await api.adjustStock({
            productId: product.id,
            warehouseId: formData.adjustWarehouseId,
            adjustmentType: formData.adjustmentType,
            quantity: formData.adjustQuantity,
            notes: formData.adjustNotes || undefined,
          });
          toast.success('Inventory updated and stock adjusted successfully');
        } catch (adjustError: any) {
          // If adjustment fails, still show success for inventory update
          console.error('Error adjusting stock:', adjustError);
          toast.error(`Inventory updated but stock adjustment failed: ${adjustError.message || 'Unknown error'}`);
        }
      } else {
        toast.success('Inventory updated successfully');
      }

      onSave();
      onClose();
    } catch (error: any) {
      console.error('Error updating inventory:', error);
      toast.error(error.message || 'Failed to update inventory. Please try again.');
      setErrors({
        submit: error.message || 'Failed to update inventory. Please try again.',
      });
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
        <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100 w-full sm:max-w-7xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 tracking-tight">Adjust Inventory</h3>
              <p className="mt-1 text-sm text-gray-500">
                {product.name}{' '}
                {product.SKU && (
                  <span className="text-gray-400">· {product.SKU}</span>
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white transition"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-5">
            {errors.submit && (
              <div className="mb-4 rounded-md bg-red-50 p-4">
                <div className="flex">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{errors.submit}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Product Image */}
              <div className="lg:sticky lg:top-6 lg:self-start">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  {product.images && product.images.length > 0 ? (
                    <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={product.images[0].url}
                        alt={product.images[0].alt || product.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            'https://via.placeholder.com/400x400?text=No+Image';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">No image available</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              
              {/* Stock Adjustment */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Stock Adjustment</h3>
                    <p className="text-xs text-gray-500">Adjust quantity and record a reason.</p>
                  </div>
                  {onTransfer && (
                    <button
                      type="button"
                      className="text-sm text-purple-600 hover:text-purple-700"
                      onClick={() => onTransfer(product)}
                    >
                      Transfer Stock
                    </button>
                  )}
                </div>

                {/* Adjustment Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adjustment Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['INCREASE', 'DECREASE', 'SET'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleInputChange('adjustmentType', type)}
                        className={`px-4 py-2 text-sm font-medium rounded-md border transition ${
                          formData.adjustmentType === type
                            ? 'bg-primary-600 text-white border-primary-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {type === 'INCREASE' ? 'Increase' : type === 'DECREASE' ? 'Decrease' : 'Set Exact'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Adjustment Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adjustment Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.adjustQuantity}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      handleInputChange('adjustQuantity', value);
                      if (errors.adjustQuantity) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.adjustQuantity;
                          return next;
                        });
                      }
                    }}
                    className="input-field"
                  />
                  {errors.adjustQuantity && (
                    <p className="mt-1 text-sm text-red-600">{errors.adjustQuantity}</p>
                  )}
                </div>
                  
                  {/* Right: Form fields */}
              <div className="space-y-8">
              {/* Stock Status - First Field */}
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Status
                </span>
                <div className="inline-flex flex-wrap gap-2 rounded-full bg-gray-50 p-1">
                  {[
                    { value: 'in-stock', label: 'In Stock' },
                    { value: 'low-stock', label: 'Low Stock' },
                    { value: 'out-of-stock', label: 'Out of Stock' },
                    { value: 'discontinued', label: 'Discontinued' },
                  ].map((option) => {
                    const isActive = formData.stockStatus === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleInputChange('stockStatus', option.value)}
                        className={`relative px-4 py-1.5 text-sm font-medium rounded-full border transition-colors ${
                          isActive
                            ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Status will auto-update based on stock quantity if not manually set
                </p>
              </div>

              {/* Stock levels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Stock Quantity */}
                <div>
                <label
                  htmlFor="stockQuantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDecrement('stockQuantity', 1)}
                    className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 flex items-center justify-center transition-colors"
                  >
                    <MinusIcon className="h-5 w-5 text-gray-600" />
                  </button>
                  <input
                    type="number"
                    id="stockQuantity"
                    name="stockQuantity"
                    min="0"
                    value={formData.stockQuantity}
                    onChange={(e) =>
                      handleInputChange('stockQuantity', parseInt(e.target.value) || 0)
                    }
                    className={`flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-center ${
                      errors.stockQuantity ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleIncrement('stockQuantity', 1)}
                    className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 flex items-center justify-center transition-colors"
                  >
                    <PlusIcon className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                {errors.stockQuantity && (
                  <p className="mt-1 text-sm text-red-600">{errors.stockQuantity}</p>
                )}
              </div>

              {/* Min Stock Level */}
              <div>
                <label
                  htmlFor="minStockLevel"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Minimum Stock Level
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDecrement('minStockLevel', 1)}
                    className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 flex items-center justify-center transition-colors"
                  >
                    <MinusIcon className="h-5 w-5 text-gray-600" />
                  </button>
                  <input
                    type="number"
                    id="minStockLevel"
                    name="minStockLevel"
                    min="0"
                    value={formData.minStockLevel}
                    onChange={(e) =>
                      handleInputChange('minStockLevel', parseInt(e.target.value) || 0)
                    }
                    className={`flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-center ${
                      errors.minStockLevel ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => handleIncrement('minStockLevel', 1)}
                    className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 flex items-center justify-center transition-colors"
                  >
                    <PlusIcon className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                {errors.minStockLevel && (
                  <p className="mt-1 text-sm text-red-600">{errors.minStockLevel}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Alert when stock falls below this level
                </p>
              </div>

              {/* Max Stock Level */}
              <div>
                <label
                  htmlFor="maxStockLevel"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Maximum Stock Level
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDecrement('maxStockLevel', 1)}
                    className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 flex items-center justify-center transition-colors"
                  >
                    <MinusIcon className="h-5 w-5 text-gray-600" />
                  </button>
                  <input
                    type="number"
                    id="maxStockLevel"
                    name="maxStockLevel"
                    min="0"
                    value={formData.maxStockLevel}
                    onChange={(e) =>
                      handleInputChange('maxStockLevel', parseInt(e.target.value) || 0)
                    }
                    className={`flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-center ${
                      errors.maxStockLevel ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => handleIncrement('maxStockLevel', 1)}
                    className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 flex items-center justify-center transition-colors"
                  >
                    <PlusIcon className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                {errors.maxStockLevel && (
                  <p className="mt-1 text-sm text-red-600">{errors.maxStockLevel}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Maximum capacity for this product
                </p>
              </div>
              </div>

              {/* Cost & weight */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Base Price */}
              <div>
                <label
                  htmlFor="basePrice"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Base Price (K)
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDecrement('basePrice', 1)}
                    className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 flex items-center justify-center transition-colors"
                  >
                    <MinusIcon className="h-5 w-5 text-gray-600" />
                  </button>
                  <input
                    type="number"
                    id="basePrice"
                    name="basePrice"
                    min="0"
                    step="0.01"
                    value={formData.basePrice}
                    onChange={(e) =>
                      handleInputChange('basePrice', parseFloat(e.target.value) || 0)
                    }
                    className={`flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-center ${
                      errors.basePrice ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => handleIncrement('basePrice', 1)}
                    className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 flex items-center justify-center transition-colors"
                  >
                    <PlusIcon className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                {errors.basePrice && (
                  <p className="mt-1 text-sm text-red-600">{errors.basePrice}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Base price per unit for inventory valuation
                </p>
              </div>

              {/* Weight */}
              <div>
                <label
                  htmlFor="weight"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Weight (kg)
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDecrement('weight', 0.1)}
                    className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 flex items-center justify-center transition-colors"
                  >
                    <MinusIcon className="h-5 w-5 text-gray-600" />
                  </button>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    min="0"
                    step="0.01"
                    value={formData.weight}
                    onChange={(e) =>
                      handleInputChange('weight', parseFloat(e.target.value) || 0)
                    }
                    className={`flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-center ${
                      errors.weight ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => handleIncrement('weight', 0.1)}
                    className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 flex items-center justify-center transition-colors"
                  >
                    <PlusIcon className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                {errors.weight && (
                  <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
                )}
              </div>
              </div>

                {/* Warehouse Selection */}
                {warehouses.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Warehouse
                    </label>
                    <select
                      value={formData.adjustWarehouseId || ''}
                      onChange={(e) =>
                        handleInputChange('adjustWarehouseId', e.target.value ? parseInt(e.target.value, 10) : null)
                      }
                      className="input-field"
                    >
                      {warehouses.map((wh) => (
                        <option key={wh.id} value={wh.id}>
                          {wh.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    className="input-field"
                    rows={3}
                    value={formData.adjustNotes}
                    onChange={(e) => handleInputChange('adjustNotes', e.target.value)}
                    placeholder="Optional notes for this adjustment"
                  />
                </div>

              </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 flex items-center justify-end gap-3 border-t border-gray-100 pt-6 bg-white/60">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

