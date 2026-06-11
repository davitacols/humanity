import { EducationSubmissionForm } from "../../../components/EducationSubmissionForm";
import { LoadingLink } from "../../../components/LoadingLink";
import { Reveal } from "../../../components/Reveal";
import { educationReviewSteps } from "../../../components/siteData";
import { getEducationHubData } from "../../../lib/education";
import "../education.css";
import "./contribute.css";

export const revalidate = 300;

export const metadata = {
  title: "Contribute Education Resources",
  description:
    "Submit practical lessons, guides, toolkits, and facilitator resources for review in the Humanity First education hub."
};

const strongSubmission = [
  "Name the audience — who the material is actually for.",
  "Share a public link, or explain the access clearly so review isn't blocked.",
  "Summarise the real teaching use, not just what the file contains.",
  "Confirm you have the right to share the material."
];

export default async function EducationContributePage() {
  const { librarySummary, metrics, tracks } = await getEducationHubData();

  const stats = [
    { value: String(librarySummary.categories.length), label: "library categories" },
    { value: String(librarySummary.levels.length), label: "audience levels" },
    { value: "100%", label: "manually reviewed" }
  ];

  return (
    <main className="site-main contribute">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <Reveal as="section" className="contribute-hero" delay={60}>
        <span className="contribute-kicker">Education contributors</span>
        <h1 className="contribute-hero__title">Share a learning resource.</h1>
        <p className="contribute-hero__lead">
          Educators, mentors, schools, and partners — submit a lesson, guide, toolkit, or practical
          learning material. Strong, rights-safe resources are reviewed and published into the public
          education hub.
        </p>
        <div className="contribute-hero__actions">
          <a href="#submit" className="button button--primary">Submit a resource</a>
          <LoadingLink href="/education" className="button button--ghost-light" loadingLabel="Opening">
            Back to education hub
          </LoadingLink>
        </div>
        <div className="contribute-hero__stats" aria-label="Education hub at a glance">
          {stats.map((s) => (
            <article key={s.label} className="contribute-stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </article>
          ))}
        </div>
      </Reveal>

      {/* ── Submit (focal) ────────────────────────────────────── */}
      <Reveal as="section" id="submit" className="contribute-submit" delay={100}>
        <aside className="contribute-submit__aside">
          <div className="contribute-aside-card">
            <span className="contribute-kicker">What makes a strong submission</span>
            <ul className="contribute-checklist">
              {strongSubmission.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="contribute-aside-card contribute-note">
            <span className="contribute-kicker">Publication</span>
            <p>
              <strong>Nothing goes live automatically.</strong> Every submission is reviewed first so
              the public library stays trustworthy, rights-safe, and reliable for facilitators.
            </p>
          </div>

          <LoadingLink href="/education#library-explorer" className="contribute-aside-link" loadingLabel="Opening">
            See the live library →
          </LoadingLink>
        </aside>

        <div className="contribute-submit__form">
          <EducationSubmissionForm />
        </div>
      </Reveal>

      {/* ── How review works ──────────────────────────────────── */}
      <Reveal as="section" className="contribute-section" delay={140}>
        <div className="contribute-section__head">
          <span className="contribute-kicker">How review works</span>
          <h2 className="contribute-heading">A light flow with enough structure to protect quality.</h2>
        </div>
        <div className="contribute-steps">
          {educationReviewSteps.map((item, index) => (
            <article key={item.title} className="contribute-step">
              <span className="contribute-step__num">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* ── Fits a track ──────────────────────────────────────── */}
      {tracks?.length ? (
        <Reveal as="section" className="contribute-section" delay={180}>
          <div className="contribute-section__head">
            <span className="contribute-kicker">Align with the hub</span>
            <h2 className="contribute-heading">Resources that fit a current learning track move fastest.</h2>
          </div>
          <div className="contribute-tracks">
            {tracks.map((track) => (
              <article key={track.title} className="contribute-track">
                <span className="contribute-track__eyebrow">{track.eyebrow}</span>
                <h3>{track.title}</h3>
                <p>{track.body}</p>
              </article>
            ))}
          </div>
        </Reveal>
      ) : null}
    </main>
  );
}
