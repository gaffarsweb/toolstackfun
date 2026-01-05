"use client";

import { useEffect, useRef, useState } from "react";

type OutputFormat = "png" | "jpeg" | "webp";

export default function ImageConverter() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    const [file, setFile] = useState<File | null>(null);
    const [format, setFormat] = useState<OutputFormat>("png");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    /* ---------- LOAD IMAGE ---------- */
    useEffect(() => {
        if (!file) return;

        const img = new Image();
        img.crossOrigin = "anonymous"; // ✅ important for SVG & CORS
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            imgRef.current = img;
            drawToCanvas(img, format);
        };

        return () => {
            URL.revokeObjectURL(img.src);
        };
    }, [file]);

    /* ---------- REDRAW ON FORMAT CHANGE ---------- */
    useEffect(() => {
        if (imgRef.current) {
            drawToCanvas(imgRef.current, format);
        }
    }, [format]);

    /* ---------- DRAW ---------- */
    const drawToCanvas = (img: HTMLImageElement, fmt: OutputFormat) => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;

        // White background for JPG
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
            (blob) => {
                if (!blob) return;

                // revoke old preview
                if (previewUrl) URL.revokeObjectURL(previewUrl);

                setPreviewUrl(URL.createObjectURL(blob));
            },
            `image/${fmt}`,
            0.92
        );
    };

    /* ---------- DOWNLOAD ---------- */
    const download = () => {
        if (!previewUrl) return;

        const link = document.createElement("a");
        link.href = previewUrl;
        link.download = `converted-image.${format}`;
        link.click();
    };

    return (
        <div className="max-w-5xl mx-auto space-y-16">
            {/* HEADER */}
            <section className="text-center space-y-4 fade-up">
                <h1 className="text-3xl md:text-4xl font-extrabold">
                    Image Converter
                </h1>
                <p className="text-gray-600">
                    Convert PNG, JPG, JPEG, WEBP and SVG images online.
                </p>
            </section>

            {/* UPLOAD */}
            <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full text-sm fade-up"
            />

            {/* CONTROLS */}
            {file && (
                <section className="editor-shadow rounded-2xl border bg-white p-6 space-y-6 fade-up">
                    <div>
                        <label className="text-sm font-medium block mb-2">
                            Convert to format
                        </label>
                        <select
                            value={format}
                            onChange={(e) => setFormat(e.target.value as OutputFormat)}
                            className="w-full rounded-xl border p-3 text-sm"
                        >
                            <option value="png">PNG</option>
                            <option value="jpeg">JPG / JPEG</option>
                            <option value="webp">WEBP</option>
                        </select>
                    </div>

                    {/* PREVIEW */}
                    {previewUrl && (
                        <div className="flex flex-col items-center gap-4">
                            <img
                                src={previewUrl}
                                alt="Converted Preview"
                                className="max-h-64 rounded-xl border"
                            />
                            <button
                                onClick={download}
                                className="px-6 py-3 rounded-xl bg-indigo-600 text-white
                           hover:bg-indigo-700 active:scale-95 transition"
                            >
                                Download Image
                            </button>
                        </div>
                    )}
                </section>
            )}
            <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 text-sm text-gray-700 fade-up fade-delay-1">
                <div className="flex items-center gap-2">
                    <span>⚡</span> Instant conversion
                </div>
                <div className="flex items-center gap-2">
                    <span>🔒</span> 100% browser-based
                </div>
                <div className="flex items-center gap-2">
                    <span>📱</span> Mobile friendly
                </div>
                <div className="flex items-center gap-2">
                    <span>🆓</span> Free forever
                </div>
            </section>


            {/* HIDDEN CANVAS (REQUIRED) */}
            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
}
