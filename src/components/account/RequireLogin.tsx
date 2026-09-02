"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession, type MockSession } from "@/lib/mock-account";

/** Renders children only with a browser session; otherwise sends to /login. */
export function RequireLogin({
  children,
}: {
  children: (session: MockSession) => ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();

  useEffect(() => {
    if (session === null) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [session, router, pathname]);

  if (!session) return <div className="min-h-[50vh]" aria-busy="true" />;
  return <>{children(session)}</>;
}
