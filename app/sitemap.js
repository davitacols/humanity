import { getBlogContentData } from "../lib/blog-content";
import { getSiteOrigin } from "../lib/site";

const publicRoutes = [
  "",
  "/about",
  "/arts",
  "/blog",
  "/donate",
  "/donate/transparency",
  "/education",
  "/lms",
  "/gallery",
  "/get-involved",
  "/health",
  "/programs",
  "/projects",
  "/projects/dodoma-best-sports-center",
  "/projects/premium-video",
  "/sports",
  "/team",
  "/contact",
  "/privacy",
  "/terms"
];

export default async function sitemap() {
  const siteOrigin = getSiteOrigin();
  const now = new Date();
  const { posts } = await getBlogContentData();

  const blogRoutes = posts.map((post) => `/blog/${post.slug}`);

  return [...publicRoutes, ...blogRoutes].map((route) => ({
    url: `${siteOrigin}${route || "/"}`,
    lastModified: now
  }));
}
