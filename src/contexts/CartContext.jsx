import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import api from '../api/api'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchCart = useCallback(async () => {
    setLoading(true)
    try {
      const res = await api.get('/cart')
      const data = Array.isArray(res.data?.data) ? res.data.data : (Array.isArray(res.data) ? res.data : [])
      setCartItems(data)
      setCartCount(data.length)
    } catch (e) {
      console.error('Failed to load cart', e)
      setCartItems([])
      setCartCount(0)
    } finally {
      setLoading(false)
    }
  }, [])

  const addToCart = useCallback(async (productId, quantity = 1) => {
    try {
      await api.post('/cart', {
        product_id: productId,
        quantity,
      })
      // Refresh cart after adding
      await fetchCart()
      return true
    } catch (err) {
      console.error('Error adding to cart:', err)
      return false
    }
  }, [fetchCart])

  const updateCartCount = useCallback((count) => {
    setCartCount(count)
  }, [])

  const refreshCart = useCallback(() => {
    fetchCart()
  }, [fetchCart])

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  const value = useMemo(() => ({
    cartItems,
    cartCount,
    loading,
    addToCart,
    updateCartCount,
    refreshCart,
    fetchCart
  }), [cartItems, cartCount, loading, addToCart, updateCartCount, refreshCart, fetchCart])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
