"use client";

import { useState } from "react";

export default function JsonMinifierPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
    } catch (err: any) {
      setError("❌ Invalid JSON. Please fix syntax errors before minifying.");
      setOutput("");
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError(null);
    setCopied(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      {/* ---------- HERO ---------- */}
      <section className="text-center max-w-3xl mx-auto">
        <span className="inline-block px-4 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium mb-4">
          JSON Tool
        </span>

        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          JSON Minifier
        </h1>

        <p className="text-gray-600 text-lg">
          Minify JSON by removing unnecessary spaces and line breaks. Perfect
          for production APIs and faster data transfer.
        </p>
      </section>

      {/* ---------- EDITORS ---------- */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* INPUT */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Input JSON</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{\n  "name": "ToolStack",\n  "version": 1\n}'
            className="w-full h-80 resize-none rounded-2xl border p-4
                       font-mono text-sm focus:outline-none
                       focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* OUTPUT */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Minified JSON</label>
          <textarea
            value={output}
            readOnly
            placeholder="Minified JSON will appear here..."
            className="w-full h-80 resize-none rounded-2xl border p-4
                       font-mono text-sm bg-gray-50"
          />
        </div>
      </section>

      {/* ---------- ACTIONS ---------- */}
      <section className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={minifyJson}
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white
                     hover:bg-indigo-700 transition font-medium"
        >
          Minify JSON
        </button>

        <button
          onClick={copyToClipboard}
          disabled={!output}
          className="px-6 py-3 rounded-xl border hover:bg-gray-100
                     transition font-medium disabled:opacity-50"
        >
          {copied ? "✅ Copied" : "Copy"}
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

      {/* ---------- SEO CONTENT ---------- */}
      <section className="bg-gray-50 border rounded-2xl p-8
                          text-sm text-gray-700 space-y-3">
        <h2 className="text-lg font-semibold">
          Online JSON Minifier Tool
        </h2>

        <p>
          ToolStack JSON Minifier helps you reduce JSON file size by removing
          unnecessary whitespace, indentation, and line breaks. This improves
          performance when sending JSON data over networks.
        </p>

        <p>
          This tool works entirely in your browser, ensuring your data remains
          private and secure. No uploads or registration required.
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>Minify JSON instantly</li>
          <li>Error handling for invalid JSON</li>
          <li>Fast & lightweight</li>
          <li>Ideal for developers & students</li>
        </ul>
      </section>
    </div>
  );
}
