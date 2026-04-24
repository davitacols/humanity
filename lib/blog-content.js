import "server-only";

import { blogPosts } from "../components/siteData";
import { getSql } from "./db";

const fallbackBlogPosts = blogPosts;

function toDateValue(value) {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "string") {
    return new Date(value.length === 10 ? `${value}T00:00:00Z` : value);
  }

  return null;
}

function toDateInputValue(value) {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value.slice(0, 10);
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return "";
}

function formatDateLabel(value) {
  const date = toDateValue(value);

  if (!date || Number.isNaN(date.getTime())) {
    return "Field note";
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  }).format(date);
}

function getDateTime(value) {
  const date = toDateValue(value);
  return date && !Number.isNaN(date.getTime()) ? date.getTime() : 0;
}

function sortPosts(posts) {
  return [...posts].sort((a, b) => {
    if (Boolean(a.featured) !== Boolean(b.featured)) {
      return a.featured ? -1 : 1;
    }

    const dateDiff = getDateTime(b.publishedAt) - getDateTime(a.publishedAt);
    if (dateDiff !== 0) {
      return dateDiff;
    }

    return (a.displayOrder || 0) - (b.displayOrder || 0);
  });
}

function normalizePost(post) {
  return {
    id: post.id || post.slug,
    displayOrder: Number(post.displayOrder || post.display_order || 0),
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    author: post.author || "Humanity First Initiative",
    publishedAt: toDateInputValue(post.publishedAt || post.published_at),
    dateLabel: formatDateLabel(post.publishedAt || post.published_at),
    readingTime: post.readingTime || post.reading_time || "",
    imageSrc: post.imageSrc || post.image_src || "",
    imageAlt: post.imageAlt || post.image_alt || "",
    status: post.status || "published",
    featured: Boolean(post.featured),
    body: post.body || ""
  };
}

function filterPublicPosts(posts, includeDrafts) {
  if (includeDrafts) {
    return posts;
  }

  return posts.filter((post) => post.status === "published");
}

export async function getBlogContentData({ includeDrafts = false } = {}) {
  const sql = getSql();

  if (!sql) {
    return {
      posts: sortPosts(filterPublicPosts(fallbackBlogPosts.map(normalizePost), includeDrafts))
    };
  }

  try {
    const table = sql("blog_posts");
    const rows = await sql`
      select *
      from ${table}
      order by featured desc, published_at desc nulls last, display_order asc, id asc
    `;

    const posts = rows.map(normalizePost);

    return {
      posts: sortPosts(filterPublicPosts(posts, includeDrafts))
    };
  } catch (error) {
    if (error?.code !== "42P01") {
      console.error("Failed to load blog content data from Neon:", error);
    }

    return {
      posts: sortPosts(filterPublicPosts(fallbackBlogPosts.map(normalizePost), includeDrafts))
    };
  }
}

export async function getBlogPostBySlug(slug, options) {
  const { posts } = await getBlogContentData(options);
  return posts.find((post) => post.slug === slug);
}

export async function getBlogMetrics() {
  const { posts } = await getBlogContentData({ includeDrafts: true });

  return {
    total: posts.length,
    published: posts.filter((post) => post.status === "published").length,
    drafts: posts.filter((post) => post.status !== "published").length,
    featured: posts.filter((post) => post.featured).length
  };
}
