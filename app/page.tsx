// // app/page.tsx
// import Link from "next/link";

// const tools = [
//   {
//     title: "JSON Formatter",
//     description: "Format and validate JSON files easily.",
//     icon: "🧩",
//     href: "/tools/json-formatter",
//   },
//   {
//     title: "JWT Decoder",
//     description: "Decode JWT tokens and inspect payload.",
//     icon: "🔐",
//     href: "/tools/jwt-decoder",
//   },
//   {
//     title: "QR Code Generator",
//     description: "Create QR codes for URLs or text.",
//     icon: "📱",
//     href: "/tools/qr-code-generator",
//   },
//   {
//     title: "URL Shortener",
//     description: "Shorten links and track usage.",
//     icon: "🔗",
//     href: "/tools/url-shortener",
//   },
//   {
//     title: "Image Compressor",
//     description: "Reduce image size without quality loss.",
//     icon: "🖼️",
//     href: "/tools/image-compressor",
//   },
//   {
//     title: "Image Resizer",
//     description: "Resize images to custom dimensions.",
//     icon: "📐",
//     href: "/tools/image-resizer",
//   },
// ];

// export default function HomePage() {
//   return (
//     <div className="space-y-20">
//       {/* ---------- HERO ---------- */}
//       <section className="text-center max-w-4xl mx-auto">
//         <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
//           Every tool you need for developers,
//           <br className="hidden md:block" /> in one place
//         </h1>
//         <p className="text-gray-600 text-lg">
//           Free, fast, and easy-to-use online tools for developers and students.
//         </p>
//       </section>

//       {/* ---------- TOOL GRID ---------- */}
//       <section>
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {tools.map((tool) => (
//             <Link
//               key={tool.title}
//               href={tool.href}
//               className="group bg-white border rounded-2xl p-6
//                          hover:shadow-lg transition-all duration-300"
//             >
//               <div className="text-3xl mb-4">{tool.icon}</div>
//               <h3 className="font-semibold text-lg mb-2 group-hover:text-indigo-600">
//                 {tool.title}
//               </h3>
//               <p className="text-sm text-gray-600">
//                 {tool.description}
//               </p>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* ---------- PREMIUM CTA (Like iLovePDF) ---------- */}
//       <section className="bg-indigo-50 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">
//         <div>
//           <h2 className="text-2xl font-bold mb-2">
//             Get more with ToolStack Pro
//           </h2>
//           <ul className="text-gray-700 space-y-1 text-sm">
//             <li>✔ Unlimited tool usage</li>
//             <li>✔ Faster processing</li>
//             <li>✔ No ads</li>
//             <li>✔ Advanced features</li>
//           </ul>
//         </div>

//         <Link
//           href="/pricing"
//           className="bg-indigo-600 text-white px-6 py-3 rounded-xl
//                      hover:bg-indigo-700 transition font-medium"
//         >
//           Get Pro
//         </Link>
//       </section>

//       {/* ---------- TRUST SECTION ---------- */}
//       <section className="text-center text-gray-600 text-sm">
//         Trusted by developers and students worldwide.
//       </section>
//     </div>
//   );
// }
import Link from "next/link";
import { categories } from "@/lib/tools";

export default function HomePage() {
  return (
    <div className="space-y-24">
      {/* HERO */}
      <section className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Free Online Tools for Developers & Students
        </h1>
        <p className="text-gray-600 text-lg">
          All essential utilities in one simple platform.
        </p>
      </section>

      {/* CATEGORIES */}
      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            className="bg-white border rounded-3xl p-6 hover:shadow-lg transition"
          >
            <div className="text-3xl mb-3">{cat.icon}</div>
            <h2 className="text-xl font-bold mb-2">{cat.title}</h2>
            <p className="text-sm text-gray-600 mb-4">
              {cat.description}
            </p>

            <ul className="space-y-2 text-sm">
              {cat.tools.slice(0, 3).map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="text-indigo-600 hover:underline"
                  >
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={`/tools/${cat.slug}`}
              className="inline-block mt-4 text-sm font-medium text-indigo-600 hover:underline"
            >
              View all →
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
