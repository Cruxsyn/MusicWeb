"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useShopify } from "@/components/providers/ShopifyProvider";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, toggleCart, checkout } =
    useShopify();

  return (
    <AnimatePresence>
      {cart.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-brown-deep/50 backdrop-blur-sm"
            onClick={toggleCart}
            aria-hidden
          />

          {/* Drawer panel */}
          <motion.aside
            key="cart-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* ---- Header ---- */}
            <div className="flex items-center justify-between border-b border-gold/20 px-6 py-5">
              <h2 className="font-heading text-2xl text-brown-deep">
                Your Cart
              </h2>
              <button
                onClick={toggleCart}
                className="flex h-9 w-9 items-center justify-center rounded-full text-brown-body hover:bg-gold/10 hover:text-brown-deep transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* ---- Body ---- */}
            {cart.items.length === 0 ? (
              /* Empty state */
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
                  <ShoppingBag className="h-10 w-10 text-gold" />
                </div>
                <p className="font-heading text-xl text-brown-deep">
                  Your cart is empty
                </p>
                <p className="text-sm text-brown-body">
                  Browse our merch and add items to get started.
                </p>
              </div>
            ) : (
              /* Cart items list */
              <ul className="flex-1 divide-y divide-gold/10 overflow-y-auto px-6">
                {cart.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-4 py-5"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-warm-white">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <ShoppingBag className="h-8 w-8 text-gold/40" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-brown-deep leading-tight">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 font-heading text-sm text-gold">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/30 text-brown-body hover:border-gold hover:text-brown-deep transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium text-brown-deep">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/30 text-brown-body hover:border-gold hover:text-brown-deep transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-brown-body/50 hover:text-red-600 transition-colors cursor-pointer"
                          aria-label={`Remove ${item.title} from cart`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* ---- Footer ---- */}
            {cart.items.length > 0 && (
              <div className="border-t border-gold/20 px-6 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-brown-body">
                    Total
                  </span>
                  <span className="font-heading text-xl text-brown-deep">
                    {formatPrice(cart.totalPrice)}
                  </span>
                </div>
                <Button
                  variant="primary"
                  className="w-full bg-amber hover:bg-gold"
                  onClick={checkout}
                >
                  Checkout
                </Button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
