import { InfoCard } from "../../../components/InfoCard";
import { LoadingLink } from "../../../components/LoadingLink";
import { MetricCard } from "../../../components/MetricCard";
import { PageHero } from "../../../components/PageHero";
import { SectionIntro } from "../../../components/SectionIntro";
import { getEducationSubmissionDashboardData } from "../../../lib/education-submissions";

function formatSubmissionDate(value) {
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

export default async function EducationReviewPage() {
  const { metrics, submissions, statusCards } = await getEducationSubmissionDashboardData();

  return (
    <main className="site-main">
      <PageHero
        eyebrow="Education review board"
        title="A clear internal view of incoming resource submissions."
        body="This screen helps the team review the education intake queue, spot submission volume, and quickly follow up with contributors without digging through raw database records."
        primary={{ href: "/education/contribute", label: "Open Contributor Form" }}
        secondary={{ href: "/education", label: "Back to Education Hub" }}
        asideTitle="Current scope"
        asideBody="This board summarizes incoming submissions with review context, contact details, and quick access to resource links."
      />

      <section className="section">
        <div className="metric-grid">
          {metrics.map((item) => (
            <MetricCard key={item.label} value={item.value} label={item.label} />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionIntro
          title="See what kinds of submissions are flowing through first."
          body="These cards summarize queue shape and content mix at a glance."
        />

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

      <section className="section">
        <SectionIntro
          title="Contributor details, context, and actions in one board."
          body="Each card is structured for quick triage: who submitted it, what it is, who it is for, how to follow up, and whether there is already a live resource link to review."
        />

        {submissions.length ? (
          <div className="submission-review-list">
            {submissions.map((submission) => (
              <article key={submission.id} className="submission-review-card">
                <div className="submission-review-card__top">
                  <div className="submission-review-card__identity">
                    <p className="submission-review-card__eyebrow">
                      {submission.reference} - {formatSubmissionDate(submission.createdAt)}
                    </p>
                    <h3 className="submission-review-card__title">{submission.resourceTitle}</h3>
                  </div>
                  <span
                    className={`status-badge status-badge--${submission.status.toLowerCase()}`}
                  >
                    {submission.status}
                  </span>
                </div>

                <div className="submission-review-card__meta">
                  <span>{submission.resourceType}</span>
                  <span>{submission.audienceLevel}</span>
                  <span>{submission.role}</span>
                  <span>{submission.organization || "Independent contributor"}</span>
                </div>

                <p className="submission-review-card__summary">{submission.summary}</p>

                {submission.notes ? (
                  <div className="submission-review-card__notes">
                    <p className="submission-review-card__notes-label">Extra notes</p>
                    <p>{submission.notes}</p>
                  </div>
                ) : null}

                <div className="submission-review-card__footer">
                  <div className="submission-review-card__contact">
                    <p className="submission-review-card__contact-label">Contributor contact</p>
                    <a href={`mailto:${submission.email}`} className="submission-review-card__contact-link">
                      {submission.contactName} - {submission.email}
                    </a>
                  </div>

                  <div className="submission-review-card__actions">
                    {submission.resourceUrl ? (
                      <a
                        href={submission.resourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="button button--secondary"
                      >
                        <span className="button__label">Open resource</span>
                      </a>
                    ) : null}
                    <a
                      href={`mailto:${submission.email}?subject=${encodeURIComponent(
                        `Education Resource Submission ${submission.reference}`
                      )}`}
                      className="button button--primary"
                    >
                      <span className="button__label">Email contributor</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="submission-review-empty">
            <InfoCard
              eyebrow="No submissions yet"
              title="The board is ready for the first contributor."
              body="Submissions appear here with review context and follow-up actions as they arrive."
              tone="mist"
            />
            <LoadingLink
              href="/education/contribute"
              className="button button--secondary submission-review-empty__cta"
              loadingLabel="Opening"
            >
              Open Contributor Form
            </LoadingLink>
          </div>
        )}
      </section>
    </main>
  );
}
