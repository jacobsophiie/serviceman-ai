import { notFound, redirect } from "next/navigation";
import { getTrade } from "@/lib/data/trades";
import { getLocation } from "@/lib/data/locations";

/**
 * Single-segment shortcut URLs: /plumber redirects to the service landing
 * page, and /melbourne to the location landing page. Anything else is a 404.
 */
export default async function TradeShortcutPage({
  params,
}: {
  params: Promise<{ tradeSlug: string }>;
}) {
  const { tradeSlug } = await params;
  if (getTrade(tradeSlug)) {
    redirect(`/trades/${tradeSlug}`);
  }
  if (getLocation(tradeSlug)) {
    redirect(`/locations/${tradeSlug}`);
  }
  notFound();
}
