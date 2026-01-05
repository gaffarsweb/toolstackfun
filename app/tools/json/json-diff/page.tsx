"use client";

import { useState } from "react";

/* ---------- JSON DIFF LOGIC ---------- */
function diffJson(obj1: any, obj2: any, path = ""): string[] {
  const changes: string[] = [];

  const keys = new Set([...Object.keys(obj1 || {}), ...Object.keys(obj2 || {})]);

  keys.forEach((key) => {
    const newPath = path ? `${path}.${key}` : key;

    if (!(key in obj1)) {
      changes.push(`➕ Added: ${newPath}`);
    } else if (!(key in obj2)) {
      changes.push(`➖ Removed: ${newPath}`);
    } else if (
      typeof obj1[key] === "object" &&
      typeof obj2[key] === "object" &&
      obj1[key] !== null &&
      obj2[key] !== null
    ) {
      changes.push(...diffJson(obj1[key], obj2[key], newPath));
    } else if (obj1[key] !== obj2[key]) {
      changes.push(
        `✏️ Changed: ${newPath} (${obj1[key]} → ${obj2[key]})`
      );
    }
  });

  return changes;
}

export default function JsonDiffPage() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [diffs, setDiffs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const compare = () => {
    try {
      const json1 = JSON.parse(left);
      const json2 = JSON.parse(right);

      const result = diffJson(json1, json2);
      setDiffs(result);
      setError(null);
    } catch {
      setError("❌ One or both JSON inputs are invalid.");
      setDiffs([]);
    }
  };

  const clearAll = () => {
    setLeft("");
    setRight("");
    setDiffs([]);
    setError(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-16">
      {/* ---------- HERO ---------- */}
      <section className="text-center max-w-3xl mx-auto">
        <span className="inline-block px-4 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium mb-4">
          JSON Tool
        </span>

        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          JSON Diff Checker
        </h1>

        <p className="text-gray-600 text-lg">
          Compare two JSON objects and instantly see what was added, removed, or
          changed.
        </p>
      </section>

      {/* ---------- INPUTS ---------- */}
      <section className="grid gap-6 md:grid-cols-2">
        <textarea
          value={left}
          onChange={(e) => setLeft(e.target.value)}
          placeholder='{\n  "id": 1,\n  "name": "Alice"\n}'
          className="w-full h-80 resize-none rounded-2xl border p-4
                     font-mono text-sm focus:outline-none
                     focus:ring-2 focus:ring-indigo-500"
        />

        <textarea
          value={right}
          onChange={(e) => setRight(e.target.value)}
          placeholder='{\n  "id": 1,\n  "name": "Bob"\n}'
          className="w-full h-80 resize-none rounded-2xl border p-4
                     font-mono text-sm focus:outline-none
                     focus:ring-2 focus:ring-indigo-500"
        />
      </section>

      {/* ---------- ACTIONS ---------- */}
      <section className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={compare}
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white
                     hover:bg-indigo-700 transition font-medium"
        >
          Compare JSON
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
      {diffs.length > 0 && (
        <section className="rounded-2xl border bg-white p-6 space-y-2">
          <h2 className="text-lg font-semibold mb-2">Differences</h2>

          <ul className="space-y-1 text-sm">
            {diffs.map((diff, i) => (
              <li key={i} className="font-mono">
                {diff}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------- NO DIFF ---------- */}
      {!error && diffs.length === 0 && left && right && (
        <section className="text-center text-green-600 font-medium">
          ✅ No differences found
        </section>
      )}

      {/* ---------- SEO CONTENT ---------- */}
      <section className="bg-gray-50 border rounded-2xl p-8
                          text-sm text-gray-700 space-y-3">
        <h2 className="text-lg font-semibold">
          Online JSON Diff Checker
        </h2>

        <p>
          ToolStack JSON Diff Checker helps you compare two JSON objects and
          quickly identify changes. It highlights added, removed, and modified
          fields clearly.
        </p>

        <p>
          This tool is useful for API responses, configuration files, debugging,
          and version comparison. All processing happens locally in your
          browser.
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>Compare JSON side by side</li>
          <li>Detect added, removed, and changed values</li>
          <li>Handles nested objects</li>
          <li>Fast, private, and free</li>
        </ul>
      </section>
    </div>
  );
}
