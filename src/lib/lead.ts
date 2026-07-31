/**
 * Fire-and-forget lead notification. Failures are swallowed — the customer
 * experience never depends on the email relay being up.
 */
export function sendLead(
  subject: string,
  fields: Record<string, string | number | undefined>,
) {
  try {
    void fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, fields }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // ignore
  }
}
