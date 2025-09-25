import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../../components/AdminLayout'
import api from '../../../api/api'
import Swal from 'sweetalert2'

function View() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const navigate = useNavigate()
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
  const fileBase = apiBase.replace(/\/api\/?$/, '')

  const fetchProducts = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await api.get('/product')
      setProducts(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      console.error('Error fetching products:', err)
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleAdd = () => {
    navigate('/admin/crud/create')
  }

  // const handleCreate = () => {
  //   navigate('/admin/crud/create')
  // }

  const handleEdit = (id) => {
    navigate(`/admin/crud/edit/${id}`)
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?')
    if (!confirmed) return
    try {
      await api.delete(`/product/${id}`)
  
      setProducts((prev) => prev.filter((p) => (p.id || p._id) !== id))
    
    } catch (err) {
      console.error('Error deleting product:', err)
      Swal.fire('Error', 'Failed to delete product', 'error')
    }
  }

  const totalItems = products.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (safeCurrentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)
  const paginatedProducts = products.slice(startIndex, endIndex)

  return (
    <AdminLayout pageTitle="Products">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <button onClick={handleAdd} style={{ padding: '8px 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', marginRight: 8 }}>Add</button>
          {/* <button onClick={handleCreate} style={{ padding: '8px 12px', background: '#10b981', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Create</button> */}
        </div>
        <div>
          <label style={{ marginRight: 8, color: '#374151' }}>Rows per page</label>
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1) }}
            style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #e5e7eb' }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <div className="d-flex justify-content-center">
        {loading && <p className='spinner-border'></p>}

        </div>
        {error && !loading && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: '12px' }}>Image</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: '12px' }}>Name</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: '12px' }}>Description</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: '12px' }}>Price</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: '12px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => {
                const id = product.id || product._id || product.sku || product.name
                const imageSrc = product.image
                  ? (product.image.startsWith('http') ? product.image : `${fileBase}/storage/${product.image}`)
                  : (product.imageUrl || product.thumbnail || '')
                const name = product.name || product.title || 'Untitled'
                const description = product.description || product.summary || ''
                const price = product.price ?? product.amount ?? product.cost

                return (
                  <tr key={id}>
                    <td style={{ borderBottom: '1px solid #f3f4f6', padding: '12px' }}>
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={name}
                          style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px' }}
                          loading="lazy"
                        />
                      ) : (
                        <div style={{ width: '56px', height: '56px', background: '#f3f4f6', borderRadius: '8px' }} />
                      )}
                    </td>
                    <td style={{ borderBottom: '1px solid #f3f4f6', padding: '12px', fontWeight: 500 }}>{name}</td>
                    <td style={{ borderBottom: '1px solid #f3f4f6', padding: '12px', color: '#6b7280' }}>{description}</td>
                    <td style={{ borderBottom: '1px solid #f3f4f6', padding: '12px' }}>
                      {typeof price === 'number' ? price.toFixed(2) : price || '-'}
                    </td>
                    <td style={{ borderBottom: '1px solid #f3f4f6', padding: '12px' }}>
                      <button onClick={() => handleEdit(id)} style={{ padding: '6px 10px', background: '#f59e0b', color: '#111827', border: 'none', borderRadius: 6, cursor: 'pointer', marginRight: 8 }}>Edit</button>
                      <button onClick={() => handleDelete(id)} style={{ padding: '6px 10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Delete</button>
                    </td>
                  </tr>
                )
              })}
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ padding: '16px', textAlign: 'center', color: '#6b7280' }}>
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      {!loading && !error && totalItems > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
          <div style={{ color: '#6b7280' }}>
            Showing {startIndex + 1}-{endIndex} of {totalItems}
          </div>
          <div>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safeCurrentPage === 1}
              style={{ padding: '8px 12px', marginRight: 8, borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff', cursor: safeCurrentPage === 1 ? 'not-allowed' : 'pointer', opacity: safeCurrentPage === 1 ? 0.5 : 1 }}
            >
              Previous
            </button>
            <span style={{ marginRight: 8 }}>Page {safeCurrentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage === totalPages}
              style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff', cursor: safeCurrentPage === totalPages ? 'not-allowed' : 'pointer', opacity: safeCurrentPage === totalPages ? 0.5 : 1 }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default View
