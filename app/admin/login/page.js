"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data?.error || "Invalid access token.");
        return;
      }

      window.location.href = "/admin";
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-auth">
      <div className="admin-auth__card">
        <h1>Admin Access</h1>
        <p>Enter the admin access token to manage site content.</p>

        <form onSubmit={handleSubmit} className="admin-form">
          <label className="admin-label" htmlFor="token">
            Access token
          </label>
          <input
            id="token"
            name="token"
            type="password"
            className="admin-input"
            required
            value={token}
            onChange={(event) => setToken(event.target.value)}
          />
          {error ? <p className="admin-error">{error}</p> : null}
          <button type="submit" className="button button--primary" disabled={loading}>
            <span className="button__label">{loading ? "Checking..." : "Enter Admin"}</span>
          </button>
        </form>
      </div>
    </main>
  );
}
