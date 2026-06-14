import { LoadingLink } from "../components/LoadingLink";
import { StockPhoto } from "../components/StockPhoto";
import { programPillars, sportsSpotlight } from "../components/siteData";
import { stockMedia } from "../components/stockMedia";
import { getServerT } from "../lib/i18n/server";
import "./home.css";

export default async function HomePage() {
  const { t } = await getServerT();

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
            <span className="home__hero-eyebrow">{t("home.heroEyebrow")}</span>
            <h1 className="home__hero-title">{t("home.heroTitle")}</h1>
            <p className="home__hero-body">{t("home.heroBody")}</p>
            <div className="home__hero-actions">
              <LoadingLink href="/donate" className="button button--primary" loadingLabel={t("common.opening")}>{t("common.donateNow")}</LoadingLink>
              <LoadingLink href="/get-involved" className="button button--ghost-light" loadingLabel={t("common.opening")}>{t("common.getInvolved")}</LoadingLink>
            </div>
          </div>
          <div className="home__hero-impact">
            <p className="home__hero-impact-label">{t("home.impactLabel")}</p>
            <div className="home__hero-impact-grid">
              <div><strong>100+</strong><span>{t("home.impactChildren")}</span></div>
              <div><strong>4</strong><span>{t("home.impactPrograms")}</span></div>
              <div><strong>9</strong><span>{t("home.impactCommunities")}</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs — horizontal scroll-style row */}
      <section className="home__programs-section">
        <div className="home__programs-header">
          <h2>{t("home.programsTitle")}</h2>
          <LoadingLink href="/programs" className="home__link" loadingLabel={t("common.opening")}>{t("home.seeAllPrograms")}</LoadingLink>
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
          <StockPhoto src={stockMedia.homeStories[1].src} alt={stockMedia.homeStories[1].alt} label={t("home.featuredLabel")} sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
        <div className="home__feature-content">
          <span className="home__label">{t("home.featuredLabel")}</span>
          <h2>{sportsSpotlight.title}</h2>
          <p>{sportsSpotlight.summary}</p>
          <p>{sportsSpotlight.body}</p>
          <dl className="home__feature-meta">
            <div><dt>{t("home.locationLabel")}</dt><dd>{sportsSpotlight.location}</dd></div>
            <div><dt>{t("home.beneficiariesLabel")}</dt><dd>{sportsSpotlight.beneficiaries}</dd></div>
            <div><dt>{t("home.foundedLabel")}</dt><dd>{sportsSpotlight.founded}</dd></div>
          </dl>
          <div className="home__feature-actions">
            <LoadingLink href="/projects/dodoma-best-sports-center" className="button button--primary" loadingLabel={t("common.opening")}>{t("home.readFullProject")}</LoadingLink>
            <LoadingLink href="/donate" className="button button--ghost" loadingLabel={t("common.opening")}>{t("home.supportThisWork")}</LoadingLink>
          </div>
        </div>
      </section>

      {/* Stories row */}
      <section className="home__stories-section">
        <div className="home__stories-header">
          <h2>{t("home.fieldTitle")}</h2>
          <LoadingLink href="/blog" className="home__link" loadingLabel={t("common.opening")}>{t("home.allUpdates")}</LoadingLink>
        </div>
        <div className="home__stories">
          <LoadingLink href="/health" className="home__story" loadingLabel={t("common.opening")}>
            <StockPhoto src={stockMedia.homeStories[0].src} alt={stockMedia.homeStories[0].alt} sizes="(max-width: 820px) 100vw, 33vw" className="home__story-img" />
            <h3>{t("home.story1Title")}</h3>
            <p>{t("home.story1Body")}</p>
          </LoadingLink>
          <LoadingLink href="/sports" className="home__story" loadingLabel={t("common.opening")}>
            <StockPhoto src={stockMedia.homeStories[1].src} alt={stockMedia.homeStories[1].alt} sizes="(max-width: 820px) 100vw, 33vw" className="home__story-img" />
            <h3>{t("home.story2Title")}</h3>
            <p>{t("home.story2Body")}</p>
          </LoadingLink>
          <LoadingLink href="/arts" className="home__story" loadingLabel={t("common.opening")}>
            <StockPhoto src={stockMedia.homeStories[2].src} alt={stockMedia.homeStories[2].alt} sizes="(max-width: 820px) 100vw, 33vw" className="home__story-img" />
            <h3>{t("home.story3Title")}</h3>
            <p>{t("home.story3Body")}</p>
          </LoadingLink>
        </div>
      </section>

      {/* Education banner */}
      <section className="home__edu-banner">
        <div className="home__edu-banner-content">
          <span className="home__label">{t("home.eduLabel")}</span>
          <h2>{t("home.eduTitle")}</h2>
          <p>{t("home.eduBody")}</p>
          <LoadingLink href="/lms" className="button button--primary" loadingLabel={t("common.opening")}>{t("home.openLms")}</LoadingLink>
        </div>
        <div className="home__edu-banner-stats">
          <div><strong>7</strong><span>{t("home.eduCourses")}</span></div>
          <div><strong>24/7</strong><span>{t("home.eduAccess")}</span></div>
          <div><strong>{t("home.eduFreeValue")}</strong><span>{t("home.eduAlways")}</span></div>
        </div>
      </section>

      {/* CTA */}
      <section className="home__cta">
        <h2>{t("home.ctaTitle")}</h2>
        <p>{t("home.ctaBody")}</p>
        <div className="home__cta-actions">
          <LoadingLink href="/donate" className="button button--primary" loadingLabel={t("common.opening")}>{t("common.donateNow")}</LoadingLink>
          <LoadingLink href="/get-involved" className="button button--ghost-light" loadingLabel={t("common.opening")}>{t("common.getInvolved")}</LoadingLink>
          <LoadingLink href="/projects" className="button button--ghost-light" loadingLabel={t("common.opening")}>{t("common.viewProjects")}</LoadingLink>
        </div>
      </section>
    </main>
  );
}
