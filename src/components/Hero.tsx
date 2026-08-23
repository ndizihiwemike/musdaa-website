import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-400 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-amber-400 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-blue-100 ring-1 ring-white/20">
            Makerere University · Seventh-day Adventist Association
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Growing in Faith.{" "}
            <span className="text-amber-300">Serving in Love.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-blue-100 leading-relaxed max-w-2xl">
            Welcome to MUSDAA — a vibrant campus ministry nurturing spiritual
            growth, Christian fellowship, and mission among students, staff, and
            the wider community of Makerere University.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-blue-900 hover:bg-blue-50 transition-colors"
            >
              Discover MUSDAA
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/sermons"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-base font-semibold text-white ring-1 ring-white/30 hover:bg-white/20 transition-colors"
            >
              <Play className="h-4 w-4" />
              Watch Sermons
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
