import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../../components/AdminLayout'
import api from '../../../api/api'
import Swal from 'sweetalert2'

function Create() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: ''
  })
  const [imageFile, setImageFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

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
    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('description', form.description)
      formData.append('price', String(parseFloat(form.price)))
      if (imageFile) {
        formData.append('image', imageFile)
      }
      const res = await api.post('/product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if(res.status === 201){
        Swal.fire('Success', res.data.message, 'success');
      }else{
        Swal.fire('Error', 'An error occured', 'error');
      }
      navigate('/admin/crud/view')
    } catch (err) {
      console.error('Create product failed:', err)
      const message = err?.response?.data?.message
      const errors = err?.response?.data?.errors
      if (errors && errors.image && errors.image.length) {
        setError(errors.image.join(' '))
      } else {
        setError(message || 'Failed to create product')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AdminLayout pageTitle="Add Product">
      <form onSubmit={handleSubmit} style={{ maxWidth: 640 }} >
        {error && <p style={{ color: 'red', marginBottom: 12 }}>{error}</p>}
        <div style={{ display: 'grid', gap: 12 }} >
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
          <button type="submit" disabled={submitting} style={{ padding: '10px 14px', borderRadius: 6, border: 'none', background: '#10b981', color: '#fff', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}>
            {submitting ? 'Creating Product...' : 'Create'}
          </button>
        </div>
      </form>
    </AdminLayout>
  )
}

export default Create


