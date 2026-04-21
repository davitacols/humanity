import { LoadingLink } from "../../components/LoadingLink";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { StockPhoto } from "../../components/StockPhoto";
import { stockMedia } from "../../components/stockMedia";
import {
  premiumVideoProject,
  profileSpotlight,
  programPillars,
  sportsSpotlight
} from "../../components/siteData";

const pillarMedia = [
  stockMedia.educationFeature,
  stockMedia.homeStories[2],
  stockMedia.homeStories[0],
  stockMedia.homeHero
];

const pillarAccents = ["education", "arts", "health", "sports"];

export default function ProgramsPage() {
  return (
    <main className="site-main prog-page">
      {/* ── Hero ── */}
      <Reveal as="section" className="prog-hero" delay={60}>
        <div className="prog-hero__content">
          <p className="prog-hero__eyebrow">Programs hub</p>
          <h1 className="prog-hero__title">
            Four empowerment pathways, one connected humanitarian mission.
          </h1>
          <p className="prog-hero__body">
            Education, arts and storytelling, public health, and sports development — organized
            so visitors can see what each program delivers on the ground.
          </p>
          <div className="prog-hero__pillars">
            {programPillars.map((p, i) => (
              <span key={p.title} className={`prog-hero__pillar prog-hero__pillar--${pillarAccents[i]}`}>
                {p.title}
              </span>
            ))}
          </div>
          <div className="hero-actions">
            <LoadingLink href="/projects" className="button button--primary" loadingLabel="Opening">
              See program stories
            </LoadingLink>
            <LoadingLink href="/education/contribute" className="button button--secondary" loadingLabel="Opening">
              Contribute resources
            </LoadingLink>
          </div>
        </div>
        <div className="prog-hero__visual">
          <StockPhoto
            src={stockMedia.programsHero.src}
            alt={stockMedia.programsHero.alt}
            label="Programs in practice"
            priority
            sizes="(max-width: 1120px) 100vw, 44vw"
            className="prog-hero__photo"
          />
        </div>
      </Reveal>

      {/* ── Pillar cards ── */}
      <Reveal as="section" delay={130}>
        <SectionIntro
          eyebrow="Program map"
          title="Clear routes into the sectors that shape the initiative."
          body="Each pillar has its own focus while the experience still feels like one connected initiative."
        />
        <div className="prog-pillars">
          {programPillars.map((pillar, i) => (
            <article key={pillar.title} className={`prog-pillars__card prog-pillars__card--${pillarAccents[i]}`}>
              <StockPhoto
                src={pillarMedia[i].src}
                alt={pillarMedia[i].alt}
                label={`Route 0${i + 1}`}
                sizes="(max-width: 1120px) 100vw, 24vw"
                className="prog-pillars__media"
              />
              <div className="prog-pillars__copy">
                <span className="prog-pillars__num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="prog-pillars__title">{pillar.title}</h3>
                <p className="prog-pillars__body">{pillar.body}</p>
                <LoadingLink
                  href={pillar.href}
                  className="button button--secondary"
                  loadingLabel="Opening"
                  style={{ justifySelf: "start" }}
                >
                  Open section
                </LoadingLink>
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      {/* ── Education spotlight ── */}
      <Reveal as="section" className="prog-edu" delay={200}>
        <StockPhoto
          src={stockMedia.educationFeature.src}
          alt={stockMedia.educationFeature.alt}
          label="Education hub"
          sizes="(max-width: 1120px) 100vw, 44vw"
          className="prog-edu__media"
        />
        <div className="prog-edu__content">
          <p className="prog-edu__eyebrow">Education hub</p>
          <h2 className="prog-edu__title">
            Education is now its own working destination, not just a program summary.
          </h2>
          <div className="prog-edu__points">
            <article className="prog-edu__point">
              <h3 className="prog-edu__point-title">What it enables</h3>
              <p className="prog-edu__point-body">
                Books, lessons, coding pathways, facilitator resources, and contributor-submitted
                materials — all searchable and organized into tracks.
              </p>
            </article>
            <article className="prog-edu__point">
              <h3 className="prog-edu__point-title">What it delivers</h3>
              <p className="prog-edu__point-body">
                A practical learning layer that supports publishing, mentorship, cohort delivery,
                and education support flows that grow with the mission.
              </p>
            </article>
          </div>
          <div className="hero-actions">
            <LoadingLink href="/education" className="button button--primary" loadingLabel="Opening">
              Open education hub
            </LoadingLink>
            <LoadingLink href="/education/contribute" className="button button--secondary" loadingLabel="Opening">
              Submit a resource
            </LoadingLink>
          </div>
        </div>
      </Reveal>

      {/* ── Sports spotlight ── */}
      <Reveal as="section" className="prog-sports" delay={270}>
        <div className="prog-sports__lead">
          <p className="prog-sports__eyebrow">Sports development</p>
          <h2 className="prog-sports__title">{sportsSpotlight.title}</h2>
          <p className="prog-sports__body">{sportsSpotlight.summary}</p>
          <div className="prog-sports__facts">
            {[
              { label: "Location", value: sportsSpotlight.location },
              { label: "Reach", value: sportsSpotlight.beneficiaries },
              { label: "Support", value: sportsSpotlight.orphanSupport },
              { label: "Current ask", value: sportsSpotlight.totalRequest }
            ].map((f) => (
              <article key={f.label} className="prog-sports__fact">
                <span className="prog-sports__fact-label">{f.label}</span>
                <span className="prog-sports__fact-value">{f.value}</span>
              </article>
            ))}
          </div>
          <div className="hero-actions">
            <LoadingLink href="/projects/dodoma-best-sports-center" className="button button--primary" loadingLabel="Opening">
              View sports story
            </LoadingLink>
            <LoadingLink href="/donate" className="button button--secondary" loadingLabel="Opening">
              Support this program
            </LoadingLink>
          </div>
        </div>
        <div className="prog-sports__visual">
          <StockPhoto
            src={stockMedia.homeHero.src}
            alt={stockMedia.homeHero.alt}
            label="Youth development"
            ratio="portrait"
            sizes="(max-width: 1120px) 100vw, 40vw"
          />
        </div>
      </Reveal>

      {/* ── Founder + documentary ── */}
      <Reveal as="section" delay={340}>
        <SectionIntro
          eyebrow="Proof in practice"
          title="The people and stories behind the programs."
        />
        <div className="prog-proof">
          <article className="prog-proof__card">
            <p className="prog-proof__eyebrow">Founder profile</p>
            <h3 className="prog-proof__title">{profileSpotlight.name}</h3>
            <p className="prog-proof__role">{profileSpotlight.role}</p>
            <p className="prog-proof__body">{profileSpotlight.summary}</p>
            <LoadingLink href="/about" className="button button--secondary" loadingLabel="Opening" style={{ justifySelf: "start" }}>
              Read full profile
            </LoadingLink>
          </article>
          <article className="prog-proof__card prog-proof__card--dark">
            <p className="prog-proof__eyebrow">{premiumVideoProject.eyebrow}</p>
            <h3 className="prog-proof__title">{premiumVideoProject.title}</h3>
            <p className="prog-proof__body">{premiumVideoProject.teaser}</p>
            <LoadingLink href={`/projects/${premiumVideoProject.slug}`} className="button button--secondary" loadingLabel="Opening" style={{ justifySelf: "start" }}>
              Open screening
            </LoadingLink>
          </article>
        </div>
      </Reveal>
    </main>
  );
}
