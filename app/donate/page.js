import { LoadingLink } from "../../components/LoadingLink";
import { DonationCheckoutForm } from "../../components/DonationCheckoutForm";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { SupportInquiryForm } from "../../components/SupportInquiryForm";
import { stockMedia } from "../../components/stockMedia";
import { donationTiers } from "../../components/siteData";
import { getDonationContentData } from "../../lib/donation-content";
import { getPaymentProviderAvailability } from "../../lib/payment-providers";

export const revalidate = 300;

const tierDetails = [
  { amount: donationTiers[0], label: "Start", title: "Books, hygiene items, or session transport", body: "Covers learning materials, basic hygiene supplies, transport, or weekly youth activity costs." },
  { amount: donationTiers[1], label: "Steady", title: "Materials, logistics, and volunteer support", body: "Helps a program cover repeat materials, local logistics, and volunteer coordination." },
  { amount: donationTiers[2], label: "Build", title: "Back a campaign window", body: "Supports a delivery cycle such as health outreach, learning sessions, or sports mentoring." },
  { amount: donationTiers[3], label: "Partner", title: "Sponsor a visible need", body: "Supports a larger project need and opens a direct sponsorship conversation." }
];

const trustNotes = [
  "Giving routes point back to health, education, sports, or creative advocacy work.",
  "Checkout appears only where a provider route is configured.",
  "The donor form keeps sponsorship and custom support conversations from getting lost.",
  "The transparency tracker stays one click away from every giving route."
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
  if (paymentStatus === "canceled") return { tone: "warning", title: "Checkout was canceled.", body: `No payment was completed. You can start again below.` };
  if (paymentStatus === "unavailable") return { tone: "warning", title: "Direct checkout is not ready for that route.", body: "Use the donor follow-up form or choose another route." };
  return { tone: "error", title: "Payment could not be confirmed.", body: `${label} did not return a complete confirmation. Retry or use the follow-up form.` };
}

const causeImages = [stockMedia.homeStories[0], stockMedia.educationFeature, stockMedia.homeHero, stockMedia.homeStories[2]];

export default async function DonatePage({ searchParams }) {
  const params = (await searchParams) || {};
  const { funds, transparencyEntries, metrics, hasDirectPayments } = await getDonationContentData();
  const providers = getPaymentProviderAvailability();
  const hasLiveProviders = Object.values(providers).some((p) => p.configured);
  const selectedFund = findFundBySlug(funds, params.fund);
  const checkoutUnavailable = params.checkout === "unavailable";
  const paymentNotice = getPaymentNotice(params.payment, params.provider, params.reference);

  return (
    <main className="site-main donate-v2">
      {/* Hero — immersive */}
      <Reveal as="section" className="donate-hero" delay={60}>
        <img src={stockMedia.donateHero.src} alt={stockMedia.donateHero.alt} className="donate-hero__bg" />
        <div className="donate-hero__overlay" />
        <div className="donate-hero__content">
          <p className="donate-hero__eyebrow">Donations and support</p>
          <h1 className="donate-hero__title">Choose a route and fund a visible need.</h1>
          <p className="donate-hero__body">
            Support health outreach, education access, youth sport, or creative advocacy through
            named routes with public goals and documented progress.
          </p>
          <div className="hero-actions">
            <a href="#giving-routes" className="button button--primary">Choose a giving route</a>
            <LoadingLink href="/donate/transparency" className="button button--ghost-light" loadingLabel="Opening">
              View transparency
            </LoadingLink>
          </div>
        </div>
        <div className="donate-hero__stats">
          {metrics.slice(0, 4).map((m) => (
            <article key={m.label} className="donate-hero__stat">
              <p className="donate-hero__stat-value">{m.value}</p>
              <p className="donate-hero__stat-label">{m.label}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Giving routes */}
      <Reveal as="section" id="giving-routes" className="donate-v2__section" delay={100}>
        <SectionIntro
          eyebrow="Giving routes"
          title="Choose the fund that matches the work you want to move forward."
          body="Each route shows the public goal, documented support so far, and whether checkout or follow-up is the right next step."
        />
        <div className="donate-funds">
          {funds.map((fund, i) => {
            const progress = getProgress(fund);
            const img = causeImages[i % causeImages.length];
            return (
              <article key={fund.slug} className={`donate-fund${selectedFund?.slug === fund.slug ? " is-selected" : ""}`}>
                <div className="donate-fund__image">
                  <img src={img.src} alt={img.alt} />
                  <span className="donate-fund__badge">{fund.eyebrow}</span>
                </div>
                <div className="donate-fund__body">
                  <h3 className="donate-fund__title">{fund.title}</h3>
                  <p className="donate-fund__summary">{fund.summary}</p>
                  <div className="donate-fund__progress-wrap">
                    <div className="donate-fund__progress-bar" role="meter" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" aria-label={`${fund.title} progress`}>
                      <span style={{ width: `${progress}%` }} />
                    </div>
                    <div className="donate-fund__progress-meta">
                      <span>{formatNaira(fund.raisedAmount)} raised</span>
                      <strong>{progress}%</strong>
                    </div>
                  </div>
                  <div className="donate-fund__details">
                    <span>{fund.beneficiariesLabel}</span>
                    <span>{fund.statusLabel}</span>
                  </div>
                  <div className="donate-fund__actions">
                    {hasLiveProviders ? (
                      <LoadingLink href={`/donate?fund=${encodeURIComponent(fund.slug)}#live-checkout`} className="button button--primary" loadingLabel="Opening">
                        Donate now
                      </LoadingLink>
                    ) : (
                      <LoadingLink href={`/donate?fund=${encodeURIComponent(fund.slug)}#donation-intake`} className="button button--primary" loadingLabel="Opening">
                        Request follow-up
                      </LoadingLink>
                    )}
                    {fund.href && (
                      <LoadingLink href={fund.href} className="button button--secondary" loadingLabel="Opening">
                        {fund.hrefLabel || "Open route"}
                      </LoadingLink>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Reveal>

      {/* Suggested tiers */}
      <Reveal as="section" id="tiers" className="donate-v2__section" delay={140}>
        <SectionIntro
          eyebrow="Suggested levels"
          title="Use a preset amount or enter a custom gift."
          body="Suggested levels help donors start quickly. Checkout and the follow-up form both support custom amounts."
        />
        <div className="donate-tiers">
          {tierDetails.map((tier) => (
            <article key={tier.amount} className="donate-tier-card">
              <span className="donate-tier-card__label">{tier.label}</span>
              <strong className="donate-tier-card__amount">{tier.amount}</strong>
              <h3 className="donate-tier-card__title">{tier.title}</h3>
              <p className="donate-tier-card__body">{tier.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Checkout */}
      <Reveal as="section" id="live-checkout" className="donate-v2__section donate-checkout-section" delay={180}>
        <div className="donate-checkout-layout">
          <div className="donate-checkout-layout__copy">
            <SectionIntro
              eyebrow={hasLiveProviders ? "Live checkout" : "Donor follow-up"}
              title={hasLiveProviders ? "Pay through the active checkout route." : "Direct checkout is not active yet."}
              body={hasLiveProviders
                ? "Choose a giving route, enter donor details, and continue to the available secure provider."
                : "Use the donor follow-up route below for payment guidance while direct checkout is being prepared."}
            />
            <div className="donate-trust-notes">
              <p className="donate-trust-notes__label">What supporters can expect</p>
              <ul>
                {trustNotes.map((n) => <li key={n}>{n}</li>)}
              </ul>
            </div>
          </div>
          <div className="donate-checkout-layout__form">
            {paymentNotice && (
              <div className={`donate-notice donate-notice--${paymentNotice.tone}`}>
                <strong>{paymentNotice.title}</strong>
                <span>{paymentNotice.body}</span>
              </div>
            )}
            {selectedFund && (
              <div className="donate-notice">
                <strong>Selected: {selectedFund.title}</strong>
                <span>{hasLiveProviders ? "You can still switch routes in the form." : "The form below can guide the next payment step."}</span>
              </div>
            )}
            <DonationCheckoutForm funds={funds} providers={providers} initialFundSlug={selectedFund?.slug} initialProvider={params.provider} />
          </div>
        </div>
      </Reveal>

      {/* Transparency */}
      <Reveal as="section" className="donate-v2__section" delay={220}>
        <SectionIntro
          eyebrow="Trust layer"
          title="The public tracker sits beside the giving flow."
          body="Each tracker note shows the current ask, documented support, allocation summary, and related program route."
        />
        <div className="donate-ledger">
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
        <div className="donate-v2__center-action">
          <LoadingLink href="/donate/transparency" className="button button--primary" loadingLabel="Opening">
            Open full tracker
          </LoadingLink>
        </div>
      </Reveal>

      {/* Donor follow-up */}
      <Reveal as="section" id="donation-intake" className="donate-v2__section" delay={260}>
        <SectionIntro
          eyebrow="Donor follow-up"
          title="Need guidance, sponsorship, or a custom giving step?"
          body="Use the tracked form for sponsorship, custom giving, partner-level budgets, or routes that need a guided conversation."
        />
        {(checkoutUnavailable || selectedFund) && (
          <div className="donate-notice">
            <strong>{checkoutUnavailable ? "Checkout is not active for this route yet." : `Selected: ${selectedFund?.title}`}</strong>
            <span>{selectedFund ? `Focused on ${selectedFund.supportArea}. The team can guide the next step.` : "Use the form and the team will follow up by email."}</span>
          </div>
        )}
        <SupportInquiryForm variant="donation" initialValues={selectedFund ? { supportArea: selectedFund.supportArea } : undefined} />
      </Reveal>
    </main>
  );
}
