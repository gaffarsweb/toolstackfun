"use client";

import { useRef, useState } from "react";

export default function JsonFormatterPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const [leftWidth, setLeftWidth] = useState(50);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch {
      setError("❌ Invalid JSON. Please check your input.");
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
    setError("");
  };

  /* ---------- DRAG LOGIC ---------- */
  const onMouseDown = () => {
    isDragging.current = true;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newWidth = ((e.clientX - rect.left) / rect.width) * 100;

    if (newWidth > 25 && newWidth < 75) {
      setLeftWidth(newWidth);
    }
  };

  const stopDrag = () => {
    isDragging.current = false;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* ---------- HEADER ---------- */}
      <section className="text-center space-y-4 fade-up">
        <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium">
          Developer Tool
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold">
          JSON Formatter & Validator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Clean, format, and validate JSON instantly — directly in your browser.
        </p>
      </section>

      {/* ---------- EDITOR ---------- */}
      <section
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        className="editor-enter editor-shadow flex rounded-2xl overflow-hidden border bg-white"
        style={{ height: "26rem" }}
      >
        {/* INPUT */}
        <div style={{ width: `${leftWidth}%` }} className="flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 text-sm font-medium border-b bg-gray-50">
            <span>Input JSON</span>
            <span className="text-xs text-gray-500">Paste here</span>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name":"ToolStack","version":1}'
            className="flex-1 resize-none p-4 text-sm font-mono
                       focus:outline-none bg-white"
          />
        </div>

        {/* DRAG HANDLE */}
        <div
          onMouseDown={onMouseDown}
          className="drag-handle w-3 flex items-center justify-center
                     cursor-col-resize bg-gray-100 hover:bg-indigo-100
                     transition"
        />

        {/* OUTPUT */}
        <div
          style={{ width: `${100 - leftWidth}%` }}
          className="flex flex-col bg-gray-50"
        >
          <div className="flex items-center justify-between px-4 py-2 text-sm font-medium border-b">
            <span>Formatted Output</span>
            <span className="text-xs text-gray-500">Read only</span>
          </div>

          <textarea
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here..."
            className="flex-1 resize-none p-4 text-sm font-mono
                       bg-gray-50 focus:outline-none"
          />
        </div>
      </section>

      {/* ---------- ACTION BAR ---------- */}
      <section className="flex flex-wrap gap-4 justify-center fade-up">
        <button
          onClick={formatJson}
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white
                     hover:bg-indigo-700 active:scale-95 transition font-medium"
        >
          Format JSON
        </button>

        <button
          onClick={copyToClipboard}
          disabled={!output}
          className="px-6 py-3 rounded-xl border bg-white
                     hover:bg-gray-100 active:scale-95 transition font-medium"
        >
          {copied ? "✅ Copied" : "Copy"}
        </button>

        <button
          onClick={clearAll}
          className="px-6 py-3 rounded-xl border bg-white
                     hover:bg-gray-100 active:scale-95 transition font-medium"
        >
          Clear
        </button>
      </section>

      {/* ---------- ERROR ---------- */}
      {error && (
        <div className="text-center text-red-600 font-medium fade-up">
          {error}
        </div>
      )}
    </div>
  );
}
