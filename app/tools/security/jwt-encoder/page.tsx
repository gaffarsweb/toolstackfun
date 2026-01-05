"use client";

import { useState } from "react";

/* ---------- BASE64 URL ENCODE ---------- */
function base64UrlEncode(obj: any) {
  return btoa(JSON.stringify(obj))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

/* ---------- SIGN HS256 ---------- */
async function signHS256(data: string, secret: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(data)
  );

  return btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export default function JwtEncoderPage() {
  const [header, setHeader] = useState(
    JSON.stringify({ alg: "HS256", typ: "JWT" }, null, 2)
  );
  const [payload, setPayload] = useState(
    JSON.stringify({ sub: "1234567890", name: "John Doe", iat: 1516239022 }, null, 2)
  );
  const [secret, setSecret] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);

  const encodeJwt = async () => {
    try {
      const parsedHeader = JSON.parse(header);
      const parsedPayload = JSON.parse(payload);

      const encodedHeader = base64UrlEncode(parsedHeader);
      const encodedPayload = base64UrlEncode(parsedPayload);

      const data = `${encodedHeader}.${encodedPayload}`;
      const signature = await signHS256(data, secret);

      setToken(`${data}.${signature}`);
      setError(null);
    } catch {
      setError("❌ Invalid JSON in header or payload");
      setToken("");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      {/* ---------- HERO ---------- */}
      <section className="text-center max-w-3xl mx-auto">
        <span className="inline-block px-4 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium mb-4">
          JWT Tool
        </span>

        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          JWT Encoder
        </h1>

        <p className="text-gray-600 text-lg">
          Generate JSON Web Tokens (JWT) using custom headers, payloads, and
          secrets. Ideal for testing and development.
        </p>
      </section>

      {/* ---------- EDITORS ---------- */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* HEADER */}
        <div className="space-y-2">
          <label className="text-sm font-medium">JWT Header</label>
          <textarea
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            className="w-full h-48 rounded-2xl border p-4 font-mono text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* PAYLOAD */}
        <div className="space-y-2">
          <label className="text-sm font-medium">JWT Payload</label>
          <textarea
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            className="w-full h-48 rounded-2xl border p-4 font-mono text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </section>

      {/* ---------- SECRET ---------- */}
      <section className="max-w-xl mx-auto space-y-2">
        <label className="text-sm font-medium">Secret (HS256)</label>
        <input
          type="text"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Enter secret key"
          className="w-full rounded-xl border p-3 text-sm"
        />
      </section>

      {/* ---------- ACTION ---------- */}
      <section className="flex justify-center">
        <button
          onClick={encodeJwt}
          className="px-8 py-3 rounded-xl bg-indigo-600 text-white
                     hover:bg-indigo-700 transition font-medium"
        >
          Generate JWT
        </button>
      </section>

      {/* ---------- RESULT ---------- */}
      {token && (
        <section className="rounded-2xl border bg-gray-50 p-6 font-mono text-sm break-all">
          {token}
        </section>
      )}

      {/* ---------- ERROR ---------- */}
      {error && (
        <section className="rounded-2xl border border-red-200 bg-red-50
                            p-4 text-center text-red-700 font-medium">
          {error}
        </section>
      )}

      {/* ---------- SEO CONTENT ---------- */}
      <section className="bg-gray-50 border rounded-2xl p-8
                          text-sm text-gray-700 space-y-3">
        <h2 className="text-lg font-semibold">
          Online JWT Encoder Tool
        </h2>

        <p>
          ToolStack JWT Encoder allows you to generate JSON Web Tokens using the
          HS256 algorithm. This tool is useful for testing authentication flows,
          APIs, and secure token handling.
        </p>

        <p>
          All operations run locally in your browser. Secrets and payloads are
          never sent to any server, ensuring privacy and security.
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>Generate JWT tokens instantly</li>
          <li>Custom headers and payloads</li>
          <li>Secure client-side encoding</li>
          <li>Free and easy to use</li>
        </ul>
      </section>
    </div>
  );
}
