export function PhotoPanel({ title, caption, tone = "forest", tall = false }) {
  return (
    <article className={`photo-panel photo-panel--${tone}${tall ? " is-tall" : ""}`}>
      <div className="photo-panel__wash" />
      <div className="photo-panel__orb" />
      <div className="photo-panel__grain" />
      <div className="photo-panel__copy">
        <p className="photo-panel__title">{title}</p>
        <p className="photo-panel__caption">{caption}</p>
      </div>
    </article>
  );
}
