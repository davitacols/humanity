import { EducationSubmissionForm } from "../../../components/EducationSubmissionForm";
import { LoadingLink } from "../../../components/LoadingLink";
import { PageHero } from "../../../components/PageHero";
import { Reveal } from "../../../components/Reveal";
import { SectionIntro } from "../../../components/SectionIntro";
import { educationReviewSteps, educationSubmissionGuidelines } from "../../../components/siteData";

export default function EducationContributePage() {
  return (
    <main className="site-main edu-page">
      <PageHero
        eyebrow="Education contributors"
        title="Submit a learning resource for the hub."
        body="This intake flow is for educators, mentors, partners, and organizations who want to share books, lesson links, facilitator kits, and digital skills materials."
        primary={{ href: "#resource-submission", label: "Open Submission Form" }}
        secondary={{ href: "/education", label: "Back to Education Hub" }}
        asideTitle="Review approach"
        asideBody="Each submission is reviewed before publication so the library stays practical, trustworthy, and aligned with the communities the initiative serves."
      />

      {/* Guidelines */}
      <Reveal as="section" delay={100}>
        <SectionIntro
          eyebrow="Submission guidelines"
          title="Useful, mobile-friendly resources that travel well across community settings."
          body="The strongest submissions are clear, practical, and easy to reuse in schools, workshops, and community learning spaces."
        />
        <div className="edu-tracks">
          {educationSubmissionGuidelines.map((item, i) => (
            <article key={item.title} className="edu-tracks__card">
              <div className="edu-tracks__header">
                <span className="edu-tracks__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="edu-tracks__eyebrow">{item.eyebrow}</span>
              </div>
              <h3 className="edu-tracks__title">{item.title}</h3>
              <p className="edu-tracks__body">{item.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Review process */}
      <Reveal as="section" className="edu-how" delay={150}>
        <div className="edu-how__intro">
          <p className="edu-how__eyebrow">Review process</p>
          <h2 className="edu-how__title">A simple contributor process that scales with the library.</h2>
          <p className="edu-how__body">
            This intake flow keeps the contributor experience light while giving the team enough
            context to vet and organize new materials.
          </p>
        </div>
        <div className="edu-how__steps">
          {educationReviewSteps.map((item, i) => (
            <article key={item.title} className="edu-how__step">
              <span className="edu-how__step-num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="edu-how__step-title">{item.title}</h3>
              <p className="edu-how__step-body">{item.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Submission form */}
      <Reveal as="section" delay={200}>
        <div className="submission-layout" id="resource-submission">
          <div className="submission-layout__side">
            <article className="edu-tracks__card">
              <div className="edu-tracks__header">
                <span className="edu-tracks__eyebrow">Best fit</span>
              </div>
              <h3 className="edu-tracks__title">Books, lesson links, toolkits, and practical teaching resources.</h3>
              <p className="edu-tracks__body">Submit public links, downloadable materials, workshop guides, or community-ready learning assets.</p>
            </article>
            <article className="edu-tracks__card">
              <div className="edu-tracks__header">
                <span className="edu-tracks__eyebrow">Need context first?</span>
              </div>
              <h3 className="edu-tracks__title">See how the Education Hub is structured before you submit.</h3>
              <p className="edu-tracks__body">Review the learning tracks, resource categories, and cohort direction so your contribution fits.</p>
            </article>
            <LoadingLink href="/education" className="button button--secondary submission-layout__link" loadingLabel="Opening">
              Review Education Hub
            </LoadingLink>
            <LoadingLink href="/education/review" className="button button--secondary submission-layout__link" loadingLabel="Opening">
              Open Internal Review Board
            </LoadingLink>
          </div>
          <EducationSubmissionForm />
        </div>
      </Reveal>
    </main>
  );
}
