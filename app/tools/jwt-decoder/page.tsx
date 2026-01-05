"use client";

import { useState } from "react";

function decodeBase64(str: string) {
  try {
    return JSON.parse(atob(str.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
}

export default function JwtDecoderPage() {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState<any>(null);
  const [payload, setPayload] = useState<any>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<"header" | "payload" | null>(null);

  const decodeJwt = () => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format");
      }

      const decodedHeader = decodeBase64(parts[0]);
      const decodedPayload = decodeBase64(parts[1]);

      if (!decodedHeader || !decodedPayload) {
        throw new Error("Unable to decode token");
      }

      setHeader(decodedHeader);
      setPayload(decodedPayload);
      setError("");
    } catch {
      setHeader(null);
      setPayload(null);
      setError("❌ Invalid JWT token");
    }
  };

  const copy = async (type: "header" | "payload") => {
    const data = type === "header" ? header : payload;
    if (!data) return;

    await navigator.clipboard.writeText(
      JSON.stringify(data, null, 2)
    );
    setCopied(type);
    setTimeout(() => setCopied(null), 1200);
  };

  const formatExpiry = (exp?: number) => {
    if (!exp) return "N/A";
    return new Date(exp * 1000).toLocaleString();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* ---------- HEADER ---------- */}
      <section className="text-center space-y-4 fade-up">
        <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium">
          Security Tool
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold">
          JWT Decoder
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Decode JSON Web Tokens and inspect header, payload, and expiry — fully
          in your browser.
        </p>
      </section>

      {/* ---------- INPUT ---------- */}
      <section className="fade-up fade-delay-1">
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste your JWT token here..."
          className="w-full h-28 resize-none rounded-xl border p-4 text-sm
                     font-mono focus:outline-none focus:ring-2
                     focus:ring-indigo-500"
        />
      </section>

      {/* ---------- ACTION ---------- */}
      <section className="flex justify-center fade-up fade-delay-2">
        <button
          onClick={decodeJwt}
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white
                     hover:bg-indigo-700 active:scale-95 transition
                     font-medium"
        >
          Decode Token
        </button>
      </section>

      {/* ---------- ERROR ---------- */}
      {error && (
        <div className="text-center text-red-600 font-medium fade-up">
          {error}
        </div>
      )}

      {/* ---------- OUTPUT ---------- */}
      {(header || payload) && (
        <section className="grid gap-6 md:grid-cols-2 fade-up fade-delay-3">
          {/* HEADER */}
          <div className="rounded-2xl border bg-white editor-shadow">
            <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-50">
              <span className="font-medium text-sm">Header</span>
              <button
                onClick={() => copy("header")}
                className="text-xs text-indigo-600 hover:underline"
              >
                {copied === "header" ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="p-4 text-sm font-mono overflow-auto">
              {JSON.stringify(header, null, 2)}
            </pre>
          </div>

          {/* PAYLOAD */}
          <div className="rounded-2xl border bg-white editor-shadow">
            <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-50">
              <span className="font-medium text-sm">Payload</span>
              <button
                onClick={() => copy("payload")}
                className="text-xs text-indigo-600 hover:underline"
              >
                {copied === "payload" ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="p-4 text-sm font-mono overflow-auto">
              {JSON.stringify(payload, null, 2)}
            </pre>

            {/* EXPIRY */}
            {payload?.exp && (
              <div className="px-4 py-3 border-t text-sm bg-gray-50">
                <span className="font-medium">Expires at:</span>{" "}
                {formatExpiry(payload.exp)}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ---------- INFO ---------- */}
      <section className="bg-gray-50 border rounded-xl p-6 text-sm text-gray-700 fade-up">
        <h2 className="font-semibold mb-2">What is a JWT Decoder?</h2>
        <p>
          A JWT decoder allows you to inspect the contents of a JSON Web Token
          without verifying its signature. This tool never sends your token to
          a server — everything runs locally in your browser.
        </p>
      </section>
    </div>
  );
}
