import AdUnit from "@/app/components/AdUnit";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title:
    "Image Tools – Compress, Resize, Convert & Edit Images Online | ToolStack.fun",
  description:
    "Free online image tools to compress, resize, convert, crop, and add watermarks to images. Fast, secure, and browser-based image editing tools for developers and students.",
  keywords: [
    "Image Compressor",
    "Image Resizer",
    "Image Converter",
    "Image Cropper",
    "Image Watermark",
    "Online Image Tools",
    "Free Image Editor",
    "Developer Tools",
  ],
  alternates: {
    canonical: "https://www.toolstack.fun/tools/image",
  },
  openGraph: {
    title: "Free Online Image Tools | ToolStack.fun",
    description:
      "Compress, resize, convert, crop, and watermark images instantly using free browser-based tools.",
    url: "https://www.toolstack.fun/tools/image",
    siteName: "ToolStack.fun",
    type: "website",
  },
};
const imageTools = [
  {
    title: "Image Compressor",
    description: "Compress images without losing visible quality",
    icon: "🖼️",
    href: "/tools/image/image-compressor",
  },
  {
    title: "Image Resizer",
    description: "Resize images to exact width and height",
    icon: "📐",
    href: "/tools/image/image-resizer",
  },
  {
    title: "Image Converter",
    description: "Convert images between JPG, PNG and WEBP",
    icon: "🔄",
    href: "/tools/image/image-converter",
  },
  {
    title: "Image Cropper",
    description: "Crop images online with precision",
    icon: "✂️",
    href: "/tools/image/image-cropper",
  },
  {
    title: "Image Watermark",
    description: "Add text or image watermark",
    icon: "💧",
    href: "/tools/image/image-watermark",
  },
];

export default function ImageToolsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-20">
      {/* ---------- HERO ---------- */}
      <section className="text-center max-w-3xl mx-auto fade-up">
        <span className="inline-block px-4 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium mb-4">
          Image Tools
        </span>

        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          Free Online Image Tools
        </h1>

        <p className="text-gray-600 text-lg">
          Compress, resize, convert, and edit images easily — directly in your
          browser.
        </p>
      </section>

      {/* ---------- TOOL GRID ---------- */}
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 fade-up fade-delay-1">
        {imageTools.map((tool, index) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group bg-white border rounded-3xl p-6
                       hover:shadow-xl transition-all duration-300
                       hover:-translate-y-1"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {/* ICON */}
            <div className="text-4xl mb-4">{tool.icon}</div>

            {/* TITLE */}
            <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-600 transition">
              {tool.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-600 mb-4">
              {tool.description}
            </p>

            {/* CTA */}
            <span className="text-sm font-medium text-indigo-600">
              Open tool →
            </span>
          </Link>
        ))}
      </section>

      <AdUnit slot="1294567890" />
      {/* ---------- INFO / TRUST ---------- */}
      <section className="bg-gray-50 border rounded-3xl p-10 text-center fade-up fade-delay-2">
        <h2 className="text-2xl font-bold mb-3">
          Why use ToolStack Image Tools?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          All image processing happens locally in your browser. Your images are
          never uploaded, ensuring maximum privacy and speed.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-700">
          <span>✔ No signup required</span>
          <span>✔ 100% free tools</span>
          <span>✔ Fast & secure</span>
          <span>✔ Mobile friendly</span>
        </div>
      </section>
    </div>
  );
}
