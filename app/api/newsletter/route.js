import { NextResponse } from "next/server";

import { subscribeToNewsletter, validateNewsletterSignup } from "../../../lib/newsletter";
import { sendNewsletterWelcome } from "../../../lib/email";

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "We could not read that request. Please try again." },
      { status: 400 }
    );
  }

  const validation = validateNewsletterSignup(payload);

  if (validation.isSpam) {
    return NextResponse.json({ ok: true });
  }

  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    await subscribeToNewsletter(validation.data);
    await sendNewsletterWelcome(validation.data.email);

    return NextResponse.json({
      ok: true,
      message: "You're on the list — thank you for following the work."
    });
  } catch (error) {
    console.error("Newsletter signup failed:", error);
    return NextResponse.json(
      { error: "We couldn't save that right now. Please try again in a moment." },
      { status: 500 }
    );
  }
}
