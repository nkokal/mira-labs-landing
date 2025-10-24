import type { Metadata, Viewport } from "next";
import { Noto_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  preload: true,
  variable: '--font-noto-sans',
})

const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  preload: true,
  variable: '--font-playfair-display',
})

export const metadata: Metadata = {
  title: "Mira Labs - AI Insight Engine for GTM Teams",
  description: "Turn sales calls into product intelligence. Automatically analyze Gong calls, CRM data, and sales notes to surface customer pain points, objections, and feature requests.",
  icons: {
    icon: [
      {
        url: "/logos/mira.png",
        type: "image/png",
        sizes: "32x32"
      },
      {
        url: "/logos/mira.png",
        type: "image/png",
        sizes: "16x16"
      }
    ],
    apple: [
      {
        url: "/logos/mira.png",
        type: "image/png",
        sizes: "180x180"
      }
    ],
    shortcut: [{ url: "/logos/mira.png" }],
    other: [
      {
        rel: "icon",
        url: "/logos/mira.png",
      },
    ],
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${notoSans.variable} ${playfairDisplay.variable}`}>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/logos/mira.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logos/mira.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logos/mira.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${notoSans.className} bg-white antialiased`}>{children}</body>
    </html>
  );
}
