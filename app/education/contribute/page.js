import { EducationSubmissionForm } from "../../../components/EducationSubmissionForm";
import { InfoCard } from "../../../components/InfoCard";
import { LoadingLink } from "../../../components/LoadingLink";
import { PageHero } from "../../../components/PageHero";
import { SectionIntro } from "../../../components/SectionIntro";
import {
  educationReviewSteps,
  educationSubmissionGuidelines
} from "../../../components/siteData";

export default function EducationContributePage() {
  return (
    <main className="site-main">
      <PageHero
        eyebrow="Education contributors"
        title="Submit a learning resource for the hub."
        body="This intake flow is for educators, mentors, partners, and organizations who want to share books, lesson links, facilitator kits, and digital skills materials with the initiative."
        primary={{ href: "#resource-submission", label: "Open Submission Form" }}
        secondary={{ href: "/education", label: "Back to Education Hub" }}
        asideTitle="Review approach"
        asideBody="Each submission is reviewed before publication so the library stays practical, trustworthy, and aligned with the communities the initiative serves."
      />

      <section className="section">
        <SectionIntro
          title="Useful, mobile-friendly resources that travel well across community settings."
          body="The strongest submissions are clear, practical, and easy to reuse in schools, workshops, small cohorts, and community learning spaces."
        />

        <div className="info-grid info-grid--three">
          {educationSubmissionGuidelines.map((item) => (
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
          title="A simple contributor process that scales with the library."
          body="This intake flow keeps the contributor experience light while giving the team enough context to vet and organize new materials."
        />

        <div className="section-grid section-grid--split">
          {educationReviewSteps.map((item) => (
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
        <div className="submission-layout" id="resource-submission">
          <div className="submission-layout__side">
            <InfoCard
              eyebrow="Best fit"
              title="Books, lesson links, toolkits, and practical teaching resources."
              body="Submit public links, downloadable materials, workshop guides, or community-ready learning assets that fit the education mission."
              tone="forest-ink"
            />
            <InfoCard
              eyebrow="Need context first?"
              title="See how the Education Hub is structured before you submit."
              body="Review the learning tracks, resource categories, and cohort direction so your contribution fits the structure of the hub."
              tone="paper"
            />
            <LoadingLink
              href="/education"
              className="button button--secondary submission-layout__link"
              loadingLabel="Opening"
            >
              Review Education Hub
            </LoadingLink>
            <LoadingLink
              href="/education/review"
              className="button button--secondary submission-layout__link"
              loadingLabel="Opening"
            >
              Open Internal Review Board
            </LoadingLink>
          </div>

          <EducationSubmissionForm />
        </div>
      </section>
    </main>
  );
}
