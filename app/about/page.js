import { InfoCard } from "../../components/InfoCard";
import { LoadingLink } from "../../components/LoadingLink";
import { PageHero } from "../../components/PageHero";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { StockPhoto } from "../../components/StockPhoto";
import { stockMedia } from "../../components/stockMedia";
import { sibProfile, sportsSpotlight } from "../../components/siteData";

const values = [
  {
    title: "Dignity first",
    body: "Every story, image, and appeal protects the dignity of the people and communities at the center of the work."
  },
  {
    title: "Visible accountability",
    body: "Support stays close to real projects, practical outcomes, and updates that make trust easier to sustain over time."
  },
  {
    title: "Community voice",
    body: "Programs become stronger when they are shaped with local participation, lived experience, and long-term relationships."
  },
  {
    title: "Creative empowerment",
    body: "Arts, film, music, and storytelling are treated as real tools for visibility, healing, advocacy, and cultural connection."
  }
];

const journeyCards = [
  {
    eyebrow: "Where it begins",
    title: "Founder-led humanitarian action with room to grow",
    body: "Humanity First Initiative makes current work clearer, more credible, and easier to support while keeping space for collaborators and cross-country partnerships."
  },
  {
    eyebrow: "How it grows",
    title: "Nigeria, Ghana, and a wider network of changemakers",
    body: "The initiative carries founder stories, partner-led interventions, contributor profiles, and country-specific campaigns without losing the human scale of the mission."
  }
];

const aboutHeroHighlights = [
  "Dignity-first storytelling",
  "Founder-led and partner-shaped growth",
  "Education, health, arts, and sports under one mission"
];

const aboutHeroAsidePoints = [
  "Nigeria and Ghana are current anchors for growth",
  "Contributors, partners, and campaigns stay visible as the mission expands",
  "Trust is built through context, continuity, and public-facing storytelling"
];

export default function AboutPage() {
  return (
    <main className="site-main">
      <PageHero
        eyebrow="About Humanity First"
        title="A people-first initiative built to turn visibility into trust, support, and long-term impact."
        body="Humanity First Initiative exists to document grassroots interventions, strengthen supporter confidence, and connect humanitarian work, education access, public health advocacy, creative expression, and youth development."
        primary={{ href: "/projects", label: "See Impact Stories" }}
        secondary={{ href: "/get-involved", label: "Partner With Us" }}
        highlights={aboutHeroHighlights}
        media={stockMedia.aboutHero}
        asideTitle="A growing movement rooted in practical work"
        asideBody="This initiative is more than a single campaign site. It is a digital home for credible storytelling, grounded support paths, and long-term collaboration across communities and sectors."
        asidePoints={aboutHeroAsidePoints}
      />

      <Reveal as="section" className="section" delay={120}>
        <div className="campaign-dossier">
          <div className="campaign-dossier__lead">
            <StockPhoto
              src={stockMedia.aboutMission.src}
              alt={stockMedia.aboutMission.alt}
              label={stockMedia.aboutMission.label}
              sizes="(max-width: 1180px) 100vw, 32vw"
              className="campaign-dossier__media"
            />
            <span className="pill pill--soft">Who we are</span>
            <h3 className="campaign-dossier__title">
              Community-first work presented with clarity, respect, and public trust.
            </h3>
            <p className="campaign-dossier__body">
              Humanity First Initiative exists to make grassroots action easier to understand,
              easier to support, and easier to grow without losing the dignity of the people behind
              the work.
            </p>
            <blockquote className="campaign-dossier__quote">
              The mission is to make local impact easier to see and easier to back without losing
              the humanity of the story behind it.
            </blockquote>
          </div>

          <div className="campaign-dossier__facts">
            <div className="campaign-dossier__support-list">
              <article className="campaign-dossier__support-item">
                <p className="campaign-dossier__support-eyebrow">Focus</p>
                <p className="campaign-dossier__support-body">
                  Humanitarian interventions, education access, public health, arts advocacy, and
                  sports development under one connected mission.
                </p>
              </article>
              <article className="campaign-dossier__support-item">
                <p className="campaign-dossier__support-eyebrow">Approach</p>
                <p className="campaign-dossier__support-body">
                  Storytelling is tied to real projects, community voice, and clear support routes
                  so donors and partners act with confidence.
                </p>
              </article>
              <article className="campaign-dossier__support-item">
                <p className="campaign-dossier__support-eyebrow">Growth path</p>
                <p className="campaign-dossier__support-body">
                  The initiative holds collaborators, country stories, and partner-led campaigns as
                  the initiative expands.
                </p>
              </article>
            </div>

            <div className="hero-actions">
              <LoadingLink
                href="/donate"
                className="button button--primary"
                loadingLabel="Opening"
              >
                Support the Mission
              </LoadingLink>
              <LoadingLink
                href="/programs"
                className="button button--secondary"
                loadingLabel="Opening"
              >
                Explore Program Areas
              </LoadingLink>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section" delay={160}>
        <SectionIntro
          eyebrow="Mission architecture"
          title="A clearer picture of what the initiative is building."
          body="These blocks explain the current starting point and the wider ambition behind the initiative."
        />

        <div className="editorial-band">
          <div className="editorial-band__lead">
            <h3 className="editorial-band__title">
              A professional public initiative for humanitarian work, cross-sector advocacy, and long-term trust.
            </h3>
          </div>

          <div className="editorial-band__body">
            {journeyCards.map((card) => (
              <article key={card.title} className="editorial-band__entry">
                <p className="editorial-band__eyebrow">{card.eyebrow}</p>
                <h4 className="editorial-band__entry-title">{card.title}</h4>
                <p className="editorial-band__entry-body">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section" delay={180}>
        <SectionIntro
          eyebrow="Creative voice"
          title="Sib brings film, travel, and accessibility advocacy into the wider mission."
          body="This profile adds a human creative voice to the initiative while connecting storytelling with access, representation, and cultural visibility."
        />

        <div className="section-grid section-grid--split">
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
            <blockquote>{sibProfile.update}</blockquote>
          </article>

          <div className="section__stack">
          <InfoCard
            eyebrow="Why this matters"
            title="Creative work broadens who see and feel the mission."
            body="Film, photography, travel storytelling, and accessibility advocacy give the initiative a stronger cultural voice and a more human public identity."
            tone="blush"
          />
            <InfoCard
              eyebrow="Contribution"
              title="Accessibility and representation stay close to the story."
              body="Sib's work helps make visibility more inclusive by connecting storytelling with the realities of access, opportunity, and lived experience."
              tone="mist"
            />
            <div className="hero-actions">
              <LoadingLink
                href="/programs"
                className="button button--primary"
                loadingLabel="Opening"
              >
                View Arts and Advocacy
              </LoadingLink>
              <LoadingLink
                href="/projects"
                className="button button--secondary"
                loadingLabel="Opening"
              >
                See Related Stories
              </LoadingLink>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section" delay={220}>
        <SectionIntro
          eyebrow="Shared standards"
          title="The standards behind the work matter as much as the work itself."
          body="These values make the initiative feel grounded. They also signal what donors, partners, and contributors expect from campaigns and collaborations."
        />

        <div className="ledger-grid">
          {values.map((value, index) => (
            <article
              key={value.title}
              className={`ledger-card ledger-card--${index === 0 ? "sand" : index === 1 ? "mist" : index === 2 ? "leaf" : "blush"}`}
            >
              <div className="ledger-card__top">
                <span className="ledger-card__index">{String(index + 1).padStart(2, "0")}</span>
                <span className="ledger-card__eyebrow">Core value</span>
              </div>
              <h3 className="ledger-card__title">{value.title}</h3>
              <p className="ledger-card__body">{value.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="section" delay={260}>
        <SectionIntro
          eyebrow="Regional growth"
          title="Prepared to expand beyond one founder, one program, or one country."
          body="The initiative holds profiles, collaborations, campaigns, and partner-led initiatives as the mission grows across sectors and regions."
        />

        <div className="growth-map">
          <div className="home-route-panel home-route-panel--dark">
            <span className="pill pill--soft">Regional vision</span>
            <h3>One initiative carrying local stories into a wider African network.</h3>
            <p>
              As contributors, country partnerships, and campaigns are added, the structure keeps
              the mission coherent while making each local story easier to discover and support.
            </p>
            <div className="home-meta-row">
              <span className="home-meta-pill">Nigeria</span>
              <span className="home-meta-pill">Ghana</span>
              <span className="home-meta-pill">Future partner countries</span>
            </div>
          </div>
          <div className="growth-map__cards">
            <InfoCard
              eyebrow="Current base"
              title="Founder-led and partner-shaped programs"
              body="The current foundation anchors the story clearly while leaving space for collaborations and country-specific growth."
            />
            <InfoCard
              eyebrow="Creative profile"
              title={sibProfile.name}
              body={`${sibProfile.role}. ${sibProfile.update}`}
              tone="blush"
            />
            <InfoCard
              eyebrow="Sports partner"
              title={sportsSpotlight.title}
              body={`${sportsSpotlight.location}. ${sportsSpotlight.summary}`}
              tone="leaf"
            />
          </div>
        </div>
      </Reveal>
    </main>
  );
}
