import { InfoCard } from "../../../components/InfoCard";
import { LoadingLink } from "../../../components/LoadingLink";
import { PageHero } from "../../../components/PageHero";
import { Reveal } from "../../../components/Reveal";
import { SectionIntro } from "../../../components/SectionIntro";
import { StockPhoto } from "../../../components/StockPhoto";
import { dodomaProposal } from "../../../components/missionData";
import { stockMedia } from "../../../components/stockMedia";

const objectiveCards = [
  { title: "Short-term objectives", items: dodomaProposal.objectives.shortTerm },
  { title: "Medium-term objectives", items: dodomaProposal.objectives.mediumTerm },
  { title: "Long-term objectives", items: dodomaProposal.objectives.longTerm }
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
  description: "Full funding proposal for Dodoma Best Sports Center."
};

export default function DodomaBestSportsCenterPage() {
  return (
    <main className="site-main page-v2">
      <PageHero
        eyebrow={dodomaProposal.eyebrow}
        title={dodomaProposal.title}
        body={dodomaProposal.summary}
        primary={{ href: "/donate", label: "Support This Proposal" }}
        secondary={{ href: "/get-involved", label: "Discuss Partnership" }}
        highlights={proposalHighlights}
        media={stockMedia.projectsHero}
        asideTitle="Why this proposal matters"
        asideBody="The translated project proposal published as a real working route so supporters can review the need, budget, and outcomes before they act."
        asidePoints={proposalAsidePoints}
      />

      {/* Overview dossier */}
      <Reveal as="section" className="dossier-v2" delay={120}>
        <div className="dossier-v2__lead">
          <StockPhoto src={stockMedia.projectsHero.src} alt={stockMedia.projectsHero.alt} label="Dodoma field focus" sizes="(max-width: 1120px) 100vw, 40vw" />
          <h2 className="dossier-v2__title">Introduction and current challenge</h2>
          <p className="dossier-v2__body">{dodomaProposal.intro}</p>
          <blockquote className="dossier-v2__quote">{dodomaProposal.challenge}</blockquote>
          <div className="hero-actions">
            <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">Fund the current request</LoadingLink>
            <LoadingLink href="/projects" className="button button--secondary" loadingLabel="Opening">Back to project explorer</LoadingLink>
          </div>
        </div>
        <div className="dossier-v2__sidebar">
          <article className="dossier-v2__fact"><p className="dossier-v2__fact-eyebrow">Founded</p><p className="dossier-v2__fact-body">{dodomaProposal.founded}</p></article>
          <article className="dossier-v2__fact"><p className="dossier-v2__fact-eyebrow">Current reach</p><p className="dossier-v2__fact-body">{dodomaProposal.beneficiaries}</p></article>
          <article className="dossier-v2__fact"><p className="dossier-v2__fact-eyebrow">Inclusion focus</p><p className="dossier-v2__fact-body">{dodomaProposal.orphanSupport}</p></article>
          <article className="dossier-v2__fact"><p className="dossier-v2__fact-eyebrow">Age groups</p><p className="dossier-v2__fact-body">{dodomaProposal.ageGroups}</p></article>
        </div>
      </Reveal>

      {/* Responsibilities */}
      <Reveal as="section" delay={170}>
        <SectionIntro eyebrow="Responsibilities" title="The center is structured around delivery, coaching, and youth development." body="These responsibilities come directly from the translated proposal." />
        <div className="card-grid-v2 card-grid-v2--3">
          {dodomaProposal.responsibilities.map((item, i) => (
            <article key={item} className="card-v2">
              <p className="card-v2__eyebrow">Responsibility {String(i + 1).padStart(2, "0")}</p>
              <p className="card-v2__body">{item}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Objectives */}
      <Reveal as="section" delay={220}>
        <SectionIntro eyebrow="Objectives" title="Staged from immediate equipment needs to a long-term academy vision." body="Short-term, medium-term, and long-term objectives published separately." />
        <div className="card-grid-v2 card-grid-v2--3">
          {objectiveCards.map((block, i) => (
            <article key={block.title} className="card-v2">
              <div className="card-v2__top">
                <span className="card-v2__index">{String(i + 1).padStart(2, "0")}</span>
                <p className="card-v2__eyebrow">Objective block</p>
              </div>
              <h3 className="card-v2__title">{block.title}</h3>
              {block.items.map((item) => (
                <p key={item} className="card-v2__body">• {item}</p>
              ))}
            </article>
          ))}
        </div>
      </Reveal>

      {/* Stakeholder support */}
      <Reveal as="section" delay={270}>
        <SectionIntro eyebrow="Stakeholder role" title="Institutions and partners can support in several practical ways." body="Financial, technical, and administrative roles so collaboration doesn't depend on one kind of donor." />
        <div className="card-grid-v2">
          {dodomaProposal.stakeholderSupport.map((item, i) => (
            <article key={item.title} className="card-v2">
              <p className="card-v2__eyebrow">Support route</p>
              <h3 className="card-v2__title">{item.title}</h3>
              <p className="card-v2__body">{item.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Budget */}
      <Reveal as="section" delay={320}>
        <SectionIntro eyebrow="Current needs" title="2025 equipment requirements and budget breakdown" body="Reflects the translated source. One line flagged for source confirmation." />
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
                  <th scope="col">Qty</th>
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

      {/* Future + conclusion */}
      <Reveal as="section" delay={370}>
        <div className="split-v2">
          <div className="dark-panel-v2">
            <p className="dark-panel-v2__eyebrow">Future expectations</p>
            <h3 className="dark-panel-v2__title">Support now grows reach, safety, and opportunity by 2026.</h3>
            {dodomaProposal.futureExpectations.map((item) => (
              <p key={item} className="dark-panel-v2__body">• {item}</p>
            ))}
          </div>
          <div style={{ display: "grid", gap: "0.85rem" }}>
            <InfoCard eyebrow="Conclusion" title="A local center with a serious long-term vision" body={dodomaProposal.conclusion} tone="blush" />
            <InfoCard eyebrow="Contact note" title="Final contact details still need to be attached" body={dodomaProposal.contactNote} tone="paper" />
            <div className="hero-actions">
              <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">Support this proposal</LoadingLink>
              <LoadingLink href="/get-involved" className="button button--secondary" loadingLabel="Opening">Offer institutional support</LoadingLink>
            </div>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
