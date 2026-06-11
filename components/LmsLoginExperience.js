"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export function LmsLoginExperience() {
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

      if (!response.ok) {
        setError(data.error || "LMS login failed.");
        setFieldErrors(data.fieldErrors || {});
        return;
      }

      window.location.href = destination;
    } catch {
      setError("LMS login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="lms-auth">
      <section className="lms-auth__hero">
        <p className="academy__eyebrow">{isStaffMode ? "Private Staff Access" : "Student LMS Access"}</p>
        <h1>{isStaffMode ? "Instructor workspace sign in." : "Student learning account."}</h1>
        <p>
          {isStaffMode
            ? "This staff page is not linked from the public website. Instructors need their email, password, and the private invite code when creating an account."
            : "Students sign in to continue lessons, quizzes, assignments, and saved course progress."}
        </p>
      </section>

      <section className="lms-auth__grid">
        <form className="lms-auth__panel" onSubmit={submit}>
          <div className="lms-auth__switch" role="tablist" aria-label="LMS login mode">
            <button type="button" className={mode === "login" ? "is-active" : ""} onClick={() => setMode("login")}>Sign in</button>
            <button type="button" className={mode === "register" ? "is-active" : ""} onClick={() => setMode("register")}>Create account</button>
          </div>

          {mode === "register" ? (
            <label className="lms-auth__field">
              <span>Full name</span>
              <input
                type="text"
                value={form.fullName}
                onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
                placeholder="Full name"
              />
              {fieldErrors.fullName ? <small>{fieldErrors.fullName}</small> : null}
            </label>
          ) : null}

          {isStaffMode && mode === "register" ? (
            <label className="lms-auth__field">
              <span>Instructor invite code</span>
              <input
                type="password"
                value={form.inviteCode}
                onChange={(event) => setForm((current) => ({ ...current, inviteCode: event.target.value }))}
                placeholder="Private staff code"
              />
              {fieldErrors.inviteCode ? <small>{fieldErrors.inviteCode}</small> : null}
            </label>
          ) : null}

          <label className="lms-auth__field">
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              placeholder="name@example.com"
            />
            {fieldErrors.email ? <small>{fieldErrors.email}</small> : null}
          </label>

          <label className="lms-auth__field">
            <span>Password</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              placeholder="At least 8 characters"
            />
            {fieldErrors.password ? <small>{fieldErrors.password}</small> : null}
          </label>

          {error ? <p className="lms-auth__error">{error}</p> : null}

          <button type="submit" className="button button--primary" disabled={loading}>
            {loading ? "Checking..." : mode === "register" ? "Create LMS account" : "Enter LMS"}
          </button>
        </form>

        <aside className="lms-auth__roles">
          {isStaffMode ? (
            <>
              <article>
                <strong>Private staff portal</strong>
                <p>Instructor access is shared directly by the site owner and is not advertised on public pages.</p>
              </article>
              <article>
                <strong>Course builder</strong>
                <p>Create courses, modules, lessons, quizzes, and assignment prompts after signing in.</p>
              </article>
            </>
          ) : (
            <>
              <article>
                <strong>Student progress</strong>
                <p>Continue enrolled courses, save lesson progress, submit quizzes, and send assignments.</p>
              </article>
              <article>
                <strong>Learning history</strong>
                <p>Your course work stays connected to your student account when the database is active.</p>
              </article>
            </>
          )}
        </aside>
      </section>
    </main>
  );
}
