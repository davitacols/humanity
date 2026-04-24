import { LoadingLink } from "./LoadingLink";
import { Reveal } from "./Reveal";
import { StockPhoto } from "./StockPhoto";

function HeroAction({ action, variant }) {
  if (!action) {
    return null;
  }

  const className = action.className || `button ${variant}`;

  if (action.href.startsWith("http")) {
    return (
      <a href={action.href} target="_blank" rel="noreferrer" className={className}>
        {action.label}
      </a>
    );
  }

  if (action.href.startsWith("#")) {
    return (
      <a href={action.href} className={className}>
        {action.label}
      </a>
    );
  }

  return (
    <LoadingLink href={action.href} className={className} loadingLabel="Opening">
      {action.label}
    </LoadingLink>
  );
}

export function PageHero({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  highlights = [],
  stats = [],
  asideLabel = "At a glance",
  media,
  asideTitle,
  asideBody,
  asidePoints = [],
  tone = "light"
}) {
  const hasAsideContent = Boolean(asideTitle || asideBody || asidePoints.length);
  const resolvedAsideLabel = hasAsideContent ? asideLabel : null;

  return (
    <Reveal
      as="section"
      className={`page-hero-v2 page-hero-v2--${tone}`}
      variant="hero"
      intensity="sm"
      delay={30}
      cascade
      start="top 94%"
    >
      <div className="page-hero-v2__content" data-reveal-group>
        {eyebrow ? <p className="page-hero-v2__eyebrow">{eyebrow}</p> : null}
        <h1 className="page-hero-v2__title">{title}</h1>
        <p className="page-hero-v2__body">{body}</p>

        {highlights.length ? (
          <div className="page-hero-v2__highlights" aria-label="Highlights">
            {highlights.map((item) => (
              <span key={item} className="page-hero-v2__highlight">
                {item}
              </span>
            ))}
          </div>
        ) : null}

        <div className="page-hero-v2__actions hero-actions">
          <HeroAction action={primary} variant="button--primary" />
          <HeroAction action={secondary} variant="button--secondary" />
        </div>

        {stats.length ? (
          <div className="page-hero-v2__stats">
            {stats.map((item) => (
              <article key={item.label} className="page-hero-v2__stat">
                <p className="page-hero-v2__stat-value">{item.value}</p>
                <p className="page-hero-v2__stat-label">{item.label}</p>
              </article>
            ))}
          </div>
        ) : null}
      </div>

      {media || hasAsideContent ? (
        <aside className="page-hero-v2__aside" data-reveal-group>
          {media ? (
            <div className="page-hero-v2__media-shell">
              <StockPhoto
                src={media.src}
                alt={media.alt}
                label={media.label}
                ratio={media.ratio ?? "landscape"}
                sizes="(max-width: 1120px) 100vw, 28vw"
                className="page-hero-v2__media"
              />
            </div>
          ) : null}

          {hasAsideContent ? (
            <div className="page-hero-v2__aside-card">
              {resolvedAsideLabel ? <p className="page-hero-v2__aside-label">{resolvedAsideLabel}</p> : null}
              {asideTitle ? <h2 className="page-hero-v2__aside-title">{asideTitle}</h2> : null}
              {asideBody ? <p className="page-hero-v2__aside-body">{asideBody}</p> : null}

              {asidePoints.length ? (
                <div className="page-hero-v2__aside-points">
                  {asidePoints.map((item) => (
                    <article key={item} className="page-hero-v2__aside-point">
                      <span className="page-hero-v2__aside-dot" aria-hidden="true" />
                      <p>{item}</p>
                    </article>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </aside>
      ) : null}
    </Reveal>
  );
}
