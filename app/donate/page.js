import { InfoCard } from "../../components/InfoCard";
import { LoadingLink } from "../../components/LoadingLink";
import { PageHero } from "../../components/PageHero";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { stockMedia } from "../../components/stockMedia";
import { donationCauses, donationTiers } from "../../components/siteData";

const tierDetails = [
  {
    amount: donationTiers[0],
    title: "Starter support",
    body: "A strong entry point for supporters who want to back one practical need such as learning materials, hygiene support, or weekly sports essentials.",
    focus: "Best for first-time donors and lightweight recurring support"
  },
  {
    amount: donationTiers[1],
    title: "Field support",
    body: "Useful for project kits, workshop materials, training sessions, and the kinds of logistics that help community activity stay active and visible.",
    focus: "Best for targeted support around a live campaign or outreach need"
  },
  {
    amount: donationTiers[2],
    title: "Program builder",
    body: "Helps strengthen a wider program route by backing multi-session learning, youth development, or broader delivery support across a local initiative.",
    focus: "Best for supporters who want to fund momentum, not just one moment"
  },
  {
    amount: donationTiers[3],
    title: "Partner-level backing",
    body: "Designed for bigger commitments that support a flagship intervention, a documented campaign, or a deeper partner conversation around long-term impact.",
    focus: "Best for sponsors, organizations, and high-trust partnership conversations"
  }
];

const donationHeroHighlights = [
  "Suggested giving tiers with clear intent",
  "Cause-based support tied to real work",
  "Visibility and trust remain part of the ask"
];

const donationHeroAsidePoints = [
  "Support routes stay tied to visible projects and program pages",
  "Receipts, confirmations, and follow-up cues reinforce donor confidence",
  "The structure is ready for partner-facing reporting and campaign updates"
];

const trustNotes = [
  {
    title: "Choose a cause with context",
    body: "Donors see what the route supports before they commit, rather than giving into a vague fund."
  },
  {
    title: "Stay close to visible outcomes",
    body: "Projects, stories, and program pages make it easier to follow what support is helping make possible."
  },
  {
    title: "Keep the relationship open",
    body: "The donation experience is designed to support future updates, receipts, and partner communication."
  }
];

const transparencyCards = [
  {
    eyebrow: "Transparency tracker",
    title: "Give with a clearer view of what support helps fund.",
    body: "Campaign totals, allocation summaries, and public-facing updates keep donations connected to real work after the payment moment.",
    tone: "leaf"
  },
  {
    eyebrow: "Payment confidence",
    title: "Secure gateway, receipts, and confirmation details.",
    body: "The donation route is designed for secure processing with donor receipts and simple follow-up details for supporters and partners.",
    tone: "sand"
  },
  {
    eyebrow: "Partnership readiness",
    title: "Built for larger sponsor and collaborator conversations.",
    body: "Organizations and long-term backers can move from a single gift into a more structured discussion around campaigns, reporting, and joint work.",
    tone: "blush"
  }
];

export default function DonatePage() {
  return (
    <main className="site-main">
      <PageHero
        eyebrow="Donations and support"
        title="A giving flow that feels warm, secure, and grounded in visible work."
        body="The donation page brings together clear tiers, specific causes, and trust cues so support feels direct, practical, and connected to real outcomes."
        primary={{ href: "#tiers", label: "Choose a Tier" }}
        secondary={{ href: "/projects", label: "See What Support Funds" }}
        highlights={donationHeroHighlights}
        media={stockMedia.donateHero}
        asideTitle="Support with confidence"
        asideBody="This route keeps the ask clear, ties giving to visible causes, and reinforces that support stays connected to real work, follow-up, and longer-term trust."
        asidePoints={donationHeroAsidePoints}
      />

      <Reveal as="section" className="section" id="tiers" delay={120}>
        <SectionIntro
          eyebrow="Giving routes"
          title="Choose a level of support based on the kind of difference you want to make."
          body="These tiers are meant to make giving feel more concrete by pairing an amount with the scale of support it can help unlock."
        />

        <div className="donation-tier-grid">
          {tierDetails.map((tier, index) => (
            <article
              key={tier.amount}
              className={`donation-tier${index === 2 ? " donation-tier--featured" : ""}`}
            >
              <p className="donation-tier__eyebrow">Suggested tier</p>
              <p className="donation-tier__amount">{tier.amount}</p>
              <h3 className="donation-tier__title">{tier.title}</h3>
              <p className="donation-tier__body">{tier.body}</p>
              <p className="donation-tier__focus">{tier.focus}</p>
              <LoadingLink
                href="#support-pathways"
                className={`button ${index === 2 ? "button--primary" : "button--secondary"}`}
              >
                Choose this route
              </LoadingLink>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="section" id="support-pathways" delay={180}>
        <SectionIntro
          eyebrow="Cause-based support"
          title="Every giving route should make it obvious what support is helping move forward."
          body="Instead of a generic donation ask, the page frames support around the real parts of the mission that donors and partners can actually follow."
        />

        <div className="donation-pathway">
          <div className="donation-pathway__causes">
            {donationCauses.map((cause, index) => (
              <InfoCard
                key={cause}
                eyebrow="Support area"
                title={cause}
                body="Each route connects to live stories, program pages, and campaign context so donors understand what kind of work they are helping sustain."
                tone={index % 2 === 0 ? "paper" : "mist"}
              />
            ))}
          </div>

          <article className="donation-pathway__panel">
            <p className="donation-pathway__eyebrow">What happens after the donate button</p>
            <h3 className="donation-pathway__title">
              Trust stays strongest when the giving experience keeps its promise.
            </h3>
            <p className="donation-pathway__body">
              Humanity First is designed to keep support close to field context, visible project
              routes, and the follow-up information people need to keep believing in the work.
            </p>

            <div className="donation-pathway__notes">
              {trustNotes.map((item) => (
                <article key={item.title} className="donation-pathway__note">
                  <h4 className="donation-pathway__note-title">{item.title}</h4>
                  <p className="donation-pathway__note-body">{item.body}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
      </Reveal>

      <Reveal as="section" className="section" delay={240}>
        <SectionIntro
          eyebrow="Confidence layer"
          title="Support works better when security, transparency, and partnership readiness are part of the design."
          body="These cues help the donation page feel credible for one-time donors, returning supporters, and larger collaborators alike."
        />

        <div className="donation-trust-grid">
          {transparencyCards.map((card) => (
            <InfoCard
              key={card.title}
              eyebrow={card.eyebrow}
              title={card.title}
              body={card.body}
              tone={card.tone}
            />
          ))}
        </div>
      </Reveal>
    </main>
  );
}
