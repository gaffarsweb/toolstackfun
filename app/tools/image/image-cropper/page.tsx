import ImageCropperTool from "./ImageCropper";

export const metadata = {
  title: "Image Cropper Online – ToolStack",
  description:
    "Crop images online by dragging and resizing the selection area. Free, fast and secure image cropper.",
};

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto space-y-14">
      <section className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          Image Cropper
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Drag, resize, and crop images easily. Adjust the crop area using your
          mouse or touch — no uploads required.
        </p>
      </section>

      <ImageCropperTool />

      <section className="bg-gray-50 border rounded-xl p-8 text-sm text-gray-700">
        <h2 className="font-semibold mb-2">
          Free Online Image Cropper
        </h2>
        <p>
          ToolStack Image Cropper allows you to crop images by resizing the
          selection area from any direction. All processing happens in your
          browser to keep your images private.
        </p>
      </section>
    </div>
  );
}
