"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, LogOut } from "lucide-react";
import { clearSession, mockNotifications, useSession } from "@/lib/mock-account";

/** Header account controls: Log in when signed out; bell + My jobs + avatar when signed in. */
export function AccountMenu() {
  const router = useRouter();
  const session = useSession();
  const [open, setOpen] = useState<"bell" | "user" | null>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!wrap.current?.contains(event.target as Node)) setOpen(null);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  if (session === undefined) return <span className="h-9 w-16" aria-hidden />;

  if (!session) {
    return (
      <Link
        href="/login"
        className="whitespace-nowrap text-sm font-medium text-muted transition-colors hover:text-ink"
      >
        Log in
      </Link>
    );
  }

  const initial = session.name.charAt(0).toUpperCase();

  return (
    <div ref={wrap} className="flex items-center gap-2">
      <Link
        href="/account"
        className="whitespace-nowrap text-sm font-medium text-muted transition-colors hover:text-ink"
      >
        My jobs
      </Link>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(open === "bell" ? null : "bell")}
          aria-label="Notifications"
          aria-expanded={open === "bell"}
          className="relative flex h-9 w-9 items-center justify-center rounded-md text-muted hover:bg-cloud hover:text-ink"
        >
          <Bell className="h-5 w-5" aria-hidden />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue ring-2 ring-white" aria-hidden />
        </button>
        {open === "bell" && (
          <div className="absolute right-0 top-11 z-50 w-80 rounded-lg border border-line bg-white p-2 shadow-2xl shadow-navy/15">
            <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-muted">
              Notifications
            </p>
            <ul className="divide-y divide-line">
              {mockNotifications.map((n) => (
                <li key={n.id}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(null)}
                    className="block rounded-md px-3 py-2.5 hover:bg-cloud"
                  >
                    <p className="text-sm font-semibold text-navy">{n.title}</p>
                    <p className="text-sm text-muted">{n.body}</p>
                    <p className="mt-0.5 text-xs text-muted/80">{n.when}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(open === "user" ? null : "user")}
          aria-label="Account"
          aria-expanded={open === "user"}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-white"
        >
          {initial}
        </button>
        {open === "user" && (
          <div className="absolute right-0 top-11 z-50 w-56 rounded-lg border border-line bg-white p-2 shadow-2xl shadow-navy/15">
            <p className="px-3 py-2 text-sm">
              <span className="block font-semibold text-navy">{session.name}</span>
              <span className="block text-muted">{session.phone}</span>
            </p>
            <button
              type="button"
              onClick={() => {
                clearSession();
                setOpen(null);
                router.push("/");
              }}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-ink hover:bg-cloud"
            >
              <LogOut className="h-4 w-4 text-muted" aria-hidden />
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
