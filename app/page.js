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

const fieldStories = [
  {
    eyebrow: "Health outreach",
    title: "Maternal and child health support in focus",
    body: "Mobile clinic visits, hygiene kits, and follow-up check-ins help mothers and newborns stay connected to practical care.",
    meta: "Maternal care · Hygiene kits · Follow-ups",
    media: stockMedia.homeStories[0]
  },
  {
    eyebrow: "Youth development",
    title: "Sport creates structure, safety, and belonging",
    body: "Weekly training sessions and mentorship create a disciplined, positive environment that keeps children engaged and growing.",
    meta: "Training · Mentorship · Tournaments",
    media: stockMedia.homeStories[1]
  },
  {
    eyebrow: "Creative advocacy",
    title: "Storytelling keeps communities visible",
    body: "Film, photography, and spoken-word projects help translate local experience into public awareness and sustained support.",
    meta: "Film · Photography · Spoken word",
    media: stockMedia.homeStories[2]
  }
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
    title: "Collaborate as an organization",
    body: "Work with the initiative on live campaigns, field support, or longer-term community programs.",
    href: "/get-involved",
    label: "Discuss partnership"
  },
  {
    eyebrow: "Volunteer",
    title: "Contribute time and support",
    body: "Join events, outreach activity, and program delivery where trusted hands are needed most.",
    href: "/get-involved",
    label: "See volunteer routes"
  },
  {
    eyebrow: "Contribute",
    title: "Share tools and expertise",
    body: "Submit resources, creative support, or technical knowledge that strengthens community-facing work.",
    href: "/education/contribute",
    label: "Contribute resources"
  }
];

const programVisuals = [
  stockMedia.educationFeature,
  stockMedia.homeStories[2],
  stockMedia.homeStories[0],
  stockMedia.homeHero
];

export default function HomePage() {
  return (
    <main className="site-main home-redesign">
      {/* Hero */}
      <Reveal as="section" className="home-hero-v2" delay={60}>
        <div className="home-hero-v2__text">
          <p className="home-hero-v2__eyebrow">Humanity First Initiative</p>
          <h1 className="home-hero-v2__title">
            Visibility, dignity, and&nbsp;support for communities on the&nbsp;move.
          </h1>
          <p className="home-hero-v2__body">
            Connecting local programs, field reporting, and practical ways to help across
            health, education, youth development, and creative advocacy.
          </p>
          <div className="home-hero-v2__tags">
            {homeMissionPoints.map((p) => (
              <span key={p} className="home-hero-v2__tag">{p}</span>
            ))}
          </div>
          <div className="hero-actions">
            <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">
              Donate now
            </LoadingLink>
            <LoadingLink href="/projects" className="button button--secondary" loadingLabel="Opening">
              Explore projects
            </LoadingLink>
          </div>
        </div>

        <div className="home-hero-v2__media">
          <StockPhoto
            src={stockMedia.homeHero.src}
            alt={stockMedia.homeHero.alt}
            label="Current program"
            priority
            sizes="(max-width: 1120px) 100vw, 50vw"
            className="home-hero-v2__photo"
          />
          <div className="home-hero-v2__stats">
            {proofStats.map((s) => (
              <article key={s.label} className="home-hero-v2__stat">
                <p className="home-hero-v2__stat-value">{s.value}</p>
                <p className="home-hero-v2__stat-label">{s.label}</p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Trust strip */}
      <Reveal as="section" className="home-trust-v2" delay={120}>
        {homeTrustSignals.map((item) => (
          <article key={item.title} className="home-trust-v2__card">
            <p className="home-trust-v2__card-eyebrow">{item.eyebrow}</p>
            <h3 className="home-trust-v2__card-title">{item.title}</h3>
            <p className="home-trust-v2__card-body">{item.body}</p>
          </article>
        ))}
      </Reveal>

      {/* Spotlight */}
      <Reveal as="section" className="home-spotlight-v2" delay={180}>
        <div className="home-spotlight-v2__lead">
          <p className="home-spotlight-v2__eyebrow">Current appeal</p>
          <h2 className="home-spotlight-v2__title">{sportsSpotlight.title}</h2>
          <p className="home-spotlight-v2__body">{sportsSpotlight.summary}</p>
          <div className="home-spotlight-v2__facts">
            <div className="home-spotlight-v2__fact">
              <span className="home-spotlight-v2__fact-label">Location</span>
              <span className="home-spotlight-v2__fact-value">{sportsSpotlight.location}</span>
            </div>
            <div className="home-spotlight-v2__fact">
              <span className="home-spotlight-v2__fact-label">Reach</span>
              <span className="home-spotlight-v2__fact-value">{sportsSpotlight.beneficiaries}</span>
            </div>
            <div className="home-spotlight-v2__fact">
              <span className="home-spotlight-v2__fact-label">Support</span>
              <span className="home-spotlight-v2__fact-value">{sportsSpotlight.orphanSupport}</span>
            </div>
            <div className="home-spotlight-v2__fact">
              <span className="home-spotlight-v2__fact-label">Current ask</span>
              <span className="home-spotlight-v2__fact-value">{sportsSpotlight.totalRequest}</span>
            </div>
          </div>
          <div className="hero-actions">
            <LoadingLink href="/projects/dodoma-best-sports-center" className="button button--primary" loadingLabel="Opening">
              Read the full project
            </LoadingLink>
            <LoadingLink href="/donate" className="button button--ghost" loadingLabel="Opening">
              Donate to this work
            </LoadingLink>
          </div>
        </div>
        <div className="home-spotlight-v2__visual">
          <StockPhoto
            src={stockMedia.homeStories[1].src}
            alt={stockMedia.homeStories[1].alt}
            label="Field image"
            ratio="portrait"
            sizes="(max-width: 1120px) 100vw, 44vw"
          />
        </div>
      </Reveal>

      {/* Programs */}
      <Reveal as="section" className="section" delay={240}>
        <SectionIntro
          eyebrow="Program areas"
          title="Four routes into the work, each with active projects and clear next steps."
          body="Every program area presents documented needs, practical ways to take part, and visible progress."
        />
        <div className="home-programs-v2">
          {programPillars.map((pillar, i) => (
            <article key={pillar.title} className="home-programs-v2__card">
              <StockPhoto
                src={programVisuals[i].src}
                alt={programVisuals[i].alt}
                label={`Route 0${i + 1}`}
                sizes="(max-width: 1120px) 100vw, 24vw"
                className="home-programs-v2__media"
              />
              <div className="home-programs-v2__copy">
                <h3 className="home-programs-v2__title">{pillar.title}</h3>
                <p className="home-programs-v2__body">{pillar.body}</p>
                <LoadingLink href={pillar.href} className="button button--secondary" loadingLabel="Opening">
                  Explore
                </LoadingLink>
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Stories */}
      <Reveal as="section" className="section" delay={300}>
        <SectionIntro
          eyebrow="Stories and learning"
          title="Field stories keep the mission alive between appeals."
          body="Stories, learning tools, and field media keep supporters informed while staying rooted in community realities."
        />
        <div className="home-stories-v2">
          {fieldStories.map((story) => (
            <article key={story.title} className="home-stories-v2__card">
              <StockPhoto
                src={story.media.src}
                alt={story.media.alt}
                label={story.media.label}
                sizes="(max-width: 1120px) 100vw, 30vw"
                className="home-stories-v2__media"
              />
              <p className="home-stories-v2__eyebrow">{story.eyebrow}</p>
              <h3 className="home-stories-v2__title">{story.title}</h3>
              <p className="home-stories-v2__body">{story.body}</p>
              <p className="home-stories-v2__meta">{story.meta}</p>
            </article>
          ))}
        </div>

        {/* Education feature */}
        <div className="home-edu-v2">
          <StockPhoto
            src={stockMedia.educationFeature.src}
            alt={stockMedia.educationFeature.alt}
            label="Education hub"
            sizes="(max-width: 1120px) 100vw, 40vw"
            className="home-edu-v2__media"
          />
          <div className="home-edu-v2__copy">
            <p className="home-edu-v2__eyebrow">Education route</p>
            <h3 className="home-edu-v2__title">
              Learning resources organized for phones, classrooms, and facilitators.
            </h3>
            <p className="home-edu-v2__body">
              Teachers, mentors, and volunteers can access practical tools, external lessons,
              and downloadable guides through the education hub.
            </p>
            <div className="home-edu-v2__metrics">
              {educationMetrics.slice(0, 4).map((m) => (
                <span key={m.label} className="home-edu-v2__metric">
                  <strong>{m.value}</strong> {m.label}
                </span>
              ))}
            </div>
            <LoadingLink href="/education" className="button button--primary" loadingLabel="Opening">
              Visit education hub
            </LoadingLink>
          </div>
        </div>
      </Reveal>

      {/* Support CTA */}
      <Reveal as="section" className="home-cta-v2" delay={360}>
        <div className="home-cta-v2__intro">
          <p className="home-cta-v2__eyebrow">Support the movement</p>
          <h2 className="home-cta-v2__title">
            Choose the role that fits your capacity.
          </h2>
          <p className="home-cta-v2__body">
            Whether someone gives, partners, volunteers, or contributes expertise, the next step
            should be clear, practical, and easy to act on.
          </p>
        </div>
        <div className="home-cta-v2__grid">
          {supportRoutes.map((route) => (
            <article key={route.title} className="home-cta-v2__card">
              <p className="home-cta-v2__card-eyebrow">{route.eyebrow}</p>
              <h3 className="home-cta-v2__card-title">{route.title}</h3>
              <p className="home-cta-v2__card-body">{route.body}</p>
              <LoadingLink href={route.href} className="button button--secondary" loadingLabel="Opening">
                {route.label}
              </LoadingLink>
            </article>
          ))}
        </div>
      </Reveal>
    </main>
  );
}
