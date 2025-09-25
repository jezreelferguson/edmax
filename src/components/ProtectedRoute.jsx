import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'

function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuthentication()
  }, [])

  const checkAuthentication = () => {
    // Check if user has admin token in localStorage
    const adminToken = localStorage.getItem('adminToken')
    
    if (!adminToken) {
      // No token found, redirect to admin login
      Swal.fire({
        title: 'Access Denied',
        text: 'Please login to access this Page',
        icon: 'warning',
        timer: 2000,
        showConfirmButton: false
      })
      navigate('/admin', { replace: true })
      setIsLoading(false)
      return
    }

    // Token exists, user is authenticated
    setIsAuthenticated(true)
    setIsLoading(false)
  }

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#f8f9fa'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ margin: 0, color: '#6c757d' }}>Checking authentication...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  // If authenticated, render the protected component
  if (isAuthenticated) {
    return children
  }

  // If not authenticated, return null (redirect will happen in useEffect)
  return null
}

export default ProtectedRoute
