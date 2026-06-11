import { LoadingLink } from "../../components/LoadingLink";
import { Reveal } from "../../components/Reveal";
import {
  premiumVideoProject,
  programPillars,
  sportsSpotlight
} from "../../components/siteData";
import "./programs.css";

export const metadata = {
  title: "Programs",
  description:
    "Four connected routes — education, health, sports, and creative advocacy — under one shared mission, archive, and support system."
};

const currentPriorities = [
  {
    eyebrow: "Education",
    title: "Open the education hub",
    body: "Digital basics guides, beginner web lessons, facilitator tools, and workbook materials grouped under education access.",
    href: "/lms",
    label: "Go to education"
  },
  {
    eyebrow: "Sports",
    title: sportsSpotlight.title,
    body: `${sportsSpotlight.summary} ${sportsSpotlight.totalRequest}.`,
    href: "/projects/dodoma-best-sports-center",
    label: "View sports story"
  },
  {
    eyebrow: "Storytelling",
    title: premiumVideoProject.title,
    body: premiumVideoProject.teaser,
    href: `/projects/${premiumVideoProject.slug}`,
    label: "Open screening"
  }
];

const heroStats = [
  { value: "4", label: "connected program pillars" },
  { value: "1", label: "shared archive & donation system" },
  { value: "Regional", label: "partner & contributor network" }
];

export default function ProgramsPage() {
  return (
    <main className="site-main programs">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <Reveal as="section" className="programs-hero" delay={60}>
        <span className="programs-kicker">Programs hub</span>
        <h1 className="programs-hero__title">Four routes. One mission.</h1>
        <p className="programs-hero__lead">
          Education, health, sports, and creative advocacy each run as their own program — but feed
          one shared archive, support system, and public mission. Start with the route that matters
          most to you.
        </p>
        <div className="programs-hero__actions">
          <LoadingLink href="/projects" className="button button--primary" loadingLabel="Opening">
            See project stories
          </LoadingLink>
          <LoadingLink href="/lms" className="button button--ghost-light" loadingLabel="Opening">
            Open the hub
          </LoadingLink>
        </div>
        <div className="programs-hero__stats" aria-label="Programs at a glance">
          {heroStats.map((stat) => (
            <article key={stat.label} className="programs-stat">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </Reveal>

      {/* ── Pillars (the centerpiece) ─────────────────────────── */}
      <Reveal as="section" className="programs-section" delay={110}>
        <div className="programs-section__head">
          <span className="programs-kicker">Program pillars</span>
          <h2 className="programs-heading">Each route has a specific community purpose.</h2>
          <p className="programs-section__sub">
            Education builds access and practical skills. Arts carries public storytelling. Health
            protects families. Sports creates discipline, belonging, and opportunity.
          </p>
        </div>
        <div className="programs-pillars">
          {programPillars.map((pillar, index) => (
            <article key={pillar.title} className="programs-pillar" style={{ "--accent": `var(--rasta-${index % 3})` }}>
              <span className="programs-pillar__num">{String(index + 1).padStart(2, "0")}</span>
              <span className="programs-pillar__eyebrow">Program route</span>
              <h3 className="programs-pillar__title">{pillar.title}</h3>
              <p className="programs-pillar__body">{pillar.body}</p>
              <LoadingLink href={pillar.href} className="programs-pillar__link" loadingLabel="Opening">
                Open section →
              </LoadingLink>
            </article>
          ))}
        </div>
      </Reveal>

      {/* ── Live routes ───────────────────────────────────────── */}
      <Reveal as="section" className="programs-section" delay={150}>
        <div className="programs-section__head">
          <span className="programs-kicker">Live now</span>
          <h2 className="programs-heading">Start with what's already open.</h2>
          <p className="programs-section__sub">
            These routes already have public pages, support context, or project detail ready to review.
          </p>
        </div>
        <div className="programs-routes">
          {currentPriorities.map((item) => (
            <article key={item.title} className="programs-route">
              <span className="programs-route__eyebrow">{item.eyebrow}</span>
              <h3 className="programs-route__title">{item.title}</h3>
              <p className="programs-route__body">{item.body}</p>
              <LoadingLink href={item.href} className="button button--secondary" loadingLabel="Opening">
                {item.label}
              </LoadingLink>
            </article>
          ))}
        </div>
      </Reveal>

      {/* ── Cross-program mission CTA ─────────────────────────── */}
      <Reveal as="section" className="programs-section" delay={190}>
        <div className="programs-cta">
          <div className="programs-cta__copy">
            <span className="programs-cta__kicker">Cross-program mission</span>
            <h2 className="programs-cta__title">Learning, health, culture, and sport — without flattening their differences.</h2>
            <p className="programs-cta__body">
              Explore a focused program page, go deeper into project proof, donate to a concrete need,
              or start a partnership — without digging through extra layers.
            </p>
            <ul className="programs-cta__list">
              <li>Each program keeps its own route, voice, and field stories.</li>
              <li>Project stories and donation routes stay tied to the program they support.</li>
              <li>New contributors enter through the route closest to their work.</li>
            </ul>
          </div>
          <div className="programs-cta__actions">
            <LoadingLink href="/projects" className="button button--primary" loadingLabel="Opening">
              Open project archive
            </LoadingLink>
            <LoadingLink href="/get-involved" className="button button--ghost-light" loadingLabel="Opening">
              Partner with us
            </LoadingLink>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
