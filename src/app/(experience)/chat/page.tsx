import type { Metadata } from "next";
import { ConversationWorkspace } from "@/components/chat/ConversationWorkspace";

export const metadata: Metadata = {
  title: "Chat with the AI job assistant",
  description:
    "Describe the job in your own words. Our AI agent asks the right questions and prepares a clear job request for suitable local trades.",
  robots: { index: false },
};

export default async function ChatPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const first = (key: string) => {
    const raw = params[key];
    return Array.isArray(raw) ? raw[0] : raw;
  };

  return (
    <ConversationWorkspace
      initialMessage={first("prompt")}
      tradeSlug={first("trade")}
      presetJob={first("job")}
      locationSlug={first("location")}
      suburbText={first("suburb")}
      initialPhotos={Number(first("photos")) || undefined}
    />
  );
}
