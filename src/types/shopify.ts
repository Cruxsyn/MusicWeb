export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: { src: string; altText: string | null }[];
  variants: ShopifyVariant[];
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  available: boolean;
  image?: { src: string };
}

export interface CartItem {
  id: string;
  variantId: string;
  title: string;
  quantity: number;
  price: string;
  image: string;
}

export interface CartState {
  items: CartItem[];
  totalPrice: string;
  checkoutUrl: string | null;
  isOpen: boolean;
  isLoading: boolean;
}
