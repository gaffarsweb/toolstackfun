"use client";

import { useEffect, useRef, useState } from "react";

export default function ImageResizerPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [keepRatio, setKeepRatio] = useState(true);
  const [ready, setReady] = useState(false);

  /* ---------- LOAD IMAGE ---------- */
  useEffect(() => {
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      imgRef.current = img;
      setWidth(img.width);
      setHeight(img.height);
      setReady(true);
    };
  }, [file]);

  /* ---------- RESIZE ---------- */
  const resizeImage = () => {
    if (!canvasRef.current || !imgRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(imgRef.current, 0, 0, width, height);
  };

  /* ---------- DOWNLOAD ---------- */
  const download = () => {
    if (!canvasRef.current) return;

    const link = document.createElement("a");
    link.download = "resized-image.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  /* ---------- HANDLE INPUT ---------- */
  const handleWidthChange = (val: number) => {
    if (!imgRef.current) return;
    setWidth(val);
    if (keepRatio) {
      setHeight(Math.round((val / imgRef.current.width) * imgRef.current.height));
    }
  };

  const handleHeightChange = (val: number) => {
    if (!imgRef.current) return;
    setHeight(val);
    if (keepRatio) {
      setWidth(Math.round((val / imgRef.current.height) * imgRef.current.width));
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-14">
      {/* ---------- HEADER ---------- */}
      <section className="text-center space-y-4 fade-up">
        <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium">
          Image Tool
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Image Resizer
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Resize images to exact dimensions while maintaining quality.
        </p>
      </section>

      {/* ---------- UPLOAD ---------- */}
      <section className="fade-up fade-delay-1">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm"
        />
      </section>

      {/* ---------- CONTROLS ---------- */}
      {ready && (
        <section className="grid gap-8 md:grid-cols-2 items-center fade-up fade-delay-2">
          {/* CONTROLS */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Width (px)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => handleWidthChange(Number(e.target.value))}
                className="w-full rounded-xl border p-3 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Height (px)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => handleHeightChange(Number(e.target.value))}
                className="w-full rounded-xl border p-3 text-sm"
              />
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={keepRatio}
                onChange={(e) => setKeepRatio(e.target.checked)}
              />
              Maintain aspect ratio
            </label>

            <button
              onClick={resizeImage}
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white
                         hover:bg-indigo-700 active:scale-95 transition font-medium"
            >
              Resize Image
            </button>
          </div>

          {/* PREVIEW */}
          <div className="flex flex-col items-center gap-4">
            <canvas
              ref={canvasRef}
              className="border rounded-xl editor-shadow"
            />
            <button
              onClick={download}
              className="px-6 py-3 rounded-xl border bg-white
                         hover:bg-gray-100 transition font-medium"
            >
              Download Image
            </button>
          </div>
        </section>
      )}

      {/* ---------- INFO ---------- */}
      <section className="bg-gray-50 border rounded-xl p-6 text-sm text-gray-700 fade-up">
        <h2 className="font-semibold mb-2">
          How does image resizing work?
        </h2>
        <p>
          This tool resizes images using your browser’s canvas API. No images
          are uploaded to any server — your files stay private.
        </p>
      </section>
    </div>
  );
}
