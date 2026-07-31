import { NextResponse } from "next/server";

/**
 * Receives a lead (job request, business registration or contact message)
 * and emails it to the serviceman.ai inbox via FormSubmit's relay.
 */

const LEAD_EMAIL = "jacob@sophiie.ai";

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as {
    subject?: unknown;
    fields?: Record<string, unknown>;
  } | null;

  if (!payload || typeof payload !== "object" || !payload.fields) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const body: Record<string, string> = {
    _subject:
      typeof payload.subject === "string" && payload.subject.trim()
        ? payload.subject.slice(0, 120)
        : "New serviceman.ai lead",
    _template: "table",
    _captcha: "false",
  };

  for (const [key, value] of Object.entries(payload.fields)) {
    if (value === null || value === undefined || value === "") continue;
    body[key.slice(0, 60)] = String(value).slice(0, 2000);
  }

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${LEAD_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    return NextResponse.json({ ok: response.ok });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
