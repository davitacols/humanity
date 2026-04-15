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
    <section className="page-hero">
      <div className="page-hero__content motion-enter motion-enter--1">
        {eyebrow ? <p className="section-intro__eyebrow">{eyebrow}</p> : null}
        <h1 className="page-hero__title">{title}</h1>
        <p className="page-hero__body">{body}</p>
        <div className="hero-actions">
          {primary ? (
            <LoadingLink href={primary.href} className="button button--primary">
              {primary.label}
            </LoadingLink>
          ) : null}
          {secondary ? (
            <LoadingLink href={secondary.href} className="button button--secondary">
              {secondary.label}
            </LoadingLink>
          ) : null}
        </div>

        {highlights.length ? (
          <div className="page-hero__highlights" aria-label="Page highlights">
            {highlights.map((item) => (
              <span key={item} className="page-hero__highlight">
                {item}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <aside className="page-hero__aside motion-enter motion-enter--2">
        {media ? (
          <StockPhoto
            src={media.src}
            alt={media.alt}
            label={media.label}
            ratio={media.ratio ?? "landscape"}
            sizes="(max-width: 1120px) 100vw, 28vw"
            className="page-hero__media"
          />
        ) : null}
        <p className="page-hero__aside-label">{asideLabel}</p>
        <h2>{asideTitle}</h2>
        <p>{asideBody}</p>

        {asidePoints.length ? (
          <div className="page-hero__aside-points">
            {asidePoints.map((item) => (
              <article key={item} className="page-hero__aside-point">
                <span className="page-hero__aside-dot" aria-hidden="true" />
                <p>{item}</p>
              </article>
            ))}
          </div>
        ) : null}
      </aside>
    </section>
  );
}
