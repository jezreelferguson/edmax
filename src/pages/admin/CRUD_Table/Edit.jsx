import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminLayout from '../../../components/AdminLayout'
import api from '../../../api/api'
import Swal from 'sweetalert2'

function Edit() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: ''
  })
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [existingImage, setExistingImage] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/product/${id}`)
        const p = res.data || {}
        setForm({
          name: p.name || '',
          description: p.description || '',
          price: p.price != null ? String(p.price) : ''
        })
      
        const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
        const fileBase = apiBase.replace(/\/api\/?$/, '')
        if (p.image) {
          setExistingImage(String(p.image).startsWith('http') ? p.image : `${fileBase}/storage/${p.image}`)
        } else if (p.imageUrl) {
          setExistingImage(p.imageUrl)
        } else {
          setExistingImage('')
        }
      } catch (err) {
        console.error('Failed to load product', err)
        setError('Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0]
    setImageFile(file || null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.price) {
      setError('Name and price are required')
      return
    }
    setSaving(true)
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('description', form.description)
      formData.append('price', String(parseFloat(form.price)))
      if (imageFile) {
        formData.append('image', imageFile)
      }
     const res = await api.post(`/product/${id}?_method=PUT`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if(res.data.code === 201){
          Swal.fire('Success', 'Product Updated Successfully', 'success')
        }else{
          Swal.fire('Error', res.data.message, 'error');
        }
      navigate('/admin/crud/view')
    } catch (err) {
      console.error('Update product failed:', err)
      const message = err?.response?.data?.message
      const errors = err?.response?.data?.errors
      if (errors && errors.image && errors.image.length) {
        setError(errors.image.join(' '))
      } else {
        setError(message || 'Failed to update product')
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout pageTitle="Edit Product">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ maxWidth: 640 }}>
          {error && <p style={{ color: 'red', marginBottom: 12 }}>{error}</p>}
          <div style={{ display: 'grid', gap: 12 }}>
            {existingImage && (
              <div>
                <label style={{ display: 'block', marginBottom: 6 }}>Current Image</label>
                <img src={existingImage} alt="Current" style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8, border: '1px solid #e5e7eb' }} />
              </div>
            )}
            <div>
              <label style={{ display: 'block', marginBottom: 6 }}>Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Product name"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #e5e7eb' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6 }}>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Product description"
                rows={4}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #e5e7eb', resize: 'vertical' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6 }}>Price</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #e5e7eb' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6 }}>Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #e5e7eb' }}
              />
            </div>
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <button type="button" onClick={() => navigate('/admin/crud/view')} style={{ padding: '10px 14px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff' }}>
              Cancel
            </button>
            <button type="submit" disabled={saving} style={{ padding: '10px 14px', borderRadius: 6, border: 'none', background: '#2563eb', color: '#fff', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      )}
    </AdminLayout>
  )
}

export default Edit


