import { LoadingLink } from "../../components/LoadingLink";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { StockPhoto } from "../../components/StockPhoto";

const profileMedia = {
  hero: { src: "/profile/chidozie-portrait.jpeg", alt: "Ikokwu Chidozie Ikemba in a white traditional outfit during a public event.", label: "Profile portrait", ratio: "portrait" },
  group: { src: "/profile/chidozie-group.jpeg", alt: "Ikokwu Chidozie Ikemba standing with international attendees at a circular economy event.", label: "Collaboration in practice" },
  event: { src: "/profile/chidozie-event.jpeg", alt: "A conference stage during Nigeria Circular Economy Week.", label: "Public event setting" }
};

const professionalArc = [
  {
    year: "Foundation",
    title: "Psychology as the base for communication and leadership",
    body: "Training in psychology at Obafemi Awolowo University informs how he understands institutions, audiences, behavior, and public narratives across governance, culture, and development work.",
    accent: "coral"
  },
  {
    year: "Media",
    title: "Journalism and public communication built around civic relevance",
    body: "Digital journalism and strategic communication contributing to national conversations on governance, civic engagement, and economic policy through commentary, editorial framing, and public-facing advocacy.",
    accent: "gold"
  },
  {
    year: "Enterprise",
    title: "Waste recovery and recycling innovation linked to climate growth",
    body: "As CEO of Rehoboth Waste Management Services, he leads initiatives focused on waste recovery, recycling innovation, and carbon-conscious environmental solutions across Nigeria.",
    accent: "leaf"
  }
];

const collaborationAreas = [
  { title: "Strategic communication", body: "Narrative development, editorial framing, public messaging, documentary projects, and socio-political commentary." },
  { title: "Creative direction", body: "Concept building for campaigns, educational media, and collaboration with filmmakers, artists, and educators." },
  { title: "Sustainability advocacy", body: "Advisory and project support for waste management systems, recycling initiatives, and environmental education." },
  { title: "Policy and impact", body: "Cross-sector strategy for civic engagement, youth empowerment, and sustainability-focused development partnerships." }
];

const philosophyValues = [
  { title: "Storytelling with purpose", body: "Narratives as tools for public understanding and social impact rather than surface-level publicity." },
  { title: "Systems-first thinking", body: "Governance, culture, sustainability, and communication approached as connected systems that shape how people live and respond." },
  { title: "African context, global relevance", body: "Work grounded in African realities while remaining relevant to international partners, policy conversations, and development collaborations." },
  { title: "Practical social impact", body: "Ideas are strongest when they become useful structures, campaigns, enterprises, and partnerships that solve visible public problems." }
];

const bioTags = [
  "Psychology", "Strategic communication", "Journalism",
  "Sustainability", "Circular economy", "Creative storytelling"
];

export const metadata = {
  title: "About | Ikokwu Chidozie Ikemba",
  description: "Profile of Ikokwu Chidozie Ikemba — psychologist, strategist, media practitioner, and environmental entrepreneur."
};

export default function AboutPage() {
  return (
    <main className="site-main about-page">
      {/* ── Hero ── */}
      <Reveal as="section" className="about-hero" delay={60}>
        <div className="about-hero__portrait">
          <StockPhoto
            src={profileMedia.hero.src}
            alt={profileMedia.hero.alt}
            label={profileMedia.hero.label}
            ratio="portrait"
            priority
            sizes="(max-width: 1120px) 100vw, 38vw"
          />
        </div>
        <div className="about-hero__content">
          <p className="about-hero__eyebrow">About the founder</p>
          <h1 className="about-hero__name">Ikokwu Chidozie Ikemba</h1>
          <p className="about-hero__role">
            Psychologist · Strategist · Media practitioner · Environmental entrepreneur
          </p>
          <p className="about-hero__body">
            Working at the intersection of governance, culture, sustainability, and public
            communication — building collaborations that connect storytelling, systems thinking,
            and social impact across Africa and beyond.
          </p>
          <div className="about-hero__tags">
            {bioTags.map((t) => (
              <span key={t} className="about-hero__tag">{t}</span>
            ))}
          </div>
          <div className="hero-actions">
            <LoadingLink href="/get-involved" className="button button--primary" loadingLabel="Opening">
              Start a conversation
            </LoadingLink>
            <LoadingLink href="/programs" className="button button--secondary" loadingLabel="Opening">
              Explore work areas
            </LoadingLink>
          </div>
        </div>
      </Reveal>

      {/* ── Overview band ── */}
      <Reveal as="section" className="about-overview" delay={120}>
        <div className="about-overview__lead">
          <h2 className="about-overview__title">
            A career built across media, policy, creative production, and environmental leadership.
          </h2>
          <p className="about-overview__body">
            Over the years, Chidozie has contributed to national conversations through media
            commentary, public advocacy, and strategic communication focused on governance,
            civic engagement, and economic policy. He also works with organizations seeking
            sharper communication and culturally grounded market engagement across Africa.
          </p>
          <blockquote className="about-overview__quote">
            His professional philosophy blends storytelling, systems thinking, and social impact
            to create solutions that are culturally grounded and globally relevant.
          </blockquote>
        </div>
        <div className="about-overview__facts">
          {[
            { label: "Current enterprise", value: "CEO, Rehoboth Waste Management Services" },
            { label: "Education", value: "Obafemi Awolowo University — Psychology" },
            { label: "Focus areas", value: "Governance, sustainability, creative production" },
            { label: "Reach", value: "Nigeria-based, Africa-facing, globally relevant" }
          ].map((f) => (
            <article key={f.label} className="about-overview__fact">
              <span className="about-overview__fact-label">{f.label}</span>
              <span className="about-overview__fact-value">{f.value}</span>
            </article>
          ))}
          <div className="hero-actions">
            <a href="https://www.rwms.ng" target="_blank" rel="noreferrer" className="button button--primary">
              Visit RWMS
            </a>
            <LoadingLink href="/get-involved" className="button button--secondary" loadingLabel="Opening">
              Discuss collaboration
            </LoadingLink>
          </div>
        </div>
      </Reveal>

      {/* ── Professional arc (timeline) ── */}
      <Reveal as="section" delay={180}>
        <SectionIntro
          eyebrow="Professional arc"
          title="A multidisciplinary path shaped by psychology, public affairs, and sustainability."
          body="These milestones show how the work moves between people, institutions, narratives, and climate-conscious enterprise."
        />
        <div className="about-timeline">
          {professionalArc.map((item, i) => (
            <article key={item.title} className={`about-timeline__item about-timeline__item--${item.accent}`}>
              <div className="about-timeline__marker">
                <span className="about-timeline__dot" />
                {i < professionalArc.length - 1 && <span className="about-timeline__line" />}
              </div>
              <div className="about-timeline__content">
                <span className="about-timeline__year">{item.year}</span>
                <h3 className="about-timeline__title">{item.title}</h3>
                <p className="about-timeline__body">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      {/* ── Gallery ── */}
      <Reveal as="section" delay={240}>
        <SectionIntro
          eyebrow="In the field"
          title="Images that ground the profile in real public and partnership settings."
        />
        <div className="about-gallery">
          <StockPhoto src={profileMedia.group.src} alt={profileMedia.group.alt} label={profileMedia.group.label} sizes="(max-width: 1120px) 100vw, 58vw" className="about-gallery__wide" />
          <StockPhoto src={profileMedia.event.src} alt={profileMedia.event.alt} label={profileMedia.event.label} sizes="(max-width: 1120px) 100vw, 38vw" className="about-gallery__tall" />
        </div>
      </Reveal>

      {/* ── Collaboration areas ── */}
      <Reveal as="section" delay={300}>
        <SectionIntro
          eyebrow="Services and collaboration"
          title="Partnership areas for institutions, development actors, and creative teams."
          body="These workstreams translate Chidozie's background into concrete areas for collaboration."
        />
        <div className="about-collab">
          {collaborationAreas.map((area, i) => (
            <article key={area.title} className="about-collab__card">
              <span className="about-collab__num">{String(i + 1).padStart(2, "0")}</span>
              <div className="about-collab__copy">
                <h3 className="about-collab__title">{area.title}</h3>
                <p className="about-collab__body">{area.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      {/* ── Philosophy ── */}
      <Reveal as="section" className="about-philosophy" delay={360}>
        <div className="about-philosophy__intro">
          <p className="about-philosophy__eyebrow">Professional philosophy</p>
          <h2 className="about-philosophy__title">
            Principles that keep impact useful, credible, and culturally grounded.
          </h2>
        </div>
        <ol className="about-philosophy__list">
          {philosophyValues.map((v) => (
            <li key={v.title} className="about-philosophy__item">
              <h3 className="about-philosophy__item-title">{v.title}</h3>
              <p className="about-philosophy__item-body">{v.body}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* ── CTA ── */}
      <Reveal as="section" className="about-cta" delay={420}>
        <h2 className="about-cta__title">
          Open to collaborations with organizations, policy platforms, and creative teams.
        </h2>
        <p className="about-cta__body">
          If your work touches governance, sustainability, public communication, or community
          development in Africa, there is likely a useful overlap.
        </p>
        <div className="hero-actions">
          <LoadingLink href="/get-involved" className="button button--primary" loadingLabel="Opening">
            Start a conversation
          </LoadingLink>
          <a href="https://www.rwms.ng" target="_blank" rel="noreferrer" className="button button--secondary">
            Visit RWMS
          </a>
        </div>
      </Reveal>
    </main>
  );
}
