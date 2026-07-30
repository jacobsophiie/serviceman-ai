import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-24">
        <div className="max-w-md text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue">
            404
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-navy">
            We couldn&rsquo;t find that page
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted">
            The page may have moved — but your job hasn&rsquo;t. Describe what
            needs doing and we&rsquo;ll take it from there.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-2.5 sm:flex-row">
            <Link
              href="/get-started"
              className="rounded-full bg-blue px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-deep"
            >
              Describe your job
            </Link>
            <Link
              href="/"
              className="rounded-full border border-line px-6 py-3 text-base font-semibold text-navy transition-colors hover:border-blue hover:text-blue"
            >
              Return home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
