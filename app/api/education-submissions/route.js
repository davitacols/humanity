import { NextResponse } from "next/server";
import {
  createEducationSubmission,
  validateEducationSubmission
} from "../../../lib/education-submissions";

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "We could not read that submission. Please try again." },
      { status: 400 }
    );
  }

  const validation = validateEducationSubmission(payload);

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
    const submission = await createEducationSubmission(validation.data);

    return NextResponse.json(
      {
        ok: true,
        submission,
        message:
          "Thanks. Your resource has been submitted for review and we will follow up by email."
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to save education submission:", error);

    return NextResponse.json(
      {
        error:
          "Your submission could not be saved right now. Please try again in a moment."
      },
      { status: 500 }
    );
  }
}
