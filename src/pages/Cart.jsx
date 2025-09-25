import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import api from '../api/api';
import PaystackButton from '../components/UI/PaystackButton';
import { useCart } from '../contexts/CartContext';
import toast, { Toaster } from "react-hot-toast";


function Cart() {
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerName, setCustomerName] = useState('')
  const { cartItems: items, loading, refreshCart } = useCart()

  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
  const fileBase = apiBase.replace(/\/api\/?$/, "");

  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  const updateQuantity = async (cartId, delta) => {
    try {
      const item = items.find((i) => (i.id ?? i.cart_id ?? i._id) === cartId)
      if (!item) return
      const productId = item.product_id ?? item?.product?.id ?? item?.product?.product_id
      const currentQty = Number(item.quantity ?? item.qty ?? 1)
      const newQty = Math.max(1, currentQty + delta)

      // Because POST /cart appends rows, prevent duplicates by replacing the row:
      await api.delete(`/cart/${cartId}`)
      await api.post('/cart', { product_id: productId, quantity: newQty })
      await refreshCart()
    } catch (e) {
      console.error('Failed to update quantity', e)
      await refreshCart()
    }
  }

  const removeItem = async (cartId,  productName = "Product") => {
    try {
     const res= await api.delete(`/cart/${cartId}`)
      await refreshCart()
      if(res.data.code === 200){
        toast.success(`${productName} removed`,{
          position: 'top-center',
          duration: 2000
        });
      }else{
        toast.error(`${productName} Could not be removed`,{
          position: 'top-center',
          duration: 2000
        })
      }
      console.log('Delete Res:', res.data.code)
    } catch (e) {
      console.error('Failed to remove item', e)
    }
  }

  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => {
      const quantity = Number(it.quantity ?? it.qty ?? 1)
      const price = Number(it.price ?? it.product?.price ?? it.product_price ?? 0)
      return sum + price * quantity
    }, 0)
  }, [items])

  return (
    <>
    <Toaster />
    <section id="cart" className="cart section">

      <div className="container" data-aos="fade-up" data-aos-delay="100">

        <div className="row">
          <div className="col-lg-8" data-aos="fade-up" data-aos-delay="200">
            <div className="cart-items">
              <div className="cart-header d-none d-lg-block">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <h5>Product</h5>
                  </div>
                  <div className="col-lg-2 text-center">
                    <h5>Price</h5>
                  </div>
                  <div className="col-lg-2 text-center">
                    <h5>Quantity</h5>
                  </div>
                  <div className="col-lg-2 text-center">
                    <h5>Total</h5>
                  </div>
                </div>
              </div>

               {loading && (
                 <div className="py-5 text-center">Loading cart...</div>
               )}

               {!loading && items.length === 0 && (
                 <div className="py-5 text-center">Your cart is empty.</div>
               )}

              {!loading && items.map((it) => {
                const cartId = it.id ?? it.cart_id ?? it._id
                const product = it.product ?? {}
                const name = product.name ?? it.name ?? 'Product'
                const image = product.image ?? it.image
                const price = Number(it.price ?? product.price ?? it.product_price ?? 0)
                const quantity = Number(it.quantity ?? it.qty ?? 1)
                const imageSrc = image
                  ? (String(image).startsWith('http') ? image : `${fileBase}/storage/${image}`)
                  : 'assets/img/product/product-1.webp'

                return (
                  <div key={cartId} className="cart-item">
                <div className="row align-items-center">
                  <div className="col-lg-6 col-12 mt-3 mt-lg-0 mb-lg-0 mb-3">
                    <div className="product-info d-flex align-items-center">
                      <div className="product-image">
                            <img src={imageSrc} alt={name} className="img-fluid" loading="lazy"/>
                      </div>
                      <div className="product-details">
                            <h6 className="product-title">{name}</h6>
                            <button className="remove-item" type="button" onClick={() => removeItem(cartId)}>
                          <i className="bi bi-trash"></i> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
                    <div className="price-tag">
                          <span className="current-price">GH₵{price.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
                        <div className="quantity-selector d-flex justify-content-center align-items-center gap-2">
                          <button className="quantity-btn decrease" onClick={() => updateQuantity(cartId, -1)}>
                        <i className="bi bi-dash"></i>
                      </button>
                          <input type="number" className="quantity-input" value={quantity} min="1" readOnly />
                          <button className="quantity-btn increase" onClick={() => updateQuantity(cartId, 1)}>
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
                    <div className="item-total">
                          <span>GH₵{(price * quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              <div className="cart-actions">
                <div className="row">
                  <div className="col-lg-6 mb-3 mb-lg-0">
                    <div className="coupon-form">
                    </div>
                  </div>
                  <div className="col-lg-6 text-md-end">
                    {/* Placeholder for clear cart if needed */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="300">
            <div className="cart-summary">
              <h4 className="summary-title">Order Summary</h4>

              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Jane Doe"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="e.g. jane@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>

              <div className="summary-item">
                <span className="summary-label">Subtotal</span>
                <span className="summary-value">GH₵{subtotal.toFixed(2)}</span>
              </div>

              <div className="summary-total">
                <span className="summary-label">Total</span>
                <span className="summary-value">GH₵{subtotal.toFixed(2)}</span>
              </div>

              <div className="checkout-button">
                <PaystackButton
                  amount={subtotal}
                  currency="GHS"
                  email={customerEmail}
                  fullName={customerName}
                  disabled={!customerEmail || !customerName || subtotal <= 0}
                />
              </div>

              <div className="continue-shopping">
                <Link to={'/product'} className="btn btn-link w-100">
                  <i className="bi bi-arrow-left"></i> Continue Shopping
                </Link>
              </div>

              <div className="payment-methods">
                <p className="payment-title">We Accept</p>
                <div className="payment-icons">
                  <i className="bi bi-credit-card"></i>
                  <i className="bi bi-bank"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>

    </>
  )
}

export default Cart;
