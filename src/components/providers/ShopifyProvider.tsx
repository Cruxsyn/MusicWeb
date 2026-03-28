"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import type {
  CartItem,
  CartState,
  ShopifyProduct,
} from "@/types/shopify";
import { fetchProducts } from "@/lib/shopify";
import CartDrawer from "@/components/ui/CartDrawer";
import { ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// ---------------------------------------------------------------------------
// Context types
// ---------------------------------------------------------------------------

interface ShopifyContextValue {
  cart: CartState;
  products: ShopifyProduct[];
  addToCart: (product: ShopifyProduct, variantId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  toggleCart: () => void;
  checkout: () => void;
}

const ShopifyContext = createContext<ShopifyContextValue | null>(null);

// ---------------------------------------------------------------------------
// Cart reducer
// ---------------------------------------------------------------------------

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "TOGGLE_CART" }
  | { type: "CLOSE_CART" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "HYDRATE"; payload: CartItem[] };

function calcTotal(items: CartItem[]): string {
  return items
    .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.variantId === action.payload.variantId
      );
      let newItems: CartItem[];
      if (existing) {
        newItems = state.items.map((i) =>
          i.variantId === action.payload.variantId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        newItems = [...state.items, action.payload];
      }
      return {
        ...state,
        items: newItems,
        totalPrice: calcTotal(newItems),
        isOpen: true,
      };
    }
    case "REMOVE_ITEM": {
      const newItems = state.items.filter((i) => i.id !== action.payload);
      return { ...state, items: newItems, totalPrice: calcTotal(newItems) };
    }
    case "UPDATE_QUANTITY": {
      const newItems =
        action.payload.quantity <= 0
          ? state.items.filter((i) => i.id !== action.payload.id)
          : state.items.map((i) =>
              i.id === action.payload.id
                ? { ...i, quantity: action.payload.quantity }
                : i
            );
      return { ...state, items: newItems, totalPrice: calcTotal(newItems) };
    }
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "HYDRATE":
      return {
        ...state,
        items: action.payload,
        totalPrice: calcTotal(action.payload),
      };
    default:
      return state;
  }
}

const initialCartState: CartState = {
  items: [],
  totalPrice: "0.00",
  checkoutUrl: null,
  isOpen: false,
  isLoading: false,
};

const CART_STORAGE_KEY = "tatebutts_cart";

// ---------------------------------------------------------------------------
// Provider component
// ---------------------------------------------------------------------------

export default function ShopifyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);

  // Fetch products on mount
  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: true });
    fetchProducts()
      .then(setProducts)
      .finally(() => dispatch({ type: "SET_LOADING", payload: false }));
  }, []);

  // Hydrate cart from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const items: CartItem[] = JSON.parse(stored);
        if (Array.isArray(items) && items.length > 0) {
          dispatch({ type: "HYDRATE", payload: items });
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.items));
    } catch {
      // Ignore storage errors
    }
  }, [cart.items]);

  // ---- Actions ----

  const addToCart = useCallback(
    (product: ShopifyProduct, variantId: string) => {
      const variant = product.variants.find((v) => v.id === variantId);
      if (!variant) return;

      const item: CartItem = {
        id: `${product.id}-${variantId}`,
        variantId,
        title: product.title,
        quantity: 1,
        price: variant.price.amount,
        image: product.images[0]?.src ?? "",
      };

      dispatch({ type: "ADD_ITEM", payload: item });
    },
    []
  );

  const removeFromCart = useCallback((itemId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: itemId });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: itemId, quantity } });
  }, []);

  const toggleCart = useCallback(() => {
    dispatch({ type: "TOGGLE_CART" });
  }, []);

  const checkout = useCallback(() => {
    // When a real Shopify checkout URL is available, redirect there.
    // For now, simply close the cart.
    dispatch({ type: "CLOSE_CART" });
  }, []);

  const value = useMemo<ShopifyContextValue>(
    () => ({ cart, products, addToCart, removeFromCart, updateQuantity, toggleCart, checkout }),
    [cart, products, addToCart, removeFromCart, updateQuantity, toggleCart, checkout]
  );

  const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <ShopifyContext.Provider value={value}>
      {children}

      {/* Cart drawer — always rendered so AnimatePresence works */}
      <CartDrawer />

      {/* Floating cart button */}
      <AnimatePresence>
        {itemCount > 0 && !cart.isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={toggleCart}
            className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-cream shadow-lg hover:bg-amber transition-colors cursor-pointer"
            aria-label={`Open cart (${itemCount} items)`}
          >
            <ShoppingBag className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brown-deep text-[11px] font-bold text-cream">
              {itemCount}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </ShopifyContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useShopify(): ShopifyContextValue {
  const ctx = useContext(ShopifyContext);
  if (!ctx) {
    throw new Error("useShopify must be used within a ShopifyProvider");
  }
  return ctx;
}
