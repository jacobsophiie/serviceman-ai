const exchange = [
  { role: "customer", text: "Fix a leaking kitchen tap" },
  { role: "ai", text: "Where is the job located?" },
  { role: "customer", text: "Dromana" },
  {
    role: "ai",
    text: "Thanks. Is the water leaking continuously, or only when the tap is running?",
  },
  { role: "customer", text: "Continuously" },
  { role: "ai", text: "Can you see where the water is coming from?" },
] as const;

/** Static example conversation — the same job the brief and quotes examples show. */
export function ChatPreview() {
  return (
    <div
      aria-label="Example conversation with the AI agent"
      className="flex flex-col gap-3 rounded-lg border border-line bg-white p-5 sm:p-6"
    >
      {exchange.map((message, index) => (
        <div
          key={index}
          className={`max-w-[85%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
            message.role === "customer"
              ? "self-end rounded-br-md bg-blue text-white"
              : "self-start rounded-bl-md bg-cloud text-ink"
          }`}
        >
          {message.text}
        </div>
      ))}
      <div className="flex items-center gap-1.5 self-start rounded-lg rounded-bl-md bg-cloud px-4 py-3">
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted" />
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted" />
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted" />
        <span className="sr-only">AI agent is typing</span>
      </div>
    </div>
  );
}
