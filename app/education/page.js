import { EducationLibrary } from "../../components/EducationLibrary";
import { InfoCard } from "../../components/InfoCard";
import { LoadingLink } from "../../components/LoadingLink";
import { MetricCard } from "../../components/MetricCard";
import { PageHero } from "../../components/PageHero";
import { SectionIntro } from "../../components/SectionIntro";
import { getEducationHubData } from "../../lib/education";

export const revalidate = 300;

export default async function EducationPage() {
  const {
    actions,
    libraryItems,
    metrics,
    resources,
    sessions,
    tracks
  } = await getEducationHubData();
  const featuredResources = libraryItems.slice(0, 3);

  return (
    <main className="site-main">
      <PageHero
        eyebrow="Education hub"
        title="A learning space for books, lessons, and digital skills."
        body="The Education Hub is a practical library of downloadable materials, curated lessons, coding pathways, and community-ready teaching resources."
        primary={{ href: "/education/contribute", label: "Contribute Resources" }}
        secondary={{ href: "/donate", label: "Support a Learning Cohort" }}
        asideTitle="How the hub works"
        asideBody="Resources are reviewed, organized into tracks, then delivered through workshops, cohorts, and mentor-led sessions."
      />

      <section className="section">
        <SectionIntro
          title="Everything a community learning hub needs in one place."
          body="Use the metrics to understand scale, then scan the operating model to see how resources move from intake to real-world use."
        />

        <div className="section-grid section-grid--split">
          <div className="section__stack">
            <div className="metric-grid">
              {metrics.map((item) => (
                <MetricCard key={item.label} value={item.value} label={item.label} />
              ))}
            </div>
          </div>

          <div className="section__stack">
            <InfoCard
              eyebrow="How it works"
              title="Intake, review, publish, and reuse."
              body="Resources are reviewed first, then routed into tracks, the library, and cohort delivery so communities always know where to start."
              tone="mist"
            />
            <InfoCard
              eyebrow="Who it serves"
              title="Learners, educators, and community mentors."
              body="The hub supports school clubs, workshops, mentor-led cohorts, and self-guided learners who need clear, mobile-ready materials."
              tone="paper"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <SectionIntro
          title="Start with three high-impact resources ready for community use."
          body="These resources are designed for immediate use in workshops, schools, and mentor-led sessions."
        />

        <div className="education-feature-grid">
          {featuredResources.map((item) => (
            <article key={item.title} className="resource-card resource-card--featured">
              <div className="resource-card__meta">
                <span className="resource-card__tag">{item.category}</span>
                <span className="resource-card__format">{item.format}</span>
              </div>
              <h3 className="resource-card__title">{item.title}</h3>
              <p className="resource-card__summary">{item.summary}</p>
              <div className="resource-card__footer">
                <span className="resource-card__level">{item.level}</span>
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="button button--secondary resource-card__action"
                >
                  <span className="button__label">{item.actionLabel || item.action_label}</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionIntro
          title="Start with clear pathways instead of one long resource list."
          body="Tracks make it easy to guide learners into the right starting point without hunting through the full library."
        />

        <div className="info-grid info-grid--three">
          {tracks.map((track) => (
            <InfoCard
              key={track.title}
              eyebrow={track.eyebrow}
              title={track.title}
              body={track.body}
              tone={track.tone}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionIntro
          title="Downloads, lessons, and teaching kits in one usable explorer."
          body="Search, filter, and open resources quickly with clear tags, formats, and learner levels."
        />

        <EducationLibrary items={libraryItems} />
      </section>

      <section className="section">
        <SectionIntro
          title="Cohorts and workshops that turn resources into learning."
          body="This layer highlights live sessions, mentor-led cohorts, and repeat workshops that keep learners engaged."
        />

        <div className="info-grid info-grid--three">
          {sessions.map((item) => (
            <InfoCard
              key={item.title}
              eyebrow={item.eyebrow}
              title={item.title}
              body={item.body}
              tone={item.tone}
            />
          ))}
        </div>
      </section>

      <section className="section section-grid section-grid--campaign">
        {actions.map((action) => (
          <InfoCard
            key={action.title}
            eyebrow="Ways to support"
            title={action.title}
            body={action.body}
            tone={action.tone}
          />
        ))}
      </section>

      <section className="section section--band">
        <div className="closing-cta">
          <div>
            <h2 className="closing-cta__title">
              Resources, cohorts, and community-led learning in one hub.
            </h2>
            <p className="closing-cta__body">
              The hub supports guided resources, lesson collections, and contributor workflows for
              learners, facilitators, and partner-led education programs.
            </p>
          </div>
          <div className="closing-cta__actions">
            <LoadingLink
              href="/education/contribute"
              className="button button--secondary"
              loadingLabel="Opening"
            >
              Open Contributor Form
            </LoadingLink>
            <LoadingLink href="/programs" className="button button--ghost-light" loadingLabel="Opening">
              Back to Programs
            </LoadingLink>
          </div>
        </div>
      </section>
    </main>
  );
}
