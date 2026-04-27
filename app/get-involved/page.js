import { LoadingLink } from "../../components/LoadingLink";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { SupportInquiryForm } from "../../components/SupportInquiryForm";
import { stockMedia } from "../../components/stockMedia";
import { involvementPaths } from "../../components/siteData";
import { getPlatformContentData } from "../../lib/platform-content";

export const revalidate = 300;

const routeIcons = ["🤝", "🏛", "📦", "💡"];

export default async function GetInvolvedPage() {
  const { updates } = await getPlatformContentData();
  const latestUpdates = updates.slice(0, 4);

  return (
    <main className="site-main giv">
      {/* Hero */}
      <Reveal as="section" className="about-hero" delay={60}>
        <img src={stockMedia.getInvolvedHero.src} alt={stockMedia.getInvolvedHero.alt} className="about-hero__bg" />
        <div className="about-hero__overlay" />
        <div className="about-hero__content">
          <p className="about-hero__eyebrow">Get involved</p>
          <h1 className="about-hero__title">Turn interest into action with a clear intake path.</h1>
          <p className="about-hero__body">
            Volunteers, partners, sponsors, and contributors can choose a route and send one
            request with the context the team needs for follow-up.
          </p>
          <div className="hero-actions">
            <a href="#support-intake" className="button button--primary">Open support form</a>
            <LoadingLink href="/donate" className="button button--ghost-light" loadingLabel="Opening">Sponsor a program</LoadingLink>
          </div>
        </div>
        <div className="about-hero__stats">
          <article className="about-hero__stat">
            <p className="about-hero__stat-value">{involvementPaths.length}</p>
            <p className="about-hero__stat-label">support routes</p>
          </article>
          <article className="about-hero__stat">
            <p className="about-hero__stat-value">1</p>
            <p className="about-hero__stat-label">shared intake form</p>
          </article>
          <article className="about-hero__stat">
            <p className="about-hero__stat-value">{latestUpdates.length}</p>
            <p className="about-hero__stat-label">recent updates</p>
          </article>
        </div>
      </Reveal>

      {/* Routes */}
      <Reveal as="section" className="giv__section" delay={100}>
        <SectionIntro eyebrow="Choose how you want to help" title="Volunteer, partner, contribute, or sponsor a program route." body="Choose the path that matches your role before sending the intake form." />
        <div className="giv__routes">
          {involvementPaths.map((path, i) => (
            <a key={path.title} href="#support-intake" className="giv__route">
              <span className="giv__route-icon">{routeIcons[i]}</span>
              <h3 className="giv__route-title">{path.title}</h3>
              <p className="giv__route-body">{path.body}</p>
              <span className="giv__route-action">Select this route →</span>
            </a>
          ))}
        </div>
      </Reveal>

      {/* Form */}
      <Reveal as="section" id="support-intake" className="giv__section" delay={160}>
        <div className="giv__form-layout">
          <div className="giv__form-intro">
            <SectionIntro eyebrow="Support intake" title="Send one clear request so the right team can follow up." body="The form captures your role, support area, availability, and message so the team can reply with the right next step." />
            <div className="giv__form-notes">
              <article className="giv__form-note">
                <h4>One shared route</h4>
                <p>The form captures who you are, what kind of help you can offer, and where you want to plug in.</p>
              </article>
              <article className="giv__form-note">
                <h4>Reviewable queue</h4>
                <p>Every request lands in a tracked queue with contact details, route interest, timing, and support type.</p>
              </article>
            </div>
            <LoadingLink href="/education/contribute" className="button button--secondary" loadingLabel="Opening">Open contributor form</LoadingLink>
          </div>
          <div className="giv__form-shell">
            <SupportInquiryForm variant="involvement" />
          </div>
        </div>
      </Reveal>

      {/* Updates */}
      <Reveal as="section" className="giv__section" delay={220}>
        <SectionIntro eyebrow="Latest updates" title="Recent field stories and contributor activity." body="Review the latest notes before offering support, sponsorship, creative help, or partnership." />
        <div className="giv__updates">
          {latestUpdates.map((update) => (
            <article key={update.title} className="giv__update">
              <div className="giv__update-top">
                <span className="giv__update-cat">{update.category}</span>
                <span className="giv__update-date">{update.date}</span>
              </div>
              <h3 className="giv__update-title">{update.title}</h3>
              <p className="giv__update-body">{update.body}</p>
              {update.href && (
                update.href.startsWith("http") ? (
                  <a href={update.href} target="_blank" rel="noreferrer" className="giv__update-link">{update.ctaLabel || "View"} →</a>
                ) : (
                  <LoadingLink href={update.href} className="giv__update-link" loadingLabel="Opening">{update.ctaLabel || "View"} →</LoadingLink>
                )
              )}
            </article>
          ))}
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section" className="giv__section" delay={280}>
        <div className="giv__cta">
          <div className="giv__cta-copy">
            <p className="giv__cta-eyebrow">Need a simple next step?</p>
            <h2 className="giv__cta-title">Send the form and choose the route closest to your support.</h2>
            <p className="giv__cta-body">The intake route covers volunteer work, partnership offers, sponsorship, resource contribution, and specialist support.</p>
          </div>
          <div className="hero-actions">
            <a href="#support-intake" className="button button--primary">Start with the form</a>
            <LoadingLink href="/donate" className="button button--ghost-light" loadingLabel="Opening">Sponsor a program</LoadingLink>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
