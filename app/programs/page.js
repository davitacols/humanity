import { LoadingLink } from "../../components/LoadingLink";
import { PageHero } from "../../components/PageHero";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { stockMedia } from "../../components/stockMedia";
import {
  premiumVideoProject,
  programPillars,
  sportsSpotlight
} from "../../components/siteData";

const currentPriorities = [
  {
    eyebrow: "Education",
    title: "Open the education hub",
    body: "Books, lessons, facilitator tools, and coding pathways are already organized into a simpler education route.",
    href: "/education",
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

const programHeroStats = [
  { value: "4", label: "connected program pillars" },
  { value: "1", label: "shared archive and donation system" },
  { value: "Cross-border", label: "current network footprint" }
];

export default function ProgramsPage() {
  return (
    <main className="site-main page-v2 programs-page">
      <PageHero
        eyebrow="Programs hub"
        title="Four clear routes into one connected mission."
        body="Start with the route that matters most to you, then move straight into the relevant part of the mission."
        primary={{ href: "/projects", label: "See project stories" }}
        secondary={{ href: "/education/contribute", label: "Contribute resources" }}
        highlights={programPillars.map((pillar) => pillar.title)}
        stats={programHeroStats}
        media={stockMedia.programsHero}
        asideLabel="Why this stays together"
        asideTitle="The programs are different, but the mission is shared."
        asideBody="Each pillar can grow independently while still feeding one shared archive, support system, and public mission."
        asidePoints={[
          "Education builds access and practical skills",
          "Arts and storytelling make the work visible",
          "Health support protects families and communities",
          "Sports creates discipline, belonging, and opportunity"
        ]}
      />

      <Reveal as="section" className="programs-page__route-overview" delay={110} variant="rise" cascade>
        <div className="programs-page__section-lead" data-reveal-group>
          <SectionIntro
            eyebrow="Program pillars"
            title="Each route should feel distinct, but still clearly part of one platform."
            body="This first section works like a compact map: scan the route, understand the emphasis, and enter the right part of the mission."
          />
          <p className="programs-page__section-note">
            Each card is meant to feel like a direct entry point rather than a long explanatory block.
          </p>
        </div>

        <div className="card-grid-v2 card-grid-v2--2 programs-page__pillar-grid" data-reveal-group>
          {programPillars.map((pillar, index) => (
            <article key={pillar.title} className={`card-v2 card-v2--${pillar.tone} programs-page__pillar-card`}>
              <div className="card-v2__top">
                <span className="card-v2__index">{String(index + 1).padStart(2, "0")}</span>
                <p className="card-v2__eyebrow">Program route</p>
              </div>
              <h3 className="card-v2__title">{pillar.title}</h3>
              <p className="card-v2__body">{pillar.body}</p>
              <LoadingLink href={pillar.href} className="button button--secondary" loadingLabel="Opening">
                Open section
              </LoadingLink>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="programs-page__priority-band" delay={190} variant="left" cascade>
        <div className="programs-page__section-lead" data-reveal-group>
          <SectionIntro
            eyebrow="Current live routes"
            title="If someone wants momentum fast, these are the clearest places to start."
            body="The page should make the active paths feel visible and current instead of equally distant from the visitor."
          />
        </div>

        <div className="card-grid-v2 card-grid-v2--3 programs-page__priority-grid" data-reveal-group>
          {currentPriorities.map((item, index) => (
            <article key={item.title} className="card-v2 card-v2--paper programs-page__priority-card">
              <div className="card-v2__top">
                <span className="card-v2__index">{String(index + 1).padStart(2, "0")}</span>
                <p className="card-v2__eyebrow">{item.eyebrow}</p>
              </div>
              <h3 className="card-v2__title">{item.title}</h3>
              <p className="card-v2__body">{item.body}</p>
              <LoadingLink href={item.href} className="button button--secondary" loadingLabel="Opening">
                {item.label}
              </LoadingLink>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="programs-page__mission-panel" delay={260} variant="zoom" intensity="lg" cascade>
        <div className="programs-page__mission-copy" data-reveal-group>
          <p className="dark-panel-v2__eyebrow">Cross-program mission</p>
          <h2 className="dark-panel-v2__title">
            The platform links learning, health, culture, and sport without flattening their differences.
          </h2>
          <p className="dark-panel-v2__body">
            Visitors can explore a focused program page, go deeper into project proof, donate to a
            concrete need, or start a partnership conversation without digging through extra layers.
          </p>
        </div>

        <div className="programs-page__mission-actions" data-reveal-group>
          <ul className="editorial-list editorial-list--light">
            <li>Program routes now read like distinct chapters instead of one long overview.</li>
            <li>Story, support, and archive pages stay connected to the same mission logic.</li>
            <li>Each pillar can grow independently without breaking the shared system.</li>
          </ul>
          <div className="hero-actions">
            <LoadingLink href="/projects" className="button button--primary" loadingLabel="Opening">
              Open project archive
            </LoadingLink>
            <LoadingLink href="/get-involved" className="button button--secondary" loadingLabel="Opening">
              Partner with the initiative
            </LoadingLink>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
