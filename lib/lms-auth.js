import "server-only";

import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSql } from "./db";
import { ensureLmsSchema } from "./lms";

export const LMS_SESSION_COOKIE = "humanity_lms_session";
const SESSION_DAYS = 14;
const ROLE_SET = new Set(["student", "instructor"]);

function normalizeEmail(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  const [scheme, salt, hash] = String(storedHash || "").split(":");
  if (scheme !== "scrypt" || !salt || !hash) {
    return false;
  }

  const candidate = hashPassword(password, salt).split(":")[2];
  const candidateBuffer = Buffer.from(candidate, "hex");
  const storedBuffer = Buffer.from(hash, "hex");

  // timingSafeEqual throws on length mismatch; guard against malformed/legacy hashes.
  if (candidateBuffer.length !== storedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(candidateBuffer, storedBuffer);
}

function publicAccount(account) {
  if (!account) return null;
  return {
    id: account.id,
    learnerId: account.learner_id,
    fullName: account.full_name,
    email: account.email,
    role: account.role
  };
}

export function validateLmsAuthPayload(payload, mode = "login") {
  const data = {
    fullName: normalizeText(payload.fullName),
    email: normalizeEmail(payload.email),
    password: typeof payload.password === "string" ? payload.password : "",
    inviteCode: normalizeText(payload.inviteCode),
    role: ROLE_SET.has(payload.role) ? payload.role : "student"
  };
  const fieldErrors = {};

  if (mode === "register" && (data.fullName.length < 2 || data.fullName.length > 100)) {
    fieldErrors.fullName = "Enter the learner or staff member's full name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (data.password.length < 8) {
    fieldErrors.password = "Password must be at least 8 characters.";
  }

  if (mode === "register" && data.role === "instructor") {
    const expectedInviteCode = normalizeText(process.env.INSTRUCTOR_INVITE_CODE);
    if (!expectedInviteCode || data.inviteCode !== expectedInviteCode) {
      fieldErrors.inviteCode = "Enter the private instructor invite code.";
    }
  }

  return {
    ok: Object.keys(fieldErrors).length === 0,
    data,
    fieldErrors
  };
}

export async function createLmsAccount(data) {
  if (!ROLE_SET.has(data.role)) {
    throw new Error("That LMS account type cannot be created here.");
  }

  const sql = getSql();
  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  await ensureLmsSchema(sql);

  return sql.begin(async (tx) => {
    let learnerId = null;

    if (data.role === "student") {
      const [learner] = await tx`
        insert into lms_learners (full_name, email)
        values (${data.fullName}, ${data.email})
        on conflict (email)
        do update set full_name = excluded.full_name, updated_at = now()
        returning id
      `;
      learnerId = learner.id;
    }

    const [account] = await tx`
      insert into lms_accounts (learner_id, full_name, email, password_hash, role)
      values (${learnerId}, ${data.fullName}, ${data.email}, ${hashPassword(data.password)}, ${data.role})
      returning id, learner_id, full_name, email, role
    `;

    return publicAccount(account);
  });
}

export async function loginLmsAccount(data) {
  const sql = getSql();
  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  await ensureLmsSchema(sql);

  const [account] = await sql`
    select *
    from lms_accounts
    where email = ${data.email}
    limit 1
  `;

  if (!account || !verifyPassword(data.password, account.password_hash)) {
    throw new Error("Invalid LMS email or password.");
  }

  const token = crypto.randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

  await sql`
    insert into lms_sessions (account_id, token_hash, expires_at)
    values (${account.id}, ${hashToken(token)}, ${expiresAt})
  `;

  return {
    account: publicAccount(account),
    token,
    expiresAt
  };
}

export async function getCurrentLmsAccount() {
  const sql = getSql();
  if (!sql) {
    return null;
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(LMS_SESSION_COOKIE)?.value;
  if (!token) {
    return null;
  }

  try {
    await ensureLmsSchema(sql);
    const [session] = await sql`
      select a.id, a.learner_id, a.full_name, a.email, a.role
      from lms_sessions s
      join lms_accounts a on a.id = s.account_id
      where s.token_hash = ${hashToken(token)}
        and s.expires_at > now()
      limit 1
    `;

    return publicAccount(session);
  } catch {
    return null;
  }
}

export async function requireLmsRole(roles) {
  const account = await getCurrentLmsAccount();
  const allowed = Array.isArray(roles) ? roles : [roles];

  if (!account || !allowed.includes(account.role)) {
    redirect(`/lms/login?role=instructor&next=${encodeURIComponent("/lms/instructor")}`);
  }

  return account;
}

export async function deleteCurrentLmsSession() {
  const sql = getSql();
  const cookieStore = await cookies();
  const token = cookieStore.get(LMS_SESSION_COOKIE)?.value;
  if (!sql || !token) {
    return;
  }

  await ensureLmsSchema(sql);
  await sql`delete from lms_sessions where token_hash = ${hashToken(token)}`;
}
