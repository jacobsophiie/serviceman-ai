import type { Metadata } from "next";
import { JobsList } from "@/components/account/JobsList";

export const metadata: Metadata = {
  title: "My jobs",
  robots: { index: false },
};

export default function AccountPage() {
  return <JobsList />;
}
