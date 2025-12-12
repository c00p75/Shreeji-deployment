"use client";

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import api from '@/app/lib/admin/api';
import toast from 'react-hot-toast';

interface Warehouse {
  id: number;
  name: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  isActive: boolean;
}

interface WarehouseFormProps {
  warehouse: Warehouse | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function WarehouseForm({ warehouse, onClose, onSuccess }: WarehouseFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    phone: '',
    email: '',
    isActive: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (warehouse) {
      setFormData({
        name: warehouse.name || '',
        address: warehouse.address || '',
        city: warehouse.city || '',
        country: warehouse.country || '',
        postalCode: warehouse.postalCode || '',
        phone: warehouse.phone || '',
        email: warehouse.email || '',
        isActive: warehouse.isActive,
      });
    }
  }, [warehouse]);

  const handleInputChange = (field: string, value: string | boolean) => {
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

    if (!formData.name.trim()) {
      newErrors.name = 'Warehouse name is required';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      if (warehouse) {
        await api.updateWarehouse(warehouse.id, formData);
        toast.success('Warehouse updated successfully');
      } else {
        await api.createWarehouse(formData);
        toast.success('Warehouse created successfully');
      }
      onSuccess();
    } catch (error: any) {
      console.error('Error saving warehouse:', error);
      toast.error(error.message || 'Failed to save warehouse');
      setErrors({ submit: error.message || 'Failed to save warehouse' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {warehouse ? 'Edit Warehouse' : 'Create Warehouse'}
            </h3>
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
                <p className="text-sm text-red-800">{errors.submit}</p>
              </div>
            )}

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warehouse Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                  required
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="input-field"
                />
              </div>

              {/* City and Country */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Postal Code and Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Active Status */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Active</span>
                </label>
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
                {loading ? 'Saving...' : warehouse ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

