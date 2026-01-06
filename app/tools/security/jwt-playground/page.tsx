"use client";

import { useEffect, useState } from "react";

/* ---------- BASE64 URL ---------- */
const b64e = (obj: any) =>
  btoa(JSON.stringify(obj))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

const b64d = (str: string) => {
  try {
    return JSON.parse(
      decodeURIComponent(
        atob(str.replace(/-/g, "+").replace(/_/g, "/"))
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      )
    );
  } catch {
    return null;
  }
};

/* ---------- SIGN HS256 ---------- */
async function signHS256(data: string, secret: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));

  return btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export default function JwtPlaygroundPage() {
  const [header, setHeader] = useState(
    JSON.stringify({ alg: "HS256", typ: "JWT" }, null, 2)
  );
  const [payload, setPayload] = useState(
    JSON.stringify(
      { sub: "1234567890", name: "John Doe", exp: Math.floor(Date.now() / 1000) + 3600 },
      null,
      2
    )
  );
  const [secret, setSecret] = useState("secret");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  /* ---------- GENERATE TOKEN ---------- */
  useEffect(() => {
    generate();
  }, [header, payload, secret]);

  const generate = async () => {
    try {
      const h = JSON.parse(header);
      const p = JSON.parse(payload);

      const eh = b64e(h);
      const ep = b64e(p);
      const sig = await signHS256(`${eh}.${ep}`, secret);

      setToken(`${eh}.${ep}.${sig}`);
      setStatus("valid");
    } catch {
      setToken("");
      setStatus("invalid-json");
    }
  };

  /* ---------- DECODE ---------- */
  const parts = token.split(".");
  const decodedHeader = parts[0] ? b64d(parts[0]) : null;
  const decodedPayload = parts[1] ? b64d(parts[1]) : null;

  /* ---------- EXPIRY ---------- */
  const now = Math.floor(Date.now() / 1000);
  const expired =
    decodedPayload?.exp && decodedPayload.exp < now;

  return (
    <div className="max-w-7xl mx-auto space-y-16">
      {/* ---------- HERO ---------- */}
      <section className="text-center max-w-4xl mx-auto">
        <span className="inline-block px-4 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium mb-4">
          JWT Tool
        </span>

        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          JWT Playground
        </h1>

        <p className="text-gray-600 text-lg">
          Decode, encode, verify, and experiment with JSON Web Tokens — all in
          one interactive playground.
        </p>
      </section>

      {/* ---------- EDITORS ---------- */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* HEADER */}
        <div>
          <label className="text-sm font-medium">Header</label>
          <textarea
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            className="w-full h-40 rounded-xl border p-4 font-mono text-sm"
          />
        </div>

        {/* PAYLOAD */}
        <div>
          <label className="text-sm font-medium">Payload</label>
          <textarea
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            className="w-full h-40 rounded-xl border p-4 font-mono text-sm"
          />
        </div>
      </section>

      {/* ---------- SECRET ---------- */}
      <section className="max-w-xl mx-auto">
        <label className="text-sm font-medium">Secret (HS256)</label>
        <input
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
      </section>

      {/* ---------- TOKEN ---------- */}
      {token && (
        <section className="rounded-2xl border bg-gray-50 p-6 font-mono text-sm break-all">
          {token}
        </section>
      )}

      {/* ---------- STATUS ---------- */}
      {status && (
        <section
          className={`rounded-xl p-4 text-center font-medium ${
            status === "valid"
              ? expired
                ? "bg-yellow-50 text-yellow-700"
                : "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {status === "invalid-json"
            ? "❌ Invalid JSON"
            : expired
            ? "⚠️ Token expired"
            : "✅ Token valid"}
        </section>
      )}

      {/* ---------- DECODED ---------- */}
      {(decodedHeader || decodedPayload) && (
        <section className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border bg-gray-50 p-6">
            <h3 className="font-semibold mb-2">Decoded Header</h3>
            <pre className="text-sm font-mono overflow-x-auto">
              {JSON.stringify(decodedHeader, null, 2)}
            </pre>
          </div>

          <div className="rounded-xl border bg-gray-50 p-6">
            <h3 className="font-semibold mb-2">Decoded Payload</h3>
            <pre className="text-sm font-mono overflow-x-auto">
              {JSON.stringify(decodedPayload, null, 2)}
            </pre>
          </div>
        </section>
      )}

      {/* ---------- SEO ---------- */}
      <section className="bg-gray-50 border rounded-2xl p-8 text-sm text-gray-700 space-y-3">
        <h2 className="text-lg font-semibold">
          Online JWT Playground
        </h2>

        <p>
          ToolStack JWT Playground is an all-in-one tool that lets you encode,
          decode, verify, and inspect JWT tokens interactively. Ideal for
          developers learning authentication and debugging APIs.
        </p>

        <p>
          Everything runs locally in your browser. Secrets and tokens are never
          uploaded to any server.
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>Live JWT encoding</li>
          <li>Instant decoding</li>
          <li>Expiry detection</li>
          <li>Safe & private</li>
        </ul>
      </section>
    </div>
  );
}
