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
  "Searchable project archive",
  "Filterable by status and location",
  "Direct funding opportunities"
];

const projectHeroStats = [
  { value: projectCatalog.length, label: "active projects" },
  { value: Array.from(new Set(projectCatalog.map((item) => item.category))).length, label: "categories" },
  { value: Array.from(new Set(projectCatalog.map((item) => item.collection))).length, label: "collections" }
];

const archiveHighlights = projectCatalog.slice(1, 5);
const projectCategories = Array.from(new Set(projectCatalog.map((item) => item.category)));

export default function ProjectsPage() {
  return (
    <main className="site-main page-v2 projects-page">
      <PageHero
        eyebrow="Projects & campaigns"
        title="Discover active projects and support tangible outcomes"
        body="Browse our project archive to understand the work, explore current initiatives, and find opportunities to contribute."
        primary={{ href: "#explore", label: "Browse projects" }}
        secondary={{ href: "/donate", label: "Support now" }}
        highlights={projectHeroHighlights}
        stats={projectHeroStats}
        media={stockMedia.projectsHero}
      />

      <Reveal as="section" className="projects-page__explore-band" delay={90} variant="rise" cascade>
        <div className="projects-page__section-header" data-reveal-group>
          <div className="projects-page__header-content">
            <p className="projects-page__section-eyebrow">Project explorer</p>
            <h2 className="projects-page__section-title">Find projects by category, status, or location</h2>
            <p className="projects-page__section-body">Use the filters below to discover projects that match your interests. Each project shows real impact areas and direct funding needs.</p>
          </div>
        </div>
        <ProjectExplorer items={projectCatalog} />
      </Reveal>

      <Reveal as="section" className="projects-page__featured-band" delay={160} variant="left" cascade>
        <div className="projects-page__featured-container" data-reveal-group>
          <div className="projects-page__featured-header">
            <p className="projects-page__featured-eyebrow">Featured project</p>
            <h2 className="projects-page__featured-title">{sportsSpotlight.title}</h2>
          </div>

          <div className="projects-page__featured-grid" data-reveal-group>
            <div className="projects-page__featured-copy">
              <p className="projects-page__featured-body">{sportsSpotlight.summary}</p>
              <p className="projects-page__featured-body">{sportsSpotlight.body}</p>
              
              <div className="projects-page__featured-meta">
                {sportsSpotlight.priorities.slice(0, 3).map((item) => (
                  <div key={item.title} className="projects-page__meta-fact">
                    <p className="projects-page__meta-fact-label">{item.title}</p>
                    <p className="projects-page__meta-fact-value">{item.body}</p>
                  </div>
                ))}
              </div>

              <div className="hero-actions">
                <LoadingLink
                  href={`/projects/${dodomaProposal.slug}`}
                  className="button button--primary"
                  loadingLabel="Opening"
                >
                  View full proposal
                </LoadingLink>
                <LoadingLink href="/donate" className="button button--secondary" loadingLabel="Opening">
                  Support this project
                </LoadingLink>
              </div>
            </div>

            <div className="projects-page__featured-media" data-reveal-group>
              <StockPhoto
                src={stockMedia.projectsHero.src}
                alt={stockMedia.projectsHero.alt}
                label={stockMedia.projectsHero.label}
                sizes="(max-width: 900px) 100vw, 42vw"
                className="projects-page__image"
              />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="projects-page__more-band" delay={230} variant="right" cascade>
        <div className="projects-page__section-header" data-reveal-group>
          <p className="projects-page__section-eyebrow">More projects</p>
          <h2 className="projects-page__section-title">Additional campaigns and initiatives</h2>
        </div>

        <div className="projects-page__archive-grid" data-reveal-group>
          {archiveHighlights.map((item) => (
            <article key={item.title} className="projects-page__archive-card">
              <div className="projects-page__card-meta">
                <span className="projects-page__card-badge">{item.category}</span>
                <span className="projects-page__card-collection">{item.collection}</span>
              </div>
              <h3 className="projects-page__card-title">{item.title}</h3>
              <p className="projects-page__card-summary">{item.summary}</p>
              <p className="projects-page__card-location">📍 {item.location}</p>
              <LoadingLink href={item.href} className="button button--secondary button--compact" loadingLabel="Opening">
                {item.actionLabel}
              </LoadingLink>
            </article>
          ))}
        </div>

        <div className="projects-page__screening-panel" data-reveal-group>
          <div className="projects-page__panel-content">
            <p className="projects-page__panel-eyebrow">{premiumVideoProject.eyebrow}</p>
            <h3 className="projects-page__panel-title">{premiumVideoProject.title}</h3>
            <p className="projects-page__panel-body">{premiumVideoProject.description}</p>
            <ul className="projects-page__panel-list">
              {sportsSpotlight.futureExpectations.map((expectation) => (
                <li key={expectation}>{expectation}</li>
              ))}
            </ul>
            <div className="hero-actions">
              <LoadingLink
                href={`/projects/${premiumVideoProject.slug}`}
                className="button button--secondary"
                loadingLabel="Opening"
              >
                Open screening
              </LoadingLink>
              <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">
                Back the mission
              </LoadingLink>
            </div>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
