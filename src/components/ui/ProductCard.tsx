"use client";

import Image from "next/image";
import type { ShopifyProduct } from "@/types/shopify";
import { useShopify } from "@/components/providers/ShopifyProvider";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ProductCardProps {
  product: ShopifyProduct;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addToCart } = useShopify();

  const firstVariant = product.variants[0];
  const firstImage = product.images[0];
  const isAvailable = firstVariant?.available ?? false;

  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="group flex flex-col overflow-hidden rounded-2xl border border-cream/[0.08] bg-surface-light transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(212,160,23,0.08)]">
        {/* Product image */}
        <div className="relative aspect-square overflow-hidden">
          {firstImage ? (
            <Image
              src={firstImage.src}
              alt={firstImage.altText ?? product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-brown-rich">
              <span className="font-heading text-xl text-cream/30">
                {product.title}
              </span>
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="flex flex-1 flex-col gap-2 px-5 py-4">
          <h3 className="font-heading text-base text-cream leading-tight">
            {product.title}
          </h3>

          {firstVariant && (
            <p className="text-sm font-medium text-cream/70">
              {formatPrice(
                firstVariant.price.amount,
                firstVariant.price.currencyCode
              )}
            </p>
          )}

          <div className="mt-auto pt-3">
            {isAvailable ? (
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => addToCart(product, firstVariant.id)}
              >
                Add to Cart
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="w-full cursor-default"
                disabled
              >
                Sold Out
              </Button>
            )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
