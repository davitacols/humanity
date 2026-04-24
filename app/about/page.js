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
    value: "Nigeria + Ghana",
    label: "current regional footprint with room for partner-led growth"
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
    body: "A clear public home for humanitarian work people can understand, trust, and support."
  },
  {
    href: "#programs",
    eyebrow: "Programs",
    title: "Where support goes",
    body: "Education, public health, youth sports, and creative advocacy stay connected under one mission."
  },
  {
    href: "#standards",
    eyebrow: "Standards",
    title: "How trust is protected",
    body: "The page explains the operating discipline behind field stories, donations, and partnerships."
  },
  {
    href: "#network",
    eyebrow: "Network",
    title: "Who contributes",
    body: "Public profiles are presented as collaborators and contributors, not as invented hierarchy."
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
    body: "Donors, volunteers, sponsors, and partner organizations are guided toward specific routes rather than vague calls for help."
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
    body: "The site should show needs, project context, field updates, and transparent support paths before asking visitors to act."
  },
  {
    title: "Dignity in storytelling",
    body: "Stories should help people be seen with care and agency, avoiding charity language that reduces communities to hardship."
  },
  {
    title: "Collaboration without confusion",
    body: "Profiles, partners, and contributors are named for the role they play so visitors can understand the network honestly."
  }
];

const supportRoutes = [
  {
    title: "Donate",
    body: "Back a current program, campaign, or project with clearer context about the need.",
    href: "/donate",
    label: "Donate now"
  },
  {
    title: "Partner",
    body: "Work with the initiative as an NGO, donor, school, creative team, or regional organization.",
    href: "/get-involved",
    label: "Start partnership"
  },
  {
    title: "Follow the work",
    body: "Review project pages, program routes, field updates, and transparency notes before deciding how to help.",
    href: "/projects",
    label: "See projects"
  }
];

function normalizeProfile(person) {
  const isIkemba = /ikemba|ikokwu chidozie/i.test(person.name || "");
  const isRegionalPartner = /regional partner/i.test(person.name || "");
  const normalizedEyebrow = (person.eyebrow || "Network contributor")
    .replace(/founding lead/gi, "Strategic contributor")
    .replace(/founding partner/gi, "Regional collaborator")
    .replace(/founder/gi, "contributor");

  if (isIkemba) {
    return {
      ...person,
      eyebrow: "Strategic contributor",
      summary:
        "Contributes strategy, sustainability, journalism, and public communication experience to the wider humanitarian platform.",
      body:
        "This is a contributor profile alongside other public collaborators in the network. It shows one area of experience available to support campaigns, partnerships, and field storytelling without implying a leadership designation.",
      imageLabel: "Contributor profile"
    };
  }

  if (isRegionalPartner) {
    return {
      ...person,
      eyebrow: "Regional collaborator",
      body:
        "This regional collaborator role supports the platform's multi-country direction, helping shape how projects, campaigns, and local changemakers can be represented beyond one public profile."
    };
  }

  return {
    ...person,
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
        asideLabel="What this page clarifies"
        asideTitle="This is a mission page, not a personality page."
        asideBody="The initiative can hold field stories, partner stories, and contributor profiles without confusing public roles or overstating leadership."
        asidePoints={networkPoints}
      />

      <Reveal as="section" className="about-map" delay={80} variant="rise" cascade>
        {aboutPageMap.map((item) => (
          <article key={item.href} className="about-map__card" data-reveal-group>
            <p className="about-map__eyebrow">{item.eyebrow}</p>
            <h2 className="about-map__title">{item.title}</h2>
            <p className="about-map__body">{item.body}</p>
            <a href={item.href} className="about-map__link">
              Go to section
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
          <h2>Humanitarian work should feel close enough to trust and organized enough to support.</h2>
          <p>
            The platform exists to make grassroots work easier to understand. Visitors should be
            able to see the community need, follow the program route, review the practical support
            pathway, and decide how to help without searching through scattered updates.
          </p>
          <p>
            The work is intentionally broad, but not vague: education access, public health,
            youth sports, and creative advocacy each serve a larger goal of dignity, protection,
            opportunity, and community resilience.
          </p>
          <blockquote>
            People support with more confidence when the story, the need, and the next step stay
            connected.
          </blockquote>
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
          title="Four ways the same humanitarian mission becomes practical."
          body="The About page now points visitors toward the actual areas where support, collaboration, and field storytelling can happen."
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
          title="The platform is designed to protect trust before asking for support."
          body="A credible humanitarian page should explain the discipline behind the story: how needs are understood, how support is framed, and how collaborators are represented."
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
          eyebrow="Contributor network"
          title="Public profiles show collaborators, specialists, and regional relationships."
          body="Ikemba is presented as a contributor profile in the same network model as Sib. The section avoids hierarchy language and keeps roles clear for visitors."
        />

        <div className="card-grid-v2 card-grid-v2--2" data-reveal-group>
          {publicProfiles.map((person, index) => (
            <article
              key={person.name}
              id={person.name === "Sib" ? "sib" : undefined}
              className="card-v2 card-v2--paper about-humanitarian__profile-card"
            >
              <div className="card-v2__top">
                <span className="card-v2__index">{String(index + 1).padStart(2, "0")}</span>
                <p className="card-v2__eyebrow">{person.eyebrow}</p>
              </div>
              <h3 className="card-v2__title">{person.name}</h3>
              <p className="card-v2__body about-humanitarian__profile-role">{person.role}</p>
              <p className="card-v2__body">{person.location}</p>
              <p className="card-v2__body">{person.summary}</p>
              <p className="card-v2__body">{person.body}</p>
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
            </article>
          ))}
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
          <p className="dark-panel-v2__eyebrow">Ready to help</p>
          <h2 className="dark-panel-v2__title">
            Support can begin with a donation, a partnership conversation, or simply reviewing the work.
          </h2>
          <p className="dark-panel-v2__body">
            Choose the path that fits your capacity. The goal is to make support feel practical,
            credible, and connected to the people the initiative serves.
          </p>
        </div>

        <div className="about-humanitarian__support-routes" data-reveal-group>
          {supportRoutes.map((route) => (
            <article key={route.title} className="about-humanitarian__support-card">
              <h3>{route.title}</h3>
              <p>{route.body}</p>
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
