"use client";

import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, PlusIcon, EyeIcon, PencilIcon, TrashIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import Layout from './Layout'
import api from '@/app/lib/admin/api'
import { currencyFormatter } from '@/app/components/checkout/currency-formatter'

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-yellow-100 text-yellow-800',
  blocked: 'bg-red-100 text-red-800'
};

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await api.getCustomers({ 
        pagination: { page: 1, pageSize: 100 }
      });
      
      // Transform API response to match component format
      const transformedCustomers = (response.data || []).map((customer: any) => ({
        id: `CUST-${String(customer.id).padStart(3, '0')}`,
        name: `${customer.firstName} ${customer.lastName}`,
        email: customer.email,
        phone: customer.phone || 'N/A',
        status: customer.isActive ? 'active' : 'inactive',
        totalOrders: customer.totalOrders || 0,
        totalSpent: customer.totalSpent || 0,
        lastOrder: customer.lastOrderDate 
          ? new Date(customer.lastOrderDate).toISOString().split('T')[0] 
          : 'N/A',
        registrationDate: customer.createdAt 
          ? new Date(customer.createdAt).toISOString().split('T')[0] 
          : new Date().toISOString().split('T')[0],
        location: customer.addresses?.[0] 
          ? `${customer.addresses[0].city || ''}, ${customer.addresses[0].province || ''}`.trim() || 'N/A'
          : 'N/A',
        rawCustomer: customer // Keep raw customer for details view
      }));
      
      setCustomers(transformedCustomers);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomers(prev =>
      prev.includes(customerId)
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const handleSelectAll = () => {
    setSelectedCustomers(
      selectedCustomers.length === filteredCustomers.length
        ? []
        : filteredCustomers.map(customer => customer.id)
    );
  };

  if (loading) {
    return (
      <Layout currentPage="Customers">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout currentPage="Customers" pageTitle="Customer Management">
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Customer
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">T</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Customers</dt>
                  <dd className="text-lg font-medium text-gray-900">{customers.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active</dt>
                  <dd className="text-lg font-medium text-gray-900">{customers.filter(c => c.status === 'active').length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">I</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Inactive</dt>
                  <dd className="text-lg font-medium text-gray-900">{customers.filter(c => c.status === 'inactive').length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">R</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                  <dd className="text-lg font-medium text-gray-900">{currencyFormatter(Number(customers.reduce((sum, customer) => sum + (customer.totalSpent || 0), 0)))}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white shadow-sm rounded-lg p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="search"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border-0 bg-gray-100 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
              />
            </div>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  <FunnelIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  Filter
                </Menu.Button>
              </div>
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a href="#" className={clsx(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
                          Status
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a href="#" className={clsx(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
                          Registration Date
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a href="#" className={clsx(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
                          Location
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode('table')}
                className={clsx(
                  'px-3 py-2 text-sm font-medium',
                  viewMode === 'table'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                )}
              >
                Table
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={clsx(
                  'px-3 py-2 text-sm font-medium border-l border-gray-300',
                  viewMode === 'grid'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                )}
              >
                Grid
              </button>
            </div>

            {selectedCustomers.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{selectedCustomers.length} selected</span>
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  Bulk Actions
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customers Display */}
      {viewMode === 'table' ? (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
                    <input
                      type="checkbox"
                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 sm:left-6"
                      checked={selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Order
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className={clsx(selectedCustomers.includes(customer.id) && 'bg-gray-50')}>
                    <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                      {selectedCustomers.includes(customer.id) && (
                        <div className="absolute inset-y-0 left-0 w-0.5 bg-primary-600" />
                      )}
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 sm:left-6"
                        checked={selectedCustomers.includes(customer.id)}
                        onChange={() => handleSelectCustomer(customer.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {customer.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{customer.email}</div>
                      <div className="text-sm text-gray-500">{customer.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={clsx('inline-flex px-2 py-1 text-xs font-semibold rounded-full', statusColors[customer.status])}>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.totalOrders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {currencyFormatter(Number(customer.totalSpent || 0))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.lastOrder !== 'N/A' ? new Date(customer.lastOrder).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-primary-600 hover:text-primary-900">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-primary-500 flex items-center justify-center">
                      <span className="text-lg font-medium text-white">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{customer.name}</h3>
                    <p className="text-sm text-gray-500">{customer.id}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <EnvelopeIcon className="h-4 w-4 mr-2" />
                    {customer.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <PhoneIcon className="h-4 w-4 mr-2" />
                    {customer.phone}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={clsx('inline-flex px-2 py-1 text-xs font-semibold rounded-full', statusColors[customer.status])}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-gray-500">Orders:</span>
                    <span className="ml-1 font-medium text-gray-900">{customer.totalOrders}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Spent:</span>
                    <span className="ml-1 font-medium text-gray-900">K{customer.totalSpent.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No customers found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding a new customer.</p>
        </div>
      )}
    </div>
    </Layout>
  );
}
