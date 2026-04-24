import { LoadingLink } from "./LoadingLink";

function formatNaira(value) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  }).format(value);
}

export function DonationRouteCard({ fund, hasLiveProviders = false }) {
  const progress =
    fund.targetAmount > 0
      ? Math.max(0, Math.min(100, Math.round((fund.raisedAmount / fund.targetAmount) * 100)))
      : 0;

  return (
    <article className="card-v2 donation-route-card">
      <p className="card-v2__eyebrow">{fund.eyebrow}</p>
      <h3 className="card-v2__title">{fund.title}</h3>
      <p className="card-v2__body">{fund.summary}</p>

      <div className="donation-route-card__progress" aria-hidden="true">
        <span className="donation-route-card__progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="donation-route-card__stats">
        <p className="donation-route-card__amount">{fund.amountLabel}</p>
        <p className="donation-route-card__meta">
          Documented so far: {formatNaira(fund.raisedAmount)}
        </p>
        <p className="donation-route-card__meta">{fund.beneficiariesLabel}</p>
        <p className="donation-route-card__meta">{fund.statusLabel}</p>
      </div>

      <div className="hero-actions donation-route-card__actions">
        {hasLiveProviders ? (
          <LoadingLink
            href={`/donate?fund=${encodeURIComponent(fund.slug)}#live-checkout`}
            className="button button--primary"
            loadingLabel="Opening"
          >
            Donate now
          </LoadingLink>
        ) : (
          <LoadingLink
            href={`/donate?fund=${encodeURIComponent(fund.slug)}#donation-intake`}
            className="button button--primary"
            loadingLabel="Opening"
          >
            Request follow-up
          </LoadingLink>
        )}
        {fund.paymentUrl ? (
          <a
            href={`/api/donation-checkout?fund=${encodeURIComponent(fund.slug)}`}
            className="button button--secondary"
          >
            Use hosted route link
          </a>
        ) : null}
        {fund.href ? (
          <LoadingLink
            href={fund.href}
            className="button button--secondary"
            loadingLabel="Opening"
          >
            {fund.hrefLabel || "Open route"}
          </LoadingLink>
        ) : null}
      </div>

      <p className="donation-route-card__note">
        {hasLiveProviders
          ? "Live checkout opens on the donate page where the donor can choose Flutterwave or PayPal."
          : fund.paymentUrl
            ? "Hosted checkout opens in the approved payment provider."
            : "Direct checkout is not live for this route yet. Use the tracked form for the current giving step."}
      </p>
    </article>
  );
}
