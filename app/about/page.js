import { LoadingLink } from "../../components/LoadingLink";
import { PageHero } from "../../components/PageHero";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { StockPhoto } from "../../components/StockPhoto";
import { getPlatformContentData } from "../../lib/platform-content";
import { programPillars } from "../../components/siteData";
import { stockMedia } from "../../components/stockMedia";

export const revalidate = 300;

const missionSignals = [
  {
    value: "4",
    label: "program routes for education, arts, health, and youth sports"
  },
  {
    value: "Cross-border",
    label: "community-led network with room for partner-led growth"
  },
  {
    value: "Visible needs",
    label: "support asks tied to field stories, context, and next steps"
  }
];

const aboutPageMap = [
  {
    href: "#mission",
    eyebrow: "Mission",
    title: "Why the platform exists",
    body: "Humanity First Initiative connects community needs to health outreach, education access, youth sports, and creative advocacy.",
    detail: "Purpose and focus",
    actionLabel: "Open mission"
  },
  {
    href: "#programs",
    eyebrow: "Programs",
    title: "Where support goes",
    body: "Support is organized into four active routes so donors, partners, and volunteers can choose a clear path.",
    detail: "Health, education, arts, sports",
    actionLabel: "See routes"
  },
  {
    href: "#standards",
    eyebrow: "Standards",
    title: "How trust is protected",
    body: "Field updates, donation asks, and public profiles stay tied to named work, practical needs, and honest roles.",
    detail: "Accountability and dignity",
    actionLabel: "Review standards"
  },
  {
    href: "#network",
    eyebrow: "Network",
    title: "Who contributes",
    body: "The public team brings strategy, regional relationships, creative production, and specialist support into the work.",
    detail: "Team and collaborators",
    actionLabel: "See contributors"
  }
];

const operatingModel = [
  {
    title: "Listen to the community first",
    body: "Needs are framed around real families, learners, caregivers, youth groups, and local partners before a campaign is shaped."
  },
  {
    title: "Document the need clearly",
    body: "Program pages and project stories give visitors enough context to understand what is happening and why support matters."
  },
  {
    title: "Mobilize practical support",
    body: "Donors, volunteers, sponsors, and partner organizations are guided toward health, education, sports, arts, or partnership routes."
  },
  {
    title: "Keep the work visible",
    body: "Updates, transparency pages, and contributor profiles help supporters follow the people and programs behind the request."
  }
];

const trustStandards = [
  {
    title: "People before sectors",
    body: "Education, arts, health, and sports are presented through the communities they serve, not as isolated website categories."
  },
  {
    title: "Proof before promotion",
    body: "Needs, project context, field updates, and transparent support paths come before donation appeals."
  },
  {
    title: "Dignity in storytelling",
    body: "Stories present people with care and agency, avoiding charity language that reduces communities to hardship."
  },
  {
    title: "Collaboration without confusion",
    body: "Profiles, partners, and contributors are named for the role they play so visitors can understand the network honestly."
  }
];

const supportRoutes = [
  {
    eyebrow: "Give",
    title: "Fund an active route",
    body: "Support maternal health kits, education resources, youth sports equipment, or creative advocacy production.",
    note: "Best when you already know which program area you want your contribution to strengthen.",
    href: "/donate",
    label: "Donate now"
  },
  {
    eyebrow: "Partner",
    title: "Bring field or specialist support",
    body: "Collaborate as an NGO, school, sponsor, creative team, regional partner, health worker, or education supporter.",
    note: "Best for organizations and specialists who can help deliver, document, sponsor, or expand a route.",
    href: "/get-involved",
    label: "Start a conversation"
  },
  {
    eyebrow: "Review",
    title: "Check projects before committing",
    body: "Read the project pages, sports proposal, program routes, field updates, and transparency notes first.",
    note: "Best for first-time supporters who want context before donating, partnering, or sharing the work.",
    href: "/projects",
    label: "Review projects"
  }
];

const profileCopyByName = {
  "Ikokwu Chidozie Ikemba": {
    eyebrow: "Strategy and communications",
    summary:
      "Supports campaign strategy, public communication, sustainability framing, and partner-facing storytelling for the initiative.",
    body:
      "Ikemba brings experience from psychology, media practice, environmental enterprise, and civic communication. His contribution helps projects with clearer messaging, public context, campaign structure, and sustainability framing.",
    imageLabel: "Strategy and communications"
  },
  "Regional partner in Ghana": {
    eyebrow: "Ghana partnerships",
    summary:
      "Helps build Ghana-based relationships, listen to community needs, and identify credible local collaboration paths.",
    body:
      "This partner gives the team a practical regional point of view as the platform grows beyond one country. The role is focused on introductions, community listening, field coordination, and helping local changemakers or organizations connect with the right support route."
  },
  Sib: {
    eyebrow: "Film and visual storytelling",
    summary:
      "Contributes film, editing, photography, and accessibility-led visual storytelling for campaigns, profiles, and public updates.",
    body:
      "Sib is a West Midlands-based cinematographer and video editor with a strong interest in film, TV, and meaningful visual work for brands, organizations, and independent projects. Their creative practice also includes food and travel photography, shaped by authenticity, accessibility, and a lived autistic perspective."
  }
};

const missionChecks = [
  "Community needs are linked to a program route.",
  "Donation and partnership paths show what support helps fund.",
  "Field stories and updates give visitors context before they act."
];

function normalizeProfile(person) {
  const profileCopy = profileCopyByName[person.name];
  const normalizedEyebrow = (profileCopy?.eyebrow || person.eyebrow || "Team contributor")
    .replace(/founding lead/gi, "Strategic contributor")
    .replace(/founding partner/gi, "Regional collaborator")
    .replace(/founder/gi, "contributor");

  return {
    ...person,
    ...profileCopy,
    eyebrow: normalizedEyebrow
  };
}

export const metadata = {
  title: "About the Initiative",
  description:
    "The mission, program standards, support pathways, and contributor network behind Humanity First Initiative."
};

export default async function AboutPage() {
  const { changemakers } = await getPlatformContentData();
  const publicProfiles = changemakers.map(normalizeProfile);
  const [leadProfile, ...collaboratorProfiles] = publicProfiles;
  const contributorSignals = [
    {
      title: "Strategy and public voice",
      body: "Ikemba helps shape campaign language, partner context, sustainability framing, and public-facing communication."
    },
    {
      title: "Regional growth",
      body: "The Ghana partner supports relationship building, community listening, field coordination, and cross-country expansion."
    },
    {
      title: "Creative production",
      body: "Sib strengthens campaigns and updates through cinematography, editing, photography, and accessible visual storytelling."
    }
  ];
  const networkPoints = publicProfiles.slice(0, 4).map((person) => {
    const shortLocation = person.location
      ?.replace("West Midlands, United Kingdom", "West Midlands, UK")
      ?.replace("United Kingdom", "UK");

    return `${shortLocation || "Network"}: ${person.name}`;
  });
  const heroStats = [
    ...missionSignals.slice(0, 2),
    { value: String(publicProfiles.length), label: "public contributor profiles live" }
  ];

  return (
    <main className="site-main page-v2 about-page about-humanitarian">
      <PageHero
        eyebrow="About Humanity First Initiative"
        title="A humanitarian platform built around people, proof, and practical support."
        body="Humanity First Initiative brings community projects, health outreach, education access, youth sports, and creative advocacy into one clear public home so supporters understand the needs, the people, and the next step."
        primary={{ href: "/donate", label: "Support the work" }}
        secondary={{ href: "/get-involved", label: "Partner with us" }}
        highlights={[
          "Community-led support",
          "Documented needs",
          "Contributor network",
          "Low-bandwidth access"
        ]}
        stats={heroStats}
        media={{
          src: stockMedia.aboutHero.src,
          alt: stockMedia.aboutHero.alt,
          label: "Community life",
          ratio: stockMedia.aboutHero.ratio || "portrait"
        }}
        asideLabel="Working structure"
        asideTitle="Mission, programs, standards, and team in one place."
        asideBody="Supporters can see what the initiative does, where help is needed, how trust is handled, and who contributes to the work."
        asidePoints={networkPoints}
      />

      <Reveal as="section" className="about-map" delay={80} variant="rise" cascade>
        <article className="about-map__guide" data-reveal-group>
          <p className="about-map__guide-kicker">Mission map</p>
          <h2 className="about-map__guide-title">
            The initiative is organized around four public routes and a small contributor network.
          </h2>
          <p className="about-map__guide-body">
            Health, education, arts, and sports remain the main support routes. The team and
            collaborator profiles show who helps with strategy, regional growth, creative work,
            and field communication.
          </p>
        </article>

        {aboutPageMap.map((item) => (
          <article key={item.href} className="about-map__card" data-reveal-group>
            <p className="about-map__eyebrow">{item.eyebrow}</p>
            <h2 className="about-map__title">{item.title}</h2>
            <p className="about-map__body">{item.body}</p>
            <p className="about-map__detail">{item.detail}</p>
            <a href={item.href} className="about-map__link">
              {item.actionLabel}
            </a>
          </article>
        ))}
      </Reveal>

      <Reveal
        as="section"
        id="mission"
        className="about-humanitarian__mission"
        delay={120}
        variant="rise"
        cascade
      >
        <div className="about-humanitarian__mission-copy" data-reveal-group>
          <p className="section-kicker">Mission</p>
          <h2>Humanitarian work becomes easier to support when the need, route, and next step are clear.</h2>
          <p>
            Humanity First Initiative makes grassroots work easier to follow by connecting each
            public need to a program route, a support pathway, and a field update or project context.
          </p>
          <p>
            Education access, public health, youth sports, and creative advocacy each serve a
            practical community purpose: learning, protection, opportunity, expression, and
            resilience.
          </p>
          <div className="about-humanitarian__mission-checks" aria-label="Mission checkpoints">
            {missionChecks.map((item, index) => (
              <article key={item} className="about-humanitarian__mission-check">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="about-humanitarian__mission-visual" data-reveal-group>
          <StockPhoto
            src={stockMedia.aboutMission.src}
            alt={stockMedia.aboutMission.alt}
            label={stockMedia.aboutMission.label}
            sizes="(max-width: 1120px) 100vw, 38vw"
            className="about-humanitarian__photo"
          />
          <div className="about-humanitarian__ledger" aria-label="Humanity First operating signals">
            {missionSignals.map((item) => (
              <article key={item.value} className="about-humanitarian__ledger-row">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" id="programs" delay={180} variant="left" cascade>
        <SectionIntro
          data-reveal-group
          eyebrow="Program routes"
          title="The mission becomes useful when people can enter the right route quickly."
          body="These are not abstract departments. They are the visible public routes where support, learning, health response, youth development, and advocacy become understandable."
        />

        <div className="about-humanitarian__program-grid" data-reveal-group>
          {programPillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className={`about-humanitarian__program-card about-humanitarian__program-card--${pillar.tone}`}
            >
              <div className="card-v2__top">
                <span className="card-v2__index">{String(index + 1).padStart(2, "0")}</span>
                <p className="card-v2__eyebrow">Program route</p>
              </div>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
              <LoadingLink href={pillar.href} className="button button--secondary" loadingLabel="Opening">
                Explore route
              </LoadingLink>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" id="standards" delay={240} variant="rise" cascade>
        <SectionIntro
          data-reveal-group
          eyebrow="Operating standards"
          title="Trust is built through specific needs, honest roles, and visible follow-up."
          body="Community needs are connected to real routes, support requests are described plainly, and contributor roles are named without inflating hierarchy."
        />

        <div className="about-humanitarian__standards" data-reveal-group>
          <div className="about-humanitarian__model">
            {operatingModel.map((item, index) => (
              <article key={item.title} className="about-humanitarian__model-step">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="about-humanitarian__trust-grid">
            {trustStandards.map((item) => (
              <article key={item.title} className="card-v2 card-v2--paper">
                <p className="card-v2__eyebrow">Trust standard</p>
                <h3 className="card-v2__title">{item.title}</h3>
                <p className="card-v2__body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" id="network" delay={300} variant="rise" cascade>
        <SectionIntro
          data-reveal-group
          eyebrow="Team and collaborators"
          title="Strategy, Ghana partnerships, and creative production support the field work."
          body="Ikemba supports strategy and public communication, the Ghana partner supports regional relationships, and Sib supports film, editing, photography, and accessible storytelling."
        />

        <div className="about-humanitarian__team" data-reveal-group>
          <div className="about-humanitarian__team-lanes" aria-label="Team contribution lanes">
            {contributorSignals.map((item, index) => (
              <article key={item.title} className="about-humanitarian__team-lane">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>

          {leadProfile ? (
            <article className="about-humanitarian__team-lead">
              <div className="about-humanitarian__team-lead-copy">
                <div className="card-v2__top">
                  <span className="card-v2__index">01</span>
                  <p className="card-v2__eyebrow">{leadProfile.eyebrow}</p>
                </div>
                <h3>{leadProfile.name}</h3>
                <div className="about-humanitarian__profile-meta">
                  <p className="about-humanitarian__profile-role">{leadProfile.role}</p>
                  <p className="about-humanitarian__profile-location">{leadProfile.location}</p>
                </div>
                <p className="about-humanitarian__team-lead-summary">{leadProfile.summary}</p>
                <p className="about-humanitarian__team-lead-body">{leadProfile.body}</p>
                <div className="about-humanitarian__profile-footer">
                  {leadProfile.tags?.length ? (
                    <div className="tag-list">
                      {leadProfile.tags.map((tag) => (
                        <span key={tag} className="home-meta-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {leadProfile.href && leadProfile.hrefLabel ? (
                    <a href={leadProfile.href} target="_blank" rel="noreferrer" className="button button--secondary">
                      {leadProfile.hrefLabel}
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ) : null}

          <div className="about-humanitarian__collaborator-grid">
            {collaboratorProfiles.map((person, index) => (
              <article
                key={person.name}
                id={person.name === "Sib" ? "sib" : undefined}
                className="about-humanitarian__collaborator-card"
              >
                <div className="card-v2__top">
                  <span className="card-v2__index">{String(index + 2).padStart(2, "0")}</span>
                  <p className="card-v2__eyebrow">{person.eyebrow}</p>
                </div>
                <h3>{person.name}</h3>
                <div className="about-humanitarian__profile-meta">
                  <p className="about-humanitarian__profile-role">{person.role}</p>
                  <p className="about-humanitarian__profile-location">{person.location}</p>
                </div>
                <p>{person.summary}</p>
                <div className="about-humanitarian__profile-footer">
                  {person.tags?.length ? (
                    <div className="tag-list">
                      {person.tags.map((tag) => (
                        <span key={tag} className="home-meta-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {person.href && person.hrefLabel ? (
                    person.href.startsWith("http") ? (
                      <a href={person.href} target="_blank" rel="noreferrer" className="button button--secondary">
                        {person.hrefLabel}
                      </a>
                    ) : (
                      <LoadingLink href={person.href} className="button button--secondary" loadingLabel="Opening">
                        {person.hrefLabel}
                      </LoadingLink>
                    )
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal
        as="section"
        className="dark-panel-v2 about-humanitarian__cta"
        delay={360}
        variant="zoom"
        intensity="lg"
        cascade
      >
        <div data-reveal-group>
          <p className="dark-panel-v2__eyebrow">Support routes</p>
          <h2 className="dark-panel-v2__title">
            Fund a program, partner on delivery, or review the work first.
          </h2>
          <p className="dark-panel-v2__body">
            The next step depends on your role: donor, field partner, sponsor, creative contributor,
            school, NGO, or first-time supporter.
          </p>
        </div>

        <div className="about-humanitarian__support-routes" data-reveal-group>
          {supportRoutes.map((route, index) => (
            <article
              key={route.title}
              className={`about-humanitarian__support-card ${
                index === 0 ? "about-humanitarian__support-card--primary" : ""
              }`.trim()}
            >
              <p className="about-humanitarian__support-eyebrow">{route.eyebrow}</p>
              <h3>{route.title}</h3>
              <p>{route.body}</p>
              <p className="about-humanitarian__support-note">{route.note}</p>
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
