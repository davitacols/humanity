import { InfoCard } from "../../../components/InfoCard";
import { LoadingLink } from "../../../components/LoadingLink";
import { PageHero } from "../../../components/PageHero";
import { Reveal } from "../../../components/Reveal";
import { SectionIntro } from "../../../components/SectionIntro";
import { StockPhoto } from "../../../components/StockPhoto";
import { dodomaProposal } from "../../../components/missionData";
import { stockMedia } from "../../../components/stockMedia";

const objectiveCards = [
  {
    title: "Short-term objectives",
    items: dodomaProposal.objectives.shortTerm,
    tone: "sand"
  },
  {
    title: "Medium-term objectives",
    items: dodomaProposal.objectives.mediumTerm,
    tone: "mist"
  },
  {
    title: "Long-term objectives",
    items: dodomaProposal.objectives.longTerm,
    tone: "leaf"
  }
];

const proposalHighlights = [
  "100 children and youth currently enrolled",
  "20 orphans included in the current program",
  "Equipment-focused request tied to visible delivery"
];

const proposalAsidePoints = [
  dodomaProposal.location,
  dodomaProposal.ageGroups,
  dodomaProposal.totalRequest
];

export const metadata = {
  title: "Dodoma Best Sports Center Proposal | Humanity First Initiative",
  description:
    "Full funding proposal for Dodoma Best Sports Center, including responsibilities, objectives, stakeholder roles, and current budget requirements."
};

export default function DodomaBestSportsCenterPage() {
  return (
    <main className="site-main">
      <PageHero
        eyebrow={dodomaProposal.eyebrow}
        title={dodomaProposal.title}
        body={dodomaProposal.summary}
        primary={{ href: "/donate", label: "Support This Proposal" }}
        secondary={{ href: "/get-involved", label: "Discuss Partnership" }}
        highlights={proposalHighlights}
        media={stockMedia.projectsHero}
        asideTitle="Why this proposal matters"
        asideBody="This page publishes the translated project proposal as a real working route on the site so supporters can review the need, budget, and intended outcomes before they act."
        asidePoints={proposalAsidePoints}
      />

      <Reveal as="section" className="section" delay={120}>
        <div className="campaign-dossier">
          <div className="campaign-dossier__lead">
            <StockPhoto
              src={stockMedia.projectsHero.src}
              alt={stockMedia.projectsHero.alt}
              label="Dodoma field focus"
              sizes="(max-width: 1180px) 100vw, 34vw"
              className="campaign-dossier__media"
            />
            <span className="pill pill--soft">Proposal overview</span>
            <h2 className="campaign-dossier__title">Introduction and current challenge</h2>
            <p className="campaign-dossier__body">{dodomaProposal.intro}</p>
            <blockquote className="campaign-dossier__quote">{dodomaProposal.challenge}</blockquote>
          </div>

          <div className="campaign-dossier__facts">
            <div className="campaign-dossier__support-list">
              <article className="campaign-dossier__support-item">
                <p className="campaign-dossier__support-eyebrow">Founded</p>
                <p className="campaign-dossier__support-body">{dodomaProposal.founded}</p>
              </article>
              <article className="campaign-dossier__support-item">
                <p className="campaign-dossier__support-eyebrow">Current reach</p>
                <p className="campaign-dossier__support-body">{dodomaProposal.beneficiaries}</p>
              </article>
              <article className="campaign-dossier__support-item">
                <p className="campaign-dossier__support-eyebrow">Inclusion focus</p>
                <p className="campaign-dossier__support-body">{dodomaProposal.orphanSupport}</p>
              </article>
              <article className="campaign-dossier__support-item">
                <p className="campaign-dossier__support-eyebrow">Age groups</p>
                <p className="campaign-dossier__support-body">{dodomaProposal.ageGroups}</p>
              </article>
            </div>

            <div className="hero-actions">
              <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">
                Fund the current request
              </LoadingLink>
              <LoadingLink
                href="/projects"
                className="button button--secondary"
                loadingLabel="Opening"
              >
                Back to project explorer
              </LoadingLink>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section" delay={170}>
        <SectionIntro
          eyebrow="Responsibilities"
          title="The center is already structured around delivery, coaching, and youth development."
          body="These responsibilities come directly from the translated proposal and show how the center frames its day-to-day mission."
        />

        <div className="proposal-list-grid">
          {dodomaProposal.responsibilities.map((item, index) => (
            <article key={item} className="proposal-list-card">
              <p className="proposal-list-card__eyebrow">Responsibility {String(index + 1).padStart(2, "0")}</p>
              <p className="proposal-list-card__body">{item}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="section" delay={220}>
        <SectionIntro
          eyebrow="Objectives"
          title="The proposal is staged from immediate equipment needs to a long-term academy vision."
          body="Short-term, medium-term, and long-term objectives are published separately so supporters can see the timeline behind the request."
        />

        <div className="ledger-grid">
          {objectiveCards.map((block, index) => (
            <article key={block.title} className={`ledger-card ledger-card--${index === 0 ? "sand" : index === 1 ? "mist" : "leaf"}`}>
              <div className="ledger-card__top">
                <span className="ledger-card__index">{String(index + 1).padStart(2, "0")}</span>
                <span className="ledger-card__eyebrow">Objective block</span>
              </div>
              <h3 className="ledger-card__title">{block.title}</h3>
              <div className="proposal-bullet-list">
                {block.items.map((item) => (
                  <p key={item} className="proposal-bullet-list__item">
                    {item}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="section" delay={270}>
        <SectionIntro
          eyebrow="Stakeholder role"
          title="Institutions and partners can support the center in several practical ways."
          body="The proposal names financial, technical, and administrative roles so collaboration does not depend on one kind of donor alone."
        />

        <div className="stack-grid">
          {dodomaProposal.stakeholderSupport.map((item) => (
            <InfoCard
              key={item.title}
              eyebrow="Support route"
              title={item.title}
              body={item.body}
              tone="paper"
            />
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="section" delay={320}>
        <SectionIntro
          eyebrow="Current needs"
          title="2025 equipment requirements and budget breakdown"
          body="This table reflects the translated source shared with the team. One line remains flagged for source confirmation before final donor circulation."
        />

        <div className="proposal-budget">
          <div className="proposal-budget__summary">
            <div>
              <p className="proposal-budget__label">Published request</p>
              <h3 className="proposal-budget__amount">{dodomaProposal.totalRequest}</h3>
            </div>
            <p className="proposal-budget__note">{dodomaProposal.budgetNote}</p>
          </div>

          <div className="proposal-budget__table-shell">
            <table className="proposal-budget__table">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Unit Cost (TZS)</th>
                  <th scope="col">Total (TZS)</th>
                </tr>
              </thead>
              <tbody>
                {dodomaProposal.budgetRows.map((row) => (
                  <tr key={row.item}>
                    <td>{row.item}</td>
                    <td>{row.quantity}</td>
                    <td>{row.unitCost}</td>
                    <td>{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section" delay={370}>
        <div className="section-grid section-grid--split">
          <div className="home-route-panel home-route-panel--dark">
            <span className="pill pill--soft">Future expectations</span>
            <h3>Support now is intended to grow reach, safety, and opportunity by 2026.</h3>
            <div className="proposal-bullet-list proposal-bullet-list--light">
              {dodomaProposal.futureExpectations.map((item) => (
                <p key={item} className="proposal-bullet-list__item">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="section__stack">
            <InfoCard
              eyebrow="Conclusion"
              title="A local center with a serious long-term vision"
              body={dodomaProposal.conclusion}
              tone="blush"
            />
            <InfoCard
              eyebrow="Contact note"
              title="Final contact details still need to be attached"
              body={dodomaProposal.contactNote}
              tone="paper"
            />
            <div className="hero-actions">
              <LoadingLink
                href="/donate"
                className="button button--primary"
                loadingLabel="Opening"
              >
                Support this proposal
              </LoadingLink>
              <LoadingLink
                href="/get-involved"
                className="button button--secondary"
                loadingLabel="Opening"
              >
                Offer institutional support
              </LoadingLink>
            </div>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
