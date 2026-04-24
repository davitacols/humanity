import { educationLibraryItems } from "../components/siteData";
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
  "/education/contribute",
  "/gallery",
  "/get-involved",
  "/health",
  "/programs",
  "/projects",
  "/projects/dodoma-best-sports-center",
  "/projects/premium-video",
  "/sports"
];

export default async function sitemap() {
  const siteOrigin = getSiteOrigin();
  const now = new Date();
  const { posts } = await getBlogContentData();

  const resourceRoutes = educationLibraryItems
    .map((item) => item.href)
    .filter((href) => href.startsWith("/education/resources/"));
  const blogRoutes = posts.map((post) => `/blog/${post.slug}`);

  return [...publicRoutes, ...resourceRoutes, ...blogRoutes].map((route) => ({
    url: `${siteOrigin}${route || "/"}`,
    lastModified: now
  }));
}
