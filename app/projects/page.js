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
  "Archive, documentary releases, and field reporting in one place"
];

const projectHeroAsidePoints = [
  sportsSpotlight.location,
  sportsSpotlight.beneficiaries,
  sportsSpotlight.totalRequest
];

export default function ProjectsPage() {
  return (
    <main className="site-main">
      <PageHero
        eyebrow="Projects and stories"
        title="Projects, campaigns, and field stories that make support tangible."
        body="This archive brings together flagship interventions and sector-led projects so supporters can move from interest to action with clear context."
        primary={{ href: "/donate", label: "Support a Project" }}
        secondary={{ href: "/programs", label: "Browse Programs" }}
        highlights={projectHeroHighlights}
        media={stockMedia.projectsHero}
        asideTitle="Real stories, clear asks, stronger support decisions"
        asideBody="The projects layer keeps active interventions visible, makes campaign priorities easier to understand, and shows how support maps to practical outcomes."
        asidePoints={projectHeroAsidePoints}
      />

      <Reveal as="section" className="section" delay={120}>
        <div className="home-showcase-grid">
          <article className="campaign-dossier">
            <div className="campaign-dossier__lead">
              <StockPhoto
                src={stockMedia.projectsHero.src}
                alt={stockMedia.projectsHero.alt}
                label={stockMedia.projectsHero.label}
                sizes="(max-width: 1180px) 100vw, 34vw"
                className="campaign-dossier__media"
              />
              <span className="pill pill--soft">Flagship impact story</span>
              <h3 className="campaign-dossier__title">{sportsSpotlight.title}</h3>
              <p className="campaign-dossier__body">{sportsSpotlight.summary}</p>
              <blockquote className="campaign-dossier__quote">{sportsSpotlight.body}</blockquote>
            </div>

            <div className="campaign-dossier__facts">
              <div className="home-meta-row">
                <span className="home-meta-pill">{sportsSpotlight.location}</span>
                <span className="home-meta-pill">{sportsSpotlight.founded}</span>
                <span className="home-meta-pill">{sportsSpotlight.beneficiaries}</span>
                <span className="home-meta-pill">{sportsSpotlight.orphanSupport}</span>
              </div>

              <div className="campaign-dossier__support-list">
                <article className="campaign-dossier__support-item">
                  <p className="campaign-dossier__support-eyebrow">Current ask</p>
                  <p className="campaign-dossier__support-body">{sportsSpotlight.totalRequest}</p>
                </article>
                <article className="campaign-dossier__support-item">
                  <p className="campaign-dossier__support-eyebrow">Age range</p>
                  <p className="campaign-dossier__support-body">{sportsSpotlight.ageGroups}</p>
                </article>
              </div>

              <div className="hero-actions">
                <LoadingLink
                  href={`/projects/${dodomaProposal.slug}`}
                  className="button button--primary"
                  loadingLabel="Opening"
                >
                  Read Full Proposal
                </LoadingLink>
                <LoadingLink
                  href="/programs"
                  className="button button--secondary"
                  loadingLabel="Opening"
                >
                  Explore Sports Programs
                </LoadingLink>
              </div>
            </div>
          </article>

          <div className="assurance-stack">
            {sportsSpotlight.supportAreas.map((item, index) => (
              <article key={item} className="assurance-card">
                <p className="assurance-card__eyebrow">
                  Support area {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="assurance-card__title">{item}</h3>
                <p className="assurance-card__body">
                  This support route keeps training active, protects young participants, and builds
                  longer-term opportunities around sport, discipline, and community development.
                </p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section" delay={170}>
        <SectionIntro
          eyebrow="Current proposal"
          title="The translated proposal focuses on practical equipment, safe participation, and long-term opportunity."
          body="The immediate ask keeps training sessions equipped, consistent, and development-focused while the academy vision grows."
        />

        <div className="section-grid section-grid--campaign">
          <div className="priority-list">
            {sportsSpotlight.priorities.map((item, index) => (
              <article key={item.title} className="priority-card">
                <p className="priority-card__eyebrow">Priority {String(index + 1).padStart(2, "0")}</p>
                <h3 className="priority-card__title">{item.title}</h3>
                <p className="priority-card__body">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="home-route-panel">
            <span className="pill pill--soft">Proposal summary</span>
            <h3>{sportsSpotlight.title}</h3>
            <p>{sportsSpotlight.totalRequest}</p>
            <p>{sportsSpotlight.ageGroups}</p>
            <div className="home-meta-row">
              <span className="home-meta-pill">{sportsSpotlight.beneficiaries}</span>
              <span className="home-meta-pill">{sportsSpotlight.orphanSupport}</span>
            </div>
            <div className="hero-actions">
              <LoadingLink
                href={`/projects/${dodomaProposal.slug}`}
                className="button button--primary"
                loadingLabel="Opening"
              >
                Open Full Proposal
              </LoadingLink>
              <LoadingLink
                href="/get-involved"
                className="button button--secondary"
                loadingLabel="Opening"
              >
                Discuss Partnership
              </LoadingLink>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section" delay={220}>
        <SectionIntro
          eyebrow="Project explorer"
          title="A browsable project and campaign layer that feels active, searchable, and easier to navigate."
          body="This turns the projects page into a real discovery surface where visitors can filter active appeals, program routes, and media releases instead of reading one long static list."
        />

        <ProjectExplorer items={projectCatalog} />
      </Reveal>

      <Reveal as="section" className="section" delay={280}>
        <div className="section-grid section-grid--split">
          <div className="home-route-panel home-route-panel--dark">
            <span className="pill pill--soft">{premiumVideoProject.eyebrow}</span>
            <h3>{premiumVideoProject.title}</h3>
            <p>{premiumVideoProject.description}</p>
            <div className="home-meta-row">
              <span className="home-meta-pill">{premiumVideoProject.price}</span>
              <span className="home-meta-pill">{premiumVideoProject.runtime}</span>
              <span className="home-meta-pill">{premiumVideoProject.accessWindow}</span>
            </div>
            <div className="hero-actions">
              <LoadingLink
                href={`/projects/${premiumVideoProject.slug}`}
                className="button button--secondary"
                loadingLabel="Opening"
              >
                Open Documentary Screening
              </LoadingLink>
            </div>
          </div>

          <div className="home-route-panel">
            <span className="pill pill--soft">Long-term expectation</span>
            <h3>Support today unlocks longer pathways for young people.</h3>
            <div className="stack-grid">
              {sportsSpotlight.futureExpectations.map((expectation) => (
                <InfoCard
                  key={expectation}
                  eyebrow="Outcome"
                  title={expectation}
                  body="This sits inside the center's wider ambition to use sports as a tool for health, belonging, discipline, and long-term opportunity."
                  tone="paper"
                />
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
