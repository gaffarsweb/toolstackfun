import Link from "next/link";

const jsonTools = [
  {
    title: "JSON Formatter",
    description: "Format and beautify JSON data instantly",
    icon: "🧩",
    href: "/tools/json/json-formatter",
  },
  {
    title: "JSON Validator",
    description: "Validate JSON and find syntax errors",
    icon: "✅",
    href: "/tools/json/json-validator",
  },
  {
    title: "JSON Minifier",
    description: "Minify JSON to reduce file size",
    icon: "📉",
    href: "/tools/json/json-minifier",
  },
  {
    title: "JSON to XML",
    description: "Convert JSON data into XML format",
    icon: "🔁",
    href: "/tools/json/json-to-xml",
  },
  {
    title: "JSON to CSV",
    description: "Convert JSON files into CSV format",
    icon: "📄",
    href: "/tools/json/json-to-csv",
  },
  {
    title: "JSON Diff Checker",
    description: "Compare two JSON files and highlight differences",
    icon: "🔍",
    href: "/tools/json/json-diff",
  },
];

export default function JsonToolsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-20">
      {/* ---------- HERO ---------- */}
      <section className="text-center max-w-3xl mx-auto fade-up">
        <span className="inline-block px-4 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium mb-4">
          JSON Tools
        </span>

        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          Free Online JSON Tools
        </h1>

        <p className="text-gray-600 text-lg">
          Format, validate, convert, and analyze JSON data easily — directly in
          your browser.
        </p>
      </section>

      {/* ---------- TOOL GRID ---------- */}
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 fade-up fade-delay-1">
        {jsonTools.map((tool, index) => (
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

      {/* ---------- INFO / TRUST ---------- */}
      <section className="bg-gray-50 border rounded-3xl p-10 text-center fade-up fade-delay-2">
        <h2 className="text-2xl font-bold mb-3">
          Why use ToolStack JSON Tools?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our JSON tools run entirely in your browser, keeping your data private
          and secure. Perfect for developers, students, and API testing.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-700">
          <span>✔ Instant formatting</span>
          <span>✔ No data upload</span>
          <span>✔ Developer friendly</span>
          <span>✔ 100% free</span>
        </div>
      </section>
    </div>
  );
}
