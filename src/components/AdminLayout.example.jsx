// Example of how to use AdminLayout component
import React from 'react'
import AdminLayout from './AdminLayout'

// Example 1: Simple page with just content
function SimpleAdminPage() {
  return (
    <AdminLayout pageTitle="Simple Page">
      <div className="card">
        <h1>Welcome to Admin Panel</h1>
        <p>This is a simple admin page using AdminLayout.</p>
      </div>
    </AdminLayout>
  )
}

// Example 2: Page with multiple sections
function ComplexAdminPage() {
  return (
    <AdminLayout pageTitle="Complex Page">
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h3>Main Content</h3>
            </div>
            <div className="card-body">
              <p>Your main content goes here...</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h3>Sidebar</h3>
            </div>
            <div className="card-body">
              <p>Additional information...</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

// Example 3: Page with forms
function FormAdminPage() {
  return (
    <AdminLayout pageTitle="Add New Item">
      <div className="card">
        <div className="card-header">
          <h3>Create New Item</h3>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" rows="3"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}

export { SimpleAdminPage, ComplexAdminPage, FormAdminPage }
