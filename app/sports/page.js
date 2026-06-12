import { LoadingLink } from "../../components/LoadingLink";
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

export const metadata = {
  title: "Sports Development",
  description: "Youth sports programs building discipline, belonging, and opportunity — including the Dodoma Best Sports Center project."
};

export default function SportsPage() {
  return (
    <main className="site-main sports-v2">
      {/* Hero */}
      <Reveal as="section" className="about-hero" delay={60}>
        <img src={stockMedia.homeHero.src} alt={stockMedia.homeHero.alt} className="about-hero__bg" />
        <div className="about-hero__overlay" />
        <div className="about-hero__content">
          <p className="about-hero__eyebrow">Sports development</p>
          <h1 className="about-hero__title">Youth empowerment through grassroots sports.</h1>
          <p className="about-hero__body">
            Community-based training, talent development, local tournaments, and sports as a
            pathway to discipline, teamwork, and long-term opportunity.
          </p>
          <div className="hero-actions">
            <LoadingLink href="/projects/dodoma-best-sports-center" className="button button--primary" loadingLabel="Opening">View flagship project</LoadingLink>
            <LoadingLink href="/donate" className="button button--ghost-light" loadingLabel="Opening">Support sports programs</LoadingLink>
          </div>
        </div>
        <div className="about-hero__stats">
          <article className="about-hero__stat"><p className="about-hero__stat-value">{sportsSpotlight.beneficiaries.split(" ")[0]}</p><p className="about-hero__stat-label">children and youth enrolled</p></article>
          <article className="about-hero__stat"><p className="about-hero__stat-value">{sportsSpotlight.orphanSupport.split(" ")[0]}</p><p className="about-hero__stat-label">orphans currently supported</p></article>
          <article className="about-hero__stat"><p className="about-hero__stat-value">3</p><p className="about-hero__stat-label">age groups in training</p></article>
        </div>
      </Reveal>

      {/* Grassroots programs */}
      <Reveal as="section" className="sports-v2__section" delay={100}>
        <div className="sports-v2__grassroots">
          <div className="sports-v2__grassroots-media">
            <StockPhoto src={stockMedia.homeHero.src} alt={stockMedia.homeHero.alt} label="Youth football" ratio="portrait" sizes="(max-width: 1120px) 100vw, 44vw" />
          </div>
          <div className="sports-v2__grassroots-copy">
            <SectionIntro eyebrow="Grassroots programs" title="Community-based training initiatives." body="Structured programs that make sports accessible to children and youth in underserved communities." />
            <div className="sports-v2__grassroots-list">
              {grassrootsPrograms.map((p, i) => (
                <article key={p.title} className="sports-v2__grassroots-item">
                  <span className="sports-v2__grassroots-index">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Training resources */}
      <Reveal as="section" className="sports-v2__section" delay={160}>
        <SectionIntro eyebrow="Training resources" title="Basic drills and learning resources for coaches and athletes." body="Practical materials that work with minimal equipment and volunteer-led delivery." />
        <div className="sports-v2__resources">
          {trainingResources.map((r, i) => (
            <article key={r.title} className="sports-v2__resource">
              <span className="sports-v2__resource-index">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="sports-v2__resource-title">{r.title}</h3>
              <p className="sports-v2__resource-body">{r.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Dodoma spotlight */}
      <Reveal as="section" className="sports-v2__section" delay={220}>
        <div className="sports-v2__spotlight">
          <div className="sports-v2__spotlight-copy">
            <p className="sports-v2__spotlight-eyebrow">Flagship project</p>
            <h2 className="sports-v2__spotlight-title">{sportsSpotlight.title}</h2>
            <p className="sports-v2__spotlight-body">{sportsSpotlight.summary}</p>
            <p className="sports-v2__spotlight-body">{sportsSpotlight.body}</p>
            <div className="sports-v2__spotlight-facts">
              {[
                ["Location", sportsSpotlight.location],
                ["Reach", sportsSpotlight.beneficiaries],
                ["Support", sportsSpotlight.orphanSupport],
                ["Current ask", sportsSpotlight.totalRequest]
              ].map(([label, value]) => (
                <div key={label} className="sports-v2__spotlight-fact">
                  <span className="sports-v2__spotlight-fact-label">{label}</span>
                  <span className="sports-v2__spotlight-fact-value">{value}</span>
                </div>
              ))}
            </div>
            <div className="hero-actions">
              <LoadingLink href="/projects/dodoma-best-sports-center" className="button button--primary" loadingLabel="Opening">Read full proposal</LoadingLink>
              <LoadingLink href="/donate" className="button button--ghost-light" loadingLabel="Opening">Donate to this work</LoadingLink>
            </div>
          </div>
          <div className="sports-v2__spotlight-priorities">
            <p className="sports-v2__spotlight-priorities-label">Current priorities</p>
            {sportsSpotlight.priorities.map((p) => (
              <article key={p.title} className="sports-v2__spotlight-priority">
                <h4>{p.title}</h4>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Social change */}
      <Reveal as="section" className="sports-v2__section" delay={280}>
        <SectionIntro eyebrow="Sports for social change" title="Promoting discipline, teamwork, and leadership through athletics." body="Sports as a structured alternative that builds character and opens doors." />
        <div className="sports-v2__pillars">
          {socialChangePillars.map((p, i) => (
            <article key={p.title} className="sports-v2__pillar">
              <span className="sports-v2__pillar-index">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="sports-v2__pillar-title">{p.title}</h3>
              <p className="sports-v2__pillar-body">{p.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section" className="sports-v2__section" delay={340}>
        <div className="sports-v2__cta">
          <h2 className="sports-v2__cta-title">Support youth sports development across the initiative.</h2>
          <p className="sports-v2__cta-body">Equipment, coaching, tournament logistics, and talent pathways all need sustained support from donors, partners, and volunteers.</p>
          <div className="hero-actions">
            <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">Donate to sports programs</LoadingLink>
            <LoadingLink href="/get-involved" className="button button--ghost-light" loadingLabel="Opening">Volunteer or partner</LoadingLink>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
