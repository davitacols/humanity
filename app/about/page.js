import { LoadingLink } from "../../components/LoadingLink";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { StockPhoto } from "../../components/StockPhoto";
import { getPlatformContentData } from "../../lib/platform-content";
import { programPillars } from "../../components/siteData";
import { stockMedia } from "../../components/stockMedia";

export const revalidate = 300;

const operatingModel = [
  { title: "Listen to the community first", body: "Needs are framed around real families, learners, caregivers, and local partners before a campaign is shaped." },
  { title: "Document the need clearly", body: "Program pages and project stories give visitors enough context to understand what is happening and why support matters." },
  { title: "Mobilize practical support", body: "Donors, volunteers, sponsors, and partners are guided toward health, education, sports, arts, or partnership routes." },
  { title: "Keep the work visible", body: "Updates, transparency pages, and contributor profiles help supporters follow the people and programs behind the request." }
];

const trustStandards = [
  { title: "People before sectors", body: "Education, arts, health, and sports are presented through the communities they serve." },
  { title: "Proof before promotion", body: "Needs, project context, and field updates come before donation appeals." },
  { title: "Dignity in storytelling", body: "Stories present people with care and agency, avoiding language that reduces communities to hardship." },
  { title: "Collaboration without confusion", body: "Profiles and partners are named for the role they play so visitors understand the network honestly." }
];

const profileCopyByName = {
  "Ikokwu Chidozie Ikemba": {
    eyebrow: "Strategy and communications",
    summary: "Supports campaign strategy, public communication, sustainability framing, and partner-facing storytelling.",
    body: "Ikemba brings experience from psychology, media practice, environmental enterprise, and civic communication."
  },
  "Regional partner in Ghana": {
    eyebrow: "Ghana partnerships",
    summary: "Helps build Ghana-based relationships, listen to community needs, and identify credible local collaboration paths.",
    body: "This partner gives the team a practical regional point of view as the platform grows beyond one country."
  },
  Sib: {
    eyebrow: "Film and visual storytelling",
    summary: "Contributes film, editing, photography, and accessibility-led visual storytelling for campaigns and updates.",
    body: "Sib is a West Midlands-based cinematographer and video editor with a strong interest in meaningful visual work."
  }
};

function normalizeProfile(person) {
  const copy = profileCopyByName[person.name];
  return { ...person, ...copy, eyebrow: copy?.eyebrow || person.eyebrow || "Contributor" };
}

export const metadata = {
  title: "About the Initiative",
  description: "The mission, program standards, support pathways, and contributor network behind Humanity First Initiative."
};

export default async function AboutPage() {
  const { changemakers } = await getPlatformContentData();
  const profiles = changemakers.map(normalizeProfile);
  const [lead, ...collaborators] = profiles;

  return (
    <main className="site-main about-v2">
      {/* Hero — immersive */}
      <Reveal as="section" className="about-hero" delay={60}>
        <img src={stockMedia.aboutHero.src} alt={stockMedia.aboutHero.alt} className="about-hero__bg" />
        <div className="about-hero__overlay" />
        <div className="about-hero__content">
          <p className="about-hero__eyebrow">About Humanity First Initiative</p>
          <h1 className="about-hero__title">
            A humanitarian platform built around people, proof, and practical support.
          </h1>
          <p className="about-hero__body">
            Community projects, health outreach, education access, youth sports, and creative
            advocacy in one clear public home — so supporters understand the needs, the people,
            and the next step.
          </p>
          <div className="hero-actions">
            <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">
              Support the work
            </LoadingLink>
            <LoadingLink href="/get-involved" className="button button--ghost-light" loadingLabel="Opening">
              Partner with us
            </LoadingLink>
          </div>
        </div>
        <div className="about-hero__stats">
          <article className="about-hero__stat">
            <p className="about-hero__stat-value">4</p>
            <p className="about-hero__stat-label">program routes</p>
          </article>
          <article className="about-hero__stat">
            <p className="about-hero__stat-value">Cross-border</p>
            <p className="about-hero__stat-label">community-led network</p>
          </article>
          <article className="about-hero__stat">
            <p className="about-hero__stat-value">{profiles.length}</p>
            <p className="about-hero__stat-label">public contributor profiles</p>
          </article>
        </div>
      </Reveal>

      {/* Mission */}
      <Reveal as="section" id="mission" className="about-v2__section" delay={100}>
        <div className="about-mission">
          <div className="about-mission__copy">
            <SectionIntro
              eyebrow="Mission"
              title="Humanitarian work becomes easier to support when the need, route, and next step are clear."
              body="Humanity First Initiative connects each public need to a program route, a support pathway, and a field update — so education, health, sports, and creative advocacy serve real communities."
            />
            <div className="about-mission__steps">
              {operatingModel.map((item, i) => (
                <article key={item.title} className="about-mission__step">
                  <span className="about-mission__step-index">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="about-mission__visual">
            <StockPhoto
              src={stockMedia.aboutMission.src}
              alt={stockMedia.aboutMission.alt}
              label="Community life"
              ratio="portrait"
              sizes="(max-width: 1120px) 100vw, 40vw"
            />
          </div>
        </div>
      </Reveal>

      {/* Programs */}
      <Reveal as="section" id="programs" className="about-v2__section" delay={160}>
        <SectionIntro
          eyebrow="Program routes"
          title="Four visible routes where support, learning, health, and advocacy become understandable."
          body="These are not abstract departments — they are the public routes where donors, partners, and volunteers can choose a clear path."
        />
        <div className="about-programs">
          {programPillars.map((pillar, i) => (
            <article key={pillar.title} className="about-program-card">
              <span className="about-program-card__index">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="about-program-card__title">{pillar.title}</h3>
              <p className="about-program-card__body">{pillar.body}</p>
              <LoadingLink href={pillar.href} className="button button--secondary" loadingLabel="Opening">
                Explore route
              </LoadingLink>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Standards */}
      <Reveal as="section" id="standards" className="about-v2__section" delay={220}>
        <SectionIntro
          eyebrow="Operating standards"
          title="Trust is built through specific needs, honest roles, and visible follow-up."
          body="Community needs are connected to real routes, support requests are described plainly, and contributor roles are named without inflating hierarchy."
        />
        <div className="about-standards">
          {trustStandards.map((item) => (
            <article key={item.title} className="about-standard-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Team */}
      <Reveal as="section" id="network" className="about-v2__section" delay={280}>
        <SectionIntro
          eyebrow="Team and collaborators"
          title="Strategy, regional partnerships, and creative production support the field work."
          body="The public team brings strategy, regional relationships, creative production, and specialist support into the work."
        />
        <div className="about-team">
          {lead && (
            <article className="about-team__lead">
              {lead.imageSrc && (
                <div className="about-team__lead-photo">
                  <StockPhoto
                    src={lead.imageSrc}
                    alt={lead.imageAlt || lead.name}
                    label={lead.eyebrow}
                    ratio="portrait"
                    sizes="(max-width: 1120px) 100vw, 32vw"
                  />
                </div>
              )}
              <div className="about-team__lead-copy">
                <p className="about-team__eyebrow">{lead.eyebrow}</p>
                <h3 className="about-team__name">{lead.name}</h3>
                <p className="about-team__role">{lead.role}</p>
                <p className="about-team__summary">{lead.summary}</p>
                <p className="about-team__body">{lead.body}</p>
                {lead.tags?.length > 0 && (
                  <div className="about-team__tags">
                    {lead.tags.map((tag) => <span key={tag} className="about-team__tag">{tag}</span>)}
                  </div>
                )}
                {lead.href && lead.hrefLabel && (
                  <a href={lead.href} target="_blank" rel="noreferrer" className="button button--secondary">
                    {lead.hrefLabel}
                  </a>
                )}
              </div>
            </article>
          )}
          <div className="about-team__grid">
            {collaborators.map((person) => (
              <article key={person.name} className="about-team__card">
                <p className="about-team__eyebrow">{person.eyebrow}</p>
                <h3 className="about-team__name">{person.name}</h3>
                <p className="about-team__role">{person.role}</p>
                <p className="about-team__summary">{person.summary}</p>
                {person.tags?.length > 0 && (
                  <div className="about-team__tags">
                    {person.tags.map((tag) => <span key={tag} className="about-team__tag">{tag}</span>)}
                  </div>
                )}
                {person.href && person.hrefLabel && (
                  person.href.startsWith("http") ? (
                    <a href={person.href} target="_blank" rel="noreferrer" className="button button--secondary">
                      {person.hrefLabel}
                    </a>
                  ) : (
                    <LoadingLink href={person.href} className="button button--secondary" loadingLabel="Opening">
                      {person.hrefLabel}
                    </LoadingLink>
                  )
                )}
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section" className="about-v2__section" delay={340}>
        <div className="about-cta">
          <div className="about-cta__copy">
            <p className="about-cta__eyebrow">Support routes</p>
            <h2 className="about-cta__title">Fund a program, partner on delivery, or review the work first.</h2>
            <p className="about-cta__body">
              The next step depends on your role: donor, field partner, sponsor, creative contributor,
              school, NGO, or first-time supporter.
            </p>
            <div className="hero-actions">
              <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">
                Donate now
              </LoadingLink>
              <LoadingLink href="/get-involved" className="button button--ghost-light" loadingLabel="Opening">
                Get involved
              </LoadingLink>
              <LoadingLink href="/projects" className="button button--ghost-light" loadingLabel="Opening">
                Review projects
              </LoadingLink>
            </div>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
