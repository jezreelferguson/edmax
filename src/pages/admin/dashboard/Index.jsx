import React, { useEffect, useState, useMemo, useCallback } from 'react'
import AdminLayout from '../../../components/AdminLayout'
import Swal from 'sweetalert2'
import api from '../../../api/api'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)
function Index() {
  const [stats, setStats] = useState([
    { title: 'Total Orders', value: '0', icon: 'bi-cart-check', color: 'primary', numericValue: 0 },
    { title: 'Revenue', value: 'GH₵0', icon: 'bi-currency-dollar', color: 'success', numericValue: 0 },
    { title: 'Products', value: '0', icon: 'bi-box-seam', color: 'info', numericValue: 0 },
    { title: 'Customers', value: '0', icon: 'bi-people', color: 'warning', numericValue: 0 }
  ])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch dashboard statistics from API
  const fetchDashboardStats = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      // Fetch products count
      const productsResponse = await api.get('/product')
      const productsCount = Array.isArray(productsResponse.data) ? productsResponse.data.length : 0

      // Fetch cart items (representing orders/transactions)
      const cartResponse = await api.get('/cart')
      const cartData = Array.isArray(cartResponse.data?.data) ? cartResponse.data.data : (Array.isArray(cartResponse.data) ? cartResponse.data : [])
      
      // Calculate total orders (unique cart sessions or transactions)
      // For now, we'll use cart items as a proxy for orders
      const totalOrders = cartData.length

      // Calculate total revenue from cart items
      const totalRevenue = cartData.reduce((sum, item) => {
        const quantity = Number(item.quantity ?? item.qty ?? 1)
        const price = Number(item.price ?? item.product?.price ?? item.product_price ?? 0)
        return sum + (price * quantity)
      }, 0)

      // For customers, we'll estimate based on unique emails in cart or use a default
      // In a real app, you'd have a separate customers endpoint
      const uniqueCustomers = new Set(cartData.map(item => item.customer_email || item.email).filter(Boolean)).size
      const customersCount = uniqueCustomers || Math.floor(totalOrders * 0.8) // Estimate if no customer data

      // Update stats with real data
      setStats([
        { 
          title: 'Total Orders', 
          value: totalOrders.toLocaleString(), 
          icon: 'bi-cart-check', 
          color: 'primary', 
          numericValue: totalOrders 
        },
        { 
          title: 'Revenue', 
          value: `GH₵${totalRevenue.toLocaleString()}`, 
          icon: 'bi-currency-dollar', 
          color: 'success', 
          numericValue: totalRevenue 
        },
        { 
          title: 'Products', 
          value: productsCount.toLocaleString(), 
          icon: 'bi-box-seam', 
          color: 'info', 
          numericValue: productsCount 
        },
        { 
          title: 'Customers', 
          value: customersCount.toLocaleString(), 
          icon: 'bi-people', 
          color: 'warning', 
          numericValue: customersCount 
        }
      ])

    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err)
      setError('Failed to load dashboard statistics')
      // Keep default values on error
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Show info message
    const timer = setTimeout(() => {
      Swal.fire('Info', 'Make sure you logout before leaving this page', 'info')
    }, 1000)

    // Fetch dashboard data
    fetchDashboardStats()

    // Cleanup timer on unmount
    return () => clearTimeout(timer)
  }, [fetchDashboardStats])

  // Memoized Chart data for Bar Chart
  const barChartData = useMemo(() => ({
    labels: ['Orders', 'Products', 'Customers'],
    datasets: [
      {
        label: 'Count',
        data: [stats[0].numericValue, stats[2].numericValue, stats[3].numericValue],
        backgroundColor: [
          'rgba(102, 126, 234, 0.8)',
          'rgba(52, 152, 219, 0.8)',
          'rgba(243, 156, 18, 0.8)'
        ],
        borderColor: [
          'rgba(102, 126, 234, 1)',
          'rgba(52, 152, 219, 1)',
          'rgba(243, 156, 18, 1)'
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  }), [stats])

  // Memoized Chart data for Doughnut Chart (Revenue breakdown)
  const doughnutChartData = useMemo(() => {
    const totalRevenue = stats[1].numericValue
    return {
      labels: ['Cart Revenue', 'Pending Revenue', 'Completed Revenue'],
      datasets: [
        {
          data: [
            Math.floor(totalRevenue * 0.6), // 60% from cart
            Math.floor(totalRevenue * 0.25), // 25% pending
            Math.floor(totalRevenue * 0.15) // 15% completed
          ],
          backgroundColor: [
            'rgba(86, 171, 47, 0.8)',
            'rgba(52, 152, 219, 0.8)',
            'rgba(102, 126, 234, 0.8)'
          ],
          borderColor: [
            'rgba(86, 171, 47, 1)',
            'rgba(52, 152, 219, 1)',
            'rgba(102, 126, 234, 1)'
          ],
          borderWidth: 2,
        },
      ],
    }
  }, [stats])

  const barChartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      title: {
        display: true,
        text: 'Overview Statistics',
        font: {
          size: 16,
          weight: '600'
        },
        color: '#2c3e50'
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#6c757d',
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6c757d',
          font: {
            size: 11,
            weight: '500'
          }
        }
      },
    },
  }), [])

  const doughnutChartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      title: {
        display: true,
        text: 'Revenue Breakdown',
        font: {
          size: 16,
          weight: '600'
        },
        color: '#2c3e50'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: $${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    },
  }), [])

  // const recentOrders = [
  //   { id: '#1234', customer: 'John Doe', amount: '$299.99', status: 'Completed' },
  //   { id: '#1235', customer: 'Jane Smith', amount: '$149.50', status: 'Pending' },
  //   { id: '#1236', customer: 'Bob Johnson', amount: '$89.99', status: 'Shipped' },
  //   { id: '#1237', customer: 'Alice Brown', amount: '$199.00', status: 'Completed' }
  // ]

  return (
    <AdminLayout pageTitle="Dashboard">
          {/* Loading State */}
          {loading && (
            <div className="loading-overlay">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>Loading dashboard data...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="alert alert-warning" role="alert">
              <i className="bi bi-exclamation-triangle"></i>
              {error}
              <button 
                className="btn btn-sm btn-outline-warning ms-2" 
                onClick={fetchDashboardStats}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Retry'}
              </button>
            </div>
          )}

          {/* Refresh Button */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 mb-0">Dashboard Overview</h2>
            <button 
              className="btn btn-outline-primary btn-sm" 
              onClick={fetchDashboardStats}
              disabled={loading}
            >
              <i className="bi bi-arrow-clockwise"></i>
              {loading ? ' Refreshing...' : ' Refresh Data'}
            </button>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className={`stat-card ${stat.color} ${loading ? 'loading' : ''}`}>
                <div className="stat-icon">
                  <i className={stat.icon}></i>
                </div>
                <div className="stat-content">
                  <h3>{loading ? '...' : stat.value}</h3>
                  <p>{stat.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dashboard Grid */}
          <div className="dashboard-grid">
            {/* Charts Section */}
            <div className="charts-section">
              {/* Bar Chart */}
              <div className="dashboard-card">
              <div className="card-header">
                  <h3>Overview Statistics</h3>
              </div>
              <div className="card-body">
                  <div className="chart-container">
                    {loading ? (
                      <div className="chart-loading">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p>Loading chart data...</p>
                      </div>
                    ) : (
                      <Bar data={barChartData} options={barChartOptions} />
                    )}
                  </div>
                </div>
              </div>

              {/* Doughnut Chart */}
              <div className="dashboard-card">
                <div className="card-header">
                  <h3>Revenue Breakdown</h3>
                </div>
                <div className="card-body">
                  <div className="chart-container">
                    {loading ? (
                      <div className="chart-loading">
                        <div className="spinner-border text-success" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p>Loading revenue data...</p>
                      </div>
                    ) : (
                      <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="dashboard-card">
              <div className="card-header">
                <h3>Quick Actions</h3>
              </div>
              <div className="card-body">
                <div className="quick-actions">
                  <div className="action-btn">
                    <i className="bi bi-plus-circle"></i>
                    <span>Add Product</span>
                  </div>
                  <div className="action-btn">
                    <i className="bi bi-people"></i>
                    <span>View Customers</span>
                  </div>
                  <div className="action-btn">
                    <i className="bi bi-cart-check"></i>
                    <span>Process Orders</span>
                  </div>
                  <div className="action-btn">
                    <i className="bi bi-graph-up"></i>
                    <span>View Reports</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </AdminLayout>
  )
}

export default Index

// Dashboard-specific styles
const dashboardStyles = `
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: transform 0.3s ease;
  }

  .stat-card:hover {
    transform: translateY(-5px);
  }

  .stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
  }

  .stat-card.primary .stat-icon {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .stat-card.success .stat-icon {
    background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%);
  }

  .stat-card.info .stat-icon {
    background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  }

  .stat-card.warning .stat-icon {
    background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
  }

  .stat-content h3 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 700;
    color: #2c3e50;
  }

  .stat-content p {
    margin: 0;
    color: #6c757d;
    font-size: 0.9rem;
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
  }

  .charts-section {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .chart-container {
    height: 300px;
    width: 100%;
    position: relative;
  }

  .loading-overlay {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    margin-bottom: 2rem;
  }

  .loading-overlay p {
    margin-top: 1rem;
    color: #6c757d;
    font-size: 0.9rem;
  }

  .chart-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #6c757d;
  }

  .chart-loading p {
    margin-top: 1rem;
    font-size: 0.9rem;
  }

  .stat-card.loading {
    opacity: 0.7;
  }

  .stat-card.loading .stat-content h3 {
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .dashboard-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .card-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e9ecef;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-header h3 {
    margin: 0;
    color: #2c3e50;
    font-weight: 600;
  }

  .card-body {
    padding: 1.5rem;
  }

  .quick-actions {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1.5rem;
    background: #f8f9fa;
    border: 2px dashed #dee2e6;
    border-radius: 8px;
    color: #6c757d;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .action-btn:hover {
    background: #e9ecef;
    border-color: #667eea;
    color: #667eea;
  }

  .action-btn i {
    font-size: 1.5rem;
  }

  .action-btn span {
    font-size: 0.9rem;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }

    .dashboard-grid {
      grid-template-columns: 1fr;
    }

    .charts-section {
      grid-template-columns: 1fr;
    }

    .chart-container {
      height: 250px;
    }

    .quick-actions {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 576px) {
    .stat-card {
      padding: 1rem;
    }

    .card-header,
    .card-body {
      padding: 1rem;
    }

    .chart-container {
      height: 200px;
    }
  }
`

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = dashboardStyles
  document.head.appendChild(styleSheet)
}
