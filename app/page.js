import { LoadingLink } from "../components/LoadingLink";
import { HomeViewportMotion } from "../components/HomeViewportMotion";
import { SectionIntro } from "../components/SectionIntro";
import { StockPhoto } from "../components/StockPhoto";
import {
  featuredProject,
  homeMissionPoints,
  programPillars,
  proofStats
} from "../components/siteData";
import { stockMedia } from "../components/stockMedia";

export const revalidate = 300;

const heroSignals = [
  {
    label: "Community-first support"
  },
  {
    label: "Clear donation context"
  },
  {
    label: "Field stories people can follow"
  }
];

const proofCards = [
  {
    value: "24",
    label: "documented projects, updates, and support needs"
  },
  {
    value: "4",
    label: "humanitarian program areas"
  },
  {
    value: "Nigeria + Ghana",
    label: "current cross-country footprint"
  },
  {
    value: "Low-bandwidth",
    label: "access designed for phones and slower connections"
  }
];

const heroDeskItems = [
  {
    title: "Visible program routes",
    body: "Health, learning, youth development, and creative advocacy are each published as clear public pathways."
  },
  {
    title: "Support with context",
    body: "Donors and partners can understand what a route is for before they are asked to act."
  },
  {
    title: "Proof over promises",
    body: "Stories, updates, and transparency pages keep the initiative legible over time."
  }
];

const routeDescriptors = {
  "Education Access": {
    kicker: "Learning support",
    note: "Resources that help children, youth, and facilitators keep learning practical.",
    tags: ["Digital skills", "Books and guides"]
  },
  "Arts and Music": {
    kicker: "Community voice",
    note: "Creative work that helps real stories travel further with dignity.",
    tags: ["Artist spotlights", "Advocacy stories"]
  },
  "Public Health": {
    kicker: "Health support",
    note: "Simple prevention, hygiene, maternal care, and safety messages for families.",
    tags: ["Maternal health", "Safety education"]
  },
  "Sports Development": {
    kicker: "Youth protection",
    note: "Structured play, discipline, and mentorship for children who need opportunity.",
    tags: ["Grassroots training", "Mentorship"]
  }
};

export default function HomePage() {
  return (
    <main className="site-main page-v2 home-spline">
      <HomeViewportMotion />

      <section className="home-spline__hero home-spline__section home-spline__section--hero">
        <div className="home-spline__background" aria-hidden="true">
          <StockPhoto
            src={stockMedia.homeHero.src}
            alt=""
            sizes="100vw"
            className="home-spline__background-media"
            priority
          />
        </div>

        <div className="home-spline__hero-grid">
          <div className="home-spline__copy">
            <p className="home-spline__eyebrow">Humanitarian field platform</p>
            <h1
              className="home-spline__title"
              aria-label="Humanitarian work people can see, trust, and support."
            >
              <span className="home-spline__title-line">
                <span>Humanitarian work</span>
              </span>
              <span className="home-spline__title-line">
                <span>people can see,</span>
              </span>
              <span className="home-spline__title-line home-spline__title-line--accent">
                <span>trust, and support.</span>
              </span>
            </h1>
            <p className="home-spline__lede">
              A public-facing platform for maternal health, education access, youth development,
              and creative advocacy.
            </p>
            <p className="home-spline__body">
              Humanity First Initiative helps supporters understand the need, the work already in
              motion, and the clearest next step to help with dignity and context.
            </p>
            <div className="hero-actions">
              <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">
                Donate now
              </LoadingLink>
              <LoadingLink href="/projects" className="button button--secondary" loadingLabel="Opening">
                See projects
              </LoadingLink>
            </div>
            <div className="home-spline__signal-row">
              {heroSignals.map((item) => (
                <span key={item.label} className="home-spline__signal">
                  <span className="home-spline__signal-dot" aria-hidden="true" />
                  {item.label}
                </span>
              ))}
            </div>
            <div className="home-spline__hero-stats">
              {proofStats.map((item) => (
                <article key={item.label} className="home-spline__hero-stat">
                  <p className="home-spline__hero-stat-value">{item.value}</p>
                  <p className="home-spline__hero-stat-label">{item.label}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <aside className="home-spline__proof-desk" aria-label="Homepage proof desk">
          <p className="home-spline__proof-kicker">Why this homepage works</p>
          <h2 className="home-spline__proof-title">
            Support becomes easier when the public route is clear.
          </h2>
          <p className="home-spline__proof-body">
            The first screen should explain what the initiative is, where the work sits, and why
            each support route deserves trust before anyone clicks donate.
          </p>

          <div className="home-spline__proof-points">
            {homeMissionPoints.map((item) => (
              <div key={item} className="home-spline__proof-point">
                <span className="home-spline__proof-point-dot" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="home-spline__proof-list">
            {heroDeskItems.map((item) => (
              <article key={item.title} className="home-spline__proof-item">
                <h3 className="home-spline__proof-item-title">{item.title}</h3>
                <p className="home-spline__proof-item-body">{item.body}</p>
              </article>
            ))}
          </div>

          <LoadingLink
            href="/donate/transparency"
            className="button button--secondary home-spline__proof-action"
            loadingLabel="Opening"
          >
            View transparency
          </LoadingLink>
        </aside>
      </section>

      <section className="home-spline__section home-spline__proof-section">
        <SectionIntro
          className="home-spline__intro"
          eyebrow="Platform proof"
          title="Built around trust, dignity, and practical help."
          body="Visitors should quickly understand what the initiative does, who the work serves, and how support can move from interest to action."
        />

        <div className="home-spline__proof-grid">
          {proofCards.map((item) => (
            <article key={item.label} className="home-spline__proof-card">
              <p className="home-spline__proof-value">{item.value}</p>
              <p className="home-spline__proof-label">{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-spline__section home-spline__routes-section">
        <div className="home-spline__routes-layout">
          <div className="home-spline__routes-sidebar">
            <SectionIntro
              className="home-spline__intro"
              eyebrow="Program routes"
              title="Four routes into the same humanitarian mission."
              body="Each focus area gives supporters a clear way to understand the work, follow updates, and contribute where they care most."
            />

            <div className="home-spline__routes-summary">
              <p className="home-spline__routes-summary-title">One mission. Four practical routes.</p>
              <p className="home-spline__routes-summary-body">
                The site should make the work feel human and organized: education, arts,
                health, and sports all serve the same goal of community dignity.
              </p>
              <div className="home-spline__routes-summary-row">
                <span className="home-spline__routes-summary-pill">4 focus areas</span>
                <span className="home-spline__routes-summary-pill">Nigeria + Ghana</span>
                <span className="home-spline__routes-summary-pill">People-first stories</span>
              </div>
            </div>
          </div>

          <div className="home-spline__routes-board">
            <div className="home-spline__routes">
              {programPillars.map((pillar, index) => {
                const descriptor = routeDescriptors[pillar.title];
                const routeNumber = String(index + 1).padStart(2, "0");

                return (
                  <article
                    key={pillar.title}
                    className={`home-spline__route home-spline__route--${pillar.tone}`}
                    data-route-index={routeNumber}
                  >
                    <div className="home-spline__route-head">
                      <span className="home-spline__route-kicker">{descriptor.kicker}</span>
                      <span className="home-spline__route-label">Route {routeNumber}</span>
                    </div>
                    <h3>{pillar.title}</h3>
                    <p className="home-spline__route-body">{pillar.body}</p>
                    <p className="home-spline__route-note">{descriptor.note}</p>
                    <div className="home-spline__route-tags">
                      {descriptor.tags.map((tag) => (
                        <span key={tag} className="home-spline__route-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <LoadingLink
                      href={pillar.href}
                      className="home-spline__route-action"
                      loadingLabel="Opening"
                    >
                      Explore section
                    </LoadingLink>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="home-spline__section home-spline__feature-section">
        <SectionIntro
          className="home-spline__intro"
          eyebrow="Featured impact story"
          title="Keep one human story close to the front."
          body="A humanitarian homepage should slow down enough for visitors to understand the people behind the program categories."
        />

        <div className="home-spline__feature">
          <StockPhoto
            src={stockMedia.homeStories[0].src}
            alt={stockMedia.homeStories[0].alt}
            label={stockMedia.homeStories[0].label}
            sizes="(max-width: 1120px) 100vw, 38vw"
            className="home-spline__feature-media"
          />

          <div className="home-spline__feature-copy">
            <h2>{featuredProject.title}</h2>
            <p>{featuredProject.body}</p>
            <blockquote>{featuredProject.quote}</blockquote>
            <div className="hero-actions">
              <LoadingLink href="/health" className="button button--primary" loadingLabel="Opening">
                Read full story
              </LoadingLink>
              <LoadingLink href="/donate/transparency" className="button button--secondary" loadingLabel="Opening">
                View report
              </LoadingLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
