'use client'

import { useState, useEffect } from 'react'
import Layout from './Layout'
import api from '@/app/lib/admin/api'
import { currencyFormatter } from '@/app/components/checkout/currency-formatter'
import { 
  DocumentArrowDownIcon,
  CalendarIcon,
  ChartBarIcon,
  UserGroupIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline'

interface ReportData {
  period: string
  revenue: number
  orders: number
  customers: number
  averageOrderValue: number
}

export default function AdminReports() {
  const [reportType, setReportType] = useState<'sales' | 'products' | 'customers'>('sales')
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly')
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  })
  const [loading, setLoading] = useState(false)
  const [salesData, setSalesData] = useState<ReportData[]>([])
  const [productData, setProductData] = useState<any[]>([])
  const [customerData, setCustomerData] = useState<any[]>([])

  useEffect(() => {
    fetchReportData()
  }, [reportType, period, dateRange])

  const fetchReportData = async () => {
    setLoading(true)
    try {
      if (reportType === 'sales') {
        const analytics = await api.getOrderAnalytics({
          startDate: new Date(dateRange.start).toISOString(),
          endDate: new Date(dateRange.end).toISOString()
        })
        // Transform analytics data
        const transformed = analytics?.data || []
        setSalesData(transformed)
      } else if (reportType === 'products') {
        // Fetch orders to calculate product performance
        const orders = await api.getOrders({ 
          pagination: { page: 1, pageSize: 500 },
          populate: ['items']
        })
        
        // Aggregate product performance
        const productPerformance: Record<string, any> = {}
        orders.data?.forEach((order: any) => {
          if (order.items && Array.isArray(order.items)) {
            order.items.forEach((item: any) => {
              const productId = item.productId || item.product?.id
              const productName = item.productName || item.product?.name || 'Unknown'
              
              if (productId) {
                if (!productPerformance[productId]) {
                  productPerformance[productId] = {
                    name: productName,
                    sold: 0,
                    revenue: 0,
                    orders: new Set(),
                    avgPrice: 0
                  }
                }
                productPerformance[productId].sold += item.quantity || 0
                productPerformance[productId].revenue += (item.quantity || 0) * (item.price || item.unitPrice || 0)
                productPerformance[productId].orders.add(order.id)
                productPerformance[productId].avgPrice = item.price || item.unitPrice || 0
              }
            })
          }
        })
        
        const products = Object.values(productPerformance).map((p: any) => ({
          name: p.name,
          sold: p.sold,
          revenue: p.revenue,
          orderCount: p.orders.size,
          avgPrice: p.avgPrice
        }))
        setProductData(products.sort((a, b) => b.revenue - a.revenue))
      } else if (reportType === 'customers') {
        const customers = await api.getCustomers({ pagination: { page: 1, pageSize: 500 } })
        const orders = await api.getOrders({ 
          pagination: { page: 1, pageSize: 500 },
          populate: ['customer']
        })
        
        // Calculate customer lifetime value
        const customerLTV: Record<string, any> = {}
        orders.data?.forEach((order: any) => {
          const customerId = order.customer?.id || order.customerId
          if (customerId) {
            if (!customerLTV[customerId]) {
              customerLTV[customerId] = {
                name: order.customer?.firstName && order.customer?.lastName
                  ? `${order.customer.firstName} ${order.customer.lastName}`
                  : order.customer?.email || 'Unknown',
                email: order.customer?.email || '',
                totalSpent: 0,
                orderCount: 0,
                avgOrderValue: 0,
                firstOrder: order.createdAt,
                lastOrder: order.createdAt
              }
            }
            customerLTV[customerId].totalSpent += order.totalAmount || 0
            customerLTV[customerId].orderCount += 1
            if (new Date(order.createdAt) < new Date(customerLTV[customerId].firstOrder)) {
              customerLTV[customerId].firstOrder = order.createdAt
            }
            if (new Date(order.createdAt) > new Date(customerLTV[customerId].lastOrder)) {
              customerLTV[customerId].lastOrder = order.createdAt
            }
          }
        })
        
        const customersData = Object.values(customerLTV).map((c: any) => ({
          ...c,
          avgOrderValue: c.orderCount > 0 ? c.totalSpent / c.orderCount : 0
        })).sort((a, b) => b.totalSpent - a.totalSpent)
        
        setCustomerData(customersData)
      }
    } catch (error) {
      console.error('Error fetching report data:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportReport = async (format: 'csv' | 'pdf') => {
    // TODO: Implement export functionality
    alert(`Export ${reportType} report as ${format.toUpperCase()} - Feature coming soon!`)
  }

  const totalRevenue = salesData.reduce((sum, item) => sum + (item.revenue || 0), 0)
  const totalOrders = salesData.reduce((sum, item) => sum + (item.orders || 0), 0)
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  return (
    <Layout currentPage="Reports" pageTitle="Reports">
      <div className="space-y-6">
        {/* Report Type Tabs */}
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setReportType('sales')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              reportType === 'sales'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <ChartBarIcon className="w-5 h-5 inline-block mr-2" />
            Sales Reports
          </button>
          <button
            onClick={() => setReportType('products')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              reportType === 'products'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <ShoppingBagIcon className="w-5 h-5 inline-block mr-2" />
            Product Performance
          </button>
          <button
            onClick={() => setReportType('customers')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              reportType === 'customers'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <UserGroupIcon className="w-5 h-5 inline-block mr-2" />
            Customer Reports
          </button>
        </div>

        {/* Filters */}
        <div className="card p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date From
              </label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date To
              </label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Period
              </label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value as 'daily' | 'weekly' | 'monthly')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="flex items-end">
              <div className="flex space-x-2">
                <button
                  onClick={() => exportReport('csv')}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center justify-center"
                >
                  <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
                  Export CSV
                </button>
                <button
                  onClick={() => exportReport('pdf')}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center justify-center"
                >
                  <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
                  Export PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        {reportType === 'sales' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card p-6">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                K{totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="card p-6">
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {totalOrders}
              </p>
            </div>
            <div className="card p-6">
              <p className="text-sm font-medium text-gray-500">Avg Order Value</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {currencyFormatter(Number(avgOrderValue || 0))}
              </p>
            </div>
            <div className="card p-6">
              <p className="text-sm font-medium text-gray-500">Periods</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {salesData.length}
              </p>
            </div>
          </div>
        )}

        {/* Report Data Table */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {reportType === 'sales' && 'Sales Report'}
            {reportType === 'products' && 'Product Performance Report'}
            {reportType === 'customers' && 'Customer Lifetime Value Report'}
          </h3>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {reportType === 'sales' && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="table-header">Period</th>
                      <th className="table-header">Revenue</th>
                      <th className="table-header">Orders</th>
                      <th className="table-header">Customers</th>
                      <th className="table-header">Avg Order Value</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {salesData.length > 0 ? (
                      salesData.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="table-cell">{row.period || `Period ${index + 1}`}</td>
                          <td className="table-cell">{currencyFormatter(Number(row.revenue || 0))}</td>
                          <td className="table-cell">{row.orders || 0}</td>
                          <td className="table-cell">{row.customers || 0}</td>
                          <td className="table-cell">
                            {currencyFormatter(Number(row.averageOrderValue || 0))}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="table-cell text-center text-gray-500 py-8">
                          No sales data available for the selected period
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {reportType === 'products' && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="table-header">Product Name</th>
                      <th className="table-header">Units Sold</th>
                      <th className="table-header">Revenue</th>
                      <th className="table-header">Orders</th>
                      <th className="table-header">Avg Price</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {productData.length > 0 ? (
                      productData.map((product, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="table-cell font-medium">{product.name}</td>
                          <td className="table-cell">{product.sold}</td>
                          <td className="table-cell">{currencyFormatter(Number(product.revenue || 0))}</td>
                          <td className="table-cell">{product.orderCount}</td>
                          <td className="table-cell">{currencyFormatter(Number(product.avgPrice || 0))}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="table-cell text-center text-gray-500 py-8">
                          No product performance data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {reportType === 'customers' && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="table-header">Customer</th>
                      <th className="table-header">Email</th>
                      <th className="table-header">Total Spent</th>
                      <th className="table-header">Orders</th>
                      <th className="table-header">Avg Order Value</th>
                      <th className="table-header">Last Order</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {customerData.length > 0 ? (
                      customerData.map((customer, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="table-cell font-medium">{customer.name}</td>
                          <td className="table-cell">{customer.email}</td>
                          <td className="table-cell">{currencyFormatter(Number(customer.totalSpent || 0))}</td>
                          <td className="table-cell">{customer.orderCount}</td>
                          <td className="table-cell">{currencyFormatter(Number(customer.avgOrderValue || 0))}</td>
                          <td className="table-cell">
                            {new Date(customer.lastOrder).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="table-cell text-center text-gray-500 py-8">
                          No customer data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

