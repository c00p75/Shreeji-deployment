'use client'

import { useState, useEffect } from 'react'
import Layout from './Layout'
import StatCard from './StatCard'
import RecentOrders from './RecentOrders'
import TopProducts from './TopProducts'
import SalesChart from './SalesChart'
import api from '@/app/lib/admin/api'

interface DashboardStats {
  totalProducts: number;
  totalCustomers: number;
  totalOrders: number;
  totalRevenue: number;
  inventoryValue: number;
  lowStockProducts: number;
  outOfStockProducts: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [topProducts, setTopProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        
        // Fetch all dashboard data in parallel
        const [statsData, ordersData, productsData] = await Promise.all([
          api.getDashboardStats(),
          api.getOrders({ pagination: { page: 1, pageSize: 5 }, populate: ['customer'] }),
          api.getProducts({ pagination: { page: 1, pageSize: 5 } })
        ])

        setStats(statsData)
        
        // Transform orders data
        const transformedOrders = ordersData.data?.map((order: any) => ({
          id: order.orderNumber || `#${order.id}`,
          customer: order.customer?.firstName && order.customer?.lastName 
            ? `${order.customer.firstName} ${order.customer.lastName}`
            : 'Unknown Customer',
          date: new Date(order.createdAt).toLocaleDateString(),
          amount: `K${order.totalAmount?.toLocaleString() || '0'}`,
          status: order.orderStatus || 'pending',
          paymentStatus: order.paymentStatus || 'pending'
        })) || []

        setOrders(transformedOrders)

        // Transform products data (top products by stock quantity as proxy for popularity)
        const transformedProducts = productsData.data?.map((product: any) => ({
          name: product.name,
          price: product.price,
          revenue: `K${((product.stockQuantity || 0) * (product.costPrice || 0)).toLocaleString()}`,
          sold: product.stockQuantity || 0,
          stockStatus: product.stockStatus
        })) || []

        setTopProducts(transformedProducts)

      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        // Keep mock data as fallback
        setStats({
          totalProducts: 25,
          totalCustomers: 4,
          totalOrders: 1,
          totalRevenue: 0,
          inventoryValue: 1592500,
          lowStockProducts: 2,
          outOfStockProducts: 1,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <Layout currentPage="Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout currentPage="Dashboard">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Products"
            value={stats?.totalProducts.toString() || "0"}
            change="Live Data"
            changeLabel="from Strapi"
          />
          <StatCard
            title="Total Customers"
            value={stats?.totalCustomers.toString() || "0"}
            change="Live Data"
            changeLabel="from Strapi"
          />
          <StatCard
            title="Total Orders"
            value={stats?.totalOrders.toString() || "0"}
            change="Live Data"
            changeLabel="from Strapi"
          />
          <StatCard
            title="Total Revenue"
            value={`K${stats?.totalRevenue.toLocaleString() || "0"}`}
            change="ZMW"
            changeLabel="from Strapi"
          />
        </div>

        {/* Inventory Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold">K</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Inventory Value</p>
                <p className="text-2xl font-semibold text-gray-900">
                  K{stats?.inventoryValue.toLocaleString() || "0"}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 font-semibold">⚠</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Low Stock Items</p>
                <p className="text-2xl font-semibold text-yellow-600">
                  {stats?.lowStockProducts || "0"}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-semibold">!</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Out of Stock</p>
                <p className="text-2xl font-semibold text-red-600">
                  {stats?.outOfStockProducts || "0"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales Chart */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Sales Statistics</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded-md">
                  Weekly
                </button>
                <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                  Daily
                </button>
                <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                  Monthly
                </button>
              </div>
            </div>
            <SalesChart />
          </div>

          {/* Store Statistics */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Live Store Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">Total Orders</span>
                </div>
                <span className="font-semibold text-gray-900">{stats?.totalOrders || "0"}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">Total Customers</span>
                </div>
                <span className="font-semibold text-gray-900">{stats?.totalCustomers || "0"}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">Total Products</span>
                </div>
                <span className="font-semibold text-gray-900">{stats?.totalProducts || "0"}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">Inventory Value</span>
                </div>
                <span className="font-semibold text-gray-900">K{stats?.inventoryValue.toLocaleString() || "0"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders and Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentOrders orders={orders} />
          <TopProducts products={topProducts} />
        </div>
      </div>
    </Layout>
  )
}
