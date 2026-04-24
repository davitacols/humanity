import Link from "next/link";
import { requireAdmin } from "../../lib/admin-auth";
import { getBlogMetrics } from "../../lib/blog-content";
import { getDonationContentData } from "../../lib/donation-content";
import { getEducationHubData } from "../../lib/education";
import { getPlatformContentData } from "../../lib/platform-content";
import { getSupportInquiryDashboardData } from "../../lib/support-inquiries";

export default async function AdminDashboard() {
  await requireAdmin();

  const [donationData, educationData, platformData, supportData, blogMetrics] = await Promise.all([
    getDonationContentData(),
    getEducationHubData(),
    getPlatformContentData(),
    getSupportInquiryDashboardData(),
    getBlogMetrics()
  ]);

  const overviewMetrics = [
    { value: String(donationData.funds.length), label: "giving routes" },
    { value: String(platformData.changemakers.length), label: "public profiles" },
    { value: String(educationData.libraryItems.length), label: "education resources" },
    { value: String(blogMetrics.published), label: "published blog posts" },
    supportData.metrics[1] || { value: "0", label: "pending follow-up" }
  ];

  return (
    <main className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1>Content Admin</h1>
          <p>Manage platform content, education hub data, and incoming submissions.</p>
        </div>
        <form action="/api/admin/logout" method="post">
          <button type="submit" className="button button--secondary">
            <span className="button__label">Sign out</span>
          </button>
        </form>
      </div>

      <section className="admin-overview">
        {overviewMetrics.map((item) => (
          <article key={item.label} className="admin-overview__metric">
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </section>

      <div className="admin-grid">
        <Link href="/admin/donations" className="admin-card">
          <h2>Donation Admin</h2>
          <p>Manage giving routes, hosted payment URLs, and public transparency tracker entries.</p>
        </Link>

        <Link href="/admin/platform" className="admin-card">
          <h2>Platform Content</h2>
          <p>Manage changemakers, public updates, and gallery items.</p>
        </Link>

        <Link href="/admin/blog" className="admin-card">
          <h2>Blog CMS</h2>
          <p>Create, draft, feature, and publish humanitarian articles and field notes.</p>
        </Link>

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
