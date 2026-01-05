"use client";

import { useEffect, useRef, useState } from "react";

type WatermarkType = "text" | "image";

export default function ImageWatermarkPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const wmImgRef = useRef<HTMLImageElement | null>(null);

  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const [file, setFile] = useState<File | null>(null);
  const [wmFile, setWmFile] = useState<File | null>(null);
  const [type, setType] = useState<WatermarkType>("text");

  const [text, setText] = useState("ToolStack.fun");
  const [textColor, setTextColor] = useState("#ffffff");
  const [opacity, setOpacity] = useState(0.4);
  const [size, setSize] = useState(32);
  const [pos, setPos] = useState({ x: 40, y: 40 });

  const [preview, setPreview] = useState<string | null>(null);

  /* ---------- LOAD BASE IMAGE ---------- */
  useEffect(() => {
    if (!file) return;
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      imgRef.current = img;
      redraw();
    };
    return () => URL.revokeObjectURL(img.src);
  }, [file]);

  /* ---------- LOAD LOGO ---------- */
  useEffect(() => {
    if (!wmFile) return;
    const img = new Image();
    img.src = URL.createObjectURL(wmFile);
    img.onload = () => {
      wmImgRef.current = img;
      redraw();
    };
    return () => URL.revokeObjectURL(img.src);
  }, [wmFile]);

  /* ---------- REDRAW ---------- */
  useEffect(() => {
    redraw();
  }, [type, text, textColor, opacity, size, pos]);

  const redraw = () => {
    if (!canvasRef.current || !imgRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = imgRef.current.width;
    canvas.height = imgRef.current.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgRef.current, 0, 0);

    ctx.globalAlpha = opacity;

    if (type === "text") {
      ctx.font = `${size}px Arial`;
      ctx.fillStyle = textColor;
      ctx.fillText(text, pos.x, pos.y + size);
    }

    if (type === "image" && wmImgRef.current) {
      const w = size * 4;
      const h = (wmImgRef.current.height / wmImgRef.current.width) * w;
      ctx.drawImage(wmImgRef.current, pos.x, pos.y, w, h);
    }

    ctx.globalAlpha = 1;

    canvas.toBlob((blob) => {
      if (!blob) return;
      if (preview) URL.revokeObjectURL(preview);
      setPreview(URL.createObjectURL(blob));
    });
  };

  /* ---------- DRAG ---------- */
  const onDown = (e: React.MouseEvent) => {
    dragging.current = true;
    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  };

  const onMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    setPos({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const onUp = () => (dragging.current = false);

  /* ---------- DOWNLOAD ---------- */
  const download = () => {
    if (!preview) return;
    const a = document.createElement("a");
    a.href = preview;
    a.download = "watermarked-image.png";
    a.click();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      {/* HERO */}
      <section className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Image Watermark Tool
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Add text or logo watermarks to your images. Control size, opacity,
          color, and position — all directly in your browser.
        </p>
      </section>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      {file && (
        <section className="grid md:grid-cols-2 gap-8">
          {/* PREVIEW */}
          <div
            className="relative border rounded-xl overflow-hidden"
            onMouseMove={onMove}
            onMouseUp={onUp}
            onMouseLeave={onUp}
          >
            {preview && (
              <img src={preview} className="w-full" />
            )}

            <div
              onMouseDown={onDown}
              className="absolute cursor-move px-2 py-1
                         bg-black/40 text-white text-xs rounded"
              style={{ left: pos.x, top: pos.y }}
            >
              Drag
            </div>
          </div>

          {/* CONTROLS */}
          <div className="space-y-4">
            <select
              value={type}
              onChange={(e) => setType(e.target.value as WatermarkType)}
              className="w-full border rounded-lg p-2"
            >
              <option value="text">Text Watermark</option>
              <option value="image">Logo Watermark</option>
            </select>

            {type === "text" && (
              <>
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full border rounded-lg p-2"
                />

                {/* COLOR PICKER */}
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                  />
                  <input
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="border rounded p-1 text-sm"
                  />
                </div>
              </>
            )}

            {type === "image" && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setWmFile(e.target.files?.[0] || null)
                }
              />
            )}

            <label>Size</label>
            <input
              type="range"
              min={16}
              max={120}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
            />

            <label>Opacity</label>
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
            />

            {preview && (
              <button
                onClick={download}
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white"
              >
                Download Image
              </button>
            )}
          </div>
        </section>
      )}

      {/* SEO CONTENT */}
      <section className="bg-gray-50 border rounded-xl p-6 text-sm text-gray-700 space-y-3">
        <h2 className="font-semibold">Online Image Watermark Tool</h2>
        <p>
          This free image watermark tool allows you to add custom text or logo
          watermarks to your images. Adjust watermark size, color, opacity,
          and position with ease.
        </p>
        <p>
          All image processing happens locally in your browser. Your files are
          never uploaded to any server, ensuring complete privacy.
        </p>
      </section>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
