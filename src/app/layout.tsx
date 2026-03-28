import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import ShopifyProvider from "@/components/providers/ShopifyProvider";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tate Butts | Official Website",
  description:
    "Official website of Tate Butts — faith-driven music that speaks to the soul. Listen to My Defender and more.",
  keywords: [
    "Tate Butts",
    "My Defender",
    "Christian Music",
    "Worship",
    "Gospel",
  ],
  openGraph: {
    title: "Tate Butts | Official Website",
    description:
      "Faith-driven music that speaks to the soul. Listen to My Defender and more.",
    type: "website",
    locale: "en_US",
    siteName: "Tate Butts",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tate Butts | Official Website",
    description: "Faith-driven music that speaks to the soul.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <ShopifyProvider>{children}</ShopifyProvider>
      </body>
    </html>
  );
}
