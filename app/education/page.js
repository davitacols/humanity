import { EducationLibrary } from "../../components/EducationLibrary";
import { LoadingLink } from "../../components/LoadingLink";
import { PageHero } from "../../components/PageHero";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { stockMedia } from "../../components/stockMedia";
import { getEducationHubData } from "../../lib/education";

export const revalidate = 300;

export const metadata = {
  title: "Education Hub",
  description:
    "Explore Humanity First learning tracks, practical teaching resources, downloadable guides, facilitator tools, and contribution pathways for community education."
};

const hubSteps = [
  {
    title: "Choose a learner level",
    body: "Learners, mentors, schools, and contributors can start with beginner, community, mentor, or mixed-level materials."
  },
  {
    title: "Run a session with available materials",
    body: "Guides, lessons, workbooks, and checklists support phone-based learning, workshops, cohorts, and low-bandwidth settings."
  },
  {
    title: "Review before publishing",
    body: "Submitted resources are checked for audience fit, access, permissions, and teaching value before they enter the public library."
  }
];

function getResourceAction(resource) {
  const normalized = resource.title.toLowerCase();

  if (normalized.includes("lesson")) {
    return {
      href: "/education?category=Lessons#library-explorer",
      label: "Browse lessons"
    };
  }

  if (normalized.includes("toolkit")) {
    return {
      href: "/education?category=Toolkits#library-explorer",
      label: "Browse toolkits"
    };
  }

  if (normalized.includes("spotlight")) {
    return {
      href: "/education/contribute#resource-submission",
      label: "Contribute a resource"
    };
  }

  return {
    href: "/education?category=Downloads#library-explorer",
    label: "Browse downloads"
  };
}

function getTrackMeta(track) {
  const normalized = track.title.toLowerCase();

  if (normalized.includes("coding")) {
    return {
      audience: "Best for first-time learners and cohort starters.",
      support: "Pairs well with beginner lessons, digital basics, and short guided practice.",
      href: "/education?level=Beginner#library-explorer",
      label: "Open beginner resources"
    };
  }

  if (normalized.includes("work")) {
    return {
      audience: "Best for youth and beginner adults building practical digital confidence.",
      support: "Useful for employability habits, online safety, and real-world digital tasks.",
      href: "/education?category=Lessons#library-explorer",
      label: "Open work-ready lessons"
    };
  }

  return {
    audience: "Best for facilitators, mentors, and shared community learning spaces.",
    support: "Useful where workshops, printable guides, and reusable teaching assets matter most.",
    href: "/education?category=Toolkits#library-explorer",
    label: "Open facilitator resources"
  };
}

export default async function EducationPage({ searchParams }) {
  const params = (await searchParams) || {};
  const {
    actions,
    featuredLibraryItems,
    libraryItems,
    librarySummary,
    metrics,
    resources,
    sessions,
    tracks
  } = await getEducationHubData();

  return (
    <main className="site-main page-v2 edu-page">
      <PageHero
        eyebrow="Education hub"
        title="A field classroom for learners, facilitators, and community mentors."
        body="Find digital basics guides, beginner web lessons, facilitator outlines, printable workbooks, mentor checklists, and contribution routes for community education."
        primary={{ href: "#library-explorer", label: "Explore the library" }}
        secondary={{ href: "/education/contribute", label: "Contribute resources" }}
        highlights={[
          `${librarySummary.categories.length} resource categories`,
          `${librarySummary.levels.length} audience levels`,
          `${librarySummary.internalCount} guided internal resources`,
          `${librarySummary.externalCount} linked external resources`
        ]}
        stats={metrics}
        media={stockMedia.educationFeature}
        asideTitle="Education access routes"
        asideBody="The hub connects learners to resources, facilitators to session materials, and contributors to a review process before publication."
        asidePoints={[
          "Beginner resources for digital confidence and web basics",
          "Facilitator materials for workshops and cohort delivery",
          "Reviewed submissions before anything enters the library"
        ]}
      />

      <Reveal as="section" delay={90}>
        <SectionIntro
          eyebrow="Use the hub your way"
          title="Start with downloads, lessons, toolkits, or contributed materials."
          body="The library is organized around the ways people actually use education support: offline handouts, external lessons, facilitator kits, and learner progress stories."
        />
        <div className="browse-grid edu-page__browse-grid">
          {resources.map((resource, index) => {
            const action = getResourceAction(resource);

            return (
              <article
                key={resource.title}
                className={`browse-card edu-page__browse-card browse-card--${resource.tone || "mist"}`}
              >
                <div className="browse-card__top">
                  <span className="browse-card__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="browse-card__eyebrow">{resource.eyebrow}</span>
                </div>
                <h3 className="browse-card__title">{resource.title}</h3>
                <p className="browse-card__body">{resource.body}</p>
                <LoadingLink
                  href={action.href}
                  className="button button--secondary browse-card__cta"
                  loadingLabel="Opening"
                >
                  {action.label}
                </LoadingLink>
              </article>
            );
          })}
        </div>
      </Reveal>

      <Reveal as="section" delay={140}>
        <SectionIntro
          eyebrow="Start here"
          title="Three strong first steps for schools, mentors, and first-time learners."
          body="These featured resources are the fastest way to enter the library without guessing what belongs where."
        />
        <div className="card-grid-v2 card-grid-v2--3 edu-page__featured-grid">
          {featuredLibraryItems.map((item, index) => (
            <article key={item.title} className="card-v2 edu-page__featured-card">
              <div className="card-v2__top">
                <span className="card-v2__index">{String(index + 1).padStart(2, "0")}</span>
                <p className="card-v2__eyebrow">{item.category}</p>
              </div>
              <h3 className="card-v2__title">{item.title}</h3>
              <p className="card-v2__body">{item.summary}</p>
              <p className="card-v2__body">
                {item.format} - {item.level}
              </p>
              {item.external ? (
                <a href={item.href} target="_blank" rel="noreferrer" className="button button--secondary">
                  {item.actionLabel}
                </a>
              ) : (
                <LoadingLink href={item.href} className="button button--secondary" loadingLabel="Opening">
                  {item.actionLabel}
                </LoadingLink>
              )}
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" delay={190}>
        <SectionIntro
          eyebrow="Learning tracks"
          title="Three learning tracks organize the materials by use case."
          body="Coding foundations, digital skills for work, and the community learning library give learners and facilitators a direct starting point."
        />
        <div className="ledger-grid edu-page__tracks-grid">
          {tracks.map((track, index) => {
            const trackMeta = getTrackMeta(track);

            return (
              <article
                key={track.title}
                className={`ledger-card edu-page__track-card ledger-card--${track.tone || "mist"}`}
              >
                <div className="ledger-card__top">
                  <span className="ledger-card__index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="ledger-card__eyebrow">{track.eyebrow}</span>
                </div>
                <h3 className="ledger-card__title">{track.title}</h3>
                <p className="ledger-card__body">{track.body}</p>
                <p className="ledger-card__body">{trackMeta.audience}</p>
                <p className="ledger-card__body">{trackMeta.support}</p>
                <LoadingLink href={trackMeta.href} className="button button--secondary" loadingLabel="Opening">
                  {trackMeta.label}
                </LoadingLink>
              </article>
            );
          })}
        </div>
      </Reveal>

      <Reveal as="section" delay={250}>
        <SectionIntro
          eyebrow="Library explorer"
          title="Search by what the material is, who it is for, and what kind of session you are planning."
          body="Discovery works better when a mentor can search by need and a contributor can see what already exists before submitting something similar."
        />
        <EducationLibrary
          items={libraryItems}
          initialCategory={typeof params.category === "string" ? params.category : "All"}
          initialLevel={typeof params.level === "string" ? params.level : "All levels"}
          initialQuery={typeof params.q === "string" ? params.q : ""}
        />
      </Reveal>

      <Reveal as="section" delay={320}>
        <SectionIntro
          eyebrow="Delivery model"
          title="Education support includes live sessions and reusable materials."
          body="Session formats help people learn together, while reviewed resources keep guides, lessons, and workbooks available after the session ends."
        />
        <div className="split-v2 edu-page__delivery-layout">
          <div className="stack-v2 edu-page__session-stack">
            {sessions.map((session, index) => (
              <article key={session.title} className="card-v2 edu-page__session-card">
                <div className="card-v2__top">
                  <span className="card-v2__index">{String(index + 1).padStart(2, "0")}</span>
                  <p className="card-v2__eyebrow">{session.eyebrow}</p>
                </div>
                <h3 className="card-v2__title">{session.title}</h3>
                <p className="card-v2__body">{session.body}</p>
              </article>
            ))}
          </div>

          <div className="stack-v2 edu-page__delivery-stack">
            <article className="dark-panel-v2">
              <p className="dark-panel-v2__eyebrow">Quality practice</p>
              <h2 className="dark-panel-v2__title">Useful learning content names the audience, format, and teaching moment.</h2>
              <p className="dark-panel-v2__body">
                The review process favors mobile-friendly formats, clear audience fit, rights-safe
                access, and materials a teacher, mentor, or learner can use in a real session.
              </p>
              <div className="hero-actions">
                <LoadingLink href="/education/contribute" className="button button--primary" loadingLabel="Opening">
                  Submit a resource
                </LoadingLink>
                <LoadingLink href="/donate?fund=education-access#live-checkout" className="button button--secondary" loadingLabel="Opening">
                  Support a cohort
                </LoadingLink>
              </div>
            </article>

            <div className="card-grid-v2 edu-page__practice-grid">
              {hubSteps.map((step, index) => (
                <article key={step.title} className="card-v2 edu-page__practice-card">
                  <div className="card-v2__top">
                    <span className="card-v2__index">{String(index + 1).padStart(2, "0")}</span>
                    <p className="card-v2__eyebrow">Practice</p>
                  </div>
                  <h3 className="card-v2__title">{step.title}</h3>
                  <p className="card-v2__body">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" delay={380}>
        <SectionIntro
          eyebrow="Support and contribute"
          title="Contribute materials or sponsor education access."
          body="Resource contributors extend the library. Sponsors help fund cohort delivery, printing, connectivity, devices, and facilitator preparation."
        />
        <div className="info-grid--two card-grid-v2 edu-page__actions-grid">
          {actions.map((action, index) => (
            <article key={action.title} className="card-v2 edu-page__action-card">
              <div className="card-v2__top">
                <span className="card-v2__index">{String(index + 1).padStart(2, "0")}</span>
                <p className="card-v2__eyebrow">Action route</p>
              </div>
              <h3 className="card-v2__title">{action.title}</h3>
              <p className="card-v2__body">{action.body}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </main>
  );
}


