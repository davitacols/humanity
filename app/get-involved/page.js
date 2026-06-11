import "./get-involved.css";
import { LoadingLink } from "../../components/LoadingLink";
import { Reveal } from "../../components/Reveal";
import { SupportInquiryForm } from "../../components/SupportInquiryForm";
import { stockMedia } from "../../components/stockMedia";
import { involvementPaths } from "../../components/siteData";
import { getPlatformContentData } from "../../lib/platform-content";
import { StockPhoto } from "../../components/StockPhoto";

export const revalidate = 300;

const routeMeta = [
  { icon: "🤝", accent: "var(--reggae-green)", tag: "Hands-on" },
  { icon: "🏛", accent: "var(--reggae-gold)", tag: "Institutional" },
  { icon: "📦", accent: "var(--reggae-red)", tag: "Creative" },
  { icon: "💡", accent: "var(--reggae-gold)", tag: "Financial" }
];

const impactNumbers = [
  { value: "4", label: "Program pillars accepting support" },
  { value: "6", label: "Contributor roles recognized" },
  { value: "50+", label: "Families reached this quarter" },
  { value: "3", label: "Countries in the network" }
];

export default async function GetInvolvedPage() {
  const { updates } = await getPlatformContentData();
  const latestUpdates = updates.slice(0, 6);

  return (
    <main className="site-main giv-redesign">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <Reveal as="section" className="giv-hero" delay={60}>
        <div className="giv-hero__media">
          <StockPhoto src={stockMedia.getInvolvedHero.src} alt={stockMedia.getInvolvedHero.alt} />
        </div>
        <div className="giv-hero__overlay" />
        <div className="giv-hero__content">
          <span className="giv-hero__eyebrow">Get involved</span>
          <h1 className="giv-hero__title">Your support starts with one clear step.</h1>
          <p className="giv-hero__body">
            Choose a route — volunteer, partner, contribute, or sponsor — and send a single
            request with the context we need to follow up.
          </p>
          <div className="giv-hero__actions">
            <a href="#support-intake" className="button button--primary">Open intake form</a>
            <LoadingLink href="/donate" className="button button--ghost-light" loadingLabel="Opening">Sponsor a program</LoadingLink>
          </div>
        </div>
      </Reveal>

      {/* ── Impact numbers ────────────────────────────────────── */}
      <Reveal as="section" className="giv-metrics" delay={80}>
        {impactNumbers.map((m) => (
          <article key={m.label} className="giv-metrics__card">
            <strong>{m.value}</strong>
            <span>{m.label}</span>
          </article>
        ))}
      </Reveal>

      {/* ── Routes ────────────────────────────────────────────── */}
      <Reveal as="section" className="giv-routes" delay={120}>
        <div className="giv-routes__header">
          <span className="giv-routes__eyebrow">Support routes</span>
          <h2 className="giv-routes__title">Pick the path that matches your role.</h2>
          <p className="giv-routes__body">Each route is designed for a different kind of support. Choose what fits and the form adapts.</p>
        </div>
        <div className="giv-routes__grid">
          {involvementPaths.map((path, i) => (
            <a key={path.title} href="#support-intake" className="giv-routes__card" style={{ "--route-accent": routeMeta[i].accent }}>
              <span className="giv-routes__card-icon">{routeMeta[i].icon}</span>
              <span className="giv-routes__card-tag">{routeMeta[i].tag}</span>
              <h3 className="giv-routes__card-title">{path.title}</h3>
              <p className="giv-routes__card-body">{path.body}</p>
              <span className="giv-routes__card-cta">Select route →</span>
            </a>
          ))}
        </div>
      </Reveal>

      {/* ── Form ──────────────────────────────────────────────── */}
      <Reveal as="section" id="support-intake" className="giv-form" delay={160}>
        <div className="giv-form__intro">
          <span className="giv-form__eyebrow">Support intake</span>
          <h2 className="giv-form__title">One form. The right team follows up.</h2>
          <p className="giv-form__body">
            Tell us who you are, what kind of help you can offer, and where you want to plug in.
            The team replies with the right next step.
          </p>
          <div className="giv-form__features">
            <article className="giv-form__feature">
              <strong>Tracked queue</strong>
              <p>Every request lands in a reviewed queue with contact details, route, timing, and support type.</p>
            </article>
            <article className="giv-form__feature">
              <strong>Fast follow-up</strong>
              <p>The team reviews inquiries weekly and replies with an onboarding note or clarifying question.</p>
            </article>
            <article className="giv-form__feature">
              <strong>Multiple roles</strong>
              <p>Donors, volunteers, creatives, partners, specialists, and sponsors all use one shared intake path.</p>
            </article>
          </div>
        </div>
        <div className="giv-form__shell">
          <SupportInquiryForm variant="involvement" />
        </div>
      </Reveal>

      {/* ── Updates ───────────────────────────────────────────── */}
      <Reveal as="section" className="giv-updates" delay={200}>
        <div className="giv-updates__header">
          <span className="giv-updates__eyebrow">Field updates</span>
          <h2 className="giv-updates__title">Recent stories and contributor activity.</h2>
        </div>
        <div className="giv-updates__grid">
          {latestUpdates.map((update) => (
            <article key={update.title} className="giv-updates__card">
              <div className="giv-updates__card-top">
                <span className="giv-updates__card-cat">{update.category}</span>
                <span className="giv-updates__card-date">{update.date}</span>
              </div>
              <h3 className="giv-updates__card-title">{update.title}</h3>
              <p className="giv-updates__card-body">{update.body}</p>
              {update.href && (
                update.href.startsWith("http") ? (
                  <a href={update.href} target="_blank" rel="noreferrer" className="giv-updates__card-link">{update.ctaLabel || "View"} →</a>
                ) : (
                  <LoadingLink href={update.href} className="giv-updates__card-link" loadingLabel="Opening">{update.ctaLabel || "View"} →</LoadingLink>
                )
              )}
            </article>
          ))}
        </div>
      </Reveal>

      {/* ── Closing CTA ───────────────────────────────────────── */}
      <Reveal as="section" className="giv-closing" delay={260}>
        <div className="giv-closing__inner">
          <span className="giv-closing__eyebrow">Ready?</span>
          <h2 className="giv-closing__title">Choose your route and send the form.</h2>
          <p className="giv-closing__body">
            The intake covers volunteer work, partnerships, sponsorship, resource contribution, and specialist support — all in one place.
          </p>
          <div className="giv-closing__actions">
            <a href="#support-intake" className="button button--primary">Start with the form</a>
            <LoadingLink href="/donate" className="button button--ghost-light" loadingLabel="Opening">Sponsor a program</LoadingLink>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
