import { LoadingLink } from "../../../components/LoadingLink";
import { PageHero } from "../../../components/PageHero";
import { Reveal } from "../../../components/Reveal";
import { SectionIntro } from "../../../components/SectionIntro";
import { getEducationSubmissionDashboardData } from "../../../lib/education-submissions";

function formatDate(value) {
  return new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
}

export default async function EducationReviewPage() {
  const { metrics, submissions, statusCards } = await getEducationSubmissionDashboardData();

  return (
    <main className="site-main edu-page">
      <PageHero
        eyebrow="Education review board"
        title="A clear internal view of incoming resource submissions."
        body="Review the education intake queue, spot submission volume, and follow up with contributors without digging through raw database records."
        primary={{ href: "/education/contribute", label: "Open Contributor Form" }}
        secondary={{ href: "/education", label: "Back to Education Hub" }}
        asideTitle="Current scope"
        asideBody="Summarizes incoming submissions with review context, contact details, and quick access to resource links."
      />

      {/* Metrics */}
      <Reveal as="section" className="edu-metrics" delay={100}>
        {metrics.map((m) => (
          <article key={m.label} className="edu-metrics__item">
            <span className="edu-metrics__value">{m.value}</span>
            <span className="edu-metrics__label">{m.label}</span>
          </article>
        ))}
      </Reveal>

      {/* Status cards */}
      <Reveal as="section" delay={140}>
        <SectionIntro title="Queue shape and content mix at a glance." />
        <div className="edu-tracks">
          {statusCards.map((item) => (
            <article key={item.title} className="edu-tracks__card">
              <div className="edu-tracks__header">
                <span className="edu-tracks__eyebrow">{item.eyebrow}</span>
              </div>
              <h3 className="edu-tracks__title">{item.title}</h3>
              <p className="edu-tracks__body">{item.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Submissions */}
      <Reveal as="section" delay={180}>
        <SectionIntro
          title="Contributor details, context, and actions in one board."
          body="Each card is structured for quick triage: who submitted it, what it is, who it is for, and how to follow up."
        />
        {submissions.length ? (
          <div className="submission-review-list">
            {submissions.map((s) => (
              <article key={s.id} className="submission-review-card">
                <div className="submission-review-card__top">
                  <div className="submission-review-card__identity">
                    <p className="submission-review-card__eyebrow">{s.reference} — {formatDate(s.createdAt)}</p>
                    <h3 className="submission-review-card__title">{s.resourceTitle}</h3>
                  </div>
                  <span className={`status-badge status-badge--${s.status.toLowerCase()}`}>{s.status}</span>
                </div>
                <div className="submission-review-card__meta">
                  <span>{s.resourceType}</span>
                  <span>{s.audienceLevel}</span>
                  <span>{s.role}</span>
                  <span>{s.organization || "Independent contributor"}</span>
                </div>
                <p className="submission-review-card__summary">{s.summary}</p>
                {s.notes ? (
                  <div className="submission-review-card__notes">
                    <p className="submission-review-card__notes-label">Extra notes</p>
                    <p>{s.notes}</p>
                  </div>
                ) : null}
                <div className="submission-review-card__footer">
                  <div className="submission-review-card__contact">
                    <p className="submission-review-card__contact-label">Contributor contact</p>
                    <a href={`mailto:${s.email}`} className="submission-review-card__contact-link">{s.contactName} — {s.email}</a>
                  </div>
                  <div className="submission-review-card__actions">
                    {s.resourceUrl ? (
                      <a href={s.resourceUrl} target="_blank" rel="noreferrer" className="button button--secondary">Open resource</a>
                    ) : null}
                    <a href={`mailto:${s.email}?subject=${encodeURIComponent(`Education Resource Submission ${s.reference}`)}`} className="button button--primary">Email contributor</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="edu-tracks__card" style={{ textAlign: "center", padding: "2rem" }}>
            <h3 className="edu-tracks__title">The board is ready for the first contributor.</h3>
            <p className="edu-tracks__body">Submissions appear here with review context and follow-up actions as they arrive.</p>
            <LoadingLink href="/education/contribute" className="button button--secondary" loadingLabel="Opening" style={{ justifySelf: "center", marginTop: "0.5rem" }}>
              Open Contributor Form
            </LoadingLink>
          </div>
        )}
      </Reveal>
    </main>
  );
}
