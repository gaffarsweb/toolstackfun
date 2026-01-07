"use client";

import { useEffect, useRef, useState } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Image Compressor – Reduce Image Size Online Without Quality Loss | ToolStack.fun",
  description:
    "Free online image compressor to reduce image file size using real quality-based compression. Compress JPG, JPEG, and PNG images securely in your browser without uploading files.",
  keywords: [
    "Image Compressor",
    "Compress Image Online",
    "Reduce Image Size",
    "JPG Compressor",
    "JPEG Compressor",
    "PNG Compressor",
    "Online Image Tools",
    "Free Image Compressor",
  ],
  alternates: {
    canonical:
      "https://www.toolstack.fun/tools/image/image-compressor",
  },
  openGraph: {
    title: "Free Online Image Compressor | ToolStack.fun",
    description:
      "Compress images using real quality-based compression. Fast, secure, and browser-based image compression tool.",
    url: "https://www.toolstack.fun/tools/image/image-compressor",
    siteName: "ToolStack.fun",
    type: "website",
  },
};

export default function ImageCompressorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(70);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);

  const originalSize = file ? (file.size / 1024).toFixed(2) : null;
  const compressedSize = compressedBlob
    ? (compressedBlob.size / 1024).toFixed(2)
    : null;

  /* ---------- LOAD IMAGE ---------- */
  useEffect(() => {
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      imgRef.current = img;
      compress(img, quality);
    };
  }, [file]);

  /* ---------- COMPRESS ---------- */
  const compress = (img: HTMLImageElement, q: number) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (blob) setCompressedBlob(blob);
      },
      "image/jpeg",
      q / 100 // ✅ REAL QUALITY CONTROL
    );
  };

  /* ---------- HANDLE QUALITY CHANGE ---------- */
  useEffect(() => {
    if (imgRef.current) {
      compress(imgRef.current, quality);
    }
  }, [quality]);

  /* ---------- DOWNLOAD ---------- */
  const download = () => {
    if (!compressedBlob) return;

    const url = URL.createObjectURL(compressedBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "compressed-image.jpg";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-14">
      {/* ---------- HEADER ---------- */}
      <section className="text-center space-y-4 fade-up">
        <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium">
          Image Tool
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Image Compressor
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Compress images using real quality-based compression.
        </p>
      </section>

      {/* ---------- UPLOAD ---------- */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full text-sm fade-up fade-delay-1"
      />

      {/* ---------- CONTROLS ---------- */}
      {file && (
        <section className="editor-shadow rounded-2xl border bg-white p-6 space-y-6 fade-up fade-delay-2">
          <div>
            <label className="text-sm font-medium">
              Quality: {quality}%
            </label>
            <input
              type="range"
              min={20}
              max={95}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div className="flex gap-6 text-sm">
            <div>
              <strong>Original:</strong> {originalSize} KB
            </div>
            {compressedSize && (
              <div>
                <strong>Compressed:</strong> {compressedSize} KB
              </div>
            )}
          </div>

          <canvas ref={canvasRef} className="hidden" />

          {compressedBlob && (
            <button
              onClick={download}
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white
                         hover:bg-indigo-700 active:scale-95 transition font-medium"
            >
              Download Compressed Image
            </button>
          )}
        </section>
      )}

      {/* ---------- INFO ---------- */}
      <section className="bg-gray-50 border rounded-xl p-6 text-sm text-gray-700 fade-up">
        <h2 className="font-semibold mb-2">
          Why this compression is better
        </h2>
        <p>
          This tool uses canvas-based JPEG compression, giving you precise
          control over image quality — just like professional tools.
        </p>
      </section>
    </div>
  );
}
