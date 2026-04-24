import { LoadingLink } from "../../components/LoadingLink";
import { DonationCheckoutForm } from "../../components/DonationCheckoutForm";
import { Reveal } from "../../components/Reveal";
import { StockPhoto } from "../../components/StockPhoto";
import { SupportInquiryForm } from "../../components/SupportInquiryForm";
import { stockMedia } from "../../components/stockMedia";
import { donationTiers } from "../../components/siteData";
import { getDonationContentData } from "../../lib/donation-content";
import { getPaymentProviderAvailability } from "../../lib/payment-providers";

export const revalidate = 300;

const tierDetails = [
  {
    amount: donationTiers[0],
    label: "Start",
    title: "Small practical help",
    body: "Useful for a first gift toward books, hygiene items, transport, or weekly youth activity."
  },
  {
    amount: donationTiers[1],
    label: "Steady",
    title: "Keep a route moving",
    body: "Helps a program cover materials, logistics, volunteer support, and documented follow-up."
  },
  {
    amount: donationTiers[2],
    label: "Build",
    title: "Back a campaign window",
    body: "Supports a larger delivery cycle such as health outreach, learning sessions, or sports mentoring."
  },
  {
    amount: donationTiers[3],
    label: "Partner",
    title: "Sponsor a visible need",
    body: "Best for sponsors, organizations, or donors who want a deeper project conversation."
  }
];

const pathwaySteps = [
  {
    step: "01",
    title: "Choose a route",
    body: "Start with the public fund that matches the work you care about."
  },
  {
    step: "02",
    title: "Give or request follow-up",
    body: "Use checkout where it is live, or the donor form when the route needs a conversation."
  },
  {
    step: "03",
    title: "Track the public story",
    body: "Review goals, documented support, and published updates in the tracker."
  }
];

const trustNotes = [
  "Giving routes point back to visible programs instead of a vague donation bucket.",
  "Checkout appears only where a provider route is configured.",
  "The donor form keeps sponsorship and custom support conversations from getting lost.",
  "The transparency tracker stays one click away from every giving route."
];

function formatNaira(value) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  }).format(value);
}

function getProgress(fund) {
  if (!fund.targetAmount) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round((fund.raisedAmount / fund.targetAmount) * 100)));
}

function findFundBySlug(funds, slug) {
  if (!slug) {
    return null;
  }

  return funds.find((fund) => fund.slug === slug) || null;
}

function getPaymentNotice(paymentStatus, provider, reference) {
  if (!paymentStatus) {
    return null;
  }

  const providerLabel =
    provider === "flutterwave" ? "Flutterwave" : provider === "paypal" ? "PayPal" : "The provider";

  if (paymentStatus === "success") {
    return {
      tone: "success",
      title: "Payment confirmed.",
      body: `${providerLabel} returned a successful payment confirmation${reference ? ` for ${reference}` : ""}.`
    };
  }

  if (paymentStatus === "canceled") {
    return {
      tone: "warning",
      title: "Checkout was canceled.",
      body: `No payment was completed${provider ? ` in ${providerLabel}` : ""}. You can start again below whenever you are ready.`
    };
  }

  if (paymentStatus === "unavailable") {
    return {
      tone: "warning",
      title: "Direct checkout is not ready for that route.",
      body: "Use the live checkout form below or the donor follow-up form if the route still needs a guided next step."
    };
  }

  return {
    tone: "error",
    title: "Payment could not be confirmed.",
    body: `${providerLabel} did not return a complete payment confirmation. You can retry the checkout or use the donor follow-up form instead.`
  };
}

export default async function DonatePage({ searchParams }) {
  const params = (await searchParams) || {};
  const { funds, transparencyEntries, metrics, hasDirectPayments } = await getDonationContentData();
  const providers = getPaymentProviderAvailability();
  const hasLiveProviders = Object.values(providers).some((provider) => provider.configured);
  const selectedFund = findFundBySlug(funds, params.fund);
  const checkoutUnavailable = params.checkout === "unavailable";
  const paymentNotice = getPaymentNotice(params.payment, params.provider, params.reference);

  return (
    <main className="site-main page-v2 donate-redesign">
      <section className="donate-redesign__hero">
        <div className="donate-redesign__hero-media" aria-hidden="true">
          <StockPhoto
            src={stockMedia.donateHero.src}
            alt=""
            sizes="100vw"
            className="donate-redesign__hero-photo"
            priority
          />
        </div>

        <div className="donate-redesign__hero-content">
          <div className="donate-redesign__hero-copy">
            <p className="donate-redesign__kicker">Donations and support</p>
            <h1>Give to work people can see.</h1>
            <p>
              Choose a cause-specific giving route, use secure checkout where it is active,
              or send a tracked donor request when the team needs to guide sponsorship,
              partnership, or custom support.
            </p>

            <div className="donate-redesign__hero-actions">
              <LoadingLink href="#giving-routes" className="button button--primary" loadingLabel="Opening">
                Choose a giving route
              </LoadingLink>
              <LoadingLink
                href="/donate/transparency"
                className="button button--secondary"
                loadingLabel="Opening"
              >
                View transparency
              </LoadingLink>
            </div>
          </div>

          <aside className="donate-redesign__giving-desk" aria-label="Donation status summary">
            <p className="donate-redesign__desk-label">Giving desk</p>
            <h2>{hasDirectPayments ? "Checkout is live on configured routes." : "Follow-up is the live giving path today."}</h2>
            <p>
              {hasDirectPayments
                ? "Some routes still keep their own hosted checkout links. The live payment form below is the main donation path."
                : hasLiveProviders
                  ? "Flutterwave and PayPal are available below. Donors can choose the provider that fits their payment context."
                  : "Direct payment is not configured yet. The donor form still creates a tracked next step for sponsorship or custom support."}
            </p>
            <div className="donate-redesign__desk-metrics">
              {metrics.slice(0, 3).map((item) => (
                <div key={item.label} className="donate-redesign__desk-metric">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <Reveal as="section" className="donate-redesign__section donate-redesign__pathway" delay={80} variant="rise">
        <div className="donate-redesign__section-head">
          <p className="donate-redesign__kicker">How giving works</p>
          <h2>Simple enough to act on, clear enough to trust.</h2>
          <p>
            The donation flow keeps action and accountability together: route, amount,
            follow-up, and public proof all stay visible.
          </p>
        </div>

        <div className="donate-redesign__pathway-grid">
          {pathwaySteps.map((item) => (
            <article key={item.step} className="donate-redesign__pathway-step">
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" id="tiers" className="donate-redesign__section" delay={120} variant="left" cascade>
        <div className="donate-redesign__split-head">
          <div>
            <p className="donate-redesign__kicker">Suggested levels</p>
            <h2>Pick a starting level before you choose a cause.</h2>
          </div>
          <p>
            These are prompts, not limits. Donors can still use the form for a custom
            amount, recurring support, or a partner-level budget.
          </p>
        </div>

        <div className="donate-redesign__tier-rail" data-reveal-group>
          {tierDetails.map((tier) => (
            <article key={tier.amount} className="donate-redesign__tier">
              <span>{tier.label}</span>
              <strong>{tier.amount}</strong>
              <h3>{tier.title}</h3>
              <p>{tier.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" id="giving-routes" className="donate-redesign__section" delay={160} variant="rise" cascade>
        <div className="donate-redesign__split-head">
          <div>
            <p className="donate-redesign__kicker">Giving routes</p>
            <h2>Choose the fund that matches the work you want to move forward.</h2>
          </div>
          <p>
            Each route shows the public goal, documented support so far, current status,
            and whether checkout or follow-up is the right next step.
          </p>
        </div>

        <div className="donate-redesign__route-list" data-reveal-group>
          {funds.map((fund) => {
            const progress = getProgress(fund);

            return (
              <article key={fund.slug} className="donate-redesign__route">
                <div className="donate-redesign__route-main">
                  <div className="donate-redesign__route-label-row">
                    <span className="donate-redesign__route-eyebrow">{fund.eyebrow}</span>
                    <span className="donate-redesign__route-status">
                      {fund.paymentUrl ? "Checkout ready" : "Follow-up route"}
                    </span>
                  </div>
                  <h3>{fund.title}</h3>
                  <p>{fund.summary}</p>
                </div>

                <div className="donate-redesign__route-progress">
                  <div className="donate-redesign__progress-label">
                    <span>{fund.amountLabel}</span>
                    <strong>{progress}% covered</strong>
                  </div>
                  <div
                    className="donate-redesign__progress"
                    role="meter"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={progress}
                    aria-label={`${fund.title} funding progress`}
                  >
                    <span style={{ width: `${progress}%` }} />
                  </div>
                  <div className="donate-redesign__route-meta">
                    <span>Documented: {formatNaira(fund.raisedAmount)}</span>
                    <span>{fund.beneficiariesLabel}</span>
                    <span>{fund.statusLabel}</span>
                  </div>
                </div>

                <div className="donate-redesign__route-actions">
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
                    <LoadingLink href={fund.href} className="button button--secondary" loadingLabel="Opening">
                      {fund.hrefLabel || "Open route"}
                    </LoadingLink>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </Reveal>

      <Reveal as="section" className="donate-redesign__section donate-redesign__ledger" delay={210} variant="right" cascade>
        <div className="donate-redesign__section-head">
          <p className="donate-redesign__kicker">Trust layer</p>
          <h2>The public tracker sits beside the giving flow.</h2>
          <p>
            Supporters should not have to guess what the ask is or where to look for updates.
            The latest tracker notes stay close to the donation decision.
          </p>
        </div>

        <div className="donate-redesign__ledger-grid">
          <div className="donate-redesign__ledger-list" data-reveal-group>
            {transparencyEntries.slice(0, 4).map((entry) => (
              <article key={`${entry.periodLabel}-${entry.title}`} className="donate-redesign__ledger-row">
                <span>{entry.periodLabel}</span>
                <div>
                  <h3>{entry.title}</h3>
                  <p>{entry.summary}</p>
                  <small>{entry.amountLabel}</small>
                  <small>{entry.statusLabel}</small>
                </div>
                {entry.href ? (
                  <LoadingLink href={entry.href} className="donate-redesign__text-link" loadingLabel="Opening">
                    {entry.ctaLabel || "Open related work"}
                  </LoadingLink>
                ) : null}
              </article>
            ))}
          </div>

          <aside className="donate-redesign__trust-panel">
            <p className="donate-redesign__kicker">What supporters can expect</p>
            <ul>
              {trustNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            <LoadingLink href="/donate/transparency" className="button button--primary" loadingLabel="Opening">
              Open full tracker
            </LoadingLink>
          </aside>
        </div>
      </Reveal>

      <Reveal as="section" id="live-checkout" className="donate-redesign__section donate-redesign__checkout" delay={235} variant="rise">
        <div className="donate-redesign__split-head">
          <div>
            <p className="donate-redesign__kicker">Live checkout</p>
            <h2>Pay with Flutterwave or PayPal without leaving the donation flow blind.</h2>
          </div>
          <p>
            Flutterwave is set up for NGN support. PayPal is available for USD payments.
            Each checkout is tied to a specific route and returned here with a visible status.
          </p>
        </div>

        {paymentNotice ? (
          <div className={`donate-redesign__payment-notice donate-redesign__payment-notice--${paymentNotice.tone}`}>
            <strong>{paymentNotice.title}</strong>
            <span>{paymentNotice.body}</span>
          </div>
        ) : null}

        {selectedFund ? (
          <div className="donate-redesign__notice">
            <strong>Selected giving route.</strong>
            <span>
              Live checkout is focused on {selectedFund.title}. You can still switch to another route in the form.
            </span>
          </div>
        ) : null}

        <div className="donate-redesign__checkout-shell">
          <DonationCheckoutForm
            funds={funds}
            providers={providers}
            initialFundSlug={selectedFund?.slug}
            initialProvider={params.provider}
          />
        </div>
      </Reveal>

      <Reveal as="section" id="donation-intake" className="donate-redesign__section donate-redesign__intake" delay={260} variant="rise">
        <div className="donate-redesign__intake-copy">
          <p className="donate-redesign__kicker">Donor follow-up</p>
          <h2>Need guidance, sponsorship, or a custom giving step?</h2>
          <p>
            Use the tracked form when you want sponsorship, a custom giving arrangement,
            a partner-level budget, or a route that still needs a guided conversation first.
          </p>

          {(checkoutUnavailable || selectedFund) && (
            <div className="donate-redesign__notice">
              <strong>{checkoutUnavailable ? "Checkout is not active for this route yet." : "Selected giving route."}</strong>
              <span>
                {selectedFund
                  ? `The form is focused on ${selectedFund.supportArea}. The team can guide the current giving step or sponsorship path.`
                  : "Use the form and the team will guide the current giving step by email."}
              </span>
            </div>
          )}
        </div>

        <div className="donate-redesign__form-shell">
          <SupportInquiryForm
            variant="donation"
            initialValues={selectedFund ? { supportArea: selectedFund.supportArea } : undefined}
          />
        </div>
      </Reveal>
    </main>
  );
}
