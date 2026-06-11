import Link from "next/link";
import { requireAdmin } from "../../lib/admin-auth";
import { getBlogMetrics } from "../../lib/blog-content";
import { getDonationContentData } from "../../lib/donation-content";
import { getPlatformContentData } from "../../lib/platform-content";
import { getSupportInquiryDashboardData } from "../../lib/support-inquiries";

export default async function AdminDashboard() {
  await requireAdmin();

  const [donationData, platformData, supportData, blogMetrics] = await Promise.all([
    getDonationContentData(),
    getPlatformContentData(),
    getSupportInquiryDashboardData(),
    getBlogMetrics()
  ]);

  const metrics = [
    { value: String(donationData.funds.length), label: "Giving routes" },
    { value: String(platformData.changemakers.length), label: "Public profiles" },
    { value: String(blogMetrics.published), label: "Blog posts" },
    { value: String(supportData.metrics?.[0]?.value || "0"), label: "Inquiries" }
  ];

  return (
    <main className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1>Content Admin</h1>
          <p>Manage platform content, LMS courses, support requests, and public updates.</p>
        </div>
        <form action="/api/admin/logout" method="post">
          <button type="submit" className="button button--secondary">Sign out</button>
        </form>
      </div>

      <section className="admin-overview">
        {metrics.map((item) => (
          <article key={item.label} className="admin-overview__metric">
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </section>

      <div className="admin-grid">
        <Link href="/admin/donations" className="admin-card">
          <h2>Donations</h2>
          <p>Manage giving routes, payment URLs, and transparency tracker entries.</p>
        </Link>
        <Link href="/admin/platform" className="admin-card">
          <h2>Platform</h2>
          <p>Manage changemakers, public updates, and gallery items.</p>
        </Link>
        <Link href="/admin/blog" className="admin-card">
          <h2>Blog CMS</h2>
          <p>Create, draft, feature, and publish articles and field notes.</p>
        </Link>
        <Link href="/admin/lms" className="admin-card">
          <h2>LMS</h2>
          <p>Courses, modules, lessons, quizzes, assignments, and enrollments.</p>
        </Link>
        <Link href="/admin/education" className="admin-card">
          <h2>Education</h2>
          <p>Review resource submissions and manage the public library.</p>
        </Link>
        <Link href="/admin/support" className="admin-card">
          <h2>Support Inbox</h2>
          <p>Review donor, volunteer, partner, and contributor requests.</p>
        </Link>
      </div>
    </main>
  );
}
