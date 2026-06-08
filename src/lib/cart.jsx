import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'

const CartStateContext = createContext(null)
const CartActionsContext = createContext(null)

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
      return state.flatMap((l) => {
        if (l.id !== action.id) return [l]
        const qty = l.qty - 1
        return qty > 0 ? [{ ...l, qty }] : []
      })
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

  const { count, subtotal } = useMemo(
    () =>
      items.reduce(
        (acc, line) => ({
          count: acc.count + line.qty,
          subtotal: acc.subtotal + line.qty * line.price,
        }),
        { count: 0, subtotal: 0 },
      ),
    [items],
  )

  const openCart = useCallback(() => setOpen(true), [])
  const closeCart = useCallback(() => setOpen(false), [])
  const add = useCallback((item) => {
    dispatch({ type: 'add', item })
    setPulse((p) => p + 1)
    setOpen(true)
  }, [])
  const inc = useCallback((id) => dispatch({ type: 'inc', id }), [])
  const dec = useCallback((id) => dispatch({ type: 'dec', id }), [])
  const remove = useCallback((id) => dispatch({ type: 'remove', id }), [])
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])

  const state = useMemo(
    () => ({
      items,
      count,
      subtotal,
      open,
      pulse,
    }),
    [items, count, subtotal, open, pulse],
  )

  const actions = useMemo(
    () => ({
      openCart,
      closeCart,
      add,
      inc,
      dec,
      remove,
      clear,
    }),
    [openCart, closeCart, add, inc, dec, remove, clear],
  )

  return (
    <CartStateContext.Provider value={state}>
      <CartActionsContext.Provider value={actions}>{children}</CartActionsContext.Provider>
    </CartStateContext.Provider>
  )
}

export function useCartState() {
  const state = useContext(CartStateContext)
  if (!state) throw new Error('useCartState must be used within CartProvider')
  return state
}

export function useCartActions() {
  const actions = useContext(CartActionsContext)
  if (!actions) throw new Error('useCartActions must be used within CartProvider')
  return actions
}

export function useCart() {
  const state = useCartState()
  const actions = useCartActions()

  return useMemo(
    () => ({
      ...state,
      ...actions,
    }),
    [state, actions],
  )
}
