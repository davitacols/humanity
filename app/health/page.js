import { LoadingLink } from "../../components/LoadingLink";
import { PageHero } from "../../components/PageHero";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { StockPhoto } from "../../components/StockPhoto";
import { stockMedia } from "../../components/stockMedia";

const healthTopics = [
  { title: "Hygiene and sanitation", body: "Handwashing, clean water access, waste disposal, and community sanitation practices." },
  { title: "Nutrition", body: "Balanced diets, breastfeeding support, food safety, and nutrition for children under five." },
  { title: "Maternal and child health", body: "Prenatal care, safe delivery, postnatal support, immunization, and growth monitoring." },
  { title: "Mental health", body: "Stress management, community support systems, and reducing stigma around mental health." }
];

const preventiveAreas = [
  { title: "Malaria prevention", body: "Bed net distribution, standing water management, and early symptom recognition." },
  { title: "Vaccination awareness", body: "Routine immunization schedules, community outreach, and myth-busting campaigns." },
  { title: "Sanitation drives", body: "Community clean-up events, latrine construction support, and hygiene education." }
];

const safetyTopics = [
  { title: "Home safety", body: "Fire prevention, safe cooking practices, childproofing, and first aid basics." },
  { title: "School safety", body: "Emergency preparedness, safe play areas, and anti-bullying awareness." },
  { title: "Environmental safety", body: "Flood preparedness, waste hazard awareness, and community resilience planning." }
];

const campaigns = [
  { title: "Maternal health kits outreach", body: "Distribution of basic care kits for mothers and newborns with on-ground follow-ups.", status: "Active" },
  { title: "School safety awareness", body: "Safety education for schools and families with checklists and flyers.", status: "Active" },
  { title: "Nutrition flyer campaign", body: "Quick-use nutrition guides and outreach materials for parents and caregivers.", status: "In progress" }
];

export const metadata = {
  title: "Public Health",
  description: "Community health education covering hygiene, nutrition, maternal and child health, mental health, and preventive care."
};

export default function HealthPage() {
  return (
    <main className="site-main page-v2">
      <PageHero
        eyebrow="Public health and safety"
        title="Health education for families, schools, and community outreach."
        body="Health education covers hygiene, nutrition, maternal and child care, malaria prevention, vaccination awareness, school safety, and family guidance."
        primary={{ href: "/donate", label: "Support health outreach" }}
        secondary={{ href: "/programs", label: "Back to programs" }}
        highlights={["Health education", "Community campaigns", "Preventive awareness", "Safety advocacy", "Downloadable resources"]}
        media={stockMedia.homeStories[0]}
        asideTitle="Community-first health"
        asideBody="Resources support community health workers, school safety activities, family education, and low-bandwidth outreach."
      />

      <Reveal as="section" delay={120}>
        <SectionIntro eyebrow="Health education" title="Core topics for community health literacy." body="Hygiene, nutrition, maternal care, child health, immunization, and mental wellbeing." />
        <div className="card-grid-v2">
          {healthTopics.map((topic, index) => (
            <article key={topic.title} className="card-v2">
              <div className="card-v2__top">
                <span className="card-v2__index">{String(index + 1).padStart(2, "0")}</span>
                <p className="card-v2__eyebrow">Health topic</p>
              </div>
              <h3 className="card-v2__title">{topic.title}</h3>
              <p className="card-v2__body">{topic.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" delay={180}>
        <SectionIntro eyebrow="Community campaigns" title="Outreach documentation and impact reports." body="Active campaigns with field documentation, support context, and follow-up notes." />
        <div className="split-v2">
          <StockPhoto src={stockMedia.homeStories[0].src} alt={stockMedia.homeStories[0].alt} label="Health outreach" sizes="(max-width: 1120px) 100vw, 48vw" />
          <div style={{ display: "grid", gap: "0.85rem" }}>
            {campaigns.map((campaign) => (
              <article key={campaign.title} className="card-v2">
                <div className="card-v2__top">
                  <p className="card-v2__eyebrow">Campaign</p>
                  <span className="card-v2__index" style={{ width: "auto", padding: "0 0.6rem", fontSize: "0.72rem" }}>{campaign.status}</span>
                </div>
                <h3 className="card-v2__title">{campaign.title}</h3>
                <p className="card-v2__body">{campaign.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" delay={240}>
        <SectionIntro eyebrow="Preventive health" title="Awareness that stops problems before they start." body="Malaria prevention, vaccination awareness, and sanitation drives." />
        <div className="card-grid-v2 card-grid-v2--3">
          {preventiveAreas.map((area, index) => (
            <article key={area.title} className="card-v2">
              <div className="card-v2__top">
                <span className="card-v2__index">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="card-v2__title">{area.title}</h3>
              <p className="card-v2__body">{area.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" delay={300}>
        <SectionIntro eyebrow="Safety advocacy" title="Home, school, and environmental safety education." body="Fire prevention, safe cooking, first aid basics, emergency preparation, flood awareness, and safer school environments." />
        <div className="card-grid-v2 card-grid-v2--3">
          {safetyTopics.map((topic, index) => (
            <article key={topic.title} className="card-v2">
              <div className="card-v2__top">
                <span className="card-v2__index">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="card-v2__title">{topic.title}</h3>
              <p className="card-v2__body">{topic.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="dark-panel-v2" delay={360}>
        <p className="dark-panel-v2__eyebrow">Downloadable resources</p>
        <h2 className="dark-panel-v2__title">Guides, flyers, and toolkits for community health workers.</h2>
        <p className="dark-panel-v2__body">Printable materials cover hygiene, nutrition, maternal care, school safety, and prevention messages for outreach events and family education.</p>
        <div className="hero-actions">
          <LoadingLink href="/donate" className="button button--primary" loadingLabel="Opening">Support health programs</LoadingLink>
          <LoadingLink href="/lms" className="button button--secondary" loadingLabel="Opening">Open LMS</LoadingLink>
        </div>
      </Reveal>
    </main>
  );
}
