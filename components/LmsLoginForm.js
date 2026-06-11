"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export function LmsLoginForm() {
  const params = useSearchParams();
  const next = params.get("next") || "/lms";
  const requestedRole = params.get("role");
  const isStaffMode = requestedRole === "instructor";
  const [mode, setMode] = useState("login");
  const role = isStaffMode ? "instructor" : "student";
  const [form, setForm] = useState({ fullName: "", email: "", password: "", inviteCode: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const destination = useMemo(() => {
    if (role === "instructor") return "/lms/instructor";
    return next;
  }, [next, role]);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});
    try {
      const response = await fetch("/api/lms/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, mode, role })
      });
      const data = await response.json();
      if (!response.ok) { setError(data.error || "Login failed."); setFieldErrors(data.fieldErrors || {}); return; }
      window.location.href = destination;
    } catch { setError("Login failed. Please try again."); }
    finally { setLoading(false); }
  }

  return (
    <div className="lms-login">
      <div className="lms-login__card">
        <div className="lms-login__header">
          <h1>{isStaffMode ? "Instructor Sign In" : "Student Login"}</h1>
          <p>{isStaffMode ? "Private staff access — not linked from public pages." : "Sign in to continue your courses and track progress."}</p>
        </div>

        <div className="lms-login__tabs">
          <button type="button" className={mode === "login" ? "is-active" : ""} onClick={() => setMode("login")}>Sign in</button>
          <button type="button" className={mode === "register" ? "is-active" : ""} onClick={() => setMode("register")}>Create account</button>
        </div>

        <form className="lms-login__form" onSubmit={submit}>
          {mode === "register" && (
            <label className="lms-login__field">
              <span>Full name</span>
              <input type="text" value={form.fullName} onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))} placeholder="Your full name" />
              {fieldErrors.fullName && <small>{fieldErrors.fullName}</small>}
            </label>
          )}

          {isStaffMode && mode === "register" && (
            <label className="lms-login__field">
              <span>Invite code</span>
              <input type="password" value={form.inviteCode} onChange={(e) => setForm((f) => ({ ...f, inviteCode: e.target.value }))} placeholder="Private staff code" />
              {fieldErrors.inviteCode && <small>{fieldErrors.inviteCode}</small>}
            </label>
          )}

          <label className="lms-login__field">
            <span>Email</span>
            <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="name@example.com" />
            {fieldErrors.email && <small>{fieldErrors.email}</small>}
          </label>

          <label className="lms-login__field">
            <span>Password</span>
            <input type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} placeholder="At least 8 characters" />
            {fieldErrors.password && <small>{fieldErrors.password}</small>}
          </label>

          {error && <p className="lms-login__error">{error}</p>}

          <button type="submit" className="button button--primary lms-login__submit" disabled={loading}>
            {loading ? "Checking..." : mode === "register" ? "Create account" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
