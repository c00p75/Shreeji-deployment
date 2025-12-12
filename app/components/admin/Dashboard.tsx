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
  const [chartPeriod, setChartPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly')
  const [revenueTrend, setRevenueTrend] = useState<{ current: number; previous: number; change: number } | null>(null)
  const [customerMetrics, setCustomerMetrics] = useState<{ newCustomers: number; totalCustomers: number; growth: number } | null>(null)
  const [conversionRate, setConversionRate] = useState<{ rate: number; trend: number } | null>(null)

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch all dashboard data in parallel
      const [statsData, ordersData, productsData, analyticsData, customersData] = await Promise.all([
        api.getDashboardStats(),
        api.getOrders({ pagination: { page: 1, pageSize: 5 }, populate: ['customer'] }),
        api.getProducts({ pagination: { page: 1, pageSize: 5 } }),
        api.getOrderAnalytics().catch(() => null), // Optional analytics
        api.getCustomers({ pagination: { page: 1, pageSize: 100 } }).catch(() => null) // For customer metrics
      ])

      // Calculate revenue trend if analytics available
      if (analyticsData?.data) {
        const currentPeriod = analyticsData.data[analyticsData.data.length - 1]
        const previousPeriod = analyticsData.data[analyticsData.data.length - 2]
        if (currentPeriod && previousPeriod) {
          const currentRevenue = currentPeriod.revenue || 0
          const previousRevenue = previousPeriod.revenue || 0
          const change = previousRevenue > 0 
            ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 
            : 0
          setRevenueTrend({ current: currentRevenue, previous: previousRevenue, change })
        }
      }

      // Calculate customer metrics
      if (customersData?.data) {
        const now = new Date()
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        
        const allCustomers = Array.isArray(customersData.data) ? customersData.data : []
        const newCustomers = allCustomers.filter((customer: any) => {
          const createdAt = new Date(customer.createdAt || customer.created_at)
          return createdAt >= thirtyDaysAgo
        }).length
        
        const totalCustomers = allCustomers.length
        const previousTotal = Math.max(0, totalCustomers - newCustomers)
        const growth = previousTotal > 0 ? ((newCustomers / previousTotal) * 100) : 0
        
        setCustomerMetrics({
          newCustomers,
          totalCustomers,
          growth
        })
      }

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

        // Fetch top-selling products from orders
        let transformedProducts: any[] = []
        try {
          const allOrders = await api.getOrders({ 
            pagination: { page: 1, pageSize: 100 },
            populate: ['items']
          })
          
          // Aggregate product sales from order items
          const productSales: Record<string, { name: string; sold: number; revenue: number; price: number }> = {}
          
          allOrders.data?.forEach((order: any) => {
            if (order.items && Array.isArray(order.items)) {
              order.items.forEach((item: any) => {
                const productId = item.productId || item.product?.id
                const productName = item.productName || item.product?.name || 'Unknown Product'
                const quantity = item.quantity || 0
                const price = item.price || item.unitPrice || 0
                const revenue = quantity * price
                
                if (productId) {
                  if (!productSales[productId]) {
                    productSales[productId] = {
                      name: productName,
                      sold: 0,
                      revenue: 0,
                      price: price
                    }
                  }
                  productSales[productId].sold += quantity
                  productSales[productId].revenue += revenue
                }
              })
            }
          })
          
          // Sort by revenue and take top 5
          const topProductsList = Object.values(productSales)
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 5)
            .map(product => ({
              name: product.name,
              price: `K${product.price.toLocaleString()}`,
              revenue: `K${product.revenue.toLocaleString()}`,
              sold: product.sold
            }))
          
          if (topProductsList.length > 0) {
            setTopProducts(topProductsList)
          } else {
            // Fallback to stock-based data
            transformedProducts = productsData.data?.map((product: any) => ({
              name: product.name,
              price: product.price,
              revenue: `K${((product.stockQuantity || 0) * (product.costPrice || 0)).toLocaleString()}`,
              sold: product.stockQuantity || 0,
              stockStatus: product.stockStatus
            })) || []
            setTopProducts(transformedProducts)
          }
        } catch (error) {
          console.error('Error fetching top products:', error)
          // Fallback to stock-based data
          transformedProducts = productsData.data?.map((product: any) => ({
            name: product.name,
            price: product.price,
            revenue: `K${((product.stockQuantity || 0) * (product.costPrice || 0)).toLocaleString()}`,
            sold: product.stockQuantity || 0,
            stockStatus: product.stockStatus
          })) || []
          setTopProducts(transformedProducts)
        }

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

  useEffect(() => {
    fetchDashboardData()
    
    // Refresh dashboard data every 30 seconds
    const interval = setInterval(() => {
      fetchDashboardData()
    }, 30000)
    
    return () => clearInterval(interval)
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
    <Layout currentPage="Dashboard" pageTitle="Dashboard">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Products"
            value={stats?.totalProducts.toString() || "0"}
          />
          <StatCard
            title="Total Customers"
            value={stats?.totalCustomers.toString() || "0"}
            subtitle={customerMetrics ? `${customerMetrics.newCustomers} new (30d)` : undefined}
          />
          <StatCard
            title="Total Orders"
            value={stats?.totalOrders.toString() || "0"}
          />
          <StatCard
            title="Total Revenue"
            value={`K${stats?.totalRevenue.toLocaleString() || "0"}`}
            subtitle={revenueTrend ? `Trend: ${revenueTrend.change >= 0 ? '+' : ''}${revenueTrend.change.toFixed(1)}%` : undefined}
          />
        </div>

        {/* Additional Metrics */}
        {conversionRate && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {conversionRate.rate.toFixed(2)}%
                  </p>
                  {conversionRate.trend !== 0 && (
                    <p className={`text-sm mt-1 ${conversionRate.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {conversionRate.trend >= 0 ? '↑' : '↓'} {Math.abs(conversionRate.trend).toFixed(1)}% vs previous period
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

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
          <div className="card p-6 pb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Sales Statistics</h3>
                {revenueTrend && (
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-500">Revenue Trend: </span>
                    <span className={`text-sm font-medium ml-1 ${revenueTrend.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {revenueTrend.change >= 0 ? '↑' : '↓'} {Math.abs(revenueTrend.change).toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setChartPeriod('daily')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    chartPeriod === 'daily' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Daily
                </button>
                <button 
                  onClick={() => setChartPeriod('weekly')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    chartPeriod === 'weekly' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Weekly
                </button>
                <button 
                  onClick={() => setChartPeriod('monthly')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    chartPeriod === 'monthly' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>
            <SalesChart period={chartPeriod} />
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
