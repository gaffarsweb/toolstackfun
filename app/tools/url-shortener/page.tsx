"use client";

import { useState } from "react";

export default function UrlShortenerPage() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const shortenUrl = async () => {
    try {
      setLoading(true);
      setError("");
      setShortUrl("");

      const res = await fetch("/api/url-shortener", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setShortUrl(data.shortUrl);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-14">
      {/* ---------- HEADER ---------- */}
      <section className="text-center space-y-4 fade-up">
        <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium">
          Utility Tool
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold">
          URL Shortener
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Shorten long links into clean, shareable URLs instantly.
        </p>
      </section>

      {/* ---------- INPUT ---------- */}
      <section className="editor-shadow rounded-2xl border bg-white p-6 fade-up fade-delay-1">
        <label className="text-sm font-medium mb-2 block">
          Enter long URL
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/very/long/url"
          className="w-full rounded-xl border p-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={shortenUrl}
          disabled={loading}
          className="mt-4 px-6 py-3 rounded-xl bg-indigo-600 text-white
                     hover:bg-indigo-700 active:scale-95 transition
                     font-medium disabled:opacity-50"
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </section>

      {/* ---------- RESULT ---------- */}
      {shortUrl && (
        <section className="editor-shadow rounded-2xl border bg-gray-50 p-6 fade-up fade-delay-2">
          <p className="text-sm text-gray-600 mb-2">
            Your shortened URL
          </p>

          <div className="flex flex-col md:flex-row gap-3">
            <input
              readOnly
              value={shortUrl}
              className="flex-1 rounded-xl border p-3 text-sm font-mono"
            />

            <button
              onClick={copy}
              className="px-5 py-3 rounded-xl border bg-white
                         hover:bg-gray-100 transition font-medium"
            >
              {copied ? "✅ Copied" : "Copy"}
            </button>
          </div>
        </section>
      )}

      {/* ---------- ERROR ---------- */}
      {error && (
        <div className="text-center text-red-600 font-medium fade-up">
          {error}
        </div>
      )}

      {/* ---------- INFO ---------- */}
      <section className="bg-gray-50 border rounded-xl p-6 text-sm text-gray-700 fade-up">
        <h2 className="font-semibold mb-2">
          How does this URL shortener work?
        </h2>
        <p>
          This tool creates a short link that redirects to your original URL.
          Everything works instantly and securely.
        </p>
      </section>
    </div>
  );
}
