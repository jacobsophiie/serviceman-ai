const exchange = [
  { role: "customer", text: "I need a painter in Brisbane." },
  {
    role: "ai",
    text: "Is the painting for the inside or outside of the property?",
  },
  { role: "customer", text: "Inside." },
  { role: "ai", text: "Which rooms need painting?" },
  { role: "customer", text: "The living room, hallway and two bedrooms." },
  {
    role: "ai",
    text: "Are you looking to repaint the same colour or change the colour?",
  },
] as const;

/** Static example conversation shown on the home page chat section. */
export function ChatPreview() {
  return (
    <div
      aria-label="Example conversation with the AI agent"
      className="flex flex-col gap-3 rounded-3xl border border-line bg-white p-5 shadow-soft sm:p-6"
    >
      {exchange.map((message, index) => (
        <div
          key={index}
          className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            message.role === "customer"
              ? "self-end rounded-br-md bg-blue text-white"
              : "self-start rounded-bl-md bg-cloud text-ink"
          }`}
        >
          {message.text}
        </div>
      ))}
      <div className="flex items-center gap-1.5 self-start rounded-2xl rounded-bl-md bg-cloud px-4 py-3">
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted" />
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted" />
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted" />
        <span className="sr-only">AI agent is typing</span>
      </div>
    </div>
  );
}
