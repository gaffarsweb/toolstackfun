// app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToolStack.fun – Free Online Developer Tools",
  description:
    "Free online developer tools like JSON Formatter, JWT Decoder, QR Code Generator, URL Shortener, and Image Tools.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
