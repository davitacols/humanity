import { InfoCard } from "../../components/InfoCard";
import { LoadingLink } from "../../components/LoadingLink";
import { PageHero } from "../../components/PageHero";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { SupportInquiryForm } from "../../components/SupportInquiryForm";
import { stockMedia } from "../../components/stockMedia";
import { donationCauses, donationTiers } from "../../components/siteData";

const tierDetails = [
  { amount: donationTiers[0], title: "Starter support", body: "Back one practical need such as learning materials, hygiene support, or weekly sports essentials.", focus: "Best for first-time donors" },
  { amount: donationTiers[1], title: "Field support", body: "Project kits, workshop materials, and logistics that help community activity stay active and visible.", focus: "Best for targeted campaign support" },
  { amount: donationTiers[2], title: "Program builder", body: "Strengthen a wider program route by backing multi-session learning, youth development, or broader delivery.", focus: "Best for funding momentum" },
  { amount: donationTiers[3], title: "Partner-level backing", body: "Support a flagship intervention, a documented campaign, or a deeper partner conversation around long-term impact.", focus: "Best for sponsors and organizations" }
];

const donationHeroHighlights = [
  "Real intake form with tracked confirmation",
  "Cause-based support tied to real work",
  "Ready for payment-provider integration"
];

const donationHeroAsidePoints = [
  "Support routes tied to visible projects and program pages",
  "Donor requests logged and confirmed with proper follow-up",
  "Structure ready for partner-facing reporting and payment integration"
];

const trustNotes = [
  { title: "Choose a cause with context", body: "Donors see what the route supports before they commit." },
  { title: "Stay close to visible outcomes", body: "Projects and program pages make it easier to follow what support helps." },
  { title: "Keep the relationship open", body: "The intake flow creates a reference and gives the team what they need to follow up." }
];

export default function DonatePage() {
  return (
    <main className="site-main page-v2">
      <PageHero
        eyebrow="Donations and support"
        title="A clear giving route tied to visible work and real follow-up."
        body="Cause-based support, suggested levels, and a real intake form so supporters can move from interest to action without losing context."
        primary={{ href: "#donation-intake", label: "Start Giving Request" }}
        secondary={{ href: "/projects", label: "See What Support Funds" }}
        highlights={donationHeroHighlights}
        media={stockMedia.donateHero}
        asideTitle="Support with confidence"
        asideBody="This route keeps the ask clear, ties giving to visible causes, and turns donor interest into a tracked support request."
        asidePoints={donationHeroAsidePoints}
      />

      {/* Tiers */}
      <Reveal as="section" id="tiers" delay={120}>
        <SectionIntro
          eyebrow="Giving routes"
          title="Choose a level of support based on the difference you want to make."
          body="These tiers pair an amount with the scale of support it can help unlock."
        />
        <div className="card-grid-v2">
          {tierDetails.map((tier, i) => (
            <article key={tier.amount} className="card-v2">
              <p className="card-v2__eyebrow">Suggested tier</p>
              <p style={{ margin: 0, color: "var(--pine)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.04em" }}>{tier.amount}</p>
              <h3 className="card-v2__title">{tier.title}</h3>
              <p className="card-v2__body">{tier.body}</p>
              <p className="card-v2__body" style={{ fontSize: "0.88rem", opacity: 0.8 }}>{tier.focus}</p>
              <LoadingLink href="#donation-intake" className={`button ${i === 2 ? "button--primary" : "button--secondary"}`} style={{ justifySelf: "start" }}>
                Select this tier
              </LoadingLink>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Intake form */}
      <Reveal as="section" id="donation-intake" delay={150}>
        <SectionIntro
          eyebrow="Donation intake"
          title="Submit a giving request the team can follow through on."
          body="This captures donor and sponsor intent in a structured way while the final payment provider is being connected."
        />
        <div className="submission-layout">
          <div className="submission-layout__side">
            <InfoCard eyebrow="Step 01" title="Choose the cause and giving level." body="Support stays grounded in real programs, not a generic donation bucket." tone="mist" />
            <InfoCard eyebrow="Step 02" title="Receive a tracked confirmation." body="The form generates a real support request so the team can continue with context." tone="sand" />
            <InfoCard eyebrow="Need context first?" title="Review live projects before you submit." body="The project explorer and program routes stay one click away." tone="paper" />
            <LoadingLink href="/projects" className="button button--secondary submission-layout__link" loadingLabel="Opening">Open Project Explorer</LoadingLink>
          </div>
          <SupportInquiryForm variant="donation" />
        </div>
      </Reveal>

      {/* Cause-based support */}
      <Reveal as="section" delay={180}>
        <SectionIntro
          eyebrow="Cause-based support"
          title="Every giving route makes it obvious what support is helping move forward."
          body="Support framed around the real parts of the mission that donors can actually follow."
        />
        <div className="split-v2">
          <div className="card-grid-v2 card-grid-v2--2">
            {donationCauses.map((cause, i) => (
              <article key={cause} className="card-v2">
                <p className="card-v2__eyebrow">Support area</p>
                <h3 className="card-v2__title">{cause}</h3>
                <p className="card-v2__body">Connects to live stories, program pages, and campaign context.</p>
              </article>
            ))}
          </div>
          <div className="dark-panel-v2">
            <p className="dark-panel-v2__eyebrow">What happens after the donate button</p>
            <h3 className="dark-panel-v2__title">Trust stays strongest when the giving experience keeps its promise.</h3>
            <p className="dark-panel-v2__body">Humanity First keeps support close to field context, visible project routes, and follow-up information.</p>
            {trustNotes.map((n) => (
              <article key={n.title} style={{ display: "grid", gap: "0.25rem", padding: "0.85rem", borderRadius: "16px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h4 style={{ margin: 0, color: "#fffaf1", fontSize: "0.98rem", fontWeight: 800 }}>{n.title}</h4>
                <p className="dark-panel-v2__body">{n.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </main>
  );
}
