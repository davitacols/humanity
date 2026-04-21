import { InfoCard } from "../../components/InfoCard";
import { LoadingLink } from "../../components/LoadingLink";
import { PageHero } from "../../components/PageHero";
import { ProjectExplorer } from "../../components/ProjectExplorer";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { StockPhoto } from "../../components/StockPhoto";
import { dodomaProposal, projectCatalog } from "../../components/missionData";
import { stockMedia } from "../../components/stockMedia";
import { premiumVideoProject, sportsSpotlight } from "../../components/siteData";

const projectHeroHighlights = [
  "Flagship campaigns and sector-led stories",
  "Visible asks tied to practical outcomes",
  "Archive, documentary releases, and field reporting"
];

const projectHeroAsidePoints = [
  sportsSpotlight.location,
  sportsSpotlight.beneficiaries,
  sportsSpotlight.totalRequest
];

export default function ProjectsPage() {
  return (
    <main className="site-main page-v2">
      <PageHero
        eyebrow="Projects and stories"
        title="Projects, campaigns, and field stories that make support tangible."
        body="Flagship interventions and sector-led projects so supporters can move from interest to action with clear context."
        primary={{ href: "/donate", label: "Support a Project" }}
        secondary={{ href: "/programs", label: "Browse Programs" }}
        highlights={projectHeroHighlights}
        media={stockMedia.projectsHero}
        asideTitle="Real stories, clear asks"
        asideBody="Active interventions stay visible, campaign priorities are easier to understand, and support maps to practical outcomes."
        asidePoints={projectHeroAsidePoints}
      />

      {/* Flagship spotlight */}
      <Reveal as="section" className="dossier-v2" delay={120}>
        <div className="dossier-v2__lead">
          <StockPhoto src={stockMedia.projectsHero.src} alt={stockMedia.projectsHero.alt} label={stockMedia.projectsHero.label} sizes="(max-width: 1120px) 100vw, 40vw" />
          <h2 className="dossier-v2__title">{sportsSpotlight.title}</h2>
          <p className="dossier-v2__body">{sportsSpotlight.summary}</p>
          <blockquote className="dossier-v2__quote">{sportsSpotlight.body}</blockquote>
          <div className="hero-actions">
            <LoadingLink href={`/projects/${dodomaProposal.slug}`} className="button button--primary" loadingLabel="Opening">Read Full Proposal</LoadingLink>
            <LoadingLink href="/donate" className="button button--secondary" loadingLabel="Opening">Support This Work</LoadingLink>
          </div>
        </div>
        <div className="dossier-v2__sidebar">
          <article className="dossier-v2__fact">
            <p className="dossier-v2__fact-eyebrow">Location</p>
            <p className="dossier-v2__fact-body">{sportsSpotlight.location}</p>
          </article>
          <article className="dossier-v2__fact">
            <p className="dossier-v2__fact-eyebrow">Current reach</p>
            <p className="dossier-v2__fact-body">{sportsSpotlight.beneficiaries}</p>
          </article>
          <article className="dossier-v2__fact">
            <p className="dossier-v2__fact-eyebrow">Inclusion</p>
            <p className="dossier-v2__fact-body">{sportsSpotlight.orphanSupport}</p>
          </article>
          <article className="dossier-v2__fact">
            <p className="dossier-v2__fact-eyebrow">Current ask</p>
            <p className="dossier-v2__fact-body">{sportsSpotlight.totalRequest}</p>
          </article>
          <article className="dossier-v2__fact">
            <p className="dossier-v2__fact-eyebrow">Age groups</p>
            <p className="dossier-v2__fact-body">{sportsSpotlight.ageGroups}</p>
          </article>
        </div>
      </Reveal>

      {/* Priorities */}
      <Reveal as="section" delay={170}>
        <SectionIntro
          eyebrow="Current proposal"
          title="Practical equipment, safe participation, and long-term opportunity."
          body="The immediate ask keeps training sessions equipped, consistent, and development-focused."
        />
        <div className="card-grid-v2">
          {sportsSpotlight.priorities.map((item, i) => (
            <article key={item.title} className="card-v2">
              <div className="card-v2__top">
                <p className="card-v2__eyebrow">Priority {String(i + 1).padStart(2, "0")}</p>
              </div>
              <h3 className="card-v2__title">{item.title}</h3>
              <p className="card-v2__body">{item.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Project explorer */}
      <Reveal as="section" delay={220}>
        <SectionIntro
          eyebrow="Project explorer"
          title="Browse active appeals, program routes, and media releases."
          body="Filter and search projects from one discovery surface."
        />
        <ProjectExplorer items={projectCatalog} />
      </Reveal>

      {/* Documentary + future */}
      <Reveal as="section" delay={280}>
        <div className="split-v2">
          <div className="dark-panel-v2">
            <p className="dark-panel-v2__eyebrow">{premiumVideoProject.eyebrow}</p>
            <h3 className="dark-panel-v2__title">{premiumVideoProject.title}</h3>
            <p className="dark-panel-v2__body">{premiumVideoProject.description}</p>
            <div className="hero-actions">
              <LoadingLink href={`/projects/${premiumVideoProject.slug}`} className="button button--secondary" loadingLabel="Opening">Open Screening</LoadingLink>
            </div>
          </div>
          <div className="dark-panel-v2">
            <p className="dark-panel-v2__eyebrow">Future expectations</p>
            <h3 className="dark-panel-v2__title">Support today unlocks longer pathways for young people.</h3>
            {sportsSpotlight.futureExpectations.map((e) => (
              <p key={e} className="dark-panel-v2__body">• {e}</p>
            ))}
          </div>
        </div>
      </Reveal>
    </main>
  );
}
