import { NextResponse } from "next/server";
import crypto from "node:crypto";

const ADMIN_COOKIE = "humanity_admin";
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

// Per-instance brute-force throttle. Not shared across serverless instances,
// but it materially slows credential guessing on a single deployment.
const attempts = new Map();

function clientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for") || "";
  return forwarded.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    return { limited: false };
  }
  if (entry.count >= MAX_ATTEMPTS) {
    return { limited: true, retryAfter: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)) };
  }
  return { limited: false };
}

function recordFailure(ip) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }
  entry.count += 1;
}

function safeEqual(a, b) {
  const ab = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ab.length !== bb.length) {
    return false;
  }
  return crypto.timingSafeEqual(ab, bb);
}

export async function POST(request) {
  const expected = process.env.ADMIN_TOKEN;

  if (!expected) {
    return NextResponse.json(
      { error: "Admin access is not configured. Add ADMIN_TOKEN first." },
      { status: 503 }
    );
  }

  const ip = clientIp(request);
  const limit = isRateLimited(ip);

  if (limit.limited) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  const { token } = await request.json().catch(() => ({}));

  if (!token || !safeEqual(token, expected)) {
    recordFailure(ip);
    return NextResponse.json({ error: "Invalid access token." }, { status: 401 });
  }

  attempts.delete(ip);

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
