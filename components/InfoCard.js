export function InfoCard({ title, body, eyebrow, tone = "paper" }) {
  return (
    <article className={`info-card info-card--${tone}`}>
      {eyebrow ? <p className="info-card__eyebrow">{eyebrow}</p> : null}
      <h3 className="info-card__title">{title}</h3>
      <p className="info-card__body">{body}</p>
    </article>
  );
}
