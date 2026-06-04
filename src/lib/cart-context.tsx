"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "./products";

export interface CartItem {
  readonly product: Product;
  readonly quantity: number;
}

interface CartContextValue {
  readonly items: readonly CartItem[];
  readonly totalItems: number;
  readonly subtotal: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_STORAGE_KEY = "purrfect-cart";

interface StoredCartItem {
  readonly productId: string;
  readonly quantity: number;
}

const loadCartFromStorage = (): readonly StoredCartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as StoredCartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (items: readonly CartItem[]): void => {
  if (typeof window === "undefined") return;
  const serializable: StoredCartItem[] = items.map((item) => ({
    productId: item.product.id,
    quantity: item.quantity,
  }));
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(serializable));
};

export const CartProvider = ({
  children,
  allProducts,
}: {
  readonly children: ReactNode;
  readonly allProducts: readonly Product[];
}) => {
  const [items, setItems] = useState<readonly CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = loadCartFromStorage();
    const hydratedItems: CartItem[] = stored
      .map((s) => {
        const product = allProducts.find((p) => p.id === s.productId);
        if (!product) return null;
        return { product, quantity: s.quantity };
      })
      .filter((item): item is CartItem => item !== null);
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(hydratedItems);
    setHydrated(true);
  }, [allProducts]);

  // Persist to localStorage on change
  useEffect(() => {
    if (hydrated) {
      saveCartToStorage(items);
    }
  }, [items, hydrated]);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalItems,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items, totalItems, subtotal, addItem, removeItem, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
