"use client";

import { useState } from "react";

/* ---------- BASE64 URL DECODE ---------- */
function base64UrlDecode(str: string) {
  return JSON.parse(
    decodeURIComponent(
      atob(str.replace(/-/g, "+").replace(/_/g, "/"))
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    )
  );
}

/* ---------- VERIFY HS256 ---------- */
async function verifyHS256(
  data: string,
  signature: string,
  secret: string
) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const sigBytes = Uint8Array.from(
    atob(signature.replace(/-/g, "+").replace(/_/g, "/")),
    (c) => c.charCodeAt(0)
  );

  return crypto.subtle.verify(
    "HMAC",
    key,
    sigBytes,
    encoder.encode(data)
  );
}

export default function JwtVerifierPage() {
  const [token, setToken] = useState("");
  const [secret, setSecret] = useState("");
  const [header, setHeader] = useState<any>(null);
  const [payload, setPayload] = useState<any>(null);
  const [valid, setValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const verifyToken = async () => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) throw new Error();

      const [h, p, s] = parts;

      const decodedHeader = base64UrlDecode(h);
      const decodedPayload = base64UrlDecode(p);

      const isValid = await verifyHS256(`${h}.${p}`, s, secret);

      setHeader(decodedHeader);
      setPayload(decodedPayload);
      setValid(isValid);
      setError(null);
    } catch {
      setHeader(null);
      setPayload(null);
      setValid(null);
      setError("❌ Invalid JWT token or secret");
    }
  };

  const clearAll = () => {
    setToken("");
    setSecret("");
    setHeader(null);
    setPayload(null);
    setValid(null);
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
          JWT Signature Verifier
        </h1>

        <p className="text-gray-600 text-lg">
          Verify JWT signatures using HS256 and check token integrity instantly.
        </p>
      </section>

      {/* ---------- INPUTS ---------- */}
      <section className="space-y-4">
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste JWT token here..."
          className="w-full h-36 resize-none rounded-2xl border p-4
                     font-mono text-sm focus:outline-none
                     focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Enter secret key (HS256)"
          className="w-full rounded-xl border p-3 text-sm"
        />
      </section>

      {/* ---------- ACTIONS ---------- */}
      <section className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={verifyToken}
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white
                     hover:bg-indigo-700 transition font-medium"
        >
          Verify JWT
        </button>

        <button
          onClick={clearAll}
          className="px-6 py-3 rounded-xl border hover:bg-gray-100
                     transition font-medium"
        >
          Clear
        </button>
      </section>

      {/* ---------- STATUS ---------- */}
      {valid !== null && (
        <section
          className={`rounded-2xl border p-6 text-center font-medium ${
            valid
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {valid
            ? "✅ Signature is valid"
            : "❌ Invalid signature or wrong secret"}
        </section>
      )}

      {/* ---------- ERROR ---------- */}
      {error && (
        <section className="rounded-2xl border border-red-200 bg-red-50
                            p-4 text-center text-red-700 font-medium">
          {error}
        </section>
      )}

      {/* ---------- DECODED DATA ---------- */}
      {(header || payload) && (
        <section className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border bg-gray-50 p-6">
            <h3 className="font-semibold mb-2">Decoded Header</h3>
            <pre className="text-sm font-mono overflow-x-auto">
              {JSON.stringify(header, null, 2)}
            </pre>
          </div>

          <div className="rounded-2xl border bg-gray-50 p-6">
            <h3 className="font-semibold mb-2">Decoded Payload</h3>
            <pre className="text-sm font-mono overflow-x-auto">
              {JSON.stringify(payload, null, 2)}
            </pre>
          </div>
        </section>
      )}

      {/* ---------- SEO CONTENT ---------- */}
      <section className="bg-gray-50 border rounded-2xl p-8
                          text-sm text-gray-700 space-y-3">
        <h2 className="text-lg font-semibold">
          Online JWT Signature Verifier
        </h2>

        <p>
          ToolStack JWT Verifier allows you to verify the authenticity of JSON
          Web Tokens signed with the HS256 algorithm. This helps detect token
          tampering and invalid secrets.
        </p>

        <p>
          This tool runs entirely in your browser. JWT tokens and secrets are
          never sent to any server, ensuring privacy and security.
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>Verify HS256 JWT signatures</li>
          <li>Decode header and payload</li>
          <li>Instant validation result</li>
          <li>Perfect for debugging and learning</li>
        </ul>
      </section>
    </div>
  );
}
