import { EducationSubmissionForm } from "../../../components/EducationSubmissionForm";
import { LoadingLink } from "../../../components/LoadingLink";
import { PageHero } from "../../../components/PageHero";
import { Reveal } from "../../../components/Reveal";
import { SectionIntro } from "../../../components/SectionIntro";
import { stockMedia } from "../../../components/stockMedia";
import {
  educationReviewSteps,
  educationSubmissionGuidelines
} from "../../../components/siteData";
import { getEducationHubData } from "../../../lib/education";

export const revalidate = 300;

export const metadata = {
  title: "Contribute Education Resources",
  description:
    "Submit practical lessons, guides, toolkits, and facilitator resources for review in the Humanity First education hub."
};

const contributionPractices = [
  {
    title: "Clear audience fit",
    body: "Say who the material is for so first-time learners, mentors, and facilitators do not have to guess.",
    eyebrow: "Best practice"
  },
  {
    title: "Public or review-ready access",
    body: "Share a public link when possible, or explain the access arrangement clearly so review is not blocked.",
    eyebrow: "Access"
  },
  {
    title: "Session-ready summary",
    body: "Describe how the resource helps in a workshop, cohort, classroom, or follow-up moment, not just what the file contains.",
    eyebrow: "Practical use"
  }
];

function getTrackPrompt(track) {
  const normalized = track.title.toLowerCase();

  if (normalized.includes("coding")) {
    return "Helpful when the resource introduces digital confidence, web basics, or first coding steps.";
  }

  if (normalized.includes("work")) {
    return "Helpful when the resource supports employability habits, digital productivity, or safer online work patterns.";
  }

  return "Helpful when the resource strengthens facilitation, mentorship, reuse, or shared community teaching.";
}

export default async function EducationContributePage() {
  const { librarySummary, metrics, tracks } = await getEducationHubData();

  return (
    <main className="site-main page-v2 edu-page">
      <PageHero
        eyebrow="Education contributors"
        title="Submit a learning resource that can stand up in real community use."
        body="This contributor route is for educators, mentors, schools, partners, and organizations sharing lessons, guides, workshop kits, and practical learning materials for the public hub."
        primary={{ href: "#resource-submission", label: "Open submission form" }}
        secondary={{ href: "/education", label: "Back to education hub" }}
        highlights={[
          `${librarySummary.categories.length} live library categories`,
          `${librarySummary.levels.length} audience levels`,
          "Manual review before publication"
        ]}
        stats={metrics}
        media={stockMedia.educationFeature}
        asideTitle="What makes a strong submission"
        asideBody="The best resources are clear about audience, easy to access, rights-safe to share, and useful in workshops, cohorts, schools, or community learning spaces."
        asidePoints={[
          "Give a summary that explains the real teaching use",
          "Use a public link or explain access in plain language",
          "Confirm that you have the right to share the material"
        ]}
      />

      <Reveal as="section" delay={90}>
        <SectionIntro
          eyebrow="Contribution standard"
          title="Strong submissions name the learner, access link, and teaching use."
          body="Resources move through review faster when the audience, permissions, format, and workshop or cohort use are easy to understand."
        />
        <div className="card-grid-v2 card-grid-v2--3">
          {contributionPractices.map((item, index) => (
            <article key={item.title} className="card-v2">
              <div className="card-v2__top">
                <span className="card-v2__index">{String(index + 1).padStart(2, "0")}</span>
                <p className="card-v2__eyebrow">{item.eyebrow}</p>
              </div>
              <h3 className="card-v2__title">{item.title}</h3>
              <p className="card-v2__body">{item.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" delay={140}>
        <SectionIntro
          eyebrow="Submission guidelines"
          title="Useful, mobile-friendly resources that travel well across different settings."
          body="The strongest submissions are easy to reuse in schools, workshops, community sessions, and low-bandwidth environments."
        />
        <div className="edu-tracks">
          {educationSubmissionGuidelines.map((item, index) => (
            <article key={item.title} className="edu-tracks__card">
              <div className="edu-tracks__header">
                <span className="edu-tracks__num">{String(index + 1).padStart(2, "0")}</span>
                <span className="edu-tracks__eyebrow">{item.eyebrow}</span>
              </div>
              <h3 className="edu-tracks__title">{item.title}</h3>
              <p className="edu-tracks__body">{item.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" delay={190}>
        <SectionIntro
          eyebrow="Align with the hub"
          title="Match your resource to a current learning track."
          body="Coding foundations, digital skills for work, and community learning materials are the main routes for new submissions."
        />
        <div className="ledger-grid">
          {tracks.map((track, index) => (
            <article key={track.title} className={`ledger-card ledger-card--${track.tone || "mist"}`}>
              <div className="ledger-card__top">
                <span className="ledger-card__index">{String(index + 1).padStart(2, "0")}</span>
                <span className="ledger-card__eyebrow">{track.eyebrow}</span>
              </div>
              <h3 className="ledger-card__title">{track.title}</h3>
              <p className="ledger-card__body">{track.body}</p>
              <p className="ledger-card__body">{getTrackPrompt(track)}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="edu-how" delay={240}>
        <div className="edu-how__intro">
          <p className="edu-how__eyebrow">Review process</p>
          <h2 className="edu-how__title">A lightweight contributor flow with enough structure to protect quality.</h2>
          <p className="edu-how__body">
            Contributors provide the title, audience, access link, usage summary, and rights context
            the team needs to review the material.
          </p>
        </div>
        <div className="split-v2">
          <div className="edu-how__steps">
            {educationReviewSteps.map((item, index) => (
              <article key={item.title} className="edu-how__step">
                <span className="edu-how__step-num">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="edu-how__step-title">{item.title}</h3>
                <p className="edu-how__step-body">{item.body}</p>
              </article>
            ))}
          </div>

          <article className="dark-panel-v2">
            <p className="dark-panel-v2__eyebrow">Library snapshot</p>
            <h2 className="dark-panel-v2__title">Strong submissions fill a learner or facilitator need.</h2>
            <p className="dark-panel-v2__body">
              The current hub already spans {librarySummary.categories.length} categories and {` `}
              {librarySummary.levels.length} audience levels. Add a resource when it serves a
              missing audience, gives a better low-bandwidth format, or improves session delivery.
            </p>
            <p className="dark-panel-v2__body">
              Before submitting, check whether your resource fills a missing audience need, offers a
              better format for low-bandwidth use, or improves facilitator delivery in a concrete way.
            </p>
            <div className="hero-actions">
              <LoadingLink href="/education#library-explorer" className="button button--primary" loadingLabel="Opening">
                Review the live library
              </LoadingLink>
              <LoadingLink href="/get-involved" className="button button--secondary" loadingLabel="Opening">
                Explore more contribution routes
              </LoadingLink>
            </div>
          </article>
        </div>
      </Reveal>

      <Reveal as="section" delay={300}>
        <div className="submission-layout" id="resource-submission">
          <div className="submission-layout__side">
            <article className="edu-tracks__card">
              <div className="edu-tracks__header">
                <span className="edu-tracks__eyebrow">Best fit</span>
              </div>
              <h3 className="edu-tracks__title">Lessons, guides, toolkits, worksheet packs, and practical teaching assets.</h3>
              <p className="edu-tracks__body">
                Submit public links, downloadable materials, workshop guides, or reusable learning
                resources that can support a real session or cohort.
              </p>
            </article>

            <article className="edu-tracks__card">
              <div className="edu-tracks__header">
                <span className="edu-tracks__eyebrow">Before you send</span>
              </div>
              <h3 className="edu-tracks__title">Make the reviewer's job easier with a clear summary and clean access note.</h3>
              <p className="edu-tracks__body">
                Explain the audience, the teaching moment, and any access detail the team needs to
                know if the resource is private, draft-only, or shared through a hosted file.
              </p>
            </article>

            <article className="edu-tracks__card">
              <div className="edu-tracks__header">
                <span className="edu-tracks__eyebrow">Publication note</span>
              </div>
              <h3 className="edu-tracks__title">Nothing goes live automatically.</h3>
              <p className="edu-tracks__body">
                Every submission enters review first so the public library stays trustworthy, rights-safe,
                and easier for facilitators to rely on.
              </p>
            </article>

            <LoadingLink href="/education" className="button button--secondary submission-layout__link" loadingLabel="Opening">
              Review education hub
            </LoadingLink>
            <LoadingLink href="/donate?fund=education-access#live-checkout" className="button button--secondary submission-layout__link" loadingLabel="Opening">
              Support education access
            </LoadingLink>
          </div>

          <EducationSubmissionForm />
        </div>
      </Reveal>
    </main>
  );
}


