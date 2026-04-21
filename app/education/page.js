import { EducationLibrary } from "../../components/EducationLibrary";
import { LoadingLink } from "../../components/LoadingLink";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { StockPhoto } from "../../components/StockPhoto";
import { stockMedia } from "../../components/stockMedia";
import { getEducationHubData } from "../../lib/education";

export const revalidate = 300;

export default async function EducationPage() {
  const { actions, libraryItems, metrics, sessions, tracks } = await getEducationHubData();
  const featured = libraryItems.slice(0, 3);

  return (
    <main className="site-main edu-page">
      {/* ── Hero ── */}
      <Reveal as="section" className="edu-hero" delay={60}>
        <div className="edu-hero__content">
          <p className="edu-hero__eyebrow">Education hub</p>
          <h1 className="edu-hero__title">
            Books, lessons, coding pathways, and community-ready teaching resources.
          </h1>
          <p className="edu-hero__body">
            A practical library for learners, educators, and community mentors — designed for
            phones, classrooms, and low-bandwidth settings.
          </p>
          <div className="hero-actions">
            <LoadingLink href="/education/contribute" className="button button--primary" loadingLabel="Opening">
              Contribute resources
            </LoadingLink>
            <LoadingLink href="/donate" className="button button--secondary" loadingLabel="Opening">
              Support a learning cohort
            </LoadingLink>
          </div>
        </div>
        <div className="edu-hero__visual">
          <StockPhoto
            src={stockMedia.educationFeature.src}
            alt={stockMedia.educationFeature.alt}
            label="Education access"
            priority
            sizes="(max-width: 1120px) 100vw, 44vw"
            className="edu-hero__photo"
          />
        </div>
      </Reveal>

      {/* ── Metrics bar ── */}
      <Reveal as="section" className="edu-metrics" delay={110}>
        {metrics.map((m) => (
          <article key={m.label} className="edu-metrics__item">
            <span className="edu-metrics__value">{m.value}</span>
            <span className="edu-metrics__label">{m.label}</span>
          </article>
        ))}
      </Reveal>

      {/* ── How it works ── */}
      <Reveal as="section" className="edu-how" delay={160}>
        <div className="edu-how__intro">
          <p className="edu-how__eyebrow">How the hub works</p>
          <h2 className="edu-how__title">Intake, review, publish, and reuse.</h2>
          <p className="edu-how__body">
            Resources are reviewed first, then organized into tracks and delivered through
            workshops, cohorts, and mentor-led sessions. Communities always know where to start.
          </p>
        </div>
        <div className="edu-how__steps">
          {[
            { num: "01", title: "Submit", body: "Educators and contributors share books, lessons, and toolkits through the intake form." },
            { num: "02", title: "Review", body: "The team checks quality, relevance, audience fit, and permissions before anything goes live." },
            { num: "03", title: "Publish", body: "Approved resources are organized into tracks and the searchable library." },
            { num: "04", title: "Deliver", body: "Workshops, cohorts, and mentors use the materials in real community settings." }
          ].map((step) => (
            <article key={step.num} className="edu-how__step">
              <span className="edu-how__step-num">{step.num}</span>
              <h3 className="edu-how__step-title">{step.title}</h3>
              <p className="edu-how__step-body">{step.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* ── Featured resources ── */}
      <Reveal as="section" delay={210}>
        <SectionIntro
          eyebrow="Start here"
          title="Three high-impact resources ready for community use."
          body="Designed for immediate use in workshops, schools, and mentor-led sessions."
        />
        <div className="edu-featured">
          {featured.map((item, i) => (
            <article key={item.title} className={`edu-featured__card${i === 0 ? " edu-featured__card--primary" : ""}`}>
              <div className="edu-featured__meta">
                <span className="edu-featured__tag">{item.category}</span>
                <span className="edu-featured__format">{item.format}</span>
              </div>
              <h3 className="edu-featured__title">{item.title}</h3>
              <p className="edu-featured__body">{item.summary}</p>
              <div className="edu-featured__footer">
                <span className="edu-featured__level">{item.level}</span>
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="button button--secondary"
                  style={{ justifySelf: "start" }}
                >
                  {item.actionLabel || item.action_label}
                </a>
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      {/* ── Learning tracks ── */}
      <Reveal as="section" delay={260}>
        <SectionIntro
          eyebrow="Learning tracks"
          title="Clear pathways instead of one long resource list."
          body="Tracks guide learners into the right starting point."
        />
        <div className="edu-tracks">
          {tracks.map((track, i) => (
            <article key={track.title} className="edu-tracks__card">
              <div className="edu-tracks__header">
                <span className="edu-tracks__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="edu-tracks__eyebrow">{track.eyebrow}</span>
              </div>
              <h3 className="edu-tracks__title">{track.title}</h3>
              <p className="edu-tracks__body">{track.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* ── Full library ── */}
      <Reveal as="section" delay={310}>
        <SectionIntro
          eyebrow="Resource library"
          title="Downloads, lessons, and teaching kits in one explorer."
          body="Search, filter, and open resources quickly with clear tags, formats, and learner levels."
        />
        <EducationLibrary items={libraryItems} />
      </Reveal>

      {/* ── Sessions ── */}
      <Reveal as="section" delay={360}>
        <SectionIntro
          eyebrow="Cohorts and workshops"
          title="Sessions that turn resources into learning."
          body="Live sessions, mentor-led cohorts, and repeat workshops that keep learners engaged."
        />
        <div className="edu-sessions">
          {sessions.map((item) => (
            <article key={item.title} className="edu-sessions__card">
              <span className="edu-sessions__eyebrow">{item.eyebrow}</span>
              <h3 className="edu-sessions__title">{item.title}</h3>
              <p className="edu-sessions__body">{item.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* ── Support + CTA ── */}
      <Reveal as="section" delay={410}>
        <div className="edu-support">
          {actions.map((action) => (
            <article key={action.title} className="edu-support__card">
              <span className="edu-support__eyebrow">Ways to support</span>
              <h3 className="edu-support__title">{action.title}</h3>
              <p className="edu-support__body">{action.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="edu-cta" delay={460}>
        <div className="edu-cta__text">
          <h2 className="edu-cta__title">
            Resources, cohorts, and community-led learning in one hub.
          </h2>
          <p className="edu-cta__body">
            Guided resources, lesson collections, and contributor workflows for learners,
            facilitators, and partner-led education programs.
          </p>
        </div>
        <div className="edu-cta__actions">
          <LoadingLink href="/education/contribute" className="button button--primary" loadingLabel="Opening">
            Open contributor form
          </LoadingLink>
          <LoadingLink href="/programs" className="button button--secondary" loadingLabel="Opening">
            Back to programs
          </LoadingLink>
        </div>
      </Reveal>
    </main>
  );
}
