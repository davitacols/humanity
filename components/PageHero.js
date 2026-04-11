import { LoadingLink } from "./LoadingLink";

export function PageHero({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  asideTitle,
  asideBody
}) {
  return (
    <section className="page-hero">
      <div className="page-hero__content">
        <p className="section-intro__eyebrow">{eyebrow}</p>
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
      </div>

      <aside className="page-hero__aside">
        <p className="page-hero__aside-label">Design intent</p>
        <h2>{asideTitle}</h2>
        <p>{asideBody}</p>
      </aside>
    </section>
  );
}
