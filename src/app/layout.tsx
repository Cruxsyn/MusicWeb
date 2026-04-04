import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, Permanent_Marker } from "next/font/google";
import ShopifyProvider from "@/components/providers/ShopifyProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
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
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${permanentMarker.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <ShopifyProvider>{children}</ShopifyProvider>
      </body>
    </html>
  );
}
