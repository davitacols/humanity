import { LoadingLink } from "../../components/LoadingLink";
import { ProjectExplorer } from "../../components/ProjectExplorer";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { StockPhoto } from "../../components/StockPhoto";
import { dodomaProposal, projectCatalog } from "../../components/missionData";
import { stockMedia } from "../../components/stockMedia";
import { premiumVideoProject, sportsSpotlight } from "../../components/siteData";

const categories = Array.from(new Set(projectCatalog.map((p) => p.category)));

export const metadata = {
  title: "Projects",
  description: "Documented field projects with real needs, budgets, and progress — from sports facilities to community screenings."
};

export default function ProjectsPage() {
  return (
    <main className="site-main proj">
      {/* Hero */}
      <Reveal as="section" className="about-hero" delay={60}>
        <img src={stockMedia.projectsHero.src} alt={stockMedia.projectsHero.alt} className="about-hero__bg" />
        <div className="about-hero__overlay" />
        <div className="about-hero__content">
          <p className="about-hero__eyebrow">Projects &amp; campaigns</p>
          <h1 className="about-hero__title">Discover active projects and support tangible outcomes.</h1>
          <p className="about-hero__body">
            Browse the project archive to understand the work, explore current initiatives,
            and find opportunities to contribute directly.
          </p>
          <div className="hero-actions">
            <a href="#explore" className="button button--primary">Browse projects</a>
            <LoadingLink href="/donate" className="button button--ghost-light" loadingLabel="Opening">Support now</LoadingLink>
          </div>
        </div>
        <div className="about-hero__stats">
          <article className="about-hero__stat">
            <p className="about-hero__stat-value">{projectCatalog.length}</p>
            <p className="about-hero__stat-label">documented projects</p>
          </article>
          <article className="about-hero__stat">
            <p className="about-hero__stat-value">{categories.length}</p>
            <p className="about-hero__stat-label">program categories</p>
          </article>
          <article className="about-hero__stat">
            <p className="about-hero__stat-value">{new Set(projectCatalog.map((p) => p.collection)).size}</p>
            <p className="about-hero__stat-label">active collections</p>
          </article>
        </div>
      </Reveal>

      {/* Category quick-links */}
      <Reveal as="section" className="proj__section" delay={90}>
        <div className="proj__cats">
          {categories.map((cat) => (
            <a key={cat} href="#explore" className="proj__cat">{cat}</a>
          ))}
        </div>
      </Reveal>

      {/* Featured — Dodoma */}
      <Reveal as="section" className="proj__section" delay={120}>
        <div className="proj__featured">
          <div className="proj__featured-media">
            <StockPhoto src={stockMedia.projectsHero.src} alt={stockMedia.projectsHero.alt} label="Featured project" ratio="portrait" sizes="(max-width: 1120px) 100vw, 40vw" />
          </div>
          <div className="proj__featured-copy">
            <p className="proj__featured-eyebrow">Featured project</p>
            <h2 className="proj__featured-title">{sportsSpotlight.title}</h2>
            <p className="proj__featured-body">{sportsSpotlight.summary}</p>
            <p className="proj__featured-body">{sportsSpotlight.body}</p>
            <div className="proj__featured-facts">
              {[
                ["Location", sportsSpotlight.location],
                ["Reach", sportsSpotlight.beneficiaries],
                ["Support", sportsSpotlight.orphanSupport],
                ["Current ask", sportsSpotlight.totalRequest]
              ].map(([label, value]) => (
                <div key={label} className="proj__featured-fact">
                  <span className="proj__featured-fact-label">{label}</span>
                  <span className="proj__featured-fact-value">{value}</span>
                </div>
              ))}
            </div>
            <div className="proj__featured-priorities">
              {sportsSpotlight.priorities.slice(0, 3).map((p) => (
                <article key={p.title} className="proj__featured-priority">
                  <h4>{p.title}</h4>
                  <p>{p.body}</p>
                </article>
              ))}
            </div>
            <div className="hero-actions">
              <LoadingLink href={`/projects/${dodomaProposal.slug}`} className="button button--primary" loadingLabel="Opening">View full proposal</LoadingLink>
              <LoadingLink href="/donate" className="button button--secondary" loadingLabel="Opening">Support this project</LoadingLink>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Explorer */}
      <Reveal as="section" id="explore" className="proj__section" delay={180}>
        <SectionIntro eyebrow="Project explorer" title="Find projects by category, status, or location." body="Use the filters to discover projects that match your interests. Each project shows real impact areas and direct funding needs." />
        <ProjectExplorer items={projectCatalog} />
      </Reveal>

      {/* Documentary */}
      <Reveal as="section" className="proj__section" delay={240}>
        <div className="proj__doc">
          <div className="proj__doc-copy">
            <p className="proj__doc-eyebrow">{premiumVideoProject.eyebrow}</p>
            <h2 className="proj__doc-title">{premiumVideoProject.title}</h2>
            <p className="proj__doc-body">{premiumVideoProject.description}</p>
            <ul className="proj__doc-list">
              {premiumVideoProject.benefits.map((b) => <li key={b}>{b}</li>)}
            </ul>
            <div className="hero-actions">
              <LoadingLink href={`/projects/${premiumVideoProject.slug}`} className="button button--primary" loadingLabel="Opening">Open screening</LoadingLink>
              <LoadingLink href="/donate" className="button button--ghost-light" loadingLabel="Opening">Back the mission</LoadingLink>
            </div>
          </div>
          <div className="proj__doc-visual">
            <StockPhoto src={stockMedia.screeningHero.src} alt={stockMedia.screeningHero.alt} label="Documentary" sizes="(max-width: 1120px) 100vw, 44vw" />
          </div>
        </div>
      </Reveal>
    </main>
  );
}
