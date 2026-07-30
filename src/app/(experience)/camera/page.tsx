import type { Metadata } from "next";
import { CameraAssistant } from "@/components/camera/CameraAssistant";

export const metadata: Metadata = {
  title: "Camera assistant — show us what needs fixing",
  description:
    "Point your camera at the problem and describe what you can see. Our AI agent will guide you through the next steps.",
  robots: { index: false },
};

export default async function CameraPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const raw = params.prompt;
  return <CameraAssistant initialPrompt={Array.isArray(raw) ? raw[0] : raw} />;
}
