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
    "ToolStack.fun provides free online tools for developers and students. Use JSON tools, JWT tools, image utilities, converters, validators, and more — fast, secure, and browser-based.",

  keywords: [
    "ToolStack",
    "ToolStack.fun",
    "free online tools",
    "developer tools",
    "student tools",
    "json formatter",
    "json validator",
    "jwt decoder",
    "jwt tools",
    "image compressor",
    "image converter",
    "online utilities",
    "web developer tools",
  ],

  authors: [{ name: "ToolStack Team", url: "https://www.toolstack.fun" }],
  creator: "ToolStack.fun",
  publisher: "ToolStack.fun",

  applicationName: "ToolStack.fun",
  category: "Technology",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://www.toolstack.fun",
    languages: {
      "en": "https://www.toolstack.fun",
      "en-IN": "https://www.toolstack.fun",
    },
  },

  openGraph: {
    type: "website",
    siteName: "ToolStack.fun",
    url: "https://www.toolstack.fun",
    title: "ToolStack.fun – Free Online Developer Tools",
    description:
      "Free online tools for developers and students. JSON, JWT, Image tools and more. Fast, secure and browser-based utilities.",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ToolStack.fun – Free Online Developer Tools",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@toolstackfun", // optional (can remove if not used)
    title: "ToolStack.fun – Free Online Developer Tools",
    description:
      "Free online tools for developers and students. JSON, JWT, Image utilities and more.",
    images: ["/og-image.png"],
  },

  verification: {
    google: "ADD_GOOGLE_SEARCH_CONSOLE_CODE_HERE",
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
        <meta name="google-adsense-account" content="ca-pub-8948084257860499"></meta>
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
