import { InfoCard } from "../../components/InfoCard";
import { LoadingLink } from "../../components/LoadingLink";
import { PageHero } from "../../components/PageHero";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { stockMedia } from "../../components/stockMedia";
import {
  premiumVideoProject,
  programPillars,
  sibProfile,
  sportsSpotlight
} from "../../components/siteData";

const pillarTones = ["mist", "blush", "leaf", "sand"];

const programHeroHighlights = [
  "Four connected program pillars",
  "Education hub and contributor flow already live",
  "Creative advocacy and youth sports lead with visible stories"
];

const programHeroAsidePoints = [
  "Education access with resources and facilitator tools",
  "Arts and storytelling for advocacy and cultural visibility",
  "Public health and sports pathways that support long-term development"
];

export default function ProgramsPage() {
  return (
    <main className="site-main">
      <PageHero
        eyebrow="Programs hub"
        title="Four empowerment pathways, one connected humanitarian mission."
        body="Education, arts and storytelling, public health, and sports development are organized here so visitors can see what each program delivers on the ground."
        primary={{ href: "/projects", label: "See Program Stories" }}
        secondary={{ href: "/education/contribute", label: "Contribute Resources" }}
        highlights={programHeroHighlights}
        media={stockMedia.programsHero}
        asideTitle="What this page does"
        asideBody="Use this page to jump straight into each sector, then follow real stories, resources, and ways to support."
        asidePoints={programHeroAsidePoints}
      />

      <Reveal as="section" className="section" delay={120}>
        <SectionIntro
          eyebrow="Program map"
          title="Clear routes into the sectors that shape the initiative."
          body="Each pillar has its own focus while the experience still feels like one connected initiative."
        />

        <div className="browse-grid">
          {programPillars.map((pillar, index) => (
            <article key={pillar.title} className={`browse-card browse-card--${pillarTones[index]}`}>
              <div className="browse-card__top">
                <span className="browse-card__index">{String(index + 1).padStart(2, "0")}</span>
                <span className="browse-card__eyebrow">Program pillar</span>
              </div>
              <h3 className="browse-card__title">{pillar.title}</h3>
              <p className="browse-card__body">{pillar.body}</p>
              <LoadingLink
                href={pillar.href}
                className="button button--secondary browse-card__cta"
                loadingLabel="Opening"
              >
                Open Section
              </LoadingLink>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="section" delay={170}>
        <div className="editorial-band">
          <div className="editorial-band__lead">
            <h3 className="editorial-band__title">
              Education is now its own working destination, not just a program summary.
            </h3>
          </div>

          <div className="editorial-band__body">
            <article className="editorial-band__entry">
              <p className="editorial-band__eyebrow">What it enables</p>
              <h4 className="editorial-band__entry-title">Books, lessons, coding pathways, and facilitator resources</h4>
              <p className="editorial-band__entry-body">
                The learning side includes downloadable resources, contributor-submitted materials,
                and cohorts without hiding them inside a single card.
              </p>
            </article>

            <article className="editorial-band__entry">
              <p className="editorial-band__eyebrow">What it delivers</p>
              <h4 className="editorial-band__entry-title">A practical learning layer that grows with the mission</h4>
              <p className="editorial-band__entry-body">
                This gives the initiative a learning channel that supports publishing, mentorship,
                and education support flows.
              </p>
            </article>

            <div className="editorial-band__actions">
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
      </Reveal>

      <Reveal as="section" className="section" delay={220}>
        <SectionIntro
          eyebrow="Proof in practice"
          title="Creative advocacy and youth sports already give the initiative strong, visible stories."
          body="These examples show how different kinds of impact work live under one mission."
        />

        <div className="network-grid">
          <article className="network-profile-card">
            <h3 className="network-profile-card__title">{sibProfile.name}</h3>
            <p className="network-profile-card__role">{sibProfile.role}</p>
            <p className="network-profile-card__body">{sibProfile.summary}</p>
            <p className="network-profile-card__update">{sibProfile.body}</p>
            <div className="chip-row">
              {sibProfile.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
            <div className="hero-actions">
              <LoadingLink
                href="/about"
                className="button button--primary"
                loadingLabel="Opening"
              >
                Read Creative Profile
              </LoadingLink>
            </div>
          </article>

          <div className="section__stack">
            <div className="home-route-panel">
              <span className="pill pill--soft">Sports development</span>
              <h3>{sportsSpotlight.title}</h3>
              <p>{sportsSpotlight.summary}</p>
              <div className="home-meta-row">
                <span className="home-meta-pill">{sportsSpotlight.location}</span>
                <span className="home-meta-pill">{sportsSpotlight.beneficiaries}</span>
                <span className="home-meta-pill">{sportsSpotlight.orphanSupport}</span>
              </div>
              <p>{sportsSpotlight.totalRequest}</p>
              <div className="hero-actions">
                <LoadingLink
                  href="/projects"
                  className="button button--primary"
                  loadingLabel="Opening"
                >
                  View Sports Story
                </LoadingLink>
                <LoadingLink
                  href="/donate"
                  className="button button--secondary"
                  loadingLabel="Opening"
                >
                  Support This Program
                </LoadingLink>
              </div>
            </div>

            <div className="stack-grid">
              <InfoCard
                eyebrow="Cross-program campaign"
                title="Safe futures for girls, young families, and community learners"
                body="Health, education, arts, and sports work together in a shared campaign story with downloads, media, outreach reporting, and support options."
                tone="forest-ink"
              />
              <InfoCard
                eyebrow="Content layer"
                title="Reports, galleries, toolkits, and program documentation"
                body="The initiative includes reporting, reusable resources, artist spotlights, and campaign publishing flows in one connected system."
                tone="paper"
              />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section" delay={280}>
        <div className="feature-panel">
          <InfoCard
            eyebrow="Documentary release"
            title="Programs can also host a special film screening or replay."
            body="This supports campaign documentaries, event playback, and supporter-facing media tied to one program or intervention."
            tone="forest-ink"
          />
          <div className="feature-panel__content">
            <span className="pill pill--soft">{premiumVideoProject.price}</span>
            <h3>{premiumVideoProject.title}</h3>
            <p>
              The gated watch flow is in place with timed access logic, verified payments, and
              protected playback.
            </p>
            <div className="hero-actions">
              <LoadingLink
                href={`/projects/${premiumVideoProject.slug}`}
                className="button button--primary"
                loadingLabel="Opening"
              >
                Open Documentary Release
              </LoadingLink>
            </div>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
