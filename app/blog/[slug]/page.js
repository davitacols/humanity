import { notFound } from "next/navigation";
import { LoadingLink } from "../../../components/LoadingLink";
import { Reveal } from "../../../components/Reveal";
import { StockPhoto } from "../../../components/StockPhoto";
import { getBlogContentData, getBlogPostBySlug } from "../../../lib/blog-content";

export const revalidate = 300;

function getBodyParagraphs(body) {
  return String(body || "").split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
}

export async function generateStaticParams() {
  const { posts } = await getBlogContentData();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Blog post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title, description: post.excerpt, type: "article",
      publishedTime: post.publishedAt || undefined, authors: [post.author],
      images: post.imageSrc ? [{ url: post.imageSrc, alt: post.imageAlt || post.title }] : undefined
    }
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const [post, { posts }] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogContentData()
  ]);

  if (!post) notFound();

  const paragraphs = getBodyParagraphs(post.body);
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="site-main bp">
      {/* Hero image */}
      {post.imageSrc && (
        <div className="bp__hero">
          <img src={post.imageSrc} alt={post.imageAlt || post.title} className="bp__hero-img" />
          <div className="bp__hero-overlay" />
          <div className="bp__hero-badge">{post.category}</div>
        </div>
      )}

      {/* Article */}
      <Reveal as="article" className="bp__article" delay={40}>
        <header className="bp__header">
          <LoadingLink href="/blog" className="bp__back" loadingLabel="Opening">← Back to blog</LoadingLink>
          <div className="bp__meta">
            <span>{post.category}</span>
            <time dateTime={post.publishedAt}>{post.dateLabel}</time>
            {post.readingTime && <span>{post.readingTime}</span>}
          </div>
          <h1 className="bp__title">{post.title}</h1>
          <p className="bp__lede">{post.excerpt}</p>
          <p className="bp__author">By {post.author}</p>
        </header>

        <div className="bp__body">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <footer className="bp__footer">
          <div className="bp__share">
            <span className="bp__share-label">Share this article</span>
            <div className="bp__share-links">
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://humanityfirst.org/blog/${post.slug}`)}`} target="_blank" rel="noreferrer" className="bp__share-link">X / Twitter</a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://humanityfirst.org/blog/${post.slug}`)}`} target="_blank" rel="noreferrer" className="bp__share-link">Facebook</a>
              <a href={`https://wa.me/?text=${encodeURIComponent(`${post.title} https://humanityfirst.org/blog/${post.slug}`)}`} target="_blank" rel="noreferrer" className="bp__share-link">WhatsApp</a>
            </div>
          </div>
          <div className="bp__tags">
            <span className="bp__tag">{post.category}</span>
            {post.readingTime && <span className="bp__tag">{post.readingTime}</span>}
          </div>
        </footer>
      </Reveal>

      {/* Related posts */}
      {related.length > 0 && (
        <Reveal as="section" className="bp__related" delay={120}>
          <h2 className="bp__related-title">More from the blog</h2>
          <div className="bp__related-grid">
            {related.map((r) => (
              <LoadingLink key={r.slug} href={`/blog/${r.slug}`} className="bp__related-card" loadingLabel="Opening">
                {r.imageSrc && <img src={r.imageSrc} alt={r.imageAlt || r.title} className="bp__related-img" />}
                <div className="bp__related-copy">
                  <span className="bp__related-cat">{r.category}</span>
                  <h3>{r.title}</h3>
                </div>
              </LoadingLink>
            ))}
          </div>
        </Reveal>
      )}

      {/* CTA */}
      <Reveal as="section" className="bp__cta" delay={180}>
        <div className="bp__cta-inner">
          <p className="bp__cta-eyebrow">Act on the story</p>
          <h2 className="bp__cta-title">Help turn documentation into practical support.</h2>
          <p className="bp__cta-body">Explore program routes, contribute to donation pathways, or reach out if you can support field work, creative documentation, education access, or partnerships.</p>
          <div className="hero-actions">
            <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">Donate now</LoadingLink>
            <LoadingLink href="/get-involved" className="button button--ghost-light" loadingLabel="Opening">Get involved</LoadingLink>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
