import { notFound } from "next/navigation";
import { LoadingLink } from "../../../../components/LoadingLink";
import { PageHero } from "../../../../components/PageHero";
import { Reveal } from "../../../../components/Reveal";
import { SectionIntro } from "../../../../components/SectionIntro";
import { educationResourcePages } from "../../../../components/siteData";
import { getEducationResourcePageData } from "../../../../lib/education";

export const revalidate = 300;

function buildResourceFacts(resource, currentLibraryItem) {
  return [
    {
      label: "Audience",
      value: currentLibraryItem?.level || resource.audience
    },
    {
      label: "Format",
      value: resource.format
    },
    {
      label: "Duration",
      value: resource.duration
    },
    {
      label: "Hub lane",
      value: currentLibraryItem?.category || "Education library"
    }
  ];
}

function ResourceLink({ item }) {
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className="button button--secondary">
        {item.actionLabel}
      </a>
    );
  }

  return (
    <LoadingLink href={item.href} className="button button--secondary" loadingLabel="Opening">
      {item.actionLabel}
    </LoadingLink>
  );
}

export function generateStaticParams() {
  return educationResourcePages.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const resource = await getEducationResourcePageData(slug);

  if (!resource) {
    return {
      title: "Education Resource",
      description: "A practical education resource from the Humanity First education hub."
    };
  }

  return {
    title: `${resource.title} | Education Hub`,
    description: resource.summary
  };
}

export default async function EducationResourcePage({ params }) {
  const { slug } = await params;
  const resource = await getEducationResourcePageData(slug);

  if (!resource) {
    notFound();
  }

  const resourceFacts = buildResourceFacts(resource, resource.currentLibraryItem);

  return (
    <main className="site-main page-v2 edu-page">
      <PageHero
        eyebrow={resource.eyebrow}
        title={resource.title}
        body={resource.summary}
        primary={{ href: "#resource-overview", label: "Open resource brief" }}
        secondary={{ href: "/education#library-explorer", label: "Back to library" }}
        highlights={[
          resource.format,
          resource.duration,
          resource.currentLibraryItem?.category || "Education resource"
        ]}
        asideTitle="Where this resource fits"
        asideBody={resource.body}
        asidePoints={[
          `Primary audience: ${resource.audience}`,
          `Use this when you need ${resource.format.toLowerCase()} support in a real session`,
          `${resource.outcomes.length} learning outcomes mapped for delivery`
        ]}
      />

      <Reveal as="section" id="resource-overview" delay={100}>
        <SectionIntro
          eyebrow="Resource brief"
          title="Audience, format, use cases, and outcomes in one place."
          body="This brief helps a mentor, teacher, or volunteer decide where the resource fits before using it in a session."
        />
        <div className="split-v2 edu-resource-split">
          <article className="dark-panel-v2">
            <p className="dark-panel-v2__eyebrow">Resource fit</p>
            <h2 className="dark-panel-v2__title">Use this resource with the audience and session type named here.</h2>
            <p className="dark-panel-v2__body">{resource.body}</p>
            <p className="dark-panel-v2__body">
              The brief names the audience, format, and follow-up points so facilitators can prepare
              before the first use.
            </p>
            <div className="hero-actions">
              <LoadingLink
                href="/education/contribute#resource-submission"
                className="button button--primary"
                loadingLabel="Opening"
              >
                Contribute a related resource
              </LoadingLink>
              <LoadingLink
                href="/donate?fund=education-access#live-checkout"
                className="button button--secondary"
                loadingLabel="Opening"
              >
                Support education access
              </LoadingLink>
            </div>
          </article>

          <div className="edu-resource-card-grid edu-resource-card-grid--facts">
            {resourceFacts.map((fact, index) => (
              <article key={fact.label} className="edu-resource-card">
                <div className="edu-resource-card__top">
                  <span className="edu-resource-card__index">{String(index + 1).padStart(2, "0")}</span>
                  <p className="edu-resource-card__eyebrow">{fact.label}</p>
                </div>
                <h3 className="edu-resource-card__title">{fact.value}</h3>
                <p className="edu-resource-card__body">
                  {fact.label === "Audience"
                    ? "Use this to decide the first audience for the material."
                    : fact.label === "Hub lane"
                      ? "Use this to find similar materials in the public library."
                      : "Use this to judge whether the material fits the session you are planning."}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" delay={160}>
        <SectionIntro
          eyebrow="Use cases"
          title="How educators, mentors, and workshop leads can apply this resource."
          body="Strong use cases make the resource easier to deploy in schools, community sessions, and cohort-based follow-up."
        />
        <div className="edu-tracks">
          {resource.useCases.map((item, index) => (
            <article key={item} className="edu-tracks__card">
              <div className="edu-tracks__header">
                <span className="edu-tracks__num">{String(index + 1).padStart(2, "0")}</span>
                <span className="edu-tracks__eyebrow">Use case</span>
              </div>
              <h3 className="edu-tracks__title">{item}</h3>
              <p className="edu-tracks__body">
                This route connects the resource to a specific teaching moment, audience, and
                follow-up activity.
              </p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" delay={220}>
        <SectionIntro
          eyebrow="Expected outcomes"
          title="The kind of learner movement this resource is meant to support."
          body="These outcomes describe the learner progress the resource is meant to support after use."
        />
        <div className="split-v2 edu-resource-split">
          <div className="edu-resource-card-grid edu-resource-card-grid--outcomes">
            {resource.outcomes.map((item, index) => (
              <article key={item} className="edu-resource-card edu-resource-card--outcome">
                <div className="edu-resource-card__top">
                  <span className="edu-resource-card__index">{String(index + 1).padStart(2, "0")}</span>
                  <p className="edu-resource-card__eyebrow">Outcome</p>
                </div>
                <p className="edu-resource-card__statement">{item}</p>
                <p className="edu-resource-card__body">
                  This gives facilitators a concrete reason to choose the resource for a session.
                </p>
              </article>
            ))}
          </div>

          <article className="dark-panel-v2">
            <p className="dark-panel-v2__eyebrow">Publishing standard</p>
            <h2 className="dark-panel-v2__title">Useful resources explain delivery, audience fit, and follow-up clearly.</h2>
            <p className="dark-panel-v2__body">
              The education hub is stronger when every item can be understood quickly by a teacher,
              volunteer, or mentor working with limited time, shared devices, or low-bandwidth conditions.
            </p>
            <p className="dark-panel-v2__body">
              Contribution and review focus on audience fit, rights to share, summary quality, and
              whether the material can support community use.
            </p>
          </article>
        </div>
      </Reveal>

      {resource.relatedResources.length ? (
        <Reveal as="section" delay={280}>
          <SectionIntro
            eyebrow="Related resources"
            title="Keep moving through the education library with nearby materials."
            body="These resources share a similar audience or hub category, so facilitators can move to the next material faster."
          />
          <div className="card-grid-v2 card-grid-v2--3">
            {resource.relatedResources.map((item, index) => (
              <article key={item.title} className="card-v2">
                <div className="card-v2__top">
                  <span className="card-v2__index">{String(index + 1).padStart(2, "0")}</span>
                  <p className="card-v2__eyebrow">{item.category}</p>
                </div>
                <h3 className="card-v2__title">{item.title}</h3>
                <p className="card-v2__body">{item.summary}</p>
                <p className="card-v2__body">
                  {item.format} - {item.level}
                </p>
                <ResourceLink item={item} />
              </article>
            ))}
          </div>
        </Reveal>
      ) : null}

      <Reveal as="section" className="edu-cta" delay={340}>
        <div className="edu-cta__text">
          <h2 className="edu-cta__title">Add lessons, guides, and toolkits that support real sessions.</h2>
          <p className="edu-cta__body">
            Resource submissions extend the library, while education donations support printing,
            connectivity, devices, and facilitator preparation.
          </p>
        </div>
        <div className="edu-cta__actions">
          <LoadingLink
            href="/education/contribute#resource-submission"
            className="button button--primary"
            loadingLabel="Opening"
          >
            Submit a resource
          </LoadingLink>
          <LoadingLink
            href="/donate?fund=education-access#live-checkout"
            className="button button--secondary"
            loadingLabel="Opening"
          >
            Fund learning access
          </LoadingLink>
        </div>
      </Reveal>
    </main>
  );
}


