import { LoadingLink } from "../../components/LoadingLink";
import { PageHero } from "../../components/PageHero";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { StockPhoto } from "../../components/StockPhoto";
import { stockMedia } from "../../components/stockMedia";
import { getBlogContentData } from "../../lib/blog-content";

export const revalidate = 300;

function PostMeta({ post }) {
  return (
    <p className="blog-meta">
      <span>{post.category}</span>
      <time dateTime={post.publishedAt}>{post.dateLabel}</time>
      {post.readingTime ? <span>{post.readingTime}</span> : null}
    </p>
  );
}

function BlogCard({ post }) {
  return (
    <article className="blog-card">
      <PostMeta post={post} />
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <LoadingLink href={`/blog/${post.slug}`} className="blog-link" loadingLabel="Opening">
        Read the note
      </LoadingLink>
    </article>
  );
}

export default async function BlogPage() {
  const { posts } = await getBlogContentData();
  const [featuredPost, ...recentPosts] = posts;

  return (
    <main className="site-main page-v2 blog-index">
      <PageHero
        eyebrow="Blog and field notes"
        title="Clear updates from the work behind the mission."
        body="Read practical notes on humanitarian trust, community support routes, field documentation, education access, creative advocacy, and the partnerships that make the platform useful."
        primary={{ href: "/donate", label: "Support the work" }}
        secondary={{ href: "/projects", label: "View projects" }}
        media={{
          src: stockMedia.aboutMission.src,
          alt: stockMedia.aboutMission.alt,
          label: "Humanitarian notes"
        }}
        highlights={["Field notes", "Transparency", "Community stories"]}
        asideTitle="A plain record of progress"
        asideBody="The blog is for articles, updates, and reflections that help supporters understand the need, the response, and the next step."
      />

      {featuredPost ? (
        <Reveal as="section" className="blog-feature" delay={120}>
          <div className="blog-feature__text">
            <p className="blog-feature__label">Featured note</p>
            <PostMeta post={featuredPost} />
            <h2>{featuredPost.title}</h2>
            <p>{featuredPost.excerpt}</p>
            <LoadingLink
              href={`/blog/${featuredPost.slug}`}
              className="button button--primary"
              loadingLabel="Opening"
            >
              Read featured note
            </LoadingLink>
          </div>

          {featuredPost.imageSrc ? (
            <StockPhoto
              src={featuredPost.imageSrc}
              alt={featuredPost.imageAlt || featuredPost.title}
              label={featuredPost.category}
              ratio="landscape"
              sizes="(max-width: 980px) 100vw, 40vw"
              className="blog-feature__image"
            />
          ) : null}
        </Reveal>
      ) : null}

      <Reveal as="section" className="blog-list-section" delay={180}>
        <SectionIntro
          eyebrow="Latest posts"
          title="Field reports, essays, and operational notes."
          body="Each post is written to keep the mission visible, practical, and accountable."
        />

        {recentPosts.length ? (
          <div className="blog-grid">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="blog-empty">More published posts will appear here as the CMS grows.</p>
        )}
      </Reveal>

      <Reveal as="section" className="dark-panel-v2 blog-index__cta" delay={220}>
        <p className="dark-panel-v2__eyebrow">Keep the record moving</p>
        <h2 className="dark-panel-v2__title">Support the programs behind these updates.</h2>
        <p className="dark-panel-v2__body">
          Contributions help turn field notes into practical support: health kits, learning resources,
          youth development, and creative advocacy that can be documented clearly.
        </p>
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
