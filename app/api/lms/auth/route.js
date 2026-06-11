import { NextResponse } from "next/server";
import {
  LMS_SESSION_COOKIE,
  createLmsAccount,
  deleteCurrentLmsSession,
  getCurrentLmsAccount,
  loginLmsAccount,
  validateLmsAuthPayload
} from "../../../../lib/lms-auth";

function setSessionCookie(response, token, expiresAt) {
  response.cookies.set({
    name: LMS_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt
  });
}

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "We could not read that LMS login request." }, { status: 400 });
  }

  const mode = payload.mode === "register" ? "register" : "login";
  const validation = validateLmsAuthPayload(payload, mode);

  if (!validation.ok) {
    return NextResponse.json(
      {
        error: "Please review the highlighted fields.",
        fieldErrors: validation.fieldErrors
      },
      { status: 400 }
    );
  }

  try {
    if (mode === "register") {
      await createLmsAccount(validation.data);
    }

    const session = await loginLmsAccount(validation.data);
    const response = NextResponse.json({
      ok: true,
      account: session.account
    });
    setSessionCookie(response, session.token, session.expiresAt);

    return response;
  } catch (error) {
    const message =
      error?.code === "23505"
        ? "An LMS account already exists for that email. Sign in instead."
        : error?.message || "LMS login failed. Please try again.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET() {
  const account = await getCurrentLmsAccount();
  return NextResponse.json({ ok: true, account });
}

export async function DELETE() {
  await deleteCurrentLmsSession();
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: LMS_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  });
  return response;
}
