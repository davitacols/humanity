import { InfoCard } from "../../components/InfoCard";
import { LoadingLink } from "../../components/LoadingLink";
import { PageHero } from "../../components/PageHero";
import { premiumVideoProject, programPillars } from "../../components/siteData";

export default function ProgramsPage() {
  return (
    <main className="site-main">
      <PageHero
        eyebrow="Programs hub"
        title="One platform, four distinct empowerment pathways."
        body="The programs experience needs to feel unified without flattening everything into the same card. Each pillar gets its own tone, examples, and growth path."
        primary={{ href: "/projects", label: "See Program Stories" }}
        secondary={{ href: "/education/contribute", label: "Contribute Resources" }}
        asideTitle="Hub logic"
        asideBody="This page acts like a structured content hub, connecting section intros with specific examples, downloads, campaigns, and future learning assets."
      />

      <section className="section">
        <div className="info-grid info-grid--two">
          {programPillars.map((pillar) => (
            <div key={pillar.title} className="hub-card">
              <InfoCard
                eyebrow="Program pillar"
                title={pillar.title}
                body={pillar.body}
                tone={pillar.tone}
              />
              <LoadingLink
                href={pillar.href}
                className="button button--secondary hub-card__cta"
                loadingLabel="Opening"
              >
                Open Section
              </LoadingLink>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="feature-panel">
          <InfoCard
            eyebrow="Education hub launch"
            title="Education now has its own dedicated destination."
            body="The new route is built for downloadable books, coding pathways, external lessons, and practical learning resources that can scale over time."
            tone="mist"
          />
          <div className="feature-panel__content">
            <span className="pill pill--soft">New route</span>
            <h3>Start building the learning side of the platform as a real hub.</h3>
            <p>
              This gives Education more room than a single programs card and prepares the project
              for future cohorts, contributor uploads, and structured lesson collections.
            </p>
            <div className="hero-actions">
              <LoadingLink
                href="/education"
                className="button button--primary"
                loadingLabel="Opening"
              >
                Open Education Hub
              </LoadingLink>
              <LoadingLink
                href="/education/contribute"
                className="button button--secondary"
                loadingLabel="Opening"
              >
                Submit a Resource
              </LoadingLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-grid section-grid--campaign">
        <InfoCard
          eyebrow="Cross-program campaign"
          title="Safe futures for girls and young families"
          body="This shared campaign block is where health, education, arts, and sports can work together in one narrative, with content, downloads, media, and direct support options."
          tone="forest-ink"
        />
        <InfoCard
          eyebrow="Future content layer"
          title="Lessons, toolkits, galleries, and reports"
          body="The first build lays down the visual system. Future iterations can plug in downloadable resources, external learning links, artist spotlights, and outreach reporting."
          tone="paper"
        />
      </section>

      <section className="section">
        <div className="feature-panel">
          <InfoCard
            eyebrow="Premium content channel"
            title="Programs can now sell a single premium video or replay."
            body="This supports project documentaries, fundraiser event playback, and premium storytelling tied to one program or campaign."
            tone="forest-ink"
          />
          <div className="feature-panel__content">
            <span className="pill pill--soft">{premiumVideoProject.price}</span>
            <h3>{premiumVideoProject.title}</h3>
            <p>
              The watch flow is already implemented as a locked route with timed access. We can
              now connect it to a real gateway whenever you are ready.
            </p>
            <div className="hero-actions">
              <LoadingLink
                href={`/projects/${premiumVideoProject.slug}`}
                className="button button--primary"
                loadingLabel="Opening"
              >
                View Pay-Per-View Demo
              </LoadingLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
