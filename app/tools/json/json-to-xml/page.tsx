"use client";

import { useState } from "react";

/* ---------- JSON → XML CONVERTER ---------- */
function jsonToXml(obj: any, indent = "", pretty = true): string {
  let xml = "";

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const value = obj[key];
    const space = pretty ? indent : "";
    const newline = pretty ? "\n" : "";

    if (Array.isArray(value)) {
      value.forEach((item) => {
        xml += `${space}<${key}>${newline}`;
        xml += jsonToXml(item, indent + (pretty ? "  " : ""), pretty);
        xml += `${space}</${key}>${newline}`;
      });
    } else if (typeof value === "object" && value !== null) {
      xml += `${space}<${key}>${newline}`;
      xml += jsonToXml(value, indent + (pretty ? "  " : ""), pretty);
      xml += `${space}</${key}>${newline}`;
    } else {
      xml += `${space}<${key}>${value}</${key}>${newline}`;
    }
  }

  return xml;
}

export default function JsonToXmlPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pretty, setPretty] = useState(true);
  const [copied, setCopied] = useState(false);

  const convert = () => {
    try {
      const parsed = JSON.parse(input);
      const xml =
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<root>\n` +
        jsonToXml(parsed, "  ", pretty) +
        `</root>`;

      setOutput(xml);
      setError(null);
    } catch (err) {
      setError("❌ Invalid JSON. Please fix errors before converting.");
      setOutput("");
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadXml = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "data.xml";
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
          JSON to XML Converter
        </h1>

        <p className="text-gray-600 text-lg">
          Convert JSON data into clean, structured XML instantly. Perfect for
          APIs, data exchange, and legacy systems.
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
            placeholder='{\n  "user": {\n    "id": 1,\n    "name": "John"\n  }\n}'
            className="w-full h-80 resize-none rounded-2xl border p-4
                       font-mono text-sm focus:outline-none
                       focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* OUTPUT */}
        <div className="space-y-2">
          <label className="text-sm font-medium">XML Output</label>
          <textarea
            value={output}
            readOnly
            placeholder="Converted XML will appear here..."
            className="w-full h-80 resize-none rounded-2xl border p-4
                       font-mono text-sm bg-gray-50"
          />
        </div>
      </section>

      {/* ---------- OPTIONS ---------- */}
      <section className="flex flex-wrap gap-6 justify-center items-center">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={pretty}
            onChange={() => setPretty(!pretty)}
          />
          Pretty format XML
        </label>
      </section>

      {/* ---------- ACTIONS ---------- */}
      <section className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={convert}
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white
                     hover:bg-indigo-700 transition font-medium"
        >
          Convert to XML
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
          onClick={downloadXml}
          disabled={!output}
          className="px-6 py-3 rounded-xl border hover:bg-gray-100
                     transition font-medium disabled:opacity-50"
        >
          Download XML
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
          Online JSON to XML Converter
        </h2>

        <p>
          ToolStack JSON to XML Converter helps you transform JSON data into XML
          format instantly. This is useful for APIs, configuration files, and
          systems that require XML-based data exchange.
        </p>

        <p>
          The conversion happens entirely in your browser. Your data is never
          uploaded to any server, ensuring complete privacy and security.
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>Convert JSON objects and arrays</li>
          <li>Pretty or compact XML output</li>
          <li>Error handling for invalid JSON</li>
          <li>Fast and free to use</li>
        </ul>
      </section>
    </div>
  );
}
