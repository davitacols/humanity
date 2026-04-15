import { notFound } from "next/navigation";
import { InfoCard } from "../../../../components/InfoCard";
import { LoadingLink } from "../../../../components/LoadingLink";
import { PageHero } from "../../../../components/PageHero";
import { educationResourcePages } from "../../../../components/siteData";

function getResource(slug) {
  return educationResourcePages.find((item) => item.slug === slug);
}

export function generateStaticParams() {
  return educationResourcePages.map((item) => ({ slug: item.slug }));
}

export default async function EducationResourcePage({ params }) {
  const { slug } = await params;
  const resource = getResource(slug);

  if (!resource) {
    notFound();
  }

  return (
    <main className="site-main">
      <PageHero
        eyebrow={resource.eyebrow}
        title={resource.title}
        body={resource.summary}
        primary={{ href: "/education", label: "Back to Education Hub" }}
        secondary={{ href: "/education/contribute", label: "Contribute a Resource" }}
        asideTitle="Resource snapshot"
        asideBody={`${resource.audience}. ${resource.format}. ${resource.duration}.`}
      />

      <section className="section">
        <div className="editorial-band">
          <div className="editorial-band__lead">
            <h3 className="editorial-band__title">{resource.title}</h3>
          </div>

          <div className="editorial-band__body">
            <article className="editorial-band__entry">
              <p className="editorial-band__eyebrow">Overview</p>
              <h4 className="editorial-band__entry-title">Built for practical learning contexts</h4>
              <p className="editorial-band__entry-body">{resource.body}</p>
            </article>

            <article className="editorial-band__entry">
              <p className="editorial-band__eyebrow">Audience</p>
              <h4 className="editorial-band__entry-title">{resource.audience}</h4>
              <p className="editorial-band__entry-body">
                This resource is structured for community-led delivery, small group workshops, and
                low-bandwidth learning settings.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-grid section-grid--campaign">
        <div className="info-grid info-grid--two">
          {resource.useCases.map((item, index) => (
            <InfoCard
              key={item}
              eyebrow={`Use case ${String(index + 1).padStart(2, "0")}`}
              title={item}
              body="This gives facilitators and mentors a concrete way to apply the resource in real learning environments."
              tone={index % 2 === 0 ? "mist" : "sand"}
            />
          ))}
        </div>

        <div className="info-grid info-grid--two">
          {resource.outcomes.map((item, index) => (
            <InfoCard
              key={item}
              eyebrow={`Outcome ${String(index + 1).padStart(2, "0")}`}
              title={item}
              body="These are the practical learning results the hub supports across cohorts."
              tone={index % 2 === 0 ? "leaf" : "paper"}
            />
          ))}
        </div>
      </section>

      <section className="section section--band">
        <div className="closing-cta">
          <div>
            <h2 className="closing-cta__title">
              Build a stronger library with guided resources that feel ready to use.
            </h2>
            <p className="closing-cta__body">
              Each resource moves from overview to hosted download, external lesson, or
              contributor-backed teaching asset without losing clarity for the learner.
            </p>
          </div>
          <div className="closing-cta__actions">
            <LoadingLink
              href="/education/contribute"
              className="button button--secondary"
              loadingLabel="Opening"
            >
              Submit a Related Resource
            </LoadingLink>
            <LoadingLink
              href="/donate"
              className="button button--ghost-light"
              loadingLabel="Opening"
            >
              Support Learning Access
            </LoadingLink>
          </div>
        </div>
      </section>
    </main>
  );
}
