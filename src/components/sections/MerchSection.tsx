"use client";

import { useShopify } from "@/components/providers/ShopifyProvider";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/ui/ProductCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function MerchSection() {
  const { products } = useShopify();

  return (
    <section id="merch" className="bg-warm-white py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Merch" />

        {products.length === 0 ? (
          <ScrollReveal>
            <div className="mx-auto max-w-sm text-center">
              <p className="font-heading text-xl text-brown-deep">
                Coming Soon
              </p>
              <p className="mt-2 text-sm text-brown-body/50">
                Official merchandise is on the way.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
