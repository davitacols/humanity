import { LoadingLink } from "../../components/LoadingLink";
import { DonationCheckoutForm } from "../../components/DonationCheckoutForm";
import { PageHero } from "../../components/PageHero";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
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
    title: "Books, hygiene items, or session transport",
    body: "A first gift can help cover learning materials, basic hygiene supplies, transport, or weekly youth activity costs."
  },
  {
    amount: donationTiers[1],
    label: "Steady",
    title: "Materials, logistics, and volunteer support",
    body: "Helps a program cover repeat materials, local logistics, volunteer coordination, and follow-up notes."
  },
  {
    amount: donationTiers[2],
    label: "Build",
    title: "Back a campaign window",
    body: "Supports a delivery cycle such as health outreach, learning sessions, creative production, or sports mentoring."
  },
  {
    amount: donationTiers[3],
    label: "Partner",
    title: "Sponsor a visible need",
    body: "Supports a larger project need and opens a direct sponsorship or partner conversation."
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
  "Giving routes point back to health, education, sports, or creative advocacy work.",
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
      body: "Use the donor follow-up form for payment guidance or choose another route with an active checkout option."
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
  const heroFunds = selectedFund ? [selectedFund, ...funds.filter((fund) => fund.slug !== selectedFund.slug)].slice(0, 2) : funds.slice(0, 2);

  return (
    <main className="site-main page-v2 donate-redesign">
      <PageHero
        eyebrow="Donations and support"
        title="Choose a route and fund a visible need."
        body="Support health outreach, education access, youth sport, or creative advocacy through named routes with public goals, documented progress, and follow-up where direct checkout is not active."
        primary={{ href: "#giving-routes", label: "Choose a giving route" }}
        secondary={{ href: "/donate/transparency", label: "View transparency" }}
        highlights={["Named giving routes", "Public tracker", "Donor follow-up", "Custom sponsorship"]}
        stats={metrics.slice(0, 3)}
        media={stockMedia.donateHero}
        asideLabel="Giving desk"
        asideTitle={hasLiveProviders || hasDirectPayments ? "Checkout and route tracking are connected." : "Donor follow-up is the current giving path."}
        asideBody={
          hasDirectPayments
            ? "Some routes include hosted checkout links. The public tracker stays close to the giving decision."
            : hasLiveProviders
              ? "Use the live checkout form for active providers, or request follow-up for sponsorship and custom support."
              : "Use the donor form for payment guidance, sponsorship, or custom support while direct checkout is being prepared."
        }
        asidePoints={heroFunds.map((fund) => `${fund.title}: ${getProgress(fund)}% covered`)}
      />

      <Reveal as="section" id="giving-routes" className="donate-redesign__section donate-redesign__routes-section" delay={80} variant="rise" cascade>
        <div className="donate-redesign__section-lead" data-reveal-group>
          <SectionIntro
            eyebrow="Giving routes"
            title="Choose the fund that matches the work you want to move forward."
            body="Each route shows the public goal, documented support so far, current status, and whether checkout or follow-up is the right next step."
          />
        </div>

        <div className="donate-redesign__route-list" data-reveal-group>
          {funds.map((fund) => {
            const progress = getProgress(fund);

            return (
              <article
                key={fund.slug}
                className={`donate-redesign__route${selectedFund?.slug === fund.slug ? " is-selected" : ""}`}
              >
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

      <Reveal as="section" id="live-checkout" className="donate-redesign__section donate-redesign__checkout" delay={140} variant="rise">
        <div className="donate-redesign__checkout-grid">
          <div className="donate-redesign__checkout-copy">
            <SectionIntro
              eyebrow={hasLiveProviders ? "Live checkout" : "Donor follow-up"}
              title={hasLiveProviders ? "Pay through the active checkout route." : "Direct checkout is not active yet."}
              body={
                hasLiveProviders
                  ? "Choose a giving route, enter donor details, and continue to the available secure provider. Each checkout is tied to a route and returned here with a visible status."
                  : "Use the donor follow-up route below for payment guidance, sponsorship, or custom support while direct checkout is being prepared."
              }
            />
            <div className="donate-redesign__pathway-grid donate-redesign__pathway-grid--compact">
              {pathwaySteps.map((item) => (
                <article key={item.step} className="donate-redesign__pathway-step">
                  <span>{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="donate-redesign__checkout-panel">
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
                  {hasLiveProviders
                    ? `Checkout is focused on ${selectedFund.title}. You can still switch to another route in the form.`
                    : `Follow-up is focused on ${selectedFund.title}. The form below can guide the next payment step.`}
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
          </div>
        </div>
      </Reveal>

      <Reveal as="section" id="tiers" className="donate-redesign__section" delay={170} variant="left" cascade>
        <div className="donate-redesign__section-lead" data-reveal-group>
          <SectionIntro
            eyebrow="Suggested levels"
            title="Use a preset amount or enter a custom gift."
            body="Suggested levels help donors start quickly. Checkout and the follow-up form both support custom amounts and larger sponsorship conversations."
          />
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

      <Reveal as="section" className="donate-redesign__section donate-redesign__ledger" delay={210} variant="right" cascade>
        <div className="donate-redesign__section-lead" data-reveal-group>
          <SectionIntro
            eyebrow="Trust layer"
            title="The public tracker sits beside the giving flow."
            body="Each tracker note shows the current ask, documented support, allocation summary, and related program route."
          />
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

      <Reveal as="section" id="donation-intake" className="donate-redesign__section donate-redesign__intake" delay={260} variant="rise">
        <div className="donate-redesign__intake-copy">
          <SectionIntro
            eyebrow="Donor follow-up"
            title="Need guidance, sponsorship, or a custom giving step?"
            body="Use the tracked form when you want sponsorship, a custom giving arrangement, a partner-level budget, or a route that still needs a guided conversation first."
          />

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
