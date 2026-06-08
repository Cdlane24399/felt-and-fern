import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'purrfect-cart-v1'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { item } = action
      const existing = state.find((l) => l.id === item.id)
      if (existing) {
        return state.map((l) =>
          l.id === item.id ? { ...l, qty: Math.min(l.qty + (item.qty || 1), 99) } : l,
        )
      }
      return [...state, { ...item, qty: item.qty || 1 }]
    }
    case 'inc':
      return state.map((l) => (l.id === action.id ? { ...l, qty: Math.min(l.qty + 1, 99) } : l))
    case 'dec':
      return state
        .map((l) => (l.id === action.id ? { ...l, qty: l.qty - 1 } : l))
        .filter((l) => l.qty > 0)
    case 'remove':
      return state.filter((l) => l.id !== action.id)
    case 'clear':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, load)
  const [open, setOpen] = useState(false)
  const [pulse, setPulse] = useState(0)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* ignore */
    }
  }, [items])

  const value = useMemo(() => {
    const count = items.reduce((n, l) => n + l.qty, 0)
    const subtotal = items.reduce((n, l) => n + l.qty * l.price, 0)
    return {
      items,
      count,
      subtotal,
      open,
      pulse,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      add: (item) => {
        dispatch({ type: 'add', item })
        setPulse((p) => p + 1)
        setOpen(true)
      },
      inc: (id) => dispatch({ type: 'inc', id }),
      dec: (id) => dispatch({ type: 'dec', id }),
      remove: (id) => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' }),
    }
  }, [items, open, pulse])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
