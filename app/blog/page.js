import Link from "next/link";
import { LoadingLink } from "../../components/LoadingLink";
import { StockPhoto } from "../../components/StockPhoto";
import { getBlogContentData } from "../../lib/blog-content";
import "./blog.css";

export const revalidate = 300;

export default async function BlogPage() {
  const { posts } = await getBlogContentData();
  const [featured, ...rest] = posts;

  return (
    <main className="site-main blog">
      {/* Header */}
      <section className="blog__header">
        <h1>Field notes & updates</h1>
        <p>Reports from the ground — health, education, youth development, and creative advocacy.</p>
      </section>

      {/* Featured */}
      {featured && (
        <section className="blog__featured">
          {featured.imageSrc && (
            <Link href={`/blog/${featured.slug}`} className="blog__featured-media">
              <StockPhoto src={featured.imageSrc} alt={featured.imageAlt || featured.title} sizes="(max-width: 900px) 100vw, 55vw" />
            </Link>
          )}
          <div className="blog__featured-content">
            <div className="blog__meta">
              <span>{featured.category}</span>
              <span>{featured.readingTime}</span>
            </div>
            <Link href={`/blog/${featured.slug}`}>
              <h2>{featured.title}</h2>
            </Link>
            <p>{featured.excerpt}</p>
            <LoadingLink href={`/blog/${featured.slug}`} className="blog__read-link" loadingLabel="Opening">Read article →</LoadingLink>
          </div>
        </section>
      )}

      {/* Posts */}
      {rest.length > 0 && (
        <section className="blog__posts">
          {rest.map((post) => (
            <article key={post.slug} className="blog__post">
              {post.imageSrc && (
                <Link href={`/blog/${post.slug}`} className="blog__post-media">
                  <StockPhoto src={post.imageSrc} alt={post.imageAlt || post.title} sizes="(max-width: 600px) 100vw, 280px" />
                </Link>
              )}
              <div className="blog__post-content">
                <div className="blog__meta">
                  <span>{post.category}</span>
                  <span>{post.readingTime}</span>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h3>{post.title}</h3>
                </Link>
                <p>{post.excerpt}</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
