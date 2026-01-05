"use client";

import { useState } from "react";

/* ---------- BASE64 URL DECODE ---------- */
function base64UrlDecode(str: string) {
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
}

/* ---------- TIME FORMAT ---------- */
function formatRemaining(seconds: number) {
  if (seconds <= 0) return "Expired";

  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);

  return `${d}d ${h}h ${m}m`;
}

export default function JwtExpiryCheckerPage() {
  const [token, setToken] = useState("");
  const [payload, setPayload] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const checkExpiry = () => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) throw new Error();

      const decodedPayload = base64UrlDecode(parts[1]);
      if (!decodedPayload || !decodedPayload.exp) {
        throw new Error();
      }

      setPayload(decodedPayload);
      setError(null);
    } catch {
      setPayload(null);
      setError("❌ Invalid JWT or missing exp claim.");
    }
  };

  const clearAll = () => {
    setToken("");
    setPayload(null);
    setError(null);
  };

  const now = Math.floor(Date.now() / 1000);
  const remaining =
    payload?.exp ? payload.exp - now : null;

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      {/* ---------- HERO ---------- */}
      <section className="text-center max-w-3xl mx-auto">
        <span className="inline-block px-4 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium mb-4">
          JWT Tool
        </span>

        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          JWT Expiry Checker
        </h1>

        <p className="text-gray-600 text-lg">
          Check when a JWT token expires and how much time is left — instantly
          and securely.
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
          onClick={checkExpiry}
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white
                     hover:bg-indigo-700 transition font-medium"
        >
          Check Expiry
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
      {payload && (
        <section
          className={`rounded-2xl border p-6 text-center space-y-3 ${
            remaining && remaining > 0
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <h2 className="text-lg font-semibold">
            Token Status
          </h2>

          <p className="font-medium">
            {remaining && remaining > 0
              ? "✅ Token is valid"
              : "❌ Token is expired"}
          </p>

          <div className="text-sm text-gray-700 space-y-1">
            <div>
              <strong>Expiry Time:</strong>{" "}
              {new Date(payload.exp * 1000).toLocaleString()}
            </div>

            <div>
              <strong>Remaining:</strong>{" "}
              {remaining !== null
                ? formatRemaining(remaining)
                : "—"}
            </div>
          </div>
        </section>
      )}

      {/* ---------- PAYLOAD VIEW ---------- */}
      {payload && (
        <section className="rounded-2xl border bg-gray-50 p-6">
          <h3 className="font-semibold mb-2">
            Decoded Payload
          </h3>
          <pre className="text-sm font-mono overflow-x-auto">
            {JSON.stringify(payload, null, 2)}
          </pre>
        </section>
      )}

      {/* ---------- SEO CONTENT ---------- */}
      <section className="bg-gray-50 border rounded-2xl p-8
                          text-sm text-gray-700 space-y-3">
        <h2 className="text-lg font-semibold">
          Online JWT Expiry Checker
        </h2>

        <p>
          ToolStack JWT Expiry Checker allows you to instantly verify whether a
          JWT token is expired and how much time remains before expiration.
        </p>

        <p>
          This tool works entirely in your browser. JWT tokens are never sent to
          any server, making it safe and private for debugging and learning.
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>Instant expiry detection</li>
          <li>Readable expiration time</li>
          <li>Remaining validity duration</li>
          <li>Perfect for developers & students</li>
        </ul>
      </section>
    </div>
  );
}
