'use client'

import {
  addCartItem,
  Cart,
  CheckoutAddressInput,
  CheckoutCustomerInput,
  checkoutCart,
  CheckoutResponse,
  clearCart as clearRemoteCart,
  createCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from '@/app/lib/ecommerce/api'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const CART_STORAGE_KEY = 'shreeji_cart_id'

export interface CheckoutInput {
  customer: CheckoutCustomerInput
  shippingAddress: CheckoutAddressInput
  billingAddress?: CheckoutAddressInput
  paymentMethod: string
  notes?: string
}

interface CartContextValue {
  cart: Cart | null
  loading: boolean
  updating: boolean
  error: string | null
  isCheckingOut: boolean
  addItem: (productId: number, quantity?: number) => Promise<void>
  updateItem: (itemId: string, quantity: number) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  clearCart: () => Promise<void>
  refreshCart: () => Promise<void>
  checkout: (input: CheckoutInput) => Promise<CheckoutResponse>
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const ensureCartExists = useCallback(async (): Promise<string> => {
    if (cart?.id) {
      return cart.id
    }

    const storedId = typeof window !== 'undefined' ? localStorage.getItem(CART_STORAGE_KEY) : null

    if (storedId) {
      try {
        const existing = await getCart(storedId)
        setCart(existing)
        return existing.id
      } catch (err) {
        console.error('Failed to load stored cart', err)
        if (typeof window !== 'undefined') {
          localStorage.removeItem(CART_STORAGE_KEY)
        }
      }
    }

    const newCart = await createCart()
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, newCart.id)
    }
    setCart(newCart)
    return newCart.id
  }, [cart])

  useEffect(() => {
    let cancelled = false
    const init = async () => {
      try {
        await ensureCartExists()
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to initialize cart')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }
    init()
    return () => {
      cancelled = true
    }
  }, [ensureCartExists])

  const refreshCart = useCallback(async () => {
    try {
      const cartId = await ensureCartExists()
      const latest = await getCart(cartId)
      setCart(latest)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to refresh cart')
    }
  }, [ensureCartExists])

  const addItem = useCallback(
    async (productId: number, quantity = 1) => {
      setUpdating(true)
      setError(null)
      try {
        const cartId = await ensureCartExists()
        const updated = await addCartItem(cartId, productId, quantity)
        setCart(updated)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to add item')
        throw err
      } finally {
        setUpdating(false)
      }
    },
    [ensureCartExists],
  )

  const updateItem = useCallback(
    async (itemId: string, quantity: number) => {
      setUpdating(true)
      setError(null)
      try {
        const cartId = await ensureCartExists()
        const updated = await updateCartItem(cartId, itemId, quantity)
        setCart(updated)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to update item')
        throw err
      } finally {
        setUpdating(false)
      }
    },
    [ensureCartExists],
  )

  const removeItem = useCallback(
    async (itemId: string) => {
      setUpdating(true)
      setError(null)
      try {
        const cartId = await ensureCartExists()
        const updated = await removeCartItem(cartId, itemId)
        setCart(updated)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to remove item')
        throw err
      } finally {
        setUpdating(false)
      }
    },
    [ensureCartExists],
  )

  const clearCart = useCallback(async () => {
    setUpdating(true)
    setError(null)
    try {
      const cartId = await ensureCartExists()
      const updated = await clearRemoteCart(cartId)
      setCart(updated)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to clear cart')
      throw err
    } finally {
      setUpdating(false)
    }
  }, [ensureCartExists])

  const checkout = useCallback(
    async (input: CheckoutInput) => {
      setIsCheckingOut(true)
      setError(null)
      try {
        const cartId = await ensureCartExists()
        const result = await checkoutCart({
          cartId,
          ...input,
          billingAddress: input.billingAddress ?? input.shippingAddress,
        })

        if (typeof window !== 'undefined') {
          localStorage.removeItem(CART_STORAGE_KEY)
        }
        setCart(null)
        await ensureCartExists()
        return result
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Checkout failed'
        setError(message)
        throw err
      } finally {
        setIsCheckingOut(false)
      }
    },
    [ensureCartExists],
  )

  const value = useMemo(
    () => ({
      cart,
      loading,
      updating,
      error,
      isCheckingOut,
      addItem,
      updateItem,
      removeItem,
      clearCart,
      refreshCart,
      checkout,
    }),
    [cart, loading, updating, error, isCheckingOut, addItem, updateItem, removeItem, clearCart, refreshCart, checkout],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
