import { LoadingLink } from "../../components/LoadingLink";
import { DonationCheckoutForm } from "../../components/DonationCheckoutForm";
import { Reveal } from "../../components/Reveal";
import { SupportInquiryForm } from "../../components/SupportInquiryForm";
import { donationTiers } from "../../components/siteData";
import { getDonationContentData } from "../../lib/donation-content";
import { getPaymentProviderAvailability } from "../../lib/payment-providers";
import "./donate.css";

export const revalidate = 300;

const tierDetails = [
  { amount: donationTiers[0], label: "Start", body: "Learning materials, basic hygiene supplies, transport, or a week of youth activity." },
  { amount: donationTiers[1], label: "Steady", body: "Repeat materials, local logistics, and volunteer coordination for a program." },
  { amount: donationTiers[2], label: "Build", body: "A full delivery cycle — health outreach, learning sessions, or sports mentoring." },
  { amount: donationTiers[3], label: "Partner", body: "A larger project need, and a direct sponsorship conversation." }
];

const trustNotes = [
  "Every route points back to real health, education, sports, or creative-advocacy work.",
  "Checkout only appears where a payment provider is actually configured.",
  "Sponsorship and custom-amount requests are tracked, never lost.",
  "The public transparency tracker is one click from every giving route."
];

function formatNaira(value) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(value);
}

function getProgress(fund) {
  if (!fund.targetAmount) return 0;
  return Math.max(0, Math.min(100, Math.round((fund.raisedAmount / fund.targetAmount) * 100)));
}

function findFundBySlug(funds, slug) {
  return slug ? funds.find((f) => f.slug === slug) || null : null;
}

function getPaymentNotice(paymentStatus, provider, reference) {
  if (!paymentStatus) return null;
  const label = provider === "flutterwave" ? "Flutterwave" : provider === "paypal" ? "PayPal" : "The provider";
  if (paymentStatus === "success") return { tone: "success", title: "Payment confirmed.", body: `${label} returned a successful confirmation${reference ? ` for ${reference}` : ""}.` };
  if (paymentStatus === "canceled") return { tone: "warning", title: "Checkout was canceled.", body: "No payment was completed — you can start again below." };
  if (paymentStatus === "unavailable") return { tone: "warning", title: "Direct checkout isn't ready for that route.", body: "Use the donor follow-up form or choose another route." };
  return { tone: "error", title: "Payment could not be confirmed.", body: `${label} didn't return a complete confirmation. Retry or use the follow-up form.` };
}

export const metadata = {
  title: "Donate",
  description: "Fund a visible need at Humanity First Initiative — health, education, youth sport, or creative advocacy — through named routes with public goals and documented progress."
};

export default async function DonatePage({ searchParams }) {
  const params = (await searchParams) || {};
  const { funds, transparencyEntries, metrics } = await getDonationContentData();
  const providers = getPaymentProviderAvailability();
  const hasLiveProviders = Object.values(providers).some((p) => p.configured);
  const selectedFund = findFundBySlug(funds, params.fund);
  const checkoutUnavailable = params.checkout === "unavailable";
  const paymentNotice = getPaymentNotice(params.payment, params.provider, params.reference);

  return (
    <main className="site-main donate">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <Reveal as="section" className="donate-hero" delay={60}>
        <span className="donate-kicker">Support the work</span>
        <h1 className="donate-hero__title">Fund a visible need.</h1>
        <p className="donate-hero__lead">
          Health outreach, education access, youth sport, and creative advocacy — each a named
          route with a public goal and documented progress. Give once, and see where it goes.
        </p>
        <div className="donate-hero__actions">
          <a href="#live-checkout" className="button button--primary">Donate now</a>
          <LoadingLink href="/donate/transparency" className="button button--ghost-light" loadingLabel="Opening">
            See transparency
          </LoadingLink>
        </div>
        <div className="donate-hero__stats" aria-label="Giving at a glance">
          {metrics.slice(0, 4).map((m) => (
            <article key={m.label} className="donate-stat">
              <strong>{m.value}</strong>
              <span>{m.label}</span>
            </article>
          ))}
        </div>
      </Reveal>

      {/* ── Give (focal checkout block) ───────────────────────── */}
      <Reveal as="section" id="live-checkout" className="donate-give" delay={100}>
        <div className="donate-give__aside">
          <span className="donate-kicker">{hasLiveProviders ? "Secure checkout" : "Donor follow-up"}</span>
          <h2 className="donate-heading">
            {hasLiveProviders ? "Give to the work in a few steps." : "Start a giving conversation."}
          </h2>
          <p className="donate-give__body">
            {hasLiveProviders
              ? "Pick a route, choose an amount, and continue to a secure provider. Your gift stays tied to the program you chose."
              : "Direct checkout isn't live yet. Use the follow-up form and the team will reply with the right route, amount, and payment instructions."}
          </p>

          {paymentNotice && (
            <div className={`donate-notice donate-notice--${paymentNotice.tone}`}>
              <strong>{paymentNotice.title}</strong>
              <span>{paymentNotice.body}</span>
            </div>
          )}
          {selectedFund && (
            <div className="donate-notice donate-notice--selected">
              <strong>Selected: {selectedFund.title}</strong>
              <span>{hasLiveProviders ? "You can still switch routes in the form." : "The form below can guide the next payment step."}</span>
            </div>
          )}

          <ul className="donate-trust">
            {trustNotes.map((n) => <li key={n}>{n}</li>)}
          </ul>
          <LoadingLink href="/donate/transparency" className="donate-give__ledger-link" loadingLabel="Opening">
            Open the public tracker →
          </LoadingLink>
          <LoadingLink href="/donate/manage" className="donate-give__ledger-link" loadingLabel="Opening">
            Manage a monthly donation →
          </LoadingLink>
        </div>

        <div className="donate-give__form">
          <DonationCheckoutForm funds={funds} providers={providers} initialFundSlug={selectedFund?.slug} initialProvider={params.provider} />
        </div>
      </Reveal>

      {/* ── Routes (what your gift supports) ──────────────────── */}
      <Reveal as="section" id="giving-routes" className="donate-section donate-routes" delay={140}>
        <div className="donate-section__head">
          <span className="donate-kicker">What your gift supports</span>
          <h2 className="donate-heading">Five routes, each with a public goal.</h2>
          <p className="donate-section__sub">Pick the work you want to move forward — the giving form follows your choice.</p>
        </div>

        <div className="donate-funds">
          {funds.map((fund) => {
            const progress = getProgress(fund);
            return (
              <article key={fund.slug} className={`donate-fund${selectedFund?.slug === fund.slug ? " is-selected" : ""}`}>
                <div className="donate-fund__top">
                  <span className="donate-fund__badge">{fund.eyebrow}</span>
                  <span className="donate-fund__status">{fund.paymentUrl || hasLiveProviders ? "Checkout route" : "Follow-up route"}</span>
                </div>
                <h3 className="donate-fund__title">{fund.title}</h3>
                <p className="donate-fund__summary">{fund.summary}</p>
                <div className="donate-fund__progress">
                  <div className="donate-fund__bar" role="meter" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" aria-label={`${fund.title} progress`}>
                    <span style={{ width: `${progress}%` }} />
                  </div>
                  <div className="donate-fund__progress-meta">
                    <span>{formatNaira(fund.raisedAmount)} raised</span>
                    <strong>{progress}%</strong>
                  </div>
                </div>
                <div className="donate-fund__meta">
                  <span>{fund.beneficiariesLabel}</span>
                  <span>{fund.statusLabel}</span>
                </div>
                <div className="donate-fund__actions">
                  <LoadingLink href={`/donate?fund=${encodeURIComponent(fund.slug)}#live-checkout`} className="button button--primary" loadingLabel="Opening">
                    {hasLiveProviders ? "Give to this route" : "Request follow-up"}
                  </LoadingLink>
                  {fund.href && (
                    <LoadingLink href={fund.href} className="button button--secondary" loadingLabel="Opening">
                      {fund.hrefLabel || "Open route"}
                    </LoadingLink>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="donate-tiers" aria-label="What different amounts cover">
          {tierDetails.map((tier) => (
            <article key={tier.amount} className="donate-tier">
              <span className="donate-tier__label">{tier.label}</span>
              <strong className="donate-tier__amount">{tier.amount}</strong>
              <p className="donate-tier__body">{tier.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* ── Transparency ──────────────────────────────────────── */}
      <Reveal as="section" className="donate-section donate-ledger" delay={180}>
        <div className="donate-section__head">
          <span className="donate-kicker">Where it goes</span>
          <h2 className="donate-heading">The public tracker sits beside the giving flow.</h2>
          <p className="donate-section__sub">Each entry shows the current ask, documented support, and the program it ties back to.</p>
        </div>
        <div className="donate-ledger__rows">
          {transparencyEntries.slice(0, 4).map((entry) => (
            <article key={`${entry.periodLabel}-${entry.title}`} className="donate-ledger__row">
              <span className="donate-ledger__period">{entry.periodLabel}</span>
              <div className="donate-ledger__content">
                <h3>{entry.title}</h3>
                <p>{entry.summary}</p>
                <div className="donate-ledger__meta">
                  <span>{entry.amountLabel}</span>
                  <span>{entry.statusLabel}</span>
                </div>
              </div>
              {entry.href && (
                <LoadingLink href={entry.href} className="button button--secondary" loadingLabel="Opening">
                  {entry.ctaLabel || "Open related work"}
                </LoadingLink>
              )}
            </article>
          ))}
        </div>
        <div className="donate-ledger__cta">
          <LoadingLink href="/donate/transparency" className="button button--primary" loadingLabel="Opening">
            Open full tracker
          </LoadingLink>
        </div>
      </Reveal>

      {/* ── Other ways to give (follow-up) ────────────────────── */}
      <Reveal as="section" id="donation-intake" className="donate-section donate-followup" delay={220}>
        <div className="donate-section__head">
          <span className="donate-kicker">Other ways to give</span>
          <h2 className="donate-heading">Sponsorship, custom gifts, or a guided step.</h2>
          <p className="donate-section__sub">For partner-level budgets, custom giving, or routes that need a conversation, use the tracked form below.</p>
        </div>
        {(checkoutUnavailable || selectedFund) && (
          <div className="donate-notice donate-notice--selected">
            <strong>{checkoutUnavailable ? "Checkout isn't active for this route yet." : `Selected: ${selectedFund?.title}`}</strong>
            <span>{selectedFund ? `Focused on ${selectedFund.supportArea}. The team can guide the next step.` : "Use the form and the team will follow up by email."}</span>
          </div>
        )}
        <SupportInquiryForm variant="donation" initialValues={selectedFund ? { supportArea: selectedFund.supportArea } : undefined} />
      </Reveal>
    </main>
  );
}
