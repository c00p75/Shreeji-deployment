"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import api from '@/app/lib/admin/api';
import Layout from './Layout';
import WarehouseForm from './WarehouseForm';
import InventoryMovementHistory from './InventoryMovementHistory';
import toast from 'react-hot-toast';
import { TableSkeleton } from '@/app/components/ui/Skeletons';

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
  createdAt: string;
  updatedAt: string;
}

export default function WarehouseManagement() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null);
  const [filterActive, setFilterActive] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    fetchWarehouses();
  }, [filterActive]);

  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      setError(null);
      const filters: any = {};
      if (filterActive !== undefined) {
        filters.isActive = filterActive;
      }
      const response = await api.getWarehouses(filters) as { data?: Warehouse[] };
      setWarehouses(response.data || []);
    } catch (err: any) {
      console.error('Error fetching warehouses:', err);
      setError(err.message || 'Failed to load warehouses');
      toast.error('Failed to load warehouses');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingWarehouse(null);
    setIsFormOpen(true);
  };

  const handleEdit = (warehouse: Warehouse) => {
    setEditingWarehouse(warehouse);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this warehouse? This action cannot be undone.')) {
      return;
    }

    try {
      await api.deleteWarehouse(id);
      toast.success('Warehouse deleted successfully');
      fetchWarehouses();
    } catch (err: any) {
      console.error('Error deleting warehouse:', err);
      toast.error(err.message || 'Failed to delete warehouse');
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingWarehouse(null);
  };

  const handleFormSuccess = () => {
    fetchWarehouses();
    handleFormClose();
  };

  if (loading) {
    return (
      <Layout currentPage="Warehouses">
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
          <TableSkeleton rows={5} columns={6} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout currentPage="Warehouses" pageTitle="Warehouse Management">
      <div className="space-y-6">
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <XCircleIcon className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading warehouses</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex items-start flex-col gap-1">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Warehouses</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage warehouse locations and inventory distribution ({warehouses.length} warehouses)
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <select
              className="input-field"
              value={filterActive === undefined ? 'all' : filterActive ? 'active' : 'inactive'}
              onChange={(e) => {
                const value = e.target.value;
                setFilterActive(value === 'all' ? undefined : value === 'active');
              }}
            >
              <option value="all">All Warehouses</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
            <button onClick={handleCreate} className="btn-primary flex items-center w-fit">
              <PlusIcon className="w-5 h-5 mr-2" />
              <span className='w-max'>Add Warehouse</span>
            </button>
          </div>
        </div>

        {/* Warehouses Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {warehouses.map((warehouse) => (
            <div
              key={warehouse.id}
              className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <BuildingOfficeIcon className="h-8 w-8 text-primary-600 mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{warehouse.name}</h3>
                    <div className="mt-2 space-y-1">
                      {warehouse.address && (
                        <div className="flex items-start text-sm text-gray-600">
                          <MapPinIcon className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                          <span>{warehouse.address}</span>
                        </div>
                      )}
                      {(warehouse.city || warehouse.country) && (
                        <p className="text-sm text-gray-600">
                          {[warehouse.city, warehouse.country].filter(Boolean).join(', ')}
                        </p>
                      )}
                      {warehouse.phone && (
                        <p className="text-sm text-gray-600">Phone: {warehouse.phone}</p>
                      )}
                      {warehouse.email && (
                        <p className="text-sm text-gray-600">Email: {warehouse.email}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  {warehouse.isActive ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircleIcon className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-200">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    warehouse.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {warehouse.isActive ? 'Active' : 'Inactive'}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(warehouse)}
                    className="text-primary-600 hover:text-primary-700"
                    title="Edit warehouse"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(warehouse.id)}
                    className="text-red-600 hover:text-red-700"
                    title="Delete warehouse"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {warehouses.length === 0 && !loading && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No warehouses found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new warehouse location.
            </p>
            <div className="mt-6">
              <button onClick={handleCreate} className="btn-primary inline-flex items-center">
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Warehouse
              </button>
            </div>
          </div>
        )}

        <br />

        {/* Movement History */}
        <InventoryMovementHistory />

        {/* Warehouse Form Modal */}
        {isFormOpen && (
          <WarehouseForm
            warehouse={editingWarehouse}
            onClose={handleFormClose}
            onSuccess={handleFormSuccess}
          />
        )}
      </div>
    </Layout>
  );
}

