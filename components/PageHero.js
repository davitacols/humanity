import { LoadingLink } from "./LoadingLink";
import { StockPhoto } from "./StockPhoto";

export function PageHero({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  highlights = [],
  asideLabel = "At a glance",
  media,
  asideTitle,
  asideBody,
  asidePoints = []
}) {
  return (
    <section className="page-hero-v2">
      <div className="page-hero-v2__content">
        {eyebrow ? <p className="page-hero-v2__eyebrow">{eyebrow}</p> : null}
        <h1 className="page-hero-v2__title">{title}</h1>
        <p className="page-hero-v2__body">{body}</p>

        {highlights.length ? (
          <div className="page-hero-v2__highlights">
            {highlights.map((item) => (
              <span key={item} className="page-hero-v2__highlight">{item}</span>
            ))}
          </div>
        ) : null}

        <div className="hero-actions">
          {primary ? (
            <LoadingLink href={primary.href} className="button button--primary" loadingLabel="Opening">
              {primary.label}
            </LoadingLink>
          ) : null}
          {secondary ? (
            <LoadingLink href={secondary.href} className="button button--secondary" loadingLabel="Opening">
              {secondary.label}
            </LoadingLink>
          ) : null}
        </div>
      </div>

      <aside className="page-hero-v2__aside">
        {media ? (
          <StockPhoto
            src={media.src}
            alt={media.alt}
            label={media.label}
            ratio={media.ratio ?? "landscape"}
            sizes="(max-width: 1120px) 100vw, 28vw"
            className="page-hero-v2__media"
          />
        ) : null}
        <p className="page-hero-v2__aside-label">{asideLabel}</p>
        <h2 className="page-hero-v2__aside-title">{asideTitle}</h2>
        <p className="page-hero-v2__aside-body">{asideBody}</p>

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
      </aside>
    </section>
  );
}
