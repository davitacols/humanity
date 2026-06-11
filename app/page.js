import { LoadingLink } from "../components/LoadingLink";
import { StockPhoto } from "../components/StockPhoto";
import { programPillars, sportsSpotlight } from "../components/siteData";
import { stockMedia } from "../components/stockMedia";
import "./home.css";

export default function HomePage() {
  return (
    <main className="site-main home">
      {/* Hero */}
      <section className="home__hero">
        <div className="home__hero-media">
          <img src={stockMedia.aboutHero.src} alt={stockMedia.aboutHero.alt} className="home__hero-img" />
          <div className="home__hero-overlay" />
        </div>
        <div className="home__hero-inner">
          <div className="home__hero-content">
            <span className="home__hero-eyebrow">Humanity First Initiative</span>
            <h1 className="home__hero-title">Every child deserves a chance to thrive.</h1>
            <p className="home__hero-body">
              We connect communities across Africa with health outreach, education, youth sports, 
              and creative advocacy — so families get the support they need, when they need it.
            </p>
            <div className="home__hero-actions">
              <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">Donate now</LoadingLink>
              <LoadingLink href="/get-involved" className="button button--ghost-light" loadingLabel="Opening">Get involved</LoadingLink>
            </div>
          </div>
          <div className="home__hero-impact">
            <p className="home__hero-impact-label">Your impact so far</p>
            <div className="home__hero-impact-grid">
              <div><strong>100+</strong><span>Children supported</span></div>
              <div><strong>4</strong><span>Active programs</span></div>
              <div><strong>9</strong><span>Communities reached</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs — horizontal scroll-style row */}
      <section className="home__programs-section">
        <div className="home__programs-header">
          <h2>Programs we run</h2>
          <LoadingLink href="/programs" className="home__link" loadingLabel="Opening">See all programs →</LoadingLink>
        </div>
        <div className="home__programs">
          {programPillars.map((pillar) => (
            <LoadingLink key={pillar.title} href={pillar.href} className="home__program" loadingLabel="Opening">
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
              <span className="home__program-arrow">→</span>
            </LoadingLink>
          ))}
        </div>
      </section>

      {/* Featured appeal — big visual */}
      <section className="home__feature">
        <div className="home__feature-media">
          <StockPhoto src={stockMedia.homeStories[1].src} alt={stockMedia.homeStories[1].alt} label="Current project" sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
        <div className="home__feature-content">
          <span className="home__label">Featured project</span>
          <h2>{sportsSpotlight.title}</h2>
          <p>{sportsSpotlight.summary}</p>
          <p>{sportsSpotlight.body}</p>
          <dl className="home__feature-meta">
            <div><dt>Location</dt><dd>{sportsSpotlight.location}</dd></div>
            <div><dt>Beneficiaries</dt><dd>{sportsSpotlight.beneficiaries}</dd></div>
            <div><dt>Founded</dt><dd>{sportsSpotlight.founded}</dd></div>
          </dl>
          <div className="home__feature-actions">
            <LoadingLink href="/projects/dodoma-best-sports-center" className="button button--primary" loadingLabel="Opening">Read full project</LoadingLink>
            <LoadingLink href="/donate" className="button button--ghost" loadingLabel="Opening">Support this work</LoadingLink>
          </div>
        </div>
      </section>

      {/* Stories row */}
      <section className="home__stories-section">
        <div className="home__stories-header">
          <h2>From the field</h2>
          <LoadingLink href="/blog" className="home__link" loadingLabel="Opening">All updates →</LoadingLink>
        </div>
        <div className="home__stories">
          <LoadingLink href="/health" className="home__story" loadingLabel="Opening">
            <StockPhoto src={stockMedia.homeStories[0].src} alt={stockMedia.homeStories[0].alt} sizes="(max-width: 820px) 100vw, 33vw" className="home__story-img" />
            <h3>Maternal and child health support</h3>
            <p>Mobile clinic visits, hygiene kits, and follow-up check-ins for mothers and newborns in underserved communities.</p>
          </LoadingLink>
          <LoadingLink href="/sports" className="home__story" loadingLabel="Opening">
            <StockPhoto src={stockMedia.homeStories[1].src} alt={stockMedia.homeStories[1].alt} sizes="(max-width: 820px) 100vw, 33vw" className="home__story-img" />
            <h3>Sport creates structure and belonging</h3>
            <p>Weekly training sessions and mentorship create a disciplined, positive environment for young people.</p>
          </LoadingLink>
          <LoadingLink href="/arts" className="home__story" loadingLabel="Opening">
            <StockPhoto src={stockMedia.homeStories[2].src} alt={stockMedia.homeStories[2].alt} sizes="(max-width: 820px) 100vw, 33vw" className="home__story-img" />
            <h3>Storytelling keeps communities visible</h3>
            <p>Film, photography, and spoken-word projects amplify community voices and campaign goals.</p>
          </LoadingLink>
        </div>
      </section>

      {/* Education banner */}
      <section className="home__edu-banner">
        <div className="home__edu-banner-content">
          <span className="home__label">Education platform</span>
          <h2>Free courses for community learners</h2>
          <p>Digital skills, coding foundations, and facilitator training — all mobile-friendly, self-paced, and certificate-ready.</p>
          <LoadingLink href="/lms" className="button button--primary" loadingLabel="Opening">Open the LMS</LoadingLink>
        </div>
        <div className="home__edu-banner-stats">
          <div><strong>7</strong><span>Courses</span></div>
          <div><strong>24/7</strong><span>Access</span></div>
          <div><strong>Free</strong><span>Always</span></div>
        </div>
      </section>

      {/* CTA */}
      <section className="home__cta">
        <h2>Ready to make a difference?</h2>
        <p>Every contribution — time, money, expertise, or partnership — goes directly to documented community programs.</p>
        <div className="home__cta-actions">
          <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">Donate now</LoadingLink>
          <LoadingLink href="/get-involved" className="button button--ghost-light" loadingLabel="Opening">Get involved</LoadingLink>
          <LoadingLink href="/projects" className="button button--ghost-light" loadingLabel="Opening">View projects</LoadingLink>
        </div>
      </section>
    </main>
  );
}
