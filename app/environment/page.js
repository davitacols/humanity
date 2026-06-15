import { LoadingLink } from "../../components/LoadingLink";
import { Reveal } from "../../components/Reveal";
import { stockMedia } from "../../components/stockMedia";
import "./environment.css";

export const metadata = {
  title: "Environment & Climate",
  description:
    "The Green Communities Initiative is a youth-led climate action and environmental resilience program — tree planting, green schools, plastic-free campaigns, and climate education across underserved communities."
};

const heroStats = [
  { value: "10,000", label: "indigenous trees to plant & nurture" },
  { value: "5,000+", label: "young people reached with climate education" },
  { value: "20t", label: "waste targeted for recovery" },
  { value: "500", label: "youth climate ambassadors trained" }
];

const objectives = [
  "Plant and nurture indigenous trees to improve biodiversity and carbon sequestration.",
  "Promote environmental stewardship among young people through climate education.",
  "Reduce plastic and solid-waste pollution through community cleanup campaigns.",
  "Establish community green spaces and mini urban forests.",
  "Build local capacity for climate adaptation and environmental resilience.",
  "Create opportunities for youth leadership and volunteerism in sustainability."
];

const activities = [
  {
    title: "Community Tree Planting Campaign",
    points: [
      "Plant 10,000 indigenous trees across participating communities.",
      "Establish “Adopt-a-Tree” monitoring groups.",
      "Engage schools and youth volunteers in tree maintenance."
    ]
  },
  {
    title: "Green Schools Program",
    points: [
      "Environmental clubs in schools.",
      "Climate literacy workshops.",
      "School garden development.",
      "Sustainability competitions and innovation challenges."
    ]
  },
  {
    title: "Plastic-Free Communities Campaign",
    points: [
      "Monthly environmental sanitation exercises.",
      "Plastic collection and recycling drives.",
      "Community awareness outreaches.",
      "Waste segregation demonstrations."
    ]
  },
  {
    title: "Community Climate Education",
    points: [
      "Climate change awareness sessions.",
      "Flood prevention and adaptation workshops.",
      "Environmental leadership training.",
      "Community dialogues on sustainable living."
    ]
  },
  {
    title: "Green Innovation Challenge",
    points: [
      "Support youth-led environmental solutions.",
      "Small grants for innovative climate projects.",
      "Mentorship from environmental professionals.",
      "Showcase events for contributors and sponsors."
    ]
  }
];

const impact = [
  { value: "5,000+", label: "young people reached with climate education" },
  { value: "10,000", label: "trees planted and sustained" },
  { value: "20+ tonnes", label: "of waste removed from communities" },
  { value: "500", label: "youth climate ambassadors trained" }
];

const sdgs = [
  { num: "3", label: "Good Health & Well-being" },
  { num: "4", label: "Quality Education" },
  { num: "11", label: "Sustainable Cities & Communities" },
  { num: "13", label: "Climate Action" },
  { num: "15", label: "Life on Land" }
];

export default function EnvironmentPage() {
  return (
    <main className="site-main env">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <Reveal as="section" className="env-hero" delay={60}>
        <img src={stockMedia.aboutHero.src} alt={stockMedia.aboutHero.alt} className="env-hero__bg" />
        <div className="env-hero__overlay" />
        <div className="env-hero__content">
          <p className="env-hero__eyebrow">Green Communities Initiative</p>
          <h1 className="env-hero__title">Youth-led climate action for resilient communities.</h1>
          <p className="env-hero__lead">
            A community-based environmental program that empowers young people, schools, and local
            stakeholders to take practical action against environmental degradation — through tree
            planting, environmental education, waste recovery, urban greening, and climate awareness.
          </p>
          <div className="env-hero__actions">
            <LoadingLink href="/donate?fund=green-communities#live-checkout" className="button button--primary" loadingLabel="Opening">
              Become a Green Communities partner
            </LoadingLink>
            <LoadingLink href="/get-involved" className="button button--ghost-light" loadingLabel="Opening">
              Volunteer or partner
            </LoadingLink>
          </div>
        </div>
        <div className="env-hero__stats" aria-label="First-year targets">
          {heroStats.map((stat) => (
            <article key={stat.label} className="env-stat">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </Reveal>

      {/* ── Overview + challenge ──────────────────────────────── */}
      <Reveal as="section" className="env-section env-overview" delay={110}>
        <div className="env-overview__copy">
          <span className="env-kicker">The program</span>
          <h2 className="env-heading">Grassroots action that builds healthier, greener communities.</h2>
          <p className="env-body">
            The Green Communities Initiative transforms underserved communities through tree planting,
            environmental education, waste recovery campaigns, urban greening, and climate awareness.
            By combining grassroots action with community participation, it contributes to healthier
            environments, improved public awareness, and sustainable livelihoods.
          </p>
        </div>
        <aside className="env-challenge">
          <span className="env-challenge__label">The challenge</span>
          <p>
            Across many African communities, indiscriminate waste disposal, deforestation, flooding,
            plastic pollution, and limited climate awareness threaten public health, livelihoods, and
            sustainable development.
          </p>
          <p className="env-challenge__accent">
            Young people are among the most affected — yet they remain one of the most powerful forces
            for climate action and community transformation.
          </p>
        </aside>
      </Reveal>

      {/* ── Objectives ────────────────────────────────────────── */}
      <Reveal as="section" className="env-section" delay={140}>
        <div className="env-section__head">
          <span className="env-kicker">Objectives</span>
          <h2 className="env-heading">What the program sets out to achieve.</h2>
        </div>
        <ul className="env-objectives">
          {objectives.map((item, i) => (
            <li key={item} className="env-objective">
              <span className="env-objective__num">{String(i + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* ── Key activities ────────────────────────────────────── */}
      <Reveal as="section" className="env-section" delay={170}>
        <div className="env-section__head">
          <span className="env-kicker">Key activities</span>
          <h2 className="env-heading">Five connected lines of action.</h2>
          <p className="env-section__sub">
            Each activity engages youth, schools, and community members directly — turning awareness
            into measurable, on-the-ground change.
          </p>
        </div>
        <div className="env-activities">
          {activities.map((activity, i) => (
            <article key={activity.title} className="env-activity">
              <span className="env-activity__num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="env-activity__title">{activity.title}</h3>
              <ul className="env-activity__list">
                {activity.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Reveal>

      {/* ── Expected impact ───────────────────────────────────── */}
      <Reveal as="section" className="env-section" delay={200}>
        <div className="env-section__head">
          <span className="env-kicker">Expected impact</span>
          <h2 className="env-heading">First-year targets.</h2>
        </div>
        <div className="env-impact">
          {impact.map((item) => (
            <article key={item.label} className="env-impact__card">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
        <p className="env-impact__note">
          Plus environmental clubs established in participating schools — building greener, healthier,
          and more climate-resilient communities.
        </p>
      </Reveal>

      {/* ── SDG alignment ─────────────────────────────────────── */}
      <Reveal as="section" className="env-section" delay={220}>
        <div className="env-section__head">
          <span className="env-kicker">Global alignment</span>
          <h2 className="env-heading">Advancing five UN Sustainable Development Goals.</h2>
        </div>
        <ul className="env-sdgs">
          {sdgs.map((sdg) => (
            <li key={sdg.num} className="env-sdg">
              <span className="env-sdg__num">SDG {sdg.num}</span>
              <span className="env-sdg__label">{sdg.label}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* ── Contributor CTA ───────────────────────────────────── */}
      <Reveal as="section" className="env-section" delay={250}>
        <div className="env-cta">
          <span className="env-cta__kicker">Become a Green Communities partner</span>
          <h2 className="env-cta__title">Plant hope. Restore ecosystems. Empower youth.</h2>
          <p className="env-cta__body">
            Whether you are an individual donor, corporate organization, environmental advocate,
            researcher, volunteer, or development partner, your support helps create sustainable
            communities where people and nature thrive together.
          </p>
          <div className="env-cta__actions">
            <LoadingLink href="/donate?fund=green-communities#live-checkout" className="button button--primary" loadingLabel="Opening">
              Support this program
            </LoadingLink>
            <LoadingLink href="/get-involved" className="button button--ghost-light" loadingLabel="Opening">
              Partner with us
            </LoadingLink>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
