import { InfoCard } from "../../components/InfoCard";
import { LoadingLink } from "../../components/LoadingLink";
import { PageHero } from "../../components/PageHero";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { SupportInquiryForm } from "../../components/SupportInquiryForm";
import { stockMedia } from "../../components/stockMedia";
import { involvementPaths, updateCards } from "../../components/siteData";

export default function GetInvolvedPage() {
  return (
    <main className="site-main page-v2">
      <PageHero
        eyebrow="Get involved"
        title="Turn interest into action with a clear intake path."
        body="Volunteers, partners, sponsors, and contributors get a real way to register interest and move into the work with context."
        primary={{ href: "#support-intake", label: "Open Support Form" }}
        secondary={{ href: "/donate", label: "Sponsor a Program" }}
        media={stockMedia.getInvolvedHero}
        asideTitle="Clear ways to join the work"
        asideBody="Each supporter type gets a direct path into the mission, plus a real intake flow the team can review and follow up."
      />

      {/* Support routes */}
      <Reveal as="section" delay={100}>
        <SectionIntro
          eyebrow="Support routes"
          title="Choose the kind of role that matches your capacity."
          body="These cards help people orient themselves before they submit."
        />
        <div className="card-grid-v2">
          {involvementPaths.map((path, i) => (
            <article key={path.title} className="card-v2">
              <div className="card-v2__top">
                <span className="card-v2__index">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="card-v2__title">{path.title}</h3>
              <p className="card-v2__body">{path.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Intake form */}
      <Reveal as="section" id="support-intake" delay={160}>
        <SectionIntro
          eyebrow="Support intake"
          title="Send one clear request so the right team can follow up."
          body="Simple and reliable — giving the initiative a proper record of volunteer, partner, and sponsor interest."
        />
        <div className="submission-layout">
          <div className="submission-layout__side">
            <InfoCard eyebrow="Intake" title="One shared route for all supporter types." body="The form captures who you are, what kind of help you can offer, and where you want to plug in." tone="mist" />
            <InfoCard eyebrow="Follow-up" title="Every request lands in a reviewable queue." body="The team gets enough context to reply with a useful next step." tone="sand" />
            <InfoCard eyebrow="Resource contributors" title="Learning resources have a dedicated route." body="If you are contributing educational materials, use the education submission form." tone="paper" />
            <LoadingLink href="/education/contribute" className="button button--secondary submission-layout__link" loadingLabel="Opening">Open Contributor Form</LoadingLink>
          </div>
          <SupportInquiryForm variant="involvement" />
        </div>
      </Reveal>

      {/* Updates */}
      <Reveal as="section" delay={220}>
        <SectionIntro
          eyebrow="Latest updates"
          title="What's happening across the initiative right now."
        />
        <div className="card-grid-v2 card-grid-v2--3">
          {updateCards.map((update, i) => (
            <article key={update.title} className="card-v2">
              <p className="card-v2__eyebrow">Update</p>
              <h3 className="card-v2__title">{update.title}</h3>
              <p className="card-v2__body">{update.body}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </main>
  );
}
