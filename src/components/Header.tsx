"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";

const navLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/trades", label: "Services" },
  { href: "/locations", label: "Locations" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav
          aria-label="Main"
          className="hidden items-center gap-7 text-sm font-medium text-muted md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/for-trades-businesses"
            className="whitespace-nowrap text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            For trades businesses
          </Link>
          <Link
            href="/get-started"
            className="whitespace-nowrap rounded-full bg-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-deep"
          >
            Describe your job
          </Link>
        </div>

        {/* Mobile: compact Start button + menu */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/get-started"
            className="rounded-full bg-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-deep"
          >
            Start
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-cloud"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-line bg-white px-4 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-cloud"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/for-trades-businesses"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-base font-medium text-muted hover:bg-cloud"
              >
                For trades businesses
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
