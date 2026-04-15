import { LoadingLink } from "../components/LoadingLink";
import { Reveal } from "../components/Reveal";
import { SectionIntro } from "../components/SectionIntro";
import { StockPhoto } from "../components/StockPhoto";
import { stockMedia } from "../components/stockMedia";
import {
  educationMetrics,
  homeMissionPoints,
  homeTrustSignals,
  programPillars,
  proofStats,
  sportsSpotlight
} from "../components/siteData";

const heroTiles = [
  {
    eyebrow: "Current appeal",
    title: "Support a live youth sports response",
    body: "The Dodoma Best Sports Center campaign is public, active, and tied to practical equipment and coaching needs.",
    href: "/projects",
    label: "Read the project",
    tone: "ember"
  },
  {
    eyebrow: "Education hub",
    title: "Low-bandwidth learning for communities",
    body: "Guides, lessons, and facilitator tools are already organized for phones, classrooms, and community sessions.",
    href: "/education",
    label: "Visit education hub",
    tone: "olive"
  },
  {
    eyebrow: "Get involved",
    title: "Volunteer, partner, or contribute",
    body: "The site now gives different supporters a direct path into the mission instead of one generic action.",
    href: "/get-involved",
    label: "Choose a route",
    tone: "sand"
  }
];

const fieldStories = [
  {
    eyebrow: "Health outreach",
    title: "Maternal and child health support in focus",
    body: "Mobile clinic visits, hygiene kits, and follow-up check-ins help mothers and newborns stay connected to practical care.",
    meta: "Maternal care, hygiene kits, follow-ups",
    media: stockMedia.homeStories[0]
  },
  {
    eyebrow: "Youth development",
    title: "Sport creates structure, safety, and belonging for young people",
    body: "Weekly training sessions and mentorship create a disciplined, positive environment that keeps children engaged and growing.",
    meta: "Training, mentorship, community tournaments",
    media: stockMedia.homeStories[1]
  },
  {
    eyebrow: "Creative advocacy",
    title: "Storytelling keeps communities visible beyond a single appeal",
    body: "Film, photography, and spoken-word projects help translate local experience into public awareness, advocacy, and sustained support.",
    meta: "Film, photography, spoken word",
    media: stockMedia.homeStories[2]
  }
];

const programVisuals = [
  stockMedia.educationFeature,
  stockMedia.homeStories[2],
  stockMedia.homeStories[0],
  stockMedia.homeHero
];

const supportRoutes = [
  {
    eyebrow: "Donate",
    title: "Fund practical work on the ground",
    body: "Support current priorities across health, education, youth development, and creative advocacy.",
    href: "/donate",
    label: "Donate now"
  },
  {
    eyebrow: "Partner",
    title: "Collaborate as an organization or sponsor",
    body: "Work with the initiative on live campaigns, field support, or longer-term community programs.",
    href: "/get-involved",
    label: "Discuss partnership"
  },
  {
    eyebrow: "Volunteer",
    title: "Contribute time and local support",
    body: "Join events, outreach activity, and program delivery where trusted hands are needed most.",
    href: "/get-involved",
    label: "See volunteer routes"
  },
  {
    eyebrow: "Contribute",
    title: "Share learning tools and specialist expertise",
    body: "Submit resources, creative support, or technical knowledge that strengthens community-facing work.",
    href: "/education/contribute",
    label: "Contribute resources"
  }
];

export default function HomePage() {
  return (
    <main className="site-main site-main--marley">
      <Reveal as="section" className="marley-home-hero" delay={60}>
        <div className="marley-home-hero__lead">
          <p className="marley-home-hero__eyebrow">Humanity First Initiative</p>
          <h1 className="marley-home-hero__title">
            Visibility, dignity, and support for communities on the move.
          </h1>
          <p className="marley-home-hero__lede">
            Humanity First connects local programs, field reporting, and practical ways to help
            across health, education, youth development, and creative advocacy.
          </p>

          <div className="hero-actions">
            <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">
              Donate now
            </LoadingLink>
            <LoadingLink
              href="/projects"
              className="button button--secondary"
              loadingLabel="Opening"
            >
              Read field updates
            </LoadingLink>
          </div>

          <div className="marley-home-hero__principles">
            {homeMissionPoints.map((point) => (
              <span key={point} className="marley-home-hero__principle">
                {point}
              </span>
            ))}
          </div>
        </div>

        <article className="marley-home-hero__feature">
          <StockPhoto
            src={stockMedia.homeHero.src}
            alt={stockMedia.homeHero.alt}
            label="Featured response"
            priority
            sizes="(max-width: 1180px) 100vw, 38vw"
            className="marley-home-hero__feature-media"
          />
          <div className="marley-home-hero__feature-copy">
            <p className="marley-home-hero__feature-eyebrow">Current program in focus</p>
            <h2 className="marley-home-hero__feature-title">{sportsSpotlight.title}</h2>
            <p className="marley-home-hero__feature-body">{sportsSpotlight.summary}</p>

            <div className="marley-home-hero__feature-stats">
              {proofStats.map((item) => (
                <article key={item.label} className="marley-home-hero__feature-stat">
                  <p className="marley-home-hero__feature-stat-value">{item.value}</p>
                  <p className="marley-home-hero__feature-stat-label">{item.label}</p>
                </article>
              ))}
            </div>

            <LoadingLink
              href="/projects"
              className="button button--ghost-light"
              loadingLabel="Opening"
            >
              Explore the full project
            </LoadingLink>
          </div>
        </article>

        <div className="marley-home-hero__rail">
          {heroTiles.map((tile) => (
            <article key={tile.title} className={`marley-home-hero__tile marley-home-hero__tile--${tile.tone}`}>
              <p className="marley-home-hero__tile-eyebrow">{tile.eyebrow}</p>
              <h3 className="marley-home-hero__tile-title">{tile.title}</h3>
              <p className="marley-home-hero__tile-body">{tile.body}</p>
              <LoadingLink href={tile.href} className="marley-home-hero__tile-link" loadingLabel="Opening">
                {tile.label}
              </LoadingLink>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="marley-home-proof-strip" delay={110}>
        {homeTrustSignals.map((item) => (
          <article key={item.title} className="marley-home-proof-strip__item">
            <p className="marley-home-proof-strip__eyebrow">{item.eyebrow}</p>
            <h3 className="marley-home-proof-strip__title">{item.title}</h3>
            <p className="marley-home-proof-strip__body">{item.body}</p>
          </article>
        ))}
      </Reveal>

      <Reveal as="section" className="section" delay={160}>
        <SectionIntro
          eyebrow="Current work"
          title="Program areas presented like a living archive, not a brochure."
          body="Each route should feel active, image-led, and easy to enter, while still making it clear what the work does for communities."
        />

        <div className="marley-home-programs">
          {programPillars.map((pillar, index) => (
            <article key={pillar.title} className="marley-home-programs__card">
              <StockPhoto
                src={programVisuals[index].src}
                alt={programVisuals[index].alt}
                label={`Route 0${index + 1}`}
                sizes="(max-width: 1180px) 100vw, 24vw"
                className="marley-home-programs__media"
              />
              <div className="marley-home-programs__copy">
                <p className="marley-home-programs__eyebrow">Program area</p>
                <h3 className="marley-home-programs__title">{pillar.title}</h3>
                <p className="marley-home-programs__body">{pillar.body}</p>
                <LoadingLink
                  href={pillar.href}
                  className="button button--secondary"
                  loadingLabel="Opening"
                >
                  Explore this route
                </LoadingLink>
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="marley-home-showcase" delay={220}>
        <div className="marley-home-showcase__feature">
          <StockPhoto
            src={stockMedia.homeStories[1].src}
            alt={stockMedia.homeStories[1].alt}
            label="Field image"
            sizes="(max-width: 1180px) 100vw, 46vw"
            className="marley-home-showcase__media"
          />
          <div className="marley-home-showcase__copy">
            <p className="marley-home-showcase__eyebrow">Response and delivery</p>
            <h2 className="marley-home-showcase__title">
              Practical support starts with a clear picture of needs on the ground.
            </h2>
            <p className="marley-home-showcase__body">
              The current sports program illustrates how the initiative works: a community need is
              documented, priorities are made public, and supporters can trace their help back to
              a visible program.
            </p>

            <div className="marley-home-showcase__list">
              {sportsSpotlight.priorities.slice(0, 3).map((item) => (
                <article key={item.title} className="marley-home-showcase__list-item">
                  <h3 className="marley-home-showcase__list-title">{item.title}</h3>
                  <p className="marley-home-showcase__list-body">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <aside className="marley-home-showcase__aside">
          <p className="marley-home-showcase__aside-label">At a glance</p>
          <div className="marley-home-showcase__aside-grid">
            <article className="marley-home-showcase__aside-card">
              <p className="marley-home-showcase__aside-card-label">Location</p>
              <p className="marley-home-showcase__aside-card-value">{sportsSpotlight.location}</p>
            </article>
            <article className="marley-home-showcase__aside-card">
              <p className="marley-home-showcase__aside-card-label">Reach</p>
              <p className="marley-home-showcase__aside-card-value">{sportsSpotlight.beneficiaries}</p>
            </article>
            <article className="marley-home-showcase__aside-card">
              <p className="marley-home-showcase__aside-card-label">Support</p>
              <p className="marley-home-showcase__aside-card-value">{sportsSpotlight.orphanSupport}</p>
            </article>
            <article className="marley-home-showcase__aside-card">
              <p className="marley-home-showcase__aside-card-label">Current ask</p>
              <p className="marley-home-showcase__aside-card-value">{sportsSpotlight.totalRequest}</p>
            </article>
          </div>

          <div className="hero-actions">
            <LoadingLink href="/projects" className="button button--secondary" loadingLabel="Opening">
              Read field updates
            </LoadingLink>
            <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">
              Donate to this work
            </LoadingLink>
          </div>
        </aside>
      </Reveal>

      <Reveal as="section" className="section" delay={280}>
        <SectionIntro
          eyebrow="Stories and learning"
          title="Media-led cards keep the mission alive between appeals."
          body="This section borrows the rhythm of a music-and-media homepage: visual, browsable, and easy to dip into, but still rooted in field relevance."
        />

        <div className="marley-home-stories">
          {fieldStories.map((story) => (
            <article key={story.title} className="marley-home-stories__card">
              <StockPhoto
                src={story.media.src}
                alt={story.media.alt}
                label={story.media.label}
                sizes="(max-width: 1180px) 100vw, 22vw"
                className="marley-home-stories__media"
              />
              <p className="marley-home-stories__eyebrow">{story.eyebrow}</p>
              <h3 className="marley-home-stories__title">{story.title}</h3>
              <p className="marley-home-stories__body">{story.body}</p>
              <p className="marley-home-stories__meta">{story.meta}</p>
            </article>
          ))}

          <article className="marley-home-stories__feature">
            <StockPhoto
              src={stockMedia.educationFeature.src}
              alt={stockMedia.educationFeature.alt}
              label="Education hub"
              sizes="(max-width: 1180px) 100vw, 22vw"
              className="marley-home-stories__feature-media"
            />
            <div className="marley-home-stories__feature-copy">
              <p className="marley-home-stories__feature-eyebrow">Education route</p>
              <h3 className="marley-home-stories__feature-title">
                Learning resources already organized for phones, classrooms, and facilitators.
              </h3>
              <p className="marley-home-stories__feature-body">
                Teachers, mentors, and volunteers can access practical tools, external lessons,
                and downloadable guides through the education hub.
              </p>

              <div className="marley-home-stories__metrics">
                {educationMetrics.slice(0, 4).map((item) => (
                  <span key={item.label} className="marley-home-stories__metric">
                    {item.value} {item.label}
                  </span>
                ))}
              </div>

              <LoadingLink
                href="/education"
                className="button button--primary"
                loadingLabel="Opening"
              >
                Visit education hub
              </LoadingLink>
            </div>
          </article>
        </div>
      </Reveal>

      <Reveal as="section" className="marley-home-help" delay={340}>
        <div className="marley-home-help__intro">
          <p className="marley-home-help__eyebrow">Support the movement</p>
          <h2 className="marley-home-help__title">
            Choose the role that fits your capacity and move straight into the work.
          </h2>
          <p className="marley-home-help__body">
            The content stays grounded, but the experience now feels more like an active cultural
            platform: bold, visual, and full of clear entry points.
          </p>
        </div>

        <div className="marley-home-help__grid">
          {supportRoutes.map((route) => (
            <article key={route.title} className="marley-home-help__card">
              <p className="marley-home-help__card-eyebrow">{route.eyebrow}</p>
              <h3 className="marley-home-help__card-title">{route.title}</h3>
              <p className="marley-home-help__card-body">{route.body}</p>
              <LoadingLink
                href={route.href}
                className="button button--secondary"
                loadingLabel="Opening"
              >
                {route.label}
              </LoadingLink>
            </article>
          ))}
        </div>
      </Reveal>
    </main>
  );
}
