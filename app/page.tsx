import Link from "next/link";
import { categories } from "@/lib/tools";
import HomeWelcomeModal from "./components/HomeWelcomeModal";
import AdUnit from "./components/AdUnit";

export default function HomePage() {
  return (
    <>
      <HomeWelcomeModal />

      <div className="space-y-28">
        {/* HERO */}
        <section className="text-center max-w-4xl mx-auto fade-up">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Free Online Tools for
            <span className="text-indigo-600"> Developers </span>
            & Students
          </h1>
          <p className="text-gray-600 text-lg">
            Build faster, debug smarter, and learn better with clean, simple,
            and powerful online tools.
          </p>
        </section>

        {/* CATEGORIES */}
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, index) => (
            <div
              key={cat.slug}
              style={{ animationDelay: `${index * 80}ms` }}
              className="group relative bg-white border rounded-3xl p-7
                         transition-all duration-300
                         hover:-translate-y-2 hover:shadow-xl
                         fade-up card-glow"
            >
              {/* ICON */}
              <div
                className="text-4xl mb-4 inline-flex items-center justify-center
                           w-14 h-14 rounded-2xl bg-indigo-50
                           group-hover:scale-110 group-hover:rotate-3
                           transition-transform duration-300"
              >
                {cat.icon}
              </div>

              {/* TITLE */}
              <h2 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition">
                {cat.title}
              </h2>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-600 mb-5">
                {cat.description}
              </p>

              {/* TOOLS PREVIEW */}
              <ul className="space-y-2 text-sm mb-4">
                {cat.tools.slice(0, 3).map((tool) => (
                  <li key={tool.href}>
                    <Link
                      href={tool.href}
                      className="text-gray-700 hover:text-indigo-600 transition"
                    >
                      → {tool.title}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={`/tools/${cat.slug}`}
                className="inline-flex items-center gap-1 text-sm font-medium
                           text-indigo-600 hover:gap-2 transition-all"
              >
                View all tools
                <span>→</span>
              </Link>

              {/* HOVER BORDER EFFECT */}
              <span className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-indigo-200 transition" />
            </div>
          ))}
        </section>

        <AdUnit slot="1234567890" />
        {/* TRUST */}
        <section className="text-center text-gray-600 text-sm fade-up">
          Trusted by students and developers building real-world projects.
        </section>
      </div>
    </>
  );
}
