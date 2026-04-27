import { LoadingLink } from "../../components/LoadingLink";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { StockPhoto } from "../../components/StockPhoto";
import { stockMedia } from "../../components/stockMedia";
import { getBlogContentData } from "../../lib/blog-content";

export const revalidate = 300;

export default async function BlogPage() {
  const { posts } = await getBlogContentData();
  const [featured, ...rest] = posts;
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <main className="site-main blog-v2">
      {/* Hero */}
      <Reveal as="section" className="about-hero" delay={60}>
        <img src={stockMedia.aboutMission.src} alt={stockMedia.aboutMission.alt} className="about-hero__bg" />
        <div className="about-hero__overlay" />
        <div className="about-hero__content">
          <p className="about-hero__eyebrow">Blog and field notes</p>
          <h1 className="about-hero__title">Clear updates from the work behind the mission.</h1>
          <p className="about-hero__body">
            Practical notes on humanitarian trust, community support routes, field documentation,
            education access, creative advocacy, and the partnerships that make the platform useful.
          </p>
          <div className="hero-actions">
            <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">Support the work</LoadingLink>
            <LoadingLink href="/projects" className="button button--ghost-light" loadingLabel="Opening">View projects</LoadingLink>
          </div>
        </div>
        <div className="about-hero__stats">
          <article className="about-hero__stat">
            <p className="about-hero__stat-value">{posts.length}</p>
            <p className="about-hero__stat-label">published articles</p>
          </article>
          <article className="about-hero__stat">
            <p className="about-hero__stat-value">{categories.length}</p>
            <p className="about-hero__stat-label">topic categories</p>
          </article>
          <article className="about-hero__stat">
            <p className="about-hero__stat-value">{posts.filter((p) => p.featured).length || "Weekly"}</p>
            <p className="about-hero__stat-label">{posts.filter((p) => p.featured).length ? "featured articles" : "publishing cadence"}</p>
          </article>
        </div>
      </Reveal>

      {/* Category pills */}
      <Reveal as="section" className="blog-v2__section" delay={80}>
        <div className="blog-v2__cats">
          {categories.map((cat) => (
            <span key={cat} className="blog-v2__cat">{cat}</span>
          ))}
        </div>
      </Reveal>

      {/* Featured post */}
      {featured && (
        <Reveal as="section" className="blog-v2__section" delay={100}>
          <div className="blog-v2__featured">
            {featured.imageSrc && (
              <div className="blog-v2__featured-media">
                <StockPhoto src={featured.imageSrc} alt={featured.imageAlt || featured.title} label={featured.category} sizes="(max-width: 1120px) 100vw, 48vw" />
              </div>
            )}
            <div className="blog-v2__featured-copy">
              <p className="blog-v2__featured-label">Featured</p>
              <div className="blog-v2__meta">
                <span>{featured.category}</span>
                <time dateTime={featured.publishedAt}>{featured.dateLabel}</time>
                {featured.readingTime && <span>{featured.readingTime}</span>}
              </div>
              <h2 className="blog-v2__featured-title">{featured.title}</h2>
              <p className="blog-v2__featured-excerpt">{featured.excerpt}</p>
              <LoadingLink href={`/blog/${featured.slug}`} className="button button--primary" loadingLabel="Opening">Read article</LoadingLink>
            </div>
          </div>
        </Reveal>
      )}

      {/* Post grid */}
      <Reveal as="section" className="blog-v2__section" delay={160}>
        <SectionIntro eyebrow="Latest posts" title="Field reports, humanitarian analysis, and operational notes." body="Each post is written to keep the mission visible, practical, and accountable." />
        {rest.length ? (
          <div className="blog-v2__grid">
            {rest.map((post) => (
              <article key={post.slug} className="blog-v2__card">
                {post.imageSrc && (
                  <StockPhoto src={post.imageSrc} alt={post.imageAlt || post.title} label={post.category} sizes="(max-width: 1120px) 100vw, 30vw" className="blog-v2__card-media" />
                )}
                <div className="blog-v2__card-copy">
                  <div className="blog-v2__meta">
                    <span>{post.category}</span>
                    <time dateTime={post.publishedAt}>{post.dateLabel}</time>
                  </div>
                  <h3 className="blog-v2__card-title">{post.title}</h3>
                  <p className="blog-v2__card-excerpt">{post.excerpt}</p>
                  <LoadingLink href={`/blog/${post.slug}`} className="blog-v2__card-link" loadingLabel="Opening">Read article →</LoadingLink>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="blog-v2__empty">More published posts will appear here as the CMS grows.</p>
        )}
      </Reveal>

      {/* CTA */}
      <Reveal as="section" className="blog-v2__section" delay={220}>
        <div className="blog-v2__cta">
          <p className="blog-v2__cta-eyebrow">Keep the record moving</p>
          <h2 className="blog-v2__cta-title">Support the programs behind these updates.</h2>
          <p className="blog-v2__cta-body">Contributions help turn field notes into practical support: health kits, learning resources, youth development, and creative advocacy that can be documented clearly.</p>
          <div className="hero-actions">
            <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">Donate now</LoadingLink>
            <LoadingLink href="/get-involved" className="button button--ghost-light" loadingLabel="Opening">Get involved</LoadingLink>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
