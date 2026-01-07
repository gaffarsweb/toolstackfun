import AdUnit from "@/app/components/AdUnit";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title:
    "JWT Tools – Decode, Encode, Verify & Test JWT Tokens | ToolStack.fun",
  description:
    "Free online JWT tools to decode, encode, verify signatures, check expiry, and test JSON Web Tokens securely. Browser-based JWT utilities for developers and students.",
  keywords: [
    "JWT Decoder",
    "JWT Encoder",
    "JWT Verifier",
    "JWT Expiry Checker",
    "JWT Base64 Decoder",
    "JWT Playground",
    "JSON Web Token Tools",
    "Security Tools",
    "Developer Tools",
  ],
  alternates: {
    canonical: "https://www.toolstack.fun/tools/security",
  },
  openGraph: {
    title: "Free Online JWT Tools | ToolStack.fun",
    description:
      "Decode, generate, verify, and experiment with JWT tokens safely using free browser-based tools.",
    url: "https://www.toolstack.fun/tools/security",
    siteName: "ToolStack.fun",
    type: "website",
  },
};
const jwtTools = [
  {
    title: "JWT Decoder",
    description: "Decode JWT tokens and inspect header & payload",
    icon: "🔐",
    href: "/tools/security/jwt-decoder",
  },
  {
    title: "JWT Encoder",
    description: "Generate JWT tokens with custom payload",
    icon: "🧪",
    href: "/tools/security/jwt-encoder",
  },
  {
    title: "JWT Expiry Checker",
    description: "Check token expiration and validity time",
    icon: "⏰",
    href: "/tools/security/jwt-expiry-checker",
  },
  {
    title: "JWT Signature Verifier",
    description: "Verify JWT signature using secret or public key",
    icon: "🛡️",
    href: "/tools/security/jwt-verifier",
  },
  {
    title: "JWT Base64 Decoder",
    description: "Decode JWT Base64 parts manually",
    icon: "🔓",
    href: "/tools/security/jwt-base64-decoder",
  },
  {
    title: "JWT Playground",
    description: "Test and experiment with JWT tokens safely",
    icon: "🧩",
    href: "/tools/security/jwt-playground",
  },
];

export default function JwtToolsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-20">
      {/* ---------- HERO ---------- */}
      <section className="text-center max-w-3xl mx-auto fade-up">
        <span className="inline-block px-4 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium mb-4">
          JWT Tools
        </span>

        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          Free Online JWT Tools
        </h1>

        <p className="text-gray-600 text-lg">
          Decode, verify, generate, and analyze JWT tokens easily — all inside
          your browser.
        </p>
      </section>

      {/* ---------- TOOL GRID ---------- */}
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 fade-up fade-delay-1">
        {jwtTools.map((tool, index) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group bg-white border rounded-3xl p-6
                       hover:shadow-xl transition-all duration-300
                       hover:-translate-y-1"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {/* ICON */}
            <div className="text-4xl mb-4">{tool.icon}</div>

            {/* TITLE */}
            <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-600 transition">
              {tool.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-600 mb-4">
              {tool.description}
            </p>

            {/* CTA */}
            <span className="text-sm font-medium text-indigo-600">
              Open tool →
            </span>
          </Link>
        ))}
      </section>
      <AdUnit slot="1230567890" />
      {/* ---------- INFO / TRUST ---------- */}
      <section className="bg-gray-50 border rounded-3xl p-10 text-center fade-up fade-delay-2">
        <h2 className="text-2xl font-bold mb-3">
          Why use ToolStack JWT Tools?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          ToolStack JWT tools help developers debug, test, and understand JWT
          tokens without exposing sensitive data. Everything runs locally in
          your browser.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-700">
          <span>✔ Decode tokens instantly</span>
          <span>✔ No server uploads</span>
          <span>✔ Secure & private</span>
          <span>✔ Developer friendly</span>
        </div>
      </section>
    </div>
  );
}
