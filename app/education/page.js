import { EducationLibrary } from "../../components/EducationLibrary";
import { LoadingLink } from "../../components/LoadingLink";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { StockPhoto } from "../../components/StockPhoto";
import { stockMedia } from "../../components/stockMedia";
import { getEducationHubData } from "../../lib/education";

export const revalidate = 300;

export const metadata = {
  title: "Education Hub",
  description: "Explore learning tracks, practical teaching resources, downloadable guides, facilitator tools, and contribution pathways for community education."
};

function getResourceAction(resource) {
  const t = resource.title.toLowerCase();
  if (t.includes("lesson")) return { href: "/education?category=Lessons#library", label: "Browse lessons" };
  if (t.includes("toolkit")) return { href: "/education?category=Toolkits#library", label: "Browse toolkits" };
  if (t.includes("spotlight")) return { href: "/education/contribute", label: "Contribute a resource" };
  return { href: "/education?category=Downloads#library", label: "Browse downloads" };
}

function getTrackAction(track) {
  const t = track.title.toLowerCase();
  if (t.includes("coding")) return { href: "/education?level=Beginner#library", label: "Open beginner resources" };
  if (t.includes("work")) return { href: "/education?category=Lessons#library", label: "Open work-ready lessons" };
  return { href: "/education?category=Toolkits#library", label: "Open facilitator resources" };
}

export default async function EducationPage({ searchParams }) {
  const params = (await searchParams) || {};
  const { actions, featuredLibraryItems, libraryItems, librarySummary, metrics, resources, sessions, tracks } = await getEducationHubData();

  return (
    <main className="site-main edu-v2">
      {/* Hero */}
      <Reveal as="section" className="about-hero" delay={60}>
        <img src={stockMedia.educationFeature.src} alt={stockMedia.educationFeature.alt} className="about-hero__bg" />
        <div className="about-hero__overlay" />
        <div className="about-hero__content">
          <p className="about-hero__eyebrow">Education hub</p>
          <h1 className="about-hero__title">A field classroom for learners, facilitators, and community mentors.</h1>
          <p className="about-hero__body">
            Digital basics guides, beginner web lessons, facilitator outlines, printable workbooks,
            mentor checklists, and contribution routes for community education.
          </p>
          <div className="hero-actions">
            <a href="#library" className="button button--primary">Explore the library</a>
            <LoadingLink href="/education/contribute" className="button button--ghost-light" loadingLabel="Opening">Contribute resources</LoadingLink>
          </div>
        </div>
        <div className="about-hero__stats">
          {metrics.slice(0, 3).map((m) => (
            <article key={m.label} className="about-hero__stat">
              <p className="about-hero__stat-value">{m.value}</p>
              <p className="about-hero__stat-label">{m.label}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Resource types */}
      <Reveal as="section" className="edu-v2__section" delay={100}>
        <SectionIntro eyebrow="Use the hub your way" title="Start with downloads, lessons, toolkits, or contributed materials." body="The library is organized around the ways people actually use education support." />
        <div className="edu-v2__resources">
          {resources.map((r, i) => {
            const action = getResourceAction(r);
            return (
              <article key={r.title} className="edu-v2__resource">
                <span className="edu-v2__resource-index">{String(i + 1).padStart(2, "0")}</span>
                <p className="edu-v2__resource-eyebrow">{r.eyebrow}</p>
                <h3 className="edu-v2__resource-title">{r.title}</h3>
                <p className="edu-v2__resource-body">{r.body}</p>
                <LoadingLink href={action.href} className="button button--secondary" loadingLabel="Opening">{action.label}</LoadingLink>
              </article>
            );
          })}
        </div>
      </Reveal>

      {/* Featured resources */}
      <Reveal as="section" className="edu-v2__section" delay={140}>
        <SectionIntro eyebrow="Start here" title="Three strong first steps for schools, mentors, and first-time learners." body="These featured resources are the fastest way to enter the library." />
        <div className="edu-v2__featured">
          {featuredLibraryItems.map((item, i) => (
            <article key={item.title} className="edu-v2__featured-card">
              <div className="edu-v2__featured-top">
                <span className="edu-v2__featured-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="edu-v2__featured-cat">{item.category}</span>
              </div>
              <h3 className="edu-v2__featured-title">{item.title}</h3>
              <p className="edu-v2__featured-body">{item.summary}</p>
              <p className="edu-v2__featured-meta">{item.format} · {item.level}</p>
              {item.external ? (
                <a href={item.href} target="_blank" rel="noreferrer" className="button button--secondary">{item.actionLabel}</a>
              ) : (
                <LoadingLink href={item.href} className="button button--secondary" loadingLabel="Opening">{item.actionLabel}</LoadingLink>
              )}
            </article>
          ))}
        </div>
      </Reveal>

      {/* Learning tracks */}
      <Reveal as="section" className="edu-v2__section" delay={180}>
        <SectionIntro eyebrow="Learning tracks" title="Three tracks organize materials by use case." body="Coding foundations, digital skills for work, and the community learning library give learners and facilitators a direct starting point." />
        <div className="edu-v2__tracks">
          {tracks.map((track, i) => {
            const action = getTrackAction(track);
            return (
              <article key={track.title} className="edu-v2__track">
                <span className="edu-v2__track-index">{track.eyebrow}</span>
                <h3 className="edu-v2__track-title">{track.title}</h3>
                <p className="edu-v2__track-body">{track.body}</p>
                <LoadingLink href={action.href} className="button button--secondary" loadingLabel="Opening">{action.label}</LoadingLink>
              </article>
            );
          })}
        </div>
      </Reveal>

      {/* Library explorer */}
      <Reveal as="section" id="library" className="edu-v2__section" delay={220}>
        <SectionIntro eyebrow="Library explorer" title="Search by what the material is, who it is for, and what kind of session you are planning." body="Discovery works better when a mentor can search by need and a contributor can see what already exists." />
        <EducationLibrary
          items={libraryItems}
          initialCategory={typeof params.category === "string" ? params.category : "All"}
          initialLevel={typeof params.level === "string" ? params.level : "All levels"}
          initialQuery={typeof params.q === "string" ? params.q : ""}
        />
      </Reveal>

      {/* Delivery + sessions */}
      <Reveal as="section" className="edu-v2__section" delay={280}>
        <div className="edu-v2__delivery">
          <div className="edu-v2__delivery-copy">
            <SectionIntro eyebrow="Delivery model" title="Live sessions and reusable materials work together." body="Session formats help people learn together, while reviewed resources keep guides and workbooks available after the session ends." />
            <div className="edu-v2__sessions">
              {sessions.map((s, i) => (
                <article key={s.title} className="edu-v2__session">
                  <span className="edu-v2__session-index">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="edu-v2__session-eyebrow">{s.eyebrow}</p>
                    <h3 className="edu-v2__session-title">{s.title}</h3>
                    <p className="edu-v2__session-body">{s.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="edu-v2__delivery-media">
            <StockPhoto src={stockMedia.educationFeature.src} alt={stockMedia.educationFeature.alt} label="Education delivery" ratio="portrait" sizes="(max-width: 1120px) 100vw, 40vw" />
          </div>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section" className="edu-v2__section" delay={340}>
        <div className="edu-v2__cta">
          <div className="edu-v2__cta-copy">
            <p className="edu-v2__cta-eyebrow">Support and contribute</p>
            <h2 className="edu-v2__cta-title">Contribute materials or sponsor education access.</h2>
            <p className="edu-v2__cta-body">Resource contributors extend the library. Sponsors help fund cohort delivery, printing, connectivity, devices, and facilitator preparation.</p>
            <div className="hero-actions">
              <LoadingLink href="/education/contribute" className="button button--primary" loadingLabel="Opening">Submit a resource</LoadingLink>
              <LoadingLink href="/donate?fund=education-access" className="button button--ghost-light" loadingLabel="Opening">Support a cohort</LoadingLink>
            </div>
          </div>
          <div className="edu-v2__cta-cards">
            {actions.map((a, i) => (
              <article key={a.title} className="edu-v2__cta-card">
                <span className="edu-v2__cta-card-index">{String(i + 1).padStart(2, "0")}</span>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </main>
  );
}
