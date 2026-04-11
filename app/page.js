import { InfoCard } from "../components/InfoCard";
import { LoadingLink } from "../components/LoadingLink";
import { MetricCard } from "../components/MetricCard";
import { PhotoPanel } from "../components/PhotoPanel";
import { SectionIntro } from "../components/SectionIntro";
import {
  donationCauses,
  donationTiers,
  educationMetrics,
  featuredProject,
  homeMissionPoints,
  homeTrustSignals,
  involvementPaths,
  premiumVideoProject,
  programPillars,
  projectCards,
  proofStats,
  spotlightStories,
  updateCards
} from "../components/siteData";

const storyCardTones = ["paper", "mist", "sand", "blush", "leaf", "paper"];
const involvementTones = ["paper", "mist", "sand", "blush"];

function getProjectLink(project) {
  if (project.tag === "Education") {
    return {
      href: "/education",
      label: "Open Education Hub"
    };
  }

  if (project.tag === "Public Health" || project.tag === "Sports" || project.tag === "Arts and Music") {
    return {
      href: "/programs",
      label: "See Program Route"
    };
  }

  return {
    href: "/projects",
    label: "View Project Archive"
  };
}

export default function HomePage() {
  return (
    <main className="site-main">
      <section className="hero hero--home">
        <div className="hero__content">
          <span className="pill">Grassroots impact across Africa</span>
          <h1 className="hero__title">
            Show real work, earn trust, and turn support into community action.
          </h1>
          <p className="hero__body">
            Humanity First Initiative is being built as a mission-led platform for humanitarian
            interventions, education access, health advocacy, creative expression, and youth sports
            development with women and children at the center.
          </p>

          <div className="chip-row">
            {homeMissionPoints.map((point) => (
              <span key={point} className="chip">
                {point}
              </span>
            ))}
          </div>

          <div className="hero-actions">
            <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">
              Donate Now
            </LoadingLink>
            <LoadingLink
              href="/projects"
              className="button button--secondary"
              loadingLabel="Opening"
            >
              Explore Projects
            </LoadingLink>
            <LoadingLink
              href="/get-involved"
              className="button button--secondary"
              loadingLabel="Opening"
            >
              Get Involved
            </LoadingLink>
          </div>

          <p className="hero__support">
            Built for donors, NGOs, volunteers, collaborators, creatives, youth groups, and
            communities that need one trusted place to see impact stories, support programs, and
            grow with the mission.
          </p>
        </div>

        <div className="hero__media-grid">
          {spotlightStories.map((story, index) => (
            <PhotoPanel
              key={story.title}
              title={story.title}
              caption={story.caption}
              tone={story.tone}
              tall={index === 1}
            />
          ))}

          <article className="hero__media-note">
            <p className="section-kicker">Mission statement</p>
            <h2>Visibility should lead to dignity, confidence, and informed support.</h2>
            <p>
              The homepage is designed to make the work feel tangible from the first scroll:
              visitors can understand the mission, see the sectors, meet the stories, and know
              exactly where to go next.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <SectionIntro
          eyebrow="Why this platform exists"
          title="Build a digital home that feels credible, warm, and useful from the first visit."
          body="This first experience needs to do more than look good. It should explain the mission clearly, prove the range of the work, and make the next action obvious whether someone wants to donate, partner, volunteer, or learn."
        />

        <div className="section-grid section-grid--campaign">
          <div className="feature-panel">
            <PhotoPanel
              title="Mission-led storytelling"
              caption="replace with founder or field documentary photography"
              tone="forest"
            />
            <div className="feature-panel__content">
              <span className="pill pill--soft">Editorial direction</span>
              <h3>Keep the site human first, then scale it into a wider platform.</h3>
              <p>
                The homepage is structured to carry humanitarian reporting, program visibility,
                education access, arts and advocacy, public health campaigns, and sports
                development without flattening all of that into one generic nonprofit page.
              </p>
              <blockquote>
                The goal is not just awareness. The goal is a trusted path from empathy to real
                support, collaboration, and repeat engagement.
              </blockquote>
            </div>
          </div>

          <div className="stack-grid">
            {homeTrustSignals.map((signal) => (
              <InfoCard
                key={signal.title}
                eyebrow={signal.eyebrow}
                title={signal.title}
                body={signal.body}
                tone={signal.tone}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__stack">
          <p className="section-kicker">Proof of impact</p>
          <div className="metric-grid">
            {proofStats.map((item) => (
              <MetricCard key={item.label} value={item.value} label={item.label} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <SectionIntro
          eyebrow="Program pillars"
          title="Four clear sectors, one shared humanitarian mission."
          body="The homepage should prove breadth without losing focus. Each pillar works as a real route into a program area with its own stories, campaigns, resources, and future expansion path."
        />

        <div className="info-grid info-grid--two">
          {programPillars.map((pillar) => (
            <div key={pillar.title} className="hub-card">
              <InfoCard
                eyebrow="Program pillar"
                title={pillar.title}
                body={pillar.body}
                tone={pillar.tone}
              />
              <LoadingLink
                href={pillar.href}
                className="button button--secondary hub-card__cta"
                loadingLabel="Opening"
              >
                Explore This Sector
              </LoadingLink>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionIntro
          eyebrow="Featured impact story"
          title="Lead with one living intervention before the wider archive."
          body="A strong homepage should make one story memorable. This creates emotional grounding before visitors move into the broader project ecosystem."
        />

        <div className="feature-panel">
          <PhotoPanel
            title="Flagship field story"
            caption="replace with documentary imagery from an active intervention"
            tone="sunset"
          />
          <div className="feature-panel__content">
            <span className="pill pill--soft">Featured intervention</span>
            <h3>{featuredProject.title}</h3>
            <p>{featuredProject.body}</p>
            <blockquote>{featuredProject.quote}</blockquote>
            <div className="hero-actions">
              <LoadingLink
                href="/projects"
                className="button button--primary"
                loadingLabel="Opening"
              >
                Read the Story
              </LoadingLink>
              <LoadingLink
                href="/donate"
                className="button button--secondary"
                loadingLabel="Opening"
              >
                Support This Work
              </LoadingLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionIntro
          eyebrow="Project archive"
          title="Show the range of the work without turning the homepage into a wall of cards."
          body="These project previews create a stronger mid-page browsing experience and make it easier for visitors to move from general interest into a specific sector or intervention type."
        />

        <div className="story-grid">
          {projectCards.map((project, index) => {
            const link = getProjectLink(project);

            return (
              <article
                key={project.title}
                className={`story-card story-card--${storyCardTones[index % storyCardTones.length]}`}
              >
                <div className="story-card__meta">
                  <span className="story-card__tag">{project.tag}</span>
                  <span className="story-card__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="story-card__title">{project.title}</h3>
                <p className="story-card__body">{project.body}</p>

                <div className="story-card__actions">
                  <LoadingLink
                    href={link.href}
                    className="button button--secondary story-card__link"
                    loadingLabel="Opening"
                  >
                    {link.label}
                  </LoadingLink>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section">
        <SectionIntro
          eyebrow="Built to expand"
          title="The homepage should point beyond storytelling into real product surfaces."
          body="Education, premium storytelling, and contributor pathways are already live. The homepage should surface them clearly so the platform feels active, useful, and ready to grow."
        />

        <div className="section-grid section-grid--split">
          <div className="home-route-panel">
            <span className="pill pill--soft">Education hub</span>
            <h3>Turn the platform into a practical learning destination.</h3>
            <p>
              The Education Hub gives the initiative a real learning surface for books, lesson
              links, coding pathways, and community-ready teaching materials that work well on
              phones.
            </p>

            <div className="home-meta-row">
              {educationMetrics.slice(0, 3).map((item) => (
                <span key={item.label} className="home-meta-pill">
                  {item.value} {item.label}
                </span>
              ))}
            </div>

            <div className="hero-actions">
              <LoadingLink
                href="/education"
                className="button button--primary"
                loadingLabel="Opening"
              >
                Open Education Hub
              </LoadingLink>
              <LoadingLink
                href="/education/contribute"
                className="button button--secondary"
                loadingLabel="Opening"
              >
                Submit a Resource
              </LoadingLink>
            </div>
          </div>

          <div className="home-route-panel home-route-panel--dark">
            <span className="pill pill--soft">Premium storytelling</span>
            <h3>{premiumVideoProject.title}</h3>
            <p>{premiumVideoProject.teaser}</p>

            <div className="home-meta-row">
              <span className="home-meta-pill">{premiumVideoProject.price}</span>
              <span className="home-meta-pill">{premiumVideoProject.runtime}</span>
              <span className="home-meta-pill">{premiumVideoProject.accessWindow}</span>
            </div>

            <div className="hero-actions">
              <LoadingLink
                href={`/projects/${premiumVideoProject.slug}`}
                className="button button--secondary"
                loadingLabel="Opening"
              >
                View Premium Demo
              </LoadingLink>
              <LoadingLink
                href="/projects"
                className="button button--ghost-light"
                loadingLabel="Opening"
              >
                Browse More Stories
              </LoadingLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionIntro
          eyebrow="Donate with clarity"
          title="Support paths should feel direct, specific, and grounded in visible outcomes."
          body="The donation experience should not be separated from the mission. The homepage already starts that trust-building by pairing giving tiers with clear sectors and practical funding logic."
        />

        <div className="section-grid section-grid--campaign">
          <div className="section__stack">
            <div className="metric-grid">
              {donationTiers.map((tier) => (
                <MetricCard key={tier} value={tier} label="Suggested giving tier" />
              ))}
            </div>

            <div className="hero-actions">
              <LoadingLink
                href="/donate"
                className="button button--primary"
                loadingLabel="Opening"
              >
                Give With Confidence
              </LoadingLink>
              <LoadingLink
                href="/projects"
                className="button button--secondary"
                loadingLabel="Opening"
              >
                See What Support Funds
              </LoadingLink>
            </div>
          </div>

          <div className="cause-list">
            {donationCauses.map((cause) => (
              <div key={cause} className="cause-item">
                <p className="cause-item__title">{cause}</p>
                <p className="cause-item__body">
                  Each cause can connect directly to project stories, campaign documentation, and
                  visible updates so donors understand the impact trail behind the ask.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <SectionIntro
          eyebrow="Join the work"
          title="Route supporters clearly instead of leaving them at the edge of the story."
          body="The homepage should end with usable options: volunteer, partner, contribute, sponsor, or follow the latest field movement across the platform."
        />

        <div className="section-grid section-grid--campaign">
          <div className="info-grid info-grid--two">
            {involvementPaths.map((path, index) => (
              <InfoCard
                key={path.title}
                eyebrow="Support pathway"
                title={path.title}
                body={path.body}
                tone={involvementTones[index % involvementTones.length]}
              />
            ))}
          </div>

          <div className="stack-grid">
            {updateCards.map((update, index) => (
              <InfoCard
                key={update.title}
                eyebrow={`Latest signal 0${index + 1}`}
                title={update.title}
                body={update.body}
                tone={index === 0 ? "forest-ink" : "paper"}
              />
            ))}

            <div className="hero-actions">
              <LoadingLink
                href="/get-involved"
                className="button button--primary"
                loadingLabel="Opening"
              >
                Choose Your Path
              </LoadingLink>
              <LoadingLink
                href="/about"
                className="button button--secondary"
                loadingLabel="Opening"
              >
                Meet the Initiative
              </LoadingLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--band">
        <div className="closing-cta">
          <div>
            <p className="section-kicker section-kicker--light">Next action</p>
            <h2 className="closing-cta__title">
              A homepage built to move people from first impression to meaningful support.
            </h2>
            <p className="closing-cta__body">
              The platform now has a fuller front door: clearer mission framing, stronger proof,
              active routes into programs and education, donation context, and contributor paths
              that already work.
            </p>
          </div>
          <div className="closing-cta__actions">
            <LoadingLink
              href="/donate"
              className="button button--secondary"
              loadingLabel="Opening"
            >
              Support the Mission
            </LoadingLink>
            <LoadingLink
              href="/education/contribute"
              className="button button--ghost-light"
              loadingLabel="Opening"
            >
              Contribute a Resource
            </LoadingLink>
          </div>
        </div>
      </section>
    </main>
  );
}
