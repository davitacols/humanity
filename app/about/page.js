import "./about.css";
import { LoadingLink } from "../../components/LoadingLink";
import { Reveal } from "../../components/Reveal";
import { StockPhoto } from "../../components/StockPhoto";
import { programPillars } from "../../components/siteData";
import { stockMedia } from "../../components/stockMedia";

export const revalidate = 300;

const operatingModel = [
  { title: "Listen first", body: "Needs are shaped around real families, learners, caregivers, and local partners before support is structured." },
  { title: "Document clearly", body: "Program pages and project stories give visitors enough context to understand what is happening and why support matters." },
  { title: "Mobilize support", body: "Donors, volunteers, sponsors, and partners are guided toward specific health, education, sports, arts, or partnership routes." },
  { title: "Stay visible", body: "Updates, transparency pages, and contributor profiles help supporters follow the people and programs behind each request." }
];

const trustPrinciples = [
  { title: "People before sectors", body: "Education, arts, health, and sports are presented through the communities they serve — not as abstract departments." },
  { title: "Proof before promotion", body: "Field updates, needs, and context come before donation appeals. Supporters review work before committing." },
  { title: "Dignity in storytelling", body: "Stories present people with care and agency, avoiding language that reduces communities to hardship." },
  { title: "Honest collaboration", body: "Profiles and partners are named for the role they play so visitors understand the network clearly." }
];

const milestones = [
  { value: "4", label: "Program routes" },
  { value: "3", label: "Countries represented" },
  { value: "50+", label: "Families reached" },
  { value: "100", label: "Youth enrolled" }
];

export const metadata = {
  title: "About the Initiative",
  description: "The mission, program standards, and support pathways behind Humanity First Initiative."
};

export default function AboutPage() {
  return (
    <main className="site-main abt">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <Reveal as="section" className="abt-hero" delay={60}>
        <div className="abt-hero__media">
          <StockPhoto src={stockMedia.aboutHero.src} alt={stockMedia.aboutHero.alt} />
        </div>
        <div className="abt-hero__overlay" />
        <div className="abt-hero__content">
          <span className="abt-hero__eyebrow">About Humanity First Initiative</span>
          <h1 className="abt-hero__title">People. Proof. Practical support.</h1>
          <p className="abt-hero__body">
            Community projects, health outreach, education access, youth sports, and creative
            advocacy — in one clear public home so supporters understand the needs, the people,
            and the next step.
          </p>
          <div className="abt-hero__actions">
            <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">Support the work</LoadingLink>
            <LoadingLink href="/get-involved" className="button button--ghost-light" loadingLabel="Opening">Partner with us</LoadingLink>
          </div>
        </div>
      </Reveal>

      {/* ── Milestones ────────────────────────────────────────── */}
      <Reveal as="section" className="abt-milestones" delay={80}>
        {milestones.map((m) => (
          <article key={m.label} className="abt-milestones__card">
            <strong>{m.value}</strong>
            <span>{m.label}</span>
          </article>
        ))}
      </Reveal>

      {/* ── Mission ───────────────────────────────────────────── */}
      <Reveal as="section" className="abt-section" delay={120}>
        <div className="abt-mission">
          <div className="abt-mission__copy">
            <span className="abt-eyebrow">Our mission</span>
            <h2 className="abt-heading">Humanitarian work becomes easier to support when the need, route, and next step are clear.</h2>
            <p className="abt-body">
              Humanity First Initiative connects each public need to a program route, a support
              pathway, and a field update — so education, health, sports, and creative advocacy
              serve real communities.
            </p>
            <div className="abt-mission__steps">
              {operatingModel.map((item, i) => (
                <article key={item.title} className="abt-mission__step">
                  <span className="abt-mission__step-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="abt-mission__visual">
            <StockPhoto src={stockMedia.aboutMission.src} alt={stockMedia.aboutMission.alt} label="Community life" ratio="portrait" sizes="(max-width: 1080px) 100vw, 40vw" />
          </div>
        </div>
      </Reveal>

      {/* ── Programs ──────────────────────────────────────────── */}
      <Reveal as="section" className="abt-section" delay={160}>
        <span className="abt-eyebrow">Program routes</span>
        <h2 className="abt-heading">Four visible routes where support becomes understandable.</h2>
        <p className="abt-body">These are the public routes where donors, partners, and volunteers choose a clear path.</p>
        <div className="abt-programs">
          {programPillars.map((pillar, i) => (
            <LoadingLink key={pillar.title} href={pillar.href} className="abt-programs__card" loadingLabel="Opening">
              <span className="abt-programs__card-num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="abt-programs__card-title">{pillar.title}</h3>
              <p className="abt-programs__card-body">{pillar.body}</p>
              <span className="abt-programs__card-cta">Explore →</span>
            </LoadingLink>
          ))}
        </div>
      </Reveal>

      {/* ── Principles ────────────────────────────────────────── */}
      <Reveal as="section" className="abt-section" delay={200}>
        <span className="abt-eyebrow">Operating standards</span>
        <h2 className="abt-heading">Trust is built through specifics, not slogans.</h2>
        <div className="abt-principles">
          {trustPrinciples.map((item) => (
            <article key={item.title} className="abt-principles__card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <Reveal as="section" className="abt-section" delay={240}>
        <div className="abt-cta">
          <span className="abt-cta__eyebrow">Next step</span>
          <h2 className="abt-cta__title">Fund a program, partner on delivery, or review the work first.</h2>
          <p className="abt-cta__body">
            The next step depends on your role: donor, field partner, sponsor, creative contributor,
            school, NGO, or first-time supporter.
          </p>
          <div className="abt-cta__actions">
            <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">Donate now</LoadingLink>
            <LoadingLink href="/get-involved" className="button button--ghost-light" loadingLabel="Opening">Get involved</LoadingLink>
            <LoadingLink href="/team" className="button button--ghost-light" loadingLabel="Opening">Meet the team</LoadingLink>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
