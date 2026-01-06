"use client";

import { useState } from "react";

/* ---------- BASE64 URL SAFE DECODE ---------- */
function base64UrlDecode(str: string) {
  try {
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "="
    );

    const decoded = atob(padded);
    return JSON.parse(
      decodeURIComponent(
        decoded
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      )
    );
  } catch {
    return null;
  }
}

export default function JwtBase64DecoderPage() {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState<any>(null);
  const [payload, setPayload] = useState<any>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const decodeToken = () => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) throw new Error();

      const [h, p, s] = parts;

      const decodedHeader = base64UrlDecode(h);
      const decodedPayload = base64UrlDecode(p);

      if (!decodedHeader || !decodedPayload) throw new Error();

      setHeader(decodedHeader);
      setPayload(decodedPayload);
      setSignature(s);
      setError(null);
    } catch {
      setHeader(null);
      setPayload(null);
      setSignature(null);
      setError("❌ Invalid JWT token");
    }
  };

  const clearAll = () => {
    setToken("");
    setHeader(null);
    setPayload(null);
    setSignature(null);
    setError(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      {/* ---------- HERO ---------- */}
      <section className="text-center max-w-3xl mx-auto">
        <span className="inline-block px-4 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium mb-4">
          JWT Tool
        </span>

        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          JWT Base64 Decoder
        </h1>

        <p className="text-gray-600 text-lg">
          Decode JWT Base64 segments and inspect header, payload, and signature
          instantly.
        </p>
      </section>

      {/* ---------- INPUT ---------- */}
      <section className="space-y-4">
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste JWT token here..."
          className="w-full h-40 resize-none rounded-2xl border p-4
                     font-mono text-sm focus:outline-none
                     focus:ring-2 focus:ring-indigo-500"
        />
      </section>

      {/* ---------- ACTIONS ---------- */}
      <section className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={decodeToken}
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white
                     hover:bg-indigo-700 transition font-medium"
        >
          Decode Token
        </button>

        <button
          onClick={clearAll}
          className="px-6 py-3 rounded-xl border hover:bg-gray-100
                     transition font-medium"
        >
          Clear
        </button>
      </section>

      {/* ---------- ERROR ---------- */}
      {error && (
        <section className="rounded-2xl border border-red-200 bg-red-50
                            p-4 text-center text-red-700 font-medium">
          {error}
        </section>
      )}

      {/* ---------- RESULT ---------- */}
      {(header || payload) && (
        <section className="grid md:grid-cols-3 gap-6">
          {/* HEADER */}
          <div className="rounded-2xl border bg-gray-50 p-6">
            <h3 className="font-semibold mb-2">Header</h3>
            <pre className="text-sm font-mono overflow-x-auto">
              {JSON.stringify(header, null, 2)}
            </pre>
          </div>

          {/* PAYLOAD */}
          <div className="rounded-2xl border bg-gray-50 p-6">
            <h3 className="font-semibold mb-2">Payload</h3>
            <pre className="text-sm font-mono overflow-x-auto">
              {JSON.stringify(payload, null, 2)}
            </pre>
          </div>

          {/* SIGNATURE */}
          <div className="rounded-2xl border bg-gray-50 p-6">
            <h3 className="font-semibold mb-2">Signature</h3>
            <pre className="text-xs font-mono break-all">
              {signature}
            </pre>
          </div>
        </section>
      )}

      {/* ---------- SEO CONTENT ---------- */}
      <section className="bg-gray-50 border rounded-2xl p-8
                          text-sm text-gray-700 space-y-3">
        <h2 className="text-lg font-semibold">
          Online JWT Base64 Decoder
        </h2>

        <p>
          ToolStack JWT Base64 Decoder helps you inspect the raw Base64-encoded
          components of a JSON Web Token. This is useful for debugging,
          learning, and understanding JWT internals.
        </p>

        <p>
          This decoder does not verify signatures or secrets. All decoding
          happens locally in your browser — no data is sent to any server.
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>Decode JWT header and payload</li>
          <li>View Base64 signature</li>
          <li>Safe & private</li>
          <li>Perfect for students and developers</li>
        </ul>
      </section>
    </div>
  );
}
