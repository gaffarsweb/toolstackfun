"use client";

import Cropper from "react-easy-crop";
import { useCallback, useState } from "react";

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

async function getCroppedImg(
  imageSrc: string,
  cropPixels: any
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  canvas.width = cropPixels.width;
  canvas.height = cropPixels.height;

  ctx.drawImage(
    image,
    cropPixels.x,
    cropPixels.y,
    cropPixels.width,
    cropPixels.height,
    0,
    0,
    cropPixels.width,
    cropPixels.height
  );

  return canvas.toDataURL("image/png");
}

export default function ImageCropperTool() {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [result, setResult] = useState<string | null>(null);

  const onCropComplete = useCallback((_: any, pixels: any) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const cropImage = async () => {
    if (!image || !croppedAreaPixels) return;
    const cropped = await getCroppedImg(image, croppedAreaPixels);
    setResult(cropped);
  };

  return (
    <div className="space-y-8">
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          e.target.files &&
          setImage(URL.createObjectURL(e.target.files[0]))
        }
      />

      {image && (
        <div className="relative w-full h-[400px] bg-black rounded-xl overflow-hidden">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={undefined} // free resize
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      )}

      {image && (
        <div className="space-y-4">
          <label className="text-sm font-medium">
            Zoom
          </label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full"
          />

          <button
            onClick={cropImage}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white
                       hover:bg-indigo-700 transition font-medium"
          >
            Crop Image
          </button>
        </div>
      )}

      {result && (
        <div className="flex flex-col items-center gap-4">
          <img src={result} className="max-h-64 border rounded-xl" />
          <a
            href={result}
            download="cropped-image.png"
            className="px-6 py-3 rounded-xl border hover:bg-gray-100"
          >
            Download Cropped Image
          </a>
        </div>
      )}
    </div>
  );
}
