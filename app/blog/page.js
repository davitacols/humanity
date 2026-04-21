import { LoadingLink } from "../../components/LoadingLink";
import { PageHero } from "../../components/PageHero";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";

const posts = [
  { title: "Maternal health kits reach 50 families in first outreach", category: "Field report", date: "April 2026", body: "The first batch of maternal health kits was distributed to mothers and newborns across three communities, with follow-up visits scheduled for the coming weeks." },
  { title: "Dodoma Best Sports Center launches U-7 training group", category: "Program update", date: "March 2026", body: "The youngest age group at the sports center began structured training sessions, expanding the program's reach to children as young as seven." },
  { title: "Education hub crosses 12 curated resources", category: "Milestone", date: "March 2026", body: "The education library now includes downloadable guides, external lessons, facilitator toolkits, and coding pathways — all reviewed and organized into tracks." },
  { title: "Community storytelling campaign opens for submissions", category: "Campaign", date: "February 2026", body: "Artists, photographers, and spoken word performers are invited to submit work for the Voices of Resilience creative advocacy campaign." },
  { title: "Volunteer call for community tournament support", category: "Volunteer", date: "February 2026", body: "The initiative is looking for volunteers to help organize, referee, and document upcoming community football tournaments." },
  { title: "Nutrition flyer campaign enters design phase", category: "Campaign", date: "January 2026", body: "Quick-use nutrition guides for parents and caregivers are being designed for print distribution at community health events." }
];

const categories = ["All", "Field report", "Program update", "Milestone", "Campaign", "Volunteer"];

export default function BlogPage() {
  return (
    <main className="site-main page-v2">
      <PageHero
        eyebrow="Blog and news"
        title="Articles, updates, and field reports from the initiative."
        body="Stay informed about program progress, campaign launches, volunteer opportunities, and stories from the field."
        primary={{ href: "/projects", label: "View projects" }}
        secondary={{ href: "/get-involved", label: "Get involved" }}
        asideTitle="What you'll find here"
        asideBody="Field reports, program milestones, campaign announcements, and volunteer calls — all tied to real work on the ground."
      />

      <Reveal as="section" delay={120}>
        <SectionIntro eyebrow="Latest updates" title="Recent articles and field reports." body="Each post is tied to a real program, campaign, or milestone." />
        <div className="card-grid-v2 card-grid-v2--2">
          {posts.map((post) => (
            <article key={post.title} className="card-v2">
              <div className="card-v2__top">
                <p className="card-v2__eyebrow">{post.category}</p>
                <span className="card-v2__index" style={{ width: "auto", padding: "0 0.6rem", fontSize: "0.72rem" }}>{post.date}</span>
              </div>
              <h3 className="card-v2__title">{post.title}</h3>
              <p className="card-v2__body">{post.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="dark-panel-v2" delay={200}>
        <h2 className="dark-panel-v2__title">More updates are published as programs grow.</h2>
        <p className="dark-panel-v2__body">Field reports, campaign documentation, and milestone announcements are added as the initiative expands across sectors and countries.</p>
        <div className="hero-actions">
          <LoadingLink href="/projects" className="button button--primary" loadingLabel="Opening">Explore projects</LoadingLink>
          <LoadingLink href="/donate" className="button button--secondary" loadingLabel="Opening">Support the work</LoadingLink>
        </div>
      </Reveal>
    </main>
  );
}
