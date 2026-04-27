import { LoadingLink } from "../components/LoadingLink";
import { Reveal } from "../components/Reveal";
import { SectionIntro } from "../components/SectionIntro";
import { StockPhoto } from "../components/StockPhoto";
import {
  educationMetrics,
  homeTrustSignals,
  programPillars,
  proofStats,
  sportsSpotlight
} from "../components/siteData";
import { stockMedia } from "../components/stockMedia";

const impactNumbers = [
  { value: "24", label: "Published project notes and field updates" },
  { value: "4", label: "Active program routes" },
  { value: "100+", label: "Children and youth reached" },
  { value: "2", label: "Countries in the network" }
];

const fieldStories = [
  { eyebrow: "Health outreach", title: "Maternal and child health support in focus", body: "Mobile clinic visits, hygiene kits, and follow-up check-ins help mothers and newborns stay connected to practical care.", media: stockMedia.homeStories[0] },
  { eyebrow: "Youth development", title: "Sport creates structure, safety, and belonging", body: "Weekly training sessions and mentorship create a disciplined, positive environment that keeps children engaged.", media: stockMedia.homeStories[1] },
  { eyebrow: "Creative advocacy", title: "Storytelling keeps communities visible", body: "Film, photography, and spoken-word projects help translate local experience into public awareness and sustained support.", media: stockMedia.homeStories[2] }
];

const supportRoutes = [
  { eyebrow: "Donate", title: "Fund practical work", body: "Support health, education, youth development, and creative advocacy.", href: "/donate", label: "Donate now" },
  { eyebrow: "Partner", title: "Collaborate with us", body: "Work on live campaigns, field support, or longer-term programs.", href: "/get-involved", label: "Discuss partnership" },
  { eyebrow: "Volunteer", title: "Give your time", body: "Join events, outreach, and program delivery on the ground.", href: "/get-involved", label: "See routes" },
  { eyebrow: "Contribute", title: "Share expertise", body: "Submit resources, creative work, or technical knowledge.", href: "/education/contribute", label: "Contribute" }
];

const programImages = [stockMedia.educationFeature, stockMedia.homeStories[2], stockMedia.homeStories[0], stockMedia.homeHero];

export default function HomePage() {
  return (
    <main className="site-main hp">
      {/* ── 1. Hero ── */}
      <Reveal as="section" className="about-hero hp-hero-wrap" delay={60}>
        <img src={stockMedia.aboutHero.src} alt={stockMedia.aboutHero.alt} className="about-hero__bg" />
        <div className="about-hero__overlay" />
        <div className="about-hero__content">
          <p className="about-hero__eyebrow">Humanity First Initiative</p>
          <h1 className="about-hero__title">Visibility, dignity, and&nbsp;support for communities on the&nbsp;move.</h1>
          <p className="about-hero__body">
            Connecting local programs, field reporting, and practical ways to help across
            health, education, youth development, and creative advocacy.
          </p>
          <div className="hero-actions">
            <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">Donate now</LoadingLink>
            <LoadingLink href="/projects" className="button button--ghost-light" loadingLabel="Opening">Explore projects</LoadingLink>
          </div>
        </div>
        <div className="about-hero__stats">
          {proofStats.map((s) => (
            <article key={s.label} className="about-hero__stat">
              <p className="about-hero__stat-value">{s.value}</p>
              <p className="about-hero__stat-label">{s.label}</p>
            </article>
          ))}
        </div>
        <div className="hp-hero__scroll" aria-hidden="true"><span /></div>
      </Reveal>

      {/* ── 2. Impact + Trust combined ── */}
      <Reveal as="section" className="hp-section" delay={60}>
        <div className="hp-proof">
          <div className="hp-proof__left">
            <p className="hp-proof__eyebrow">The work so far</p>
            <h2 className="hp-proof__title">Documented needs, honest roles, and visible follow-up.</h2>
            <div className="hp-proof__numbers">
              {impactNumbers.map((n) => (
                <article key={n.label} className="hp-proof__number">
                  <p className="hp-proof__number-value">{n.value}</p>
                  <p className="hp-proof__number-label">{n.label}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="hp-proof__right">
            {homeTrustSignals.map((item, i) => (
              <article key={item.title} className="hp-proof__signal">
                <span className="hp-proof__signal-index">{String(i + 1).padStart(2, "0")}</span>
                <div className="hp-proof__signal-copy">
                  <h3 className="hp-proof__signal-title">{item.title}</h3>
                  <p className="hp-proof__signal-body">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── 3. Spotlight — Dodoma ── */}
      <Reveal as="section" className="hp-section" delay={120}>
        <div className="hp-appeal">
          <div className="hp-appeal__media">
            <StockPhoto src={stockMedia.homeStories[1].src} alt={stockMedia.homeStories[1].alt} label="Field image" ratio="portrait" sizes="(max-width: 1120px) 100vw, 44vw" />
          </div>
          <div className="hp-appeal__copy">
            <p className="hp-appeal__eyebrow">Current appeal</p>
            <h2 className="hp-appeal__title">{sportsSpotlight.title}</h2>
            <p className="hp-appeal__body">{sportsSpotlight.summary}</p>
            <div className="hp-appeal__facts">
              {[
                ["Location", sportsSpotlight.location],
                ["Reach", sportsSpotlight.beneficiaries],
                ["Support", sportsSpotlight.orphanSupport],
                ["Current ask", sportsSpotlight.totalRequest]
              ].map(([label, value]) => (
                <div key={label} className="hp-appeal__fact">
                  <span className="hp-appeal__fact-label">{label}</span>
                  <span className="hp-appeal__fact-value">{value}</span>
                </div>
              ))}
            </div>
            <div className="hero-actions">
              <LoadingLink href="/projects/dodoma-best-sports-center" className="button button--primary" loadingLabel="Opening">Read the full project</LoadingLink>
              <LoadingLink href="/donate" className="button button--secondary" loadingLabel="Opening">Donate to this work</LoadingLink>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── 5. Programs ── */}
      <Reveal as="section" className="hp-section" delay={180}>
        <SectionIntro eyebrow="Program areas" title="Four routes into the work, each with active projects and clear next steps." body="Every program area presents documented needs, practical ways to take part, and visible progress." />
        <div className="hp-programs">
          {programPillars.map((pillar, i) => (
            <article key={pillar.title} className="hp-program">
              <StockPhoto src={programImages[i].src} alt={programImages[i].alt} label={`Route 0${i + 1}`} sizes="(max-width: 1120px) 100vw, 24vw" className="hp-program__media" />
              <div className="hp-program__copy">
                <span className="hp-program__index">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="hp-program__title">{pillar.title}</h3>
                <p className="hp-program__body">{pillar.body}</p>
                <LoadingLink href={pillar.href} className="button button--secondary" loadingLabel="Opening">Explore</LoadingLink>
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      {/* ── 6. Field stories ── */}
      <Reveal as="section" className="hp-section" delay={220}>
        <SectionIntro eyebrow="Stories from the field" title="Field stories keep the mission alive between appeals." body="Stories, learning tools, and field media keep supporters informed while staying rooted in community realities." />
        <div className="hp-stories">
          <article className="hp-stories__featured">
            <StockPhoto src={fieldStories[0].media.src} alt={fieldStories[0].media.alt} label={fieldStories[0].media.label} sizes="(max-width: 1120px) 100vw, 56vw" className="hp-stories__featured-media" />
            <div className="hp-stories__featured-copy">
              <p className="hp-stories__eyebrow">{fieldStories[0].eyebrow}</p>
              <h3 className="hp-stories__featured-title">{fieldStories[0].title}</h3>
              <p className="hp-stories__featured-body">{fieldStories[0].body}</p>
              <LoadingLink href="/health" className="button button--secondary" loadingLabel="Opening">Read more</LoadingLink>
            </div>
          </article>
          <div className="hp-stories__stack">
            {fieldStories.slice(1).map((story) => (
              <article key={story.title} className="hp-stories__card">
                <StockPhoto src={story.media.src} alt={story.media.alt} label={story.media.label} sizes="(max-width: 1120px) 100vw, 40vw" className="hp-stories__card-media" />
                <div className="hp-stories__card-copy">
                  <p className="hp-stories__eyebrow">{story.eyebrow}</p>
                  <h3 className="hp-stories__card-title">{story.title}</h3>
                  <p className="hp-stories__card-body">{story.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── 7. Education feature ── */}
      <Reveal as="section" className="hp-section" delay={260}>
        <div className="hp-edu">
          <StockPhoto src={stockMedia.educationFeature.src} alt={stockMedia.educationFeature.alt} label="Education hub" sizes="(max-width: 1120px) 100vw, 40vw" className="hp-edu__media" />
          <div className="hp-edu__copy">
            <p className="hp-edu__eyebrow">Education route</p>
            <h3 className="hp-edu__title">Learning resources organized for phones, classrooms, and facilitators.</h3>
            <p className="hp-edu__body">Teachers, mentors, and volunteers can access practical tools, external lessons, and downloadable guides through the education hub.</p>
            <div className="hp-edu__metrics">
              {educationMetrics.slice(0, 4).map((m) => (
                <span key={m.label} className="hp-edu__metric"><strong>{m.value}</strong> {m.label}</span>
              ))}
            </div>
            <LoadingLink href="/education" className="button button--primary" loadingLabel="Opening">Visit education hub</LoadingLink>
          </div>
        </div>
      </Reveal>

      {/* ── 8. Support CTA ── */}
      <Reveal as="section" className="hp-section" delay={300}>
        <div className="hp-cta">
          <div className="hp-cta__lead">
            <p className="hp-cta__eyebrow">Support the movement</p>
            <h2 className="hp-cta__title">Choose the role that fits your capacity.</h2>
            <p className="hp-cta__body">Whether someone gives, partners, volunteers, or contributes expertise, the next step should be clear, practical, and easy to act on.</p>
          </div>
          <div className="hp-cta__grid">
            {supportRoutes.map((route) => (
              <article key={route.title} className="hp-cta__card">
                <p className="hp-cta__card-eyebrow">{route.eyebrow}</p>
                <h3 className="hp-cta__card-title">{route.title}</h3>
                <p className="hp-cta__card-body">{route.body}</p>
                <LoadingLink href={route.href} className="button button--secondary" loadingLabel="Opening">{route.label}</LoadingLink>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </main>
  );
}
