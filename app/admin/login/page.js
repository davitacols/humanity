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
        <p className="admin-auth__setup-note">
          If access is rejected, confirm ADMIN_TOKEN is set in the environment.
        </p>

        <form onSubmit={handleSubmit} className="admin-form">
          <label className="admin-field">
            <span>Access token</span>
            <input
              type="password"
              className="admin-input"
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste admin token"
            />
          </label>
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" className="button button--primary" disabled={loading} style={{ width: "100%", minHeight: "44px" }}>
            {loading ? "Checking..." : "Enter Admin"}
          </button>
        </form>
      </div>
    </main>
  );
}
