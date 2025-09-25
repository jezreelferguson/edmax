import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function Sidebar({ isCollapsed, setIsCollapsed }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'bi-speedometer2',
      path: '/dashboard',
      active: location.pathname === '/dashboard'
    },
    {
      id: 'products',
      label: 'Products',
      icon: 'bi-box-seam',
      path: '/view',
      active: location.pathname === '/admin/products'
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: 'bi-cart-check',
      path: '/admin/orders',
      active: location.pathname === '/admin/orders'
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: 'bi-people',
      path: '/admin/customers',
      active: location.pathname === '/admin/customers'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'bi-graph-up',
      path: '/admin/analytics',
      active: location.pathname === '/admin/analytics'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'bi-gear',
      path: '/admin/settings',
      active: location.pathname === '/admin/settings'
    }
  ]

  const handleNavigation = (path) => {
    navigate(path)
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      {/* Bootstrap Icons CDN */}
      <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
      />
      
      {/* Sidebar */}
      <div className={`admin-sidebar ${isCollapsed ? (isMobile ? 'mobile-open' : 'collapsed') : ''}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            {/* <i className="bi bi-shop"></i> */}
            {(!isCollapsed || isMobile) && <span>Edmax Admin</span>}
          </div>
          <button 
            className="sidebar-toggle"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <i className={`bi ${isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.id} className="nav-item">
                <button
                  className={`nav-link ${item.active ? 'active' : ''}`}
                  onClick={() => handleNavigation(item.path)}
                  title={isCollapsed ? item.label : ''}
                >
                  <i className={item.icon}></i>
                  {(!isCollapsed || isMobile) && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <button 
            className="nav-link logout-btn"
            onClick={() => {
              // Clear admin token and redirect to login
              localStorage.removeItem('adminToken');
              navigate('/admin');
            }}
            title={isCollapsed ? 'Logout' : ''}
          >
            <i className="bi bi-box-arrow-right"></i>
            {(!isCollapsed || isMobile) && <span>Logout</span>}
          </button>
        </div>
    </div>

      {/* Sidebar Styles */}
      <style>{`
        .admin-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 280px;
          background: linear-gradient(135deg, #0c0707ff 0%, #26212bff 100%);
          color: white;
          transition: all 0.3s ease;
          z-index: 1000;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
        }

        .admin-sidebar.collapsed {
          width: 70px;
        }

        .sidebar-header {
          padding: 1.5rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .sidebar-brand i {
          font-size: 1.5rem;
          color: #ffd700;
        }

        .sidebar-toggle {
          background: none;
          border: none;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .sidebar-toggle:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: scale(1.1);
        }

        .sidebar-nav {
          flex: 1;
          padding: 1rem 0;
          overflow-y: auto;
        }

        .nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .nav-item {
          margin: 0.25rem 0;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.875rem 1.5rem;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          white-space: nowrap;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          transform: translateX(5px);
        }

        .nav-link.active {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border-right: 3px solid #ffd700;
        }

        .nav-link.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #ffd700;
        }

        .nav-link i {
          font-size: 1.1rem;
          min-width: 20px;
          text-align: center;
        }

        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logout-btn {
          color: rgba(255, 255, 255, 0.7) !important;
        }

        .logout-btn:hover {
          color: #ff6b6b !important;
          background: rgba(255, 107, 107, 0.1) !important;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .admin-sidebar {
            transform: translateX(-100%);
            width: 280px;
            z-index: 1000;
          }

          .admin-sidebar.collapsed {
            transform: translateX(0);
            width: 280px;
          }

          .admin-sidebar.mobile-open {
            transform: translateX(0);
          }
        }

        /* Scrollbar Styling */
        .sidebar-nav::-webkit-scrollbar {
          width: 4px;
        }

        .sidebar-nav::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }

        .sidebar-nav::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }

        .sidebar-nav::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        /* Animation for collapsed state */
        .admin-sidebar.collapsed .sidebar-brand span,
        .admin-sidebar.collapsed .nav-link span {
          opacity: 0;
          transform: translateX(-10px);
        }

        .admin-sidebar:not(.collapsed) .sidebar-brand span,
        .admin-sidebar:not(.collapsed) .nav-link span,
        .admin-sidebar.mobile-open .sidebar-brand span,
        .admin-sidebar.mobile-open .nav-link span {
          opacity: 1;
          transform: translateX(0);
          transition: all 0.3s ease;
        }
      `}</style>
    </>
  )
}

export default Sidebar
