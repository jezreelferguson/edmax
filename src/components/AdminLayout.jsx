import React, { useState, useEffect } from 'react'
import Sidebar from '../pages/admin/dashboard/Sidebar'

function AdminLayout({ children, pageTitle = "Dashboard" }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      <Sidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />
      
      {/* Main Content */}
      <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Top Navigation */}
        <header className="top-navbar">
          <div className="navbar-content">
            <div className="navbar-left">
              <button 
                className="mobile-menu-btn"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                <i className="bi bi-list"></i>
              </button>
              <h2 className="page-title">{pageTitle}</h2>
            </div>
            <div className="navbar-right">
              <div className="user-info">
                <i className="bi bi-bell"></i>
                <div className="user-avatar">
                  <i className="bi bi-person-circle"></i>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="dashboard-content">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarCollapsed && isMobile && (
        <div 
          className="mobile-overlay"
          onClick={() => setSidebarCollapsed(false)}
        ></div>
      )}

      {/* Admin Layout Styles */}
      <style>{`
        .main-content {
          margin-left: 280px;
          min-height: 100vh;
          background: #f8f9fa;
          transition: margin-left 0.3s ease;
        }

        .main-content.sidebar-collapsed {
          margin-left: 70px;
        }

        .top-navbar {
          background: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 1rem 2rem;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .navbar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #6c757d;
          cursor: pointer;
        }

        .page-title {
          margin: 0;
          color: #2c3e50;
          font-weight: 600;
        }

        .navbar-right {
          display: flex;
          align-items: center;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-info i {
          font-size: 1.2rem;
          color: #6c757d;
          cursor: pointer;
        }

        .user-avatar i {
          font-size: 2rem;
          color: #667eea;
        }

        .dashboard-content {
          padding: 2rem;
        }

        /* Mobile Overlay */
        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
          display: none;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
          }

          .mobile-menu-btn {
            display: block;
          }

          .mobile-overlay {
            display: block;
          }

          .dashboard-content {
            padding: 1rem;
          }
        }

        @media (max-width: 576px) {
          .top-navbar {
            padding: 1rem;
          }

          .dashboard-content {
            padding: 0.5rem;
          }
        }
      `}</style>
    </>
  )
}

export default AdminLayout
