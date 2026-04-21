import { notFound } from "next/navigation";
import { LoadingLink } from "../../../../components/LoadingLink";
import { PageHero } from "../../../../components/PageHero";
import { Reveal } from "../../../../components/Reveal";
import { SectionIntro } from "../../../../components/SectionIntro";
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
  if (!resource) notFound();

  return (
    <main className="site-main edu-page">
      <PageHero
        eyebrow={resource.eyebrow}
        title={resource.title}
        body={resource.summary}
        primary={{ href: "/education", label: "Back to Education Hub" }}
        secondary={{ href: "/education/contribute", label: "Contribute a Resource" }}
        asideTitle="Resource snapshot"
        asideBody={`${resource.audience}. ${resource.format}. ${resource.duration}.`}
      />

      {/* Overview */}
      <Reveal as="section" className="edu-how" delay={100}>
        <div className="edu-how__intro">
          <p className="edu-how__eyebrow">Overview</p>
          <h2 className="edu-how__title">{resource.title}</h2>
          <p className="edu-how__body">{resource.body}</p>
        </div>
        <div className="edu-how__steps">
          <article className="edu-how__step">
            <span className="edu-how__step-num">→</span>
            <h3 className="edu-how__step-title">Audience</h3>
            <p className="edu-how__step-body">{resource.audience}</p>
          </article>
          <article className="edu-how__step">
            <span className="edu-how__step-num">→</span>
            <h3 className="edu-how__step-title">Format</h3>
            <p className="edu-how__step-body">{resource.format} · {resource.duration}</p>
          </article>
        </div>
      </Reveal>

      {/* Use cases */}
      <Reveal as="section" delay={160}>
        <SectionIntro eyebrow="Use cases" title="How facilitators and mentors apply this resource." />
        <div className="edu-tracks">
          {resource.useCases.map((item, i) => (
            <article key={item} className="edu-tracks__card">
              <div className="edu-tracks__header">
                <span className="edu-tracks__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="edu-tracks__eyebrow">Use case</span>
              </div>
              <h3 className="edu-tracks__title">{item}</h3>
              <p className="edu-tracks__body">Gives facilitators a concrete way to apply the resource in real learning environments.</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Outcomes */}
      <Reveal as="section" delay={220}>
        <SectionIntro eyebrow="Outcomes" title="Practical learning results the hub supports across cohorts." />
        <div className="edu-tracks">
          {resource.outcomes.map((item, i) => (
            <article key={item} className="edu-tracks__card">
              <div className="edu-tracks__header">
                <span className="edu-tracks__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="edu-tracks__eyebrow">Outcome</span>
              </div>
              <h3 className="edu-tracks__title">{item}</h3>
            </article>
          ))}
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section" className="edu-cta" delay={280}>
        <div className="edu-cta__text">
          <h2 className="edu-cta__title">Build a stronger library with guided resources that feel ready to use.</h2>
          <p className="edu-cta__body">Each resource moves from overview to hosted download, external lesson, or contributor-backed teaching asset.</p>
        </div>
        <div className="edu-cta__actions">
          <LoadingLink href="/education/contribute" className="button button--primary" loadingLabel="Opening">Submit a related resource</LoadingLink>
          <LoadingLink href="/donate" className="button button--secondary" loadingLabel="Opening">Support learning access</LoadingLink>
        </div>
      </Reveal>
    </main>
  );
}
