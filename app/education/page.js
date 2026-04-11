import { EducationLibrary } from "../../components/EducationLibrary";
import { InfoCard } from "../../components/InfoCard";
import { LoadingLink } from "../../components/LoadingLink";
import { MetricCard } from "../../components/MetricCard";
import { PageHero } from "../../components/PageHero";
import { PhotoPanel } from "../../components/PhotoPanel";
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

  return (
    <main className="site-main">
      <PageHero
        eyebrow="Education hub"
        title="A learning space for books, lessons, and digital skills."
        body="The Education Hub is being built as a practical, mobile-first learning surface for downloadable materials, curated lessons, coding pathways, and community-ready teaching resources."
        primary={{ href: "/education/contribute", label: "Contribute Resources" }}
        secondary={{ href: "/donate", label: "Support a Learning Cohort" }}
        asideTitle="Why this page matters"
        asideBody="Education should feel like a core product surface, not just one card inside Programs. This route gives the platform a dedicated learning identity with room to scale."
      />

      <section className="section">
        <div className="section__stack">
          <p className="section-kicker">Hub metrics</p>
          <div className="metric-grid">
            {metrics.map((item) => (
              <MetricCard key={item.label} value={item.value} label={item.label} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <SectionIntro
          eyebrow="Featured learning direction"
          title="Learning that works on phones, in communities, and across mixed skill levels."
          body="The first version of the hub focuses on structure: a clear pathway for coding lessons, digital skills, and reusable teaching materials without overwhelming first-time visitors."
        />

        <div className="feature-panel">
          <PhotoPanel
            title="Education spotlight"
            caption="replace with classroom, workshop, or learner photography"
            tone="forest"
          />
          <div className="feature-panel__content">
            <span className="pill pill--soft">Launch focus</span>
            <h3>Build the hub around access, clarity, and repeat use.</h3>
            <p>
              The design makes room for three kinds of value at once: downloadable resources,
              externally hosted lesson content, and clearly structured learning tracks that help
              visitors know where to start.
            </p>
            <blockquote>
              A strong education hub should feel useful on the first visit, even before it grows
              into a larger e-learning platform.
            </blockquote>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionIntro
          eyebrow="Learning tracks"
          title="Start with clear pathways instead of one long resource list."
          body="These tracks give the hub an intentional structure and make it easier to expand later into cohorts, lesson collections, or guided learning programs."
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
          eyebrow="Resource library"
          title="Downloads, lessons, and teaching kits in one usable explorer."
          body="This pass turns the library into an actual browsing surface with filters and action links, so the hub already feels useful before we add database-backed content management."
        />

        <EducationLibrary items={libraryItems} />
      </section>

      <section className="section">
        <SectionIntro
          eyebrow="Core library structure"
          title="Support the hub with reusable learning content blocks."
          body="These supporting cards describe the kinds of educational content the platform is designed to carry as the resource base expands."
        />

        <div className="card-grid">
          {resources.map((resource) => (
            <InfoCard
              key={resource.title}
              eyebrow={resource.eyebrow}
              title={resource.title}
              body={resource.body}
              tone={resource.tone}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionIntro
          eyebrow="Programs and cohorts"
          title="Education should lead to sessions, cohorts, and repeat engagement."
          body="This section gives the hub a program layer, not just a file library. It creates space for workshops, recurring cohorts, and facilitator-led learning experiences."
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
            eyebrow="Next action"
            title={action.title}
            body={action.body}
            tone={action.tone}
          />
        ))}
      </section>

      <section className="section section--band">
        <div className="closing-cta">
          <div>
            <p className="section-kicker section-kicker--light">Education rollout</p>
            <h2 className="closing-cta__title">
              Ready for real resources, cohorts, and partner-backed learning programs.
            </h2>
            <p className="closing-cta__body">
              The next step is plugging in actual PDFs, lesson links, curriculum groups, and
              contributor workflows so this becomes a living hub rather than a static page.
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
