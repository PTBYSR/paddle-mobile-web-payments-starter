import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { MusicPlayer } from "@/components/music-player/music-player";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sakura AI",
  description: "Sakura AI, let AI handle your customer support",
  keywords: ["Sakura", "sakura", "AI", "AI agents", "customer support", "automation"],
  authors: [{ name: "Sakura" }],
  creator: "Sakura",
  publisher: "Sakura",
  metadataBase: new URL('https://www.sakurasupport.live'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Sakura AI",
    description: "AI agents that deliver excellent customer experiences at scale.",
    url: "https://www.sakurasupport.live",
    siteName: "Sakura AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sakura AI - AI for Customer Support",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sakura AI",
    description: "AI that deliver excellent customer experiences at scale.",
    images: ["/og-image.png"],
    creator: "@agentsakura_ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.svg', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" />
        <MusicPlayer />
      </body>
    </html>
  );
}
