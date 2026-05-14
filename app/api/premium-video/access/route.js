import crypto from "node:crypto";

import { NextResponse } from "next/server";

import { premiumVideoProject } from "../../../../components/siteData";

const DEFAULT_ACCESS_HOURS = 48;

function readEnv(...keys) {
  for (const key of keys) {
    const value = process.env[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

function safeEqual(input, expected) {
  const inputBuffer = Buffer.from(input);
  const expectedBuffer = Buffer.from(expected);

  if (inputBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(inputBuffer, expectedBuffer);
}

function getAccessHours() {
  const raw = readEnv("SIB_SCREENING_ACCESS_HOURS", "PPV_ACCESS_HOURS");
  const value = Number(raw);

  return Number.isFinite(value) && value > 0 ? value : DEFAULT_ACCESS_HOURS;
}

export async function POST(request) {
  const configuredPassword = readEnv("SIB_SCREENING_PASSWORD", "PPV_ACCESS_PASSWORD");
  const videoSrc = readEnv("SIB_SCREENING_VIDEO_URL", "PPV_VIDEO_URL") || premiumVideoProject.videoSrc;

  if (!configuredPassword) {
    return NextResponse.json(
      { error: "Screening access is not configured yet." },
      { status: 503 }
    );
  }

  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "We could not read that access request." },
      { status: 400 }
    );
  }

  const password = typeof payload?.password === "string" ? payload.password.trim() : "";

  if (!password || !safeEqual(password, configuredPassword)) {
    return NextResponse.json(
      { error: "That password is not valid for this screening." },
      { status: 401 }
    );
  }

  const unlockedAt = Date.now();
  const accessHours = getAccessHours();

  return NextResponse.json({
    ok: true,
    videoSrc,
    unlockedAt,
    expiresAt: unlockedAt + accessHours * 60 * 60 * 1000,
    orderRef: `PPV-${crypto.randomBytes(4).toString("hex").toUpperCase()}`
  });
}
