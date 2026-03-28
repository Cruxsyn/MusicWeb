import { type ClassValue, clsx } from "clsx";

// Minimal cn helper — no tailwind-merge dependency needed for this project
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Convert ms to "M:SS" */
export function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/** Format ISO date string to readable format */
export function formatDate(dateStr: string): {
  month: string;
  day: string;
  year: string;
  weekday: string;
} {
  const date = new Date(dateStr);
  return {
    month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: date.getDate().toString(),
    year: date.getFullYear().toString(),
    weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
  };
}

/** Format price to currency string */
export function formatPrice(amount: string, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(parseFloat(amount));
}
