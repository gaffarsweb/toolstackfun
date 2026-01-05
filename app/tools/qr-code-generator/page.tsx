"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

export default function QrCodeGeneratorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [text, setText] = useState("");
  const [size, setSize] = useState(220);
  const [error, setError] = useState("");
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    if (!text || !canvasRef.current) return;

    QRCode.toCanvas(canvasRef.current, text, {
      width: size,
      margin: 2,
      color: {
        dark: "#111827",
        light: "#ffffff",
      },
    })
      .then(() => {
        setGenerated(true);
        setError("");
      })
      .catch(() => {
        setError("❌ Unable to generate QR Code");
        setGenerated(false);
      });
  }, [text, size]);

  const downloadQr = () => {
    if (!canvasRef.current) return;

    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* ---------- HEADER ---------- */}
      <section className="text-center space-y-4 fade-up">
        <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium">
          Utility Tool
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold">
          QR Code Generator
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Generate QR codes instantly for URLs, text, or any data — directly in
          your browser.
        </p>
      </section>

      {/* ---------- MAIN ---------- */}
      <section className="grid gap-10 md:grid-cols-2 items-center">
        {/* INPUT */}
        <div className="space-y-4 fade-up fade-delay-1">
          <label className="text-sm font-medium">
            Enter text or URL
          </label>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="https://toolstack.fun"
            className="w-full h-32 resize-none rounded-xl border p-4 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* SIZE CONTROL */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              QR Code Size: {size}px
            </label>
            <input
              type="range"
              min={120}
              max={360}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>

        {/* OUTPUT */}
        <div className="flex flex-col items-center gap-4 fade-up fade-delay-2">
          <div className="editor-shadow rounded-2xl bg-white p-4">
            {text ? (
              <canvas ref={canvasRef} />
            ) : (
              <div className="w-[220px] h-[220px] flex items-center justify-center text-sm text-gray-400">
                QR Preview
              </div>
            )}
          </div>

          <button
            onClick={downloadQr}
            disabled={!generated}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white
                       hover:bg-indigo-700 disabled:opacity-50
                       transition font-medium"
          >
            Download PNG
          </button>
        </div>
      </section>

      {/* ---------- ERROR ---------- */}
      {error && (
        <div className="text-center text-red-600 font-medium fade-up">
          {error}
        </div>
      )}

      {/* ---------- INFO ---------- */}
      <section className="bg-gray-50 border rounded-xl p-6 text-sm text-gray-700 fade-up">
        <h2 className="font-semibold mb-2">
          What is a QR Code Generator?
        </h2>
        <p>
          A QR code generator converts text or URLs into scannable QR codes.
          This tool works entirely in your browser — no data is sent to any
          server.
        </p>
      </section>
    </div>
  );
}
