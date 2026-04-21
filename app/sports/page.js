import { LoadingLink } from "../../components/LoadingLink";
import { PageHero } from "../../components/PageHero";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { StockPhoto } from "../../components/StockPhoto";
import { stockMedia } from "../../components/stockMedia";
import { sportsSpotlight } from "../../components/siteData";

const grassrootsPrograms = [
  { title: "Weekly football training", body: "Structured sessions for U-7 through U-16 age groups with volunteer coaches and basic equipment." },
  { title: "Community tournaments", body: "Local competitions that bring neighborhoods together and give young athletes match experience." },
  { title: "School partnerships", body: "Collaboration with local schools to integrate sports into after-school programs and physical education." }
];

const trainingResources = [
  { title: "Basic drills library", body: "Simple, repeatable drills for warm-ups, ball control, passing, and fitness that coaches can run with minimal equipment." },
  { title: "Coaching fundamentals", body: "Guides for volunteer coaches covering session planning, age-appropriate training, and player safety." },
  { title: "Nutrition for young athletes", body: "Practical nutrition guidance for parents and coaches supporting active children and youth." }
];

const socialChangePillars = [
  { title: "Discipline and structure", body: "Regular training builds routine, accountability, and self-discipline that carries beyond the pitch." },
  { title: "Teamwork and belonging", body: "Team sports create social bonds, reduce isolation, and give young people a sense of community." },
  { title: "Leadership development", body: "Captaincy, mentorship roles, and peer coaching develop leadership skills in young athletes." },
  { title: "Alternative to risk", body: "Structured sports programs reduce exposure to risky behaviors by offering positive, engaging alternatives." }
];

export default function SportsPage() {
  return (
    <main className="site-main page-v2">
      <PageHero
        eyebrow="Sports development"
        title="Youth empowerment through grassroots sports."
        body="Community-based training, talent development, local tournaments, and sports as a pathway to discipline, teamwork, and long-term opportunity."
        primary={{ href: "/projects/dodoma-best-sports-center", label: "View flagship project" }}
        secondary={{ href: "/donate", label: "Support sports programs" }}
        highlights={["Grassroots programs", "Training resources", "Community events", "Talent spotlights", "Sports for social change"]}
        media={stockMedia.homeHero}
        asideTitle="Current flagship"
        asideBody={`${sportsSpotlight.title} — ${sportsSpotlight.beneficiaries}, including ${sportsSpotlight.orphanSupport}.`}
        asidePoints={[sportsSpotlight.location, sportsSpotlight.ageGroups, sportsSpotlight.totalRequest]}
      />

      <Reveal as="section" delay={120}>
        <SectionIntro eyebrow="Grassroots programs" title="Community-based training initiatives." body="Structured programs that make sports accessible to children and youth in underserved communities." />
        <div className="split-v2">
          <StockPhoto src={stockMedia.homeHero.src} alt={stockMedia.homeHero.alt} label="Youth football" ratio="portrait" sizes="(max-width: 1120px) 100vw, 48vw" />
          <div style={{ display: "grid", gap: "0.85rem" }}>
            {grassrootsPrograms.map((p, i) => (
              <article key={p.title} className="card-v2">
                <div className="card-v2__top">
                  <span className="card-v2__index">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="card-v2__title">{p.title}</h3>
                <p className="card-v2__body">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" delay={180}>
        <SectionIntro eyebrow="Training resources" title="Basic drills and learning resources for coaches and athletes." body="Practical materials that work with minimal equipment and volunteer-led delivery." />
        <div className="card-grid-v2 card-grid-v2--3">
          {trainingResources.map((r, i) => (
            <article key={r.title} className="card-v2">
              <div className="card-v2__top">
                <span className="card-v2__index">{String(i + 1).padStart(2, "0")}</span>
                <p className="card-v2__eyebrow">Resource</p>
              </div>
              <h3 className="card-v2__title">{r.title}</h3>
              <p className="card-v2__body">{r.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" delay={240}>
        <SectionIntro eyebrow="Talent spotlight" title="Showcasing promising young athletes." body="The initiative documents and promotes talented youth to create pathways into academies, clubs, and professional opportunities." />
        <div className="dossier-v2">
          <div className="dossier-v2__lead">
            <h2 className="dossier-v2__title">{sportsSpotlight.title}</h2>
            <p className="dossier-v2__body">{sportsSpotlight.summary}</p>
            <p className="dossier-v2__body">{sportsSpotlight.body}</p>
            <div className="hero-actions">
              <LoadingLink href="/projects/dodoma-best-sports-center" className="button button--primary" loadingLabel="Opening">Read full proposal</LoadingLink>
            </div>
          </div>
          <div className="dossier-v2__sidebar">
            {sportsSpotlight.priorities.slice(0, 3).map((p) => (
              <article key={p.title} className="dossier-v2__fact">
                <p className="dossier-v2__fact-eyebrow">Priority</p>
                <p className="dossier-v2__fact-body">{p.title} — {p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" delay={300}>
        <SectionIntro eyebrow="Sports for social change" title="Promoting discipline, teamwork, and leadership through athletics." body="Sports as a structured alternative that builds character and opens doors." />
        <div className="card-grid-v2">
          {socialChangePillars.map((p, i) => (
            <article key={p.title} className="card-v2">
              <div className="card-v2__top">
                <span className="card-v2__index">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="card-v2__title">{p.title}</h3>
              <p className="card-v2__body">{p.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="dark-panel-v2" delay={360}>
        <h2 className="dark-panel-v2__title">Support youth sports development across the initiative.</h2>
        <p className="dark-panel-v2__body">Equipment, coaching, tournament logistics, and talent pathways all need sustained support from donors, partners, and volunteers.</p>
        <div className="hero-actions">
          <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">Donate to sports programs</LoadingLink>
          <LoadingLink href="/get-involved" className="button button--secondary" loadingLabel="Opening">Volunteer or partner</LoadingLink>
        </div>
      </Reveal>
    </main>
  );
}
