import Link from "next/link";
import { InfoCard } from "../../../components/InfoCard";
import { MetricCard } from "../../../components/MetricCard";
import { requireAdmin } from "../../../lib/admin-auth";
import { getSupportInquiryDashboardData } from "../../../lib/support-inquiries";

function formatInquiryDate(value) {
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

function formatSourcePage(value) {
  return value === "donate" ? "Donate page" : "Get involved page";
}

export default async function SupportAdminPage() {
  await requireAdmin();

  const { metrics, submissions, statusCards } = await getSupportInquiryDashboardData();

  return (
    <main className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1>Support Inbox</h1>
          <p>Review donor, volunteer, partner, sponsor, and contributor requests.</p>
        </div>
        <div className="admin-row__actions">
          <Link href="/donate" className="button button--secondary">
            <span className="button__label">Open Donate Page</span>
          </Link>
          <Link href="/get-involved" className="button button--secondary">
            <span className="button__label">Open Get Involved</span>
          </Link>
          <form action="/api/admin/logout" method="post">
            <button type="submit" className="button button--secondary">
              <span className="button__label">Sign out</span>
            </button>
          </form>
        </div>
      </div>

      <section className="admin-section">
        <div className="metric-grid">
          {metrics.map((item) => (
            <MetricCard key={item.label} value={item.value} label={item.label} />
          ))}
        </div>
      </section>

      <section className="admin-section">
        <div className="admin-section__header">
          <h2>Queue shape</h2>
          <p>See which support routes are active before you dig into individual requests.</p>
        </div>

        <div className="info-grid info-grid--three">
          {statusCards.map((item) => (
            <InfoCard
              key={item.title}
              eyebrow={item.eyebrow}
              title={item.title}
              body={item.body}
              tone={item.tone}
            />
          ))}
        </div>
      </section>

      <section className="admin-section">
        <div className="admin-section__header">
          <h2>Latest support requests</h2>
          <p>Each record includes contact context, route type, and the next obvious follow-up action.</p>
        </div>

        {submissions.length ? (
          <div className="submission-review-list">
            {submissions.map((submission) => (
              <article key={submission.id} className="submission-review-card">
                <div className="submission-review-card__top">
                  <div className="submission-review-card__identity">
                    <p className="submission-review-card__eyebrow">
                      {submission.reference} - {formatInquiryDate(submission.createdAt)}
                    </p>
                    <h3 className="submission-review-card__title">{submission.routeLabel}</h3>
                  </div>
                  <span
                    className={`status-badge status-badge--${submission.status.toLowerCase()}`}
                  >
                    {submission.status}
                  </span>
                </div>

                <div className="submission-review-card__meta">
                  <span>{formatSourcePage(submission.sourcePage)}</span>
                  <span>{submission.supportArea}</span>
                  {submission.amount ? <span>{submission.amount}</span> : null}
                  {submission.cadence ? <span>{submission.cadence}</span> : null}
                  {submission.availability ? <span>{submission.availability}</span> : null}
                  <span>{submission.organization || "Independent supporter"}</span>
                  {submission.country ? <span>{submission.country}</span> : null}
                  {submission.wantsUpdates ? <span>Wants updates</span> : null}
                </div>

                <p className="submission-review-card__summary">{submission.message}</p>

                <div className="submission-review-card__footer">
                  <div className="submission-review-card__contact">
                    <p className="submission-review-card__contact-label">Support contact</p>
                    <a href={`mailto:${submission.email}`} className="submission-review-card__contact-link">
                      {submission.contactName} - {submission.email}
                    </a>
                  </div>

                  <div className="submission-review-card__actions">
                    <a
                      href={`mailto:${submission.email}?subject=${encodeURIComponent(
                        `Humanity First Support Request ${submission.reference}`
                      )}`}
                      className="button button--primary"
                    >
                      <span className="button__label">Reply by email</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="submission-review-empty">
            <InfoCard
              eyebrow="No requests yet"
              title="The support inbox is ready for the first donor or partner conversation."
              body="Requests from the donate and get involved pages will appear here with contact details and follow-up context."
              tone="mist"
            />
            <Link href="/get-involved" className="button button--secondary submission-review-empty__cta">
              <span className="button__label">Open Get Involved</span>
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
