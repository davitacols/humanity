import { DonationRouteCard } from "../../../components/DonationRouteCard";
import { LoadingLink } from "../../../components/LoadingLink";
import { MetricCard } from "../../../components/MetricCard";
import { PageHero } from "../../../components/PageHero";
import { Reveal } from "../../../components/Reveal";
import { SectionIntro } from "../../../components/SectionIntro";
import { stockMedia } from "../../../components/stockMedia";
import { getDonationContentData } from "../../../lib/donation-content";
import { getPaymentProviderAvailability } from "../../../lib/payment-providers";

export const revalidate = 300;

export const metadata = {
  title: "Donation Transparency Tracker",
  description:
    "Review Humanity First giving routes, current published goals, and public transparency updates tied to active programs."
};

export default async function DonationTransparencyPage() {
  const { funds, transparencyEntries, metrics, hasDirectPayments } = await getDonationContentData();
  const hasLiveProviders = Object.values(getPaymentProviderAvailability()).some(
    (provider) => provider.configured
  );

  return (
    <main className="site-main page-v2">
      <PageHero
        eyebrow="Donation transparency"
        title="A public tracker for the giving routes currently shown on the platform."
        body="Review the active funding routes, their current published goals, and the latest public notes about where support is being documented."
        primary={{ href: "/donate", label: "Return to Donate" }}
        secondary={{ href: "/projects", label: "See Related Projects" }}
        highlights={[
          "Route-by-route goals in plain language",
          "Published tracker notes tied to visible programs",
          hasDirectPayments
            ? "Secure checkout appears only on configured routes"
            : "Checkout stays hidden until a route is actually configured"
        ]}
        media={stockMedia.donateHero}
        asideTitle="Tracker contents"
        asideBody="Supporters can compare route goals, documented amounts, allocation notes, and related program pages in one place."
        asidePoints={[
          "Funding routes and tracker notes stay grouped together",
          "Public figures here complement provider records and internal reporting",
          "Route-specific donate actions still link back to the live giving flow"
        ]}
      />

      <Reveal as="section" delay={90}>
        <SectionIntro
          eyebrow="Current tracker totals"
          title="Current goals, documented support, and tracker entries."
          body="These figures roll up the currently published route goals and transparency notes, not speculative future programs."
        />
        <div className="metric-grid">
          {metrics.map((item) => (
            <MetricCard key={item.label} value={item.value} label={item.label} />
          ))}
        </div>
      </Reveal>

      <Reveal as="section" delay={120}>
        <SectionIntro
          eyebrow="Funding routes"
          title="Each route shows what the public ask is, how much has been documented, and whether checkout is live."
          body="This keeps the platform honest about what is already configurable and what still needs direct follow-up from the team."
        />
        <div className="card-grid-v2 card-grid-v2--2">
          {funds.map((fund) => (
            <DonationRouteCard key={fund.slug} fund={fund} hasLiveProviders={hasLiveProviders} />
          ))}
        </div>
      </Reveal>

      <Reveal as="section" delay={150}>
        <SectionIntro
          eyebrow="Published tracker entries"
          title="These notes capture the latest public allocation story tied to the visible routes."
          body="Each entry is short on purpose so supporters can understand the current state without needing a long report first."
        />
        <div className="card-grid-v2 card-grid-v2--2">
          {transparencyEntries.map((entry) => (
            <article key={`${entry.periodLabel}-${entry.title}`} className="card-v2">
              <p className="card-v2__eyebrow">{entry.periodLabel}</p>
              <h2 className="card-v2__title">{entry.title}</h2>
              <p className="card-v2__body">{entry.summary}</p>
              <p className="card-v2__body donation-page__meta">{entry.amountLabel}</p>
              <p className="card-v2__body donation-page__meta">{entry.allocationLabel}</p>
              <p className="card-v2__body donation-page__meta">{entry.statusLabel}</p>
              {entry.href ? (
                <LoadingLink
                  href={entry.href}
                  className="button button--secondary"
                  loadingLabel="Opening"
                >
                  {entry.ctaLabel || "Open related page"}
                </LoadingLink>
              ) : null}
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" delay={180}>
        <SectionIntro
          eyebrow="Next step"
          title="Donate through checkout or request donor follow-up."
          body="The donate page connects each funding route to live checkout when configured, or to a follow-up form for sponsorship and custom support."
        />
        <div className="hero-actions">
          <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">
            Go to Donate
          </LoadingLink>
          <LoadingLink
            href="/get-involved"
            className="button button--secondary"
            loadingLabel="Opening"
          >
            Discuss partnership instead
          </LoadingLink>
        </div>
      </Reveal>
    </main>
  );
}
