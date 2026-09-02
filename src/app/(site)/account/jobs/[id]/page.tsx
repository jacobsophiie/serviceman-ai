import type { Metadata } from "next";
import { JobDetail } from "@/components/account/JobDetail";

export const metadata: Metadata = {
  title: "Your job",
  robots: { index: false },
};

export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <JobDetail id={id} />;
}
