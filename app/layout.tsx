// app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.toolstack.fun"),

  title: {
    default: "ToolStack.fun – Free Online Developer Tools",
    template: "%s | ToolStack.fun",
  },

  description:
    "ToolStack.fun offers free online developer tools like JSON Formatter, JWT Tools, Image Tools, Text Utilities and more. Built for students and developers.",

  keywords: [
    "online tools",
    "developer tools",
    "json tools",
    "jwt tools",
    "image tools",
    "free online tools",
    "toolstack",
  ],

  authors: [{ name: "ToolStack Team" }],
  creator: "ToolStack.fun",
  publisher: "ToolStack.fun",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    type: "website",
    siteName: "ToolStack.fun",
    url: "https://www.toolstack.fun",
    title: "ToolStack.fun – Free Online Developer Tools",
    description:
      "Free online tools for developers and students. JSON, JWT, Image, Text and more.",
    images: [
      {
        url: "/og-image.png", // optional (add later)
        width: 1200,
        height: 630,
        alt: "ToolStack.fun",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ToolStack.fun – Free Online Developer Tools",
    description:
      "Free online tools for developers and students. JSON, JWT, Image, Text and more.",
  },

  alternates: {
    canonical: "https://www.toolstack.fun",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8948084257860499"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* ---------- HEADER ---------- */}
        <header className="bg-black text-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-extrabold tracking-wide">
              ToolStack<span className="text-indigo-400">.fun</span>
            </Link>

            <nav className="flex gap-6 text-sm font-medium">
              <Link
                href="/tools/json-formatter"
                className="hover:text-indigo-400 transition-colors"
              >
                Tools
              </Link>
              <Link
                href="/blog"
                className="hover:text-indigo-400 transition-colors"
              >
                Blog
              </Link>
            </nav>
          </div>
        </header>

        {/* ---------- MAIN CONTENT ---------- */}
        <main className="flex-1 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-10">
            {children}
          </div>
        </main>

        {/* ---------- FOOTER ---------- */}
        <footer className="bg-black text-gray-400">
          <div className="max-w-7xl mx-auto px-4 py-6 text-sm flex flex-col md:flex-row justify-between gap-2">
            <p>© {new Date().getFullYear()} ToolStack.fun</p>
            <div className="space-x-4">
              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
