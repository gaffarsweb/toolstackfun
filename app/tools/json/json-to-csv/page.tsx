"use client";

import { useState } from "react";

/* ---------- FLATTEN JSON FOR CSV ---------- */
function flattenObject(
  obj: any,
  parentKey = "",
  result: Record<string, any> = {}
) {
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const newKey = parentKey ? `${parentKey}.${key}` : key;
    const value = obj[key];

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      flattenObject(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

/* ---------- JSON TO CSV ---------- */
function jsonToCsv(json: any[]): string {
  const rows = json.map((item) => flattenObject(item));

  const headers = Array.from(
    new Set(rows.flatMap((row) => Object.keys(row)))
  );

  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((h) => {
          const value = row[h] ?? "";
          const escaped = String(value).replace(/"/g, '""');
          return `"${escaped}"`;
        })
        .join(",")
    ),
  ];

  return csv.join("\n");
}

export default function JsonToCsvPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const convert = () => {
    try {
      const parsed = JSON.parse(input);

      if (!Array.isArray(parsed)) {
        throw new Error("JSON must be an array of objects.");
      }

      const csv = jsonToCsv(parsed);
      setOutput(csv);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid JSON input.");
      setOutput("");
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadCsv = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();

    URL.revokeObjectURL(url);
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
          JSON to CSV Converter
        </h1>

        <p className="text-gray-600 text-lg">
          Convert JSON arrays into CSV format instantly. Ideal for spreadsheets,
          analytics, and data exports.
        </p>
      </section>

      {/* ---------- EDITORS ---------- */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* INPUT */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Input JSON (Array)</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`[
  { "id": 1, "name": "Alice", "email": "alice@test.com" },
  { "id": 2, "name": "Bob", "email": "bob@test.com" }
]`}
            className="w-full h-80 resize-none rounded-2xl border p-4
                       font-mono text-sm focus:outline-none
                       focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* OUTPUT */}
        <div className="space-y-2">
          <label className="text-sm font-medium">CSV Output</label>
          <textarea
            value={output}
            readOnly
            placeholder="Converted CSV will appear here..."
            className="w-full h-80 resize-none rounded-2xl border p-4
                       font-mono text-sm bg-gray-50"
          />
        </div>
      </section>

      {/* ---------- ACTIONS ---------- */}
      <section className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={convert}
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white
                     hover:bg-indigo-700 transition font-medium"
        >
          Convert to CSV
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
          onClick={downloadCsv}
          disabled={!output}
          className="px-6 py-3 rounded-xl border hover:bg-gray-100
                     transition font-medium disabled:opacity-50"
        >
          Download CSV
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
          Online JSON to CSV Converter
        </h2>

        <p>
          ToolStack JSON to CSV Converter allows you to convert structured JSON
          data into CSV format for use in Excel, Google Sheets, and data analysis
          tools.
        </p>

        <p>
          This tool supports nested JSON objects by flattening them into
          dot-notation columns. All processing happens locally in your browser.
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>Convert JSON arrays to CSV</li>
          <li>Supports nested objects</li>
          <li>Copy or download CSV</li>
          <li>Fast, free, and secure</li>
        </ul>
      </section>
    </div>
  );
}
