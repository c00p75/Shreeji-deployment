import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import AdminReports from '../AdminReports'
import api from '@/app/lib/admin/api'

// Mock the API
jest.mock('@/app/lib/admin/api', () => ({
  __esModule: true,
  default: {
    getOrderAnalytics: jest.fn(),
    getOrders: jest.fn(),
    getCustomers: jest.fn(),
    getPayments: jest.fn(),
    getCoupons: jest.fn(),
    getStockLevelReport: jest.fn(),
  }
}))

// Mock the report components
jest.mock('../reports/ReportFilters', () => {
  return function MockReportFilters(props: any) {
    return <div data-testid="report-filters">Report Filters</div>
  }
})

jest.mock('../reports/ReportSummaryCards', () => {
  return function MockReportSummaryCards(props: any) {
    return <div data-testid="report-summary-cards">Summary Cards</div>
  }
})

jest.mock('../reports/RevenueChart', () => {
  return function MockRevenueChart(props: any) {
    return <div data-testid="revenue-chart">Revenue Chart</div>
  }
})

jest.mock('../reports/OrdersChart', () => {
  return function MockOrdersChart(props: any) {
    return <div data-testid="orders-chart">Orders Chart</div>
  }
})

jest.mock('../reports/ProductPerformanceChart', () => {
  return function MockProductPerformanceChart(props: any) {
    return <div data-testid="product-performance-chart">Product Performance Chart</div>
  }
})

jest.mock('../reports/PaymentMethodChart', () => {
  return function MockPaymentMethodChart(props: any) {
    return <div data-testid="payment-method-chart">Payment Method Chart</div>
  }
})

jest.mock('../reports/CustomerSegmentationChart', () => {
  return function MockCustomerSegmentationChart(props: any) {
    return <div data-testid="customer-segmentation-chart">Customer Segmentation Chart</div>
  }
})

jest.mock('../reports/CouponUsageChart', () => {
  return function MockCouponUsageChart(props: any) {
    return <div data-testid="coupon-usage-chart">Coupon Usage Chart</div>
  }
})

// Mock Layout
jest.mock('../Layout', () => {
  return function MockLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid="layout">{children}</div>
  }
})

// Mock export utilities
jest.mock('@/utils/reportExporter', () => ({
  exportToCSV: jest.fn(),
  exportToPDF: jest.fn()
}))

describe('AdminReports', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    
    // Default mock responses
    ;(api.getOrderAnalytics as jest.Mock).mockResolvedValue({
      data: [
        { period: '2024-01', revenue: 1000, orders: 10, customers: 5, averageOrderValue: 100 }
      ]
    })
    ;(api.getOrders as jest.Mock).mockResolvedValue({
      data: []
    })
    ;(api.getCustomers as jest.Mock).mockResolvedValue({
      data: []
    })
    ;(api.getPayments as jest.Mock).mockResolvedValue({
      data: []
    })
    ;(api.getCoupons as jest.Mock).mockResolvedValue({
      data: []
    })
    ;(api.getStockLevelReport as jest.Mock).mockResolvedValue({
      data: []
    })
  })

  it('renders all report type tabs', () => {
    render(<AdminReports />)
    
    expect(screen.getByText('Sales Reports')).toBeInTheDocument()
    expect(screen.getByText('Product Performance')).toBeInTheDocument()
    expect(screen.getByText('Customer Analytics')).toBeInTheDocument()
    expect(screen.getByText('Payment Reports')).toBeInTheDocument()
    expect(screen.getByText('Coupon Reports')).toBeInTheDocument()
    expect(screen.getByText('Inventory Reports')).toBeInTheDocument()
  })

  it('renders ReportFilters component', () => {
    render(<AdminReports />)
    
    expect(screen.getByTestId('report-filters')).toBeInTheDocument()
  })

  it('fetches sales data on mount', async () => {
    render(<AdminReports />)
    
    await waitFor(() => {
      expect(api.getOrderAnalytics).toHaveBeenCalled()
    })
  })

  it('displays sales report when sales tab is selected', async () => {
    render(<AdminReports />)
    
    await waitFor(() => {
      expect(screen.getByTestId('report-summary-cards')).toBeInTheDocument()
    })
  })

  it('handles empty sales data gracefully', async () => {
    ;(api.getOrderAnalytics as jest.Mock).mockResolvedValue({
      data: []
    })
    
    render(<AdminReports />)
    
    await waitFor(() => {
      expect(screen.getByText(/No sales data available/i)).toBeInTheDocument()
    })
  })

  it('handles API errors gracefully', async () => {
    ;(api.getOrderAnalytics as jest.Mock).mockRejectedValue(new Error('API Error'))
    
    render(<AdminReports />)
    
    await waitFor(() => {
      // Component should still render without crashing
      expect(screen.getByTestId('layout')).toBeInTheDocument()
    })
  })

  it('ensures salesData is always an array', async () => {
    ;(api.getOrderAnalytics as jest.Mock).mockResolvedValue({
      data: null // Non-array response
    })
    
    render(<AdminReports />)
    
    await waitFor(() => {
      // Should not crash, should handle null data
      expect(screen.getByTestId('layout')).toBeInTheDocument()
    })
  })
})

