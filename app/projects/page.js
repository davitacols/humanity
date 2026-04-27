import { LoadingLink } from "../../components/LoadingLink";
import { ProjectExplorer } from "../../components/ProjectExplorer";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { StockPhoto } from "../../components/StockPhoto";
import { dodomaProposal, projectCatalog } from "../../components/missionData";
import { stockMedia } from "../../components/stockMedia";
import { premiumVideoProject, sportsSpotlight } from "../../components/siteData";

const quickStats = [
  { value: String(projectCatalog.length), label: "documented projects" },
  { value: String(new Set(projectCatalog.map((p) => p.category)).size), label: "program categories" },
  { value: String(new Set(projectCatalog.map((p) => p.collection)).size), label: "active collections" }
];

export default function ProjectsPage() {
  return (
    <main className="site-main projects-v2">
      {/* Hero — immersive */}
      <Reveal as="section" className="projects-hero" delay={60}>
        <img src={stockMedia.projectsHero.src} alt={stockMedia.projectsHero.alt} className="projects-hero__bg" />
        <div className="projects-hero__overlay" />
        <div className="projects-hero__content">
          <p className="projects-hero__eyebrow">Projects &amp; campaigns</p>
          <h1 className="projects-hero__title">
            Discover active projects and support tangible outcomes.
          </h1>
          <p className="projects-hero__body">
            Browse the project archive to understand the work, explore current initiatives,
            and find opportunities to contribute directly.
          </p>
          <div className="hero-actions">
            <a href="#explore" className="button button--primary">Browse projects</a>
            <LoadingLink href="/donate" className="button button--ghost-light" loadingLabel="Opening">
              Support now
            </LoadingLink>
          </div>
        </div>
        <div className="projects-hero__stats">
          {quickStats.map((s) => (
            <article key={s.label} className="projects-hero__stat">
              <p className="projects-hero__stat-value">{s.value}</p>
              <p className="projects-hero__stat-label">{s.label}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Featured project */}
      <Reveal as="section" className="projects-v2__section" delay={100}>
        <div className="projects-featured">
          <div className="projects-featured__media">
            <StockPhoto
              src={stockMedia.projectsHero.src}
              alt={stockMedia.projectsHero.alt}
              label="Featured project"
              ratio="portrait"
              sizes="(max-width: 1120px) 100vw, 44vw"
            />
          </div>
          <div className="projects-featured__copy">
            <p className="projects-featured__eyebrow">Featured project</p>
            <h2 className="projects-featured__title">{sportsSpotlight.title}</h2>
            <p className="projects-featured__body">{sportsSpotlight.summary}</p>
            <div className="projects-featured__facts">
              <div className="projects-featured__fact">
                <span className="projects-featured__fact-label">Location</span>
                <span className="projects-featured__fact-value">{sportsSpotlight.location}</span>
              </div>
              <div className="projects-featured__fact">
                <span className="projects-featured__fact-label">Reach</span>
                <span className="projects-featured__fact-value">{sportsSpotlight.beneficiaries}</span>
              </div>
              <div className="projects-featured__fact">
                <span className="projects-featured__fact-label">Support</span>
                <span className="projects-featured__fact-value">{sportsSpotlight.orphanSupport}</span>
              </div>
              <div className="projects-featured__fact">
                <span className="projects-featured__fact-label">Current ask</span>
                <span className="projects-featured__fact-value">{sportsSpotlight.totalRequest}</span>
              </div>
            </div>
            <div className="projects-featured__priorities">
              {sportsSpotlight.priorities.slice(0, 3).map((p) => (
                <div key={p.title} className="projects-featured__priority">
                  <h4>{p.title}</h4>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
            <div className="hero-actions">
              <LoadingLink href={`/projects/${dodomaProposal.slug}`} className="button button--primary" loadingLabel="Opening">
                View full proposal
              </LoadingLink>
              <LoadingLink href="/donate" className="button button--secondary" loadingLabel="Opening">
                Support this project
              </LoadingLink>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Explorer */}
      <Reveal as="section" id="explore" className="projects-v2__section" delay={160}>
        <SectionIntro
          eyebrow="Project explorer"
          title="Find projects by category, status, or location."
          body="Use the filters to discover projects that match your interests. Each project shows real impact areas and direct funding needs."
        />
        <ProjectExplorer items={projectCatalog} />
      </Reveal>

      {/* Documentary panel */}
      <Reveal as="section" className="projects-v2__section" delay={220}>
        <div className="projects-screening">
          <div className="projects-screening__copy">
            <p className="projects-screening__eyebrow">{premiumVideoProject.eyebrow}</p>
            <h2 className="projects-screening__title">{premiumVideoProject.title}</h2>
            <p className="projects-screening__body">{premiumVideoProject.description}</p>
            <ul className="projects-screening__list">
              {premiumVideoProject.benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="hero-actions">
              <LoadingLink href={`/projects/${premiumVideoProject.slug}`} className="button button--ghost-light" loadingLabel="Opening">
                Open screening
              </LoadingLink>
              <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">
                Back the mission
              </LoadingLink>
            </div>
          </div>
          <div className="projects-screening__visual">
            <StockPhoto
              src={stockMedia.screeningHero.src}
              alt={stockMedia.screeningHero.alt}
              label="Documentary"
              sizes="(max-width: 1120px) 100vw, 44vw"
            />
          </div>
        </div>
      </Reveal>
    </main>
  );
}
