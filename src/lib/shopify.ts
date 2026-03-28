import Client from "shopify-buy";
import type { ShopifyProduct, ShopifyVariant } from "@/types/shopify";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

/**
 * Check whether Shopify environment variables are configured.
 */
export function isShopifyConfigured(): boolean {
  return Boolean(domain && storefrontAccessToken);
}

/**
 * Build a Shopify Buy SDK client.
 * Returns null if credentials are missing.
 */
function getClient(): ShopifyBuy | null {
  if (!isShopifyConfigured()) return null;

  return Client.buildClient({
    domain: domain!,
    storefrontAccessToken: storefrontAccessToken!,
    apiVersion: "2024-01",
  });
}

/**
 * Fetch all products from the Shopify storefront.
 * Returns an empty array when Shopify is not configured or on error.
 */
export async function fetchProducts(): Promise<ShopifyProduct[]> {
  const client = getClient();
  if (!client) return [];

  try {
    const products = await client.product.fetchAll();

    return products.map((product: ShopifyBuy.Product) => {
      const images = (product.images ?? []).map((img: ShopifyBuy.Image) => ({
        src: String(img.src ?? ""),
        altText: (img.altText as string | null) ?? null,
      }));

      const variants = (product.variants ?? []).map(
        (variant: ShopifyBuy.ProductVariant) => {
          const price = variant.price as ShopifyBuy.MoneyV2 | undefined;
          return {
            id: String(variant.id ?? ""),
            title: String(variant.title ?? ""),
            price: {
              amount: String(price?.amount ?? "0"),
              currencyCode: String(price?.currencyCode ?? "USD"),
            },
            available: Boolean(variant.availableForSale),
            image: variant.image
              ? { src: String(variant.image.src ?? "") }
              : undefined,
          } satisfies ShopifyVariant;
        }
      );

      return {
        id: String(product.id ?? ""),
        title: String(product.title ?? ""),
        description: String(product.description ?? ""),
        handle: String(product.handle ?? ""),
        images,
        variants,
      } satisfies ShopifyProduct;
    });
  } catch (error) {
    console.error("Failed to fetch Shopify products:", error);
    return [];
  }
}
