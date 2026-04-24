import { notFound } from "next/navigation";
import { LoadingLink } from "../../../components/LoadingLink";
import { Reveal } from "../../../components/Reveal";
import { StockPhoto } from "../../../components/StockPhoto";
import { getBlogContentData, getBlogPostBySlug } from "../../../lib/blog-content";

export const revalidate = 300;

function getBodyParagraphs(body) {
  return String(body || "")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export async function generateStaticParams() {
  const { posts } = await getBlogContentData();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog post not found"
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt || undefined,
      authors: [post.author],
      images: post.imageSrc ? [{ url: post.imageSrc, alt: post.imageAlt || post.title }] : undefined
    }
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const paragraphs = getBodyParagraphs(post.body);

  return (
    <main className="site-main page-v2 blog-post">
      <Reveal as="article" className="blog-post__article" variant="hero" delay={40}>
        <header className="blog-post__header">
          <LoadingLink href="/blog" className="blog-post__back" loadingLabel="Opening">
            Back to blog
          </LoadingLink>
          <p className="blog-meta">
            <span>{post.category}</span>
            <time dateTime={post.publishedAt}>{post.dateLabel}</time>
            {post.readingTime ? <span>{post.readingTime}</span> : null}
          </p>
          <h1>{post.title}</h1>
          <p className="blog-post__lede">{post.excerpt}</p>
          <p className="blog-post__author">By {post.author}</p>
        </header>

        {post.imageSrc ? (
          <StockPhoto
            src={post.imageSrc}
            alt={post.imageAlt || post.title}
            label={post.category}
            ratio="landscape"
            sizes="(max-width: 980px) 100vw, 920px"
            className="blog-post__image"
            priority
          />
        ) : null}

        <div className="blog-post__body">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="blog-post__cta" delay={160}>
        <div>
          <p className="blog-post__cta-label">Act on the story</p>
          <h2>Help turn documentation into practical support.</h2>
          <p>
            Explore the current program routes, contribute to the donation pathways, or reach out
            if you can support field work, creative documentation, education access, or partnerships.
          </p>
        </div>
        <div className="hero-actions">
          <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">
            Donate now
          </LoadingLink>
          <LoadingLink href="/get-involved" className="button button--secondary" loadingLabel="Opening">
            Get involved
          </LoadingLink>
        </div>
      </Reveal>
    </main>
  );
}
