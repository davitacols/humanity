export function MetricCard({ value, label }) {
  return (
    <article className="metric-card">
      <p className="metric-card__value">{value}</p>
      <p className="metric-card__label">{label}</p>
    </article>
  );
}
