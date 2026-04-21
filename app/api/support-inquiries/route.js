import { NextResponse } from "next/server";
import {
  createSupportInquiry,
  validateSupportInquiry
} from "../../../lib/support-inquiries";

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "We could not read that support request. Please try again." },
      { status: 400 }
    );
  }

  const validation = validateSupportInquiry(payload);

  if (validation.isSpam) {
    return NextResponse.json({ ok: true });
  }

  if (!validation.ok) {
    return NextResponse.json(
      {
        error: "Please review the highlighted fields and try again.",
        fieldErrors: validation.fieldErrors
      },
      { status: 400 }
    );
  }

  try {
    const submission = await createSupportInquiry(validation.data);
    const message =
      validation.data.sourcePage === "donate"
        ? "Thanks. Your giving request has been logged and the team will follow up by email with the next step."
        : "Thanks. Your support request has been received and the team will follow up by email.";

    return NextResponse.json(
      {
        ok: true,
        submission,
        message
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to save support inquiry:", error);

    return NextResponse.json(
      {
        error:
          "Your request could not be saved right now. Please try again in a moment."
      },
      { status: 500 }
    );
  }
}
