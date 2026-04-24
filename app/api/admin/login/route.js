import { NextResponse } from "next/server";

const ADMIN_COOKIE = "humanity_admin";

export async function POST(request) {
  const { token } = await request.json().catch(() => ({}));
  const expected = process.env.ADMIN_TOKEN;

  if (!expected) {
    return NextResponse.json(
      { error: "Admin access is not configured. Add ADMIN_TOKEN first." },
      { status: 503 }
    );
  }

  if (!token || token !== expected) {
    return NextResponse.json({ error: "Invalid access token." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
  return response;
}
