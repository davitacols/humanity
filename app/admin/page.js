import Link from "next/link";
import { requireAdmin } from "../../lib/admin-auth";

export default async function AdminDashboard() {
  await requireAdmin();

  return (
    <main className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1>Content Admin</h1>
          <p>Manage education hub content and resource submissions.</p>
        </div>
        <form action="/api/admin/logout" method="post">
          <button type="submit" className="button button--secondary">
            <span className="button__label">Sign out</span>
          </button>
        </form>
      </div>

      <div className="admin-grid">
        <Link href="/admin/education" className="admin-card">
          <h2>Education Hub</h2>
          <p>Metrics, tracks, library items, sessions, and actions.</p>
        </Link>

        <Link href="/admin/support" className="admin-card">
          <h2>Support Inbox</h2>
          <p>Review donor, volunteer, partner, sponsor, and contributor requests.</p>
        </Link>

        <Link href="/education/review" className="admin-card">
          <h2>Education Review Board</h2>
          <p>Review incoming submissions from contributors.</p>
        </Link>
      </div>
    </main>
  );
}
