import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { LoadingLink } from "../../../components/LoadingLink";
import { PageHero } from "../../../components/PageHero";
import { Reveal } from "../../../components/Reveal";
import { SectionIntro } from "../../../components/SectionIntro";
import { requireAdmin } from "../../../lib/admin-auth";
import {
  getEducationSubmissionDashboardData,
  publishEducationSubmission,
  updateEducationSubmissionStatus
} from "../../../lib/education-submissions";
import "../education.css";

const REVIEW_PATH = "/education/review";

export const metadata = {
  robots: {
    index: false,
    follow: false
  }
};

function formatDate(value) {
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

function buildReviewRedirect(params = {}) {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string" && value.trim()) {
      search.set(key, value.trim());
    }
  });

  const query = search.toString();
  return query ? `${REVIEW_PATH}?${query}` : REVIEW_PATH;
}

function extractSubmissionId(formData) {
  return Number(formData.get("submissionId"));
}

function revalidateEducationReviewRoutes() {
  revalidatePath("/education");
  revalidatePath("/education/contribute");
  revalidatePath("/admin/education");
  revalidatePath(REVIEW_PATH);
}

function getActionErrorMessage(error) {
  const errorCode = typeof error?.code === "string" ? error.code.toUpperCase() : "";

  if (errorCode === "CONNECT_TIMEOUT") {
    return "The education database is taking too long to respond right now. Please try the action again in a moment.";
  }

  if (error instanceof Error && error.message) {
    if (error.message.includes("DATABASE_URL")) {
      return "The education database is not configured yet, so review actions cannot be completed from this environment.";
    }

    return error.message;
  }

  return "That education action could not be completed right now.";
}

async function approveSubmissionAction(formData) {
  "use server";
  await requireAdmin();

  let nextLocation = REVIEW_PATH;

  try {
    const submissionId = extractSubmissionId(formData);
    const submission = await updateEducationSubmissionStatus(submissionId, "approved");
    revalidateEducationReviewRoutes();
    nextLocation = buildReviewRedirect({ notice: `${submission.reference} marked approved.` });
  } catch (error) {
    nextLocation = buildReviewRedirect({ error: getActionErrorMessage(error) });
  }

  redirect(nextLocation);
}

async function rejectSubmissionAction(formData) {
  "use server";
  await requireAdmin();

  let nextLocation = REVIEW_PATH;

  try {
    const submissionId = extractSubmissionId(formData);
    const submission = await updateEducationSubmissionStatus(submissionId, "rejected");
    revalidateEducationReviewRoutes();
    nextLocation = buildReviewRedirect({ notice: `${submission.reference} marked rejected.` });
  } catch (error) {
    nextLocation = buildReviewRedirect({ error: getActionErrorMessage(error) });
  }

  redirect(nextLocation);
}

async function publishSubmissionAction(formData) {
  "use server";
  await requireAdmin();

  let nextLocation = REVIEW_PATH;

  try {
    const submissionId = extractSubmissionId(formData);
    const submission = await publishEducationSubmission(submissionId);
    revalidateEducationReviewRoutes();
    nextLocation = buildReviewRedirect({
      notice: `${submission.reference} published into the education hub.`
    });
  } catch (error) {
    nextLocation = buildReviewRedirect({ error: getActionErrorMessage(error) });
  }

  redirect(nextLocation);
}

export default async function EducationReviewPage({ searchParams }) {
  await requireAdmin();

  const params = (await searchParams) || {};
  const notice = typeof params.notice === "string" ? params.notice : "";
  const rawError = typeof params.error === "string" ? params.error : "";
  const error = rawError === "NEXT_REDIRECT" ? "" : rawError;
  const { metrics, submissions, statusCards, dashboardNotice } =
    await getEducationSubmissionDashboardData();

  return (
    <main className="site-main edu-page">
      <PageHero
        eyebrow="Education review board"
        title="Review submissions and move strong resources straight into the live hub."
        body="The board now covers the full moderation pass: check the queue, contact contributors, mark status, and publish qualifying linked resources without rebuilding them manually."
        primary={{ href: "/education/contribute", label: "Open Contributor Form" }}
        secondary={{ href: "/admin/education", label: "Open Education Admin" }}
        asideTitle="Current scope"
        asideBody="Summarizes incoming submissions with review context, contact details, quick access to resource links, and direct publish actions."
      />

      {notice ? (
        <div className="submission-status submission-status--success" role="status">
          {notice}
        </div>
      ) : null}

      {error ? (
        <div className="submission-status submission-status--error" role="alert">
          {error}
        </div>
      ) : null}

      {dashboardNotice ? (
        <div className="submission-status submission-status--warning" role="status">
          {dashboardNotice}
        </div>
      ) : null}

      <Reveal as="section" className="edu-metrics" delay={100}>
        {metrics.map((metric) => (
          <article key={metric.label} className="edu-metrics__item">
            <span className="edu-metrics__value">{metric.value}</span>
            <span className="edu-metrics__label">{metric.label}</span>
          </article>
        ))}
      </Reveal>

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

      <Reveal as="section" delay={180}>
        <SectionIntro
          title="Contributor details, moderation actions, and publish controls in one board."
          body="Each card is structured for quick triage: who submitted it, what it is, who it is for, whether a live link exists, and what the next moderation step should be."
        />
        {submissions.length ? (
          <div className="submission-review-list">
            {submissions.map((submission) => {
              const isPublished = submission.status === "published";
              const hasResourceUrl = Boolean(submission.resourceUrl);

              return (
                <article key={submission.id} className="submission-review-card">
                  <div className="submission-review-card__top">
                    <div className="submission-review-card__identity">
                      <p className="submission-review-card__eyebrow">
                        {submission.reference} - {formatDate(submission.createdAt)}
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

                  {!hasResourceUrl ? (
                    <div className="submission-review-card__notes submission-review-card__notes--warning">
                      <p className="submission-review-card__notes-label">Publish requirement</p>
                      <p>This submission can be reviewed, but it still needs a public resource link before it can be published into the live library.</p>
                    </div>
                  ) : null}

                  <div className="submission-review-card__footer">
                    <div className="submission-review-card__contact">
                      <p className="submission-review-card__contact-label">Contributor contact</p>
                      <a
                        href={`mailto:${submission.email}`}
                        className="submission-review-card__contact-link"
                      >
                        {submission.contactName} - {submission.email}
                      </a>
                    </div>

                    <div className="submission-review-card__actions">
                      {hasResourceUrl ? (
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
                        className="button button--secondary"
                      >
                        <span className="button__label">Email contributor</span>
                      </a>

                      <form className="submission-review-card__action-form">
                        <input type="hidden" name="submissionId" value={submission.id} />
                        {!isPublished ? (
                          <button
                            formAction={publishSubmissionAction}
                            className="button button--primary"
                            type="submit"
                            disabled={!hasResourceUrl}
                            aria-disabled={!hasResourceUrl}
                          >
                            <span className="button__label">
                              {hasResourceUrl ? "Publish to hub" : "Needs resource link"}
                            </span>
                          </button>
                        ) : (
                          <span className="submission-review-card__published-note">
                            Already published to the live hub.
                          </span>
                        )}

                        {submission.status !== "approved" && !isPublished ? (
                          <button
                            formAction={approveSubmissionAction}
                            className="button button--secondary"
                            type="submit"
                          >
                            <span className="button__label">Mark approved</span>
                          </button>
                        ) : null}

                        {submission.status !== "rejected" ? (
                          <button
                            formAction={rejectSubmissionAction}
                            className="button button--ghost"
                            type="submit"
                          >
                            <span className="button__label">Reject</span>
                          </button>
                        ) : null}
                      </form>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="edu-tracks__card" style={{ textAlign: "center", padding: "2rem" }}>
            <h3 className="edu-tracks__title">The board is ready for the first contributor.</h3>
            <p className="edu-tracks__body">
              Submissions appear here with review context, moderation controls, and publish actions as they arrive.
            </p>
            <LoadingLink
              href="/education/contribute"
              className="button button--secondary"
              loadingLabel="Opening"
              style={{ justifySelf: "center", marginTop: "0.5rem" }}
            >
              Open Contributor Form
            </LoadingLink>
          </div>
        )}
      </Reveal>
    </main>
  );
}
