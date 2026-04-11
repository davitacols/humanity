import { InfoCard } from "../../components/InfoCard";
import { MetricCard } from "../../components/MetricCard";
import { PageHero } from "../../components/PageHero";
import { donationCauses, donationTiers } from "../../components/siteData";

export default function DonatePage() {
  return (
    <main className="site-main">
      <PageHero
        eyebrow="Donations and support"
        title="A giving flow that feels warm, secure, and transparent."
        body="The donation page is built to combine emotional clarity with donor confidence: simple giving tiers, specific causes, and visible transparency cues."
        primary={{ href: "#tiers", label: "Choose a Tier" }}
        secondary={{ href: "/projects", label: "See What Support Funds" }}
        asideTitle="Trust-building design"
        asideBody="Donation pages convert better when they feel direct and grounded. The layout keeps the ask clear, then follows it with causes and a simple reporting rhythm."
      />

      <section className="section" id="tiers">
        <div className="metric-grid">
          {donationTiers.map((tier) => (
            <MetricCard key={tier} value={tier} label="Suggested giving tier" />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="info-grid info-grid--two">
          {donationCauses.map((cause, index) => (
            <InfoCard
              key={cause}
              eyebrow="Cause-based support"
              title={cause}
              body="Each cause card can connect to a payment action, a short explanation, and a project or campaign trail that shows real use of funds."
              tone={index % 2 === 0 ? "paper" : "mist"}
            />
          ))}
        </div>
      </section>

      <section className="section section-grid section-grid--campaign">
        <InfoCard
          eyebrow="Transparency tracker"
          title="Keep trust visible after the donate button."
          body="The next iteration can wire this into real campaign totals, allocation summaries, and updates so support never feels detached from outcome."
          tone="leaf"
        />
        <InfoCard
          eyebrow="Operational note"
          title="Payment integration comes next"
          body="This first development pass focuses on the donation experience design and content structure. Payment gateway wiring will follow once provider details are confirmed."
          tone="sand"
        />
      </section>
    </main>
  );
}
