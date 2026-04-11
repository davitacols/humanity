export function SectionIntro({ eyebrow, title, body, align = "left" }) {
  return (
    <div className={`section-intro section-intro--${align}`}>
      <p className="section-intro__eyebrow">{eyebrow}</p>
      <h2 className="section-intro__title">{title}</h2>
      <p className="section-intro__body">{body}</p>
    </div>
  );
}
