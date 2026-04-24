import { InfoCard } from "../../components/InfoCard";
import { LoadingLink } from "../../components/LoadingLink";
import { PageHero } from "../../components/PageHero";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { SupportInquiryForm } from "../../components/SupportInquiryForm";
import { stockMedia } from "../../components/stockMedia";
import { involvementPaths } from "../../components/siteData";
import { getPlatformContentData } from "../../lib/platform-content";

export const revalidate = 300;

export default async function GetInvolvedPage() {
  const { updates } = await getPlatformContentData();
  const latestUpdates = updates.slice(0, 2);

  return (
    <main className="site-main page-v2 get-involved-page">
      <PageHero
        eyebrow="Get involved"
        title="Turn interest into action with a clear intake path."
        body="Volunteers, partners, sponsors, and contributors should be able to choose a route quickly and send one clear request."
        primary={{ href: "#support-intake", label: "Open support form" }}
        secondary={{ href: "/donate", label: "Sponsor a program" }}
        highlights={[
          "Volunteer, partner, sponsor, or contribute",
          "One shared intake form with context",
          "Live updates stay close to the action"
        ]}
        stats={[
          { value: String(involvementPaths.length), label: "support routes" },
          { value: "1", label: "shared intake path" },
          { value: String(latestUpdates.length), label: "recent updates surfaced here" }
        ]}
        media={stockMedia.getInvolvedHero}
        asideTitle="Clear ways to join the work"
        asideBody="Each supporter type gets a direct path into the mission, plus a real intake flow the team can review and follow up."
        asidePoints={[
          "Volunteer support and field contribution",
          "Partnerships and organizational backing",
          "Sponsorship, resources, and specialist support"
        ]}
      />

      <Reveal as="section" className="get-involved-page__route-band" delay={110} variant="rise" cascade>
        <div className="get-involved-page__section-lead" data-reveal-group>
          <p className="dark-panel-v2__eyebrow">Choose how you want to help</p>
          <h2 className="dark-panel-v2__title">
            The support routes are now framed like invitations into the mission.
          </h2>
          <p className="dark-panel-v2__body">
            These cards help visitors orient themselves quickly before they submit, sponsor, or start a conversation.
          </p>
        </div>

        <div className="card-grid-v2 card-grid-v2--2 get-involved-page__route-grid" data-reveal-group>
          {involvementPaths.map((path, index) => (
            <article key={path.title} className="card-v2 card-v2--paper get-involved-page__route-card">
              <div className="card-v2__top">
                <span className="card-v2__index">{String(index + 1).padStart(2, "0")}</span>
                <p className="card-v2__eyebrow">Support route</p>
              </div>
              <h3 className="card-v2__title">{path.title}</h3>
              <p className="card-v2__body">{path.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" id="support-intake" delay={190} variant="left" cascade>
        <div className="get-involved-page__section-lead" data-reveal-group>
          <SectionIntro
            eyebrow="Support intake"
            title="Send one clear request so the right team can follow up."
            body="The intake flow should feel practical and proportional: short guidance on one side, the form on the other."
          />
        </div>

        <div className="submission-layout" data-reveal-group>
          <div className="submission-layout__side">
            <InfoCard
              eyebrow="Intake"
              title="One shared route for all supporter types."
              body="The form captures who you are, what kind of help you can offer, and where you want to plug in."
              tone="mist"
            />
            <InfoCard
              eyebrow="Follow-up"
              title="Every request lands in a reviewable queue."
              body="The team gets enough context to reply with a useful next step."
              tone="sand"
            />
            <LoadingLink href="/education/contribute" className="button button--secondary submission-layout__link" loadingLabel="Opening">
              Open contributor form
            </LoadingLink>
          </div>

          <SupportInquiryForm variant="involvement" />
        </div>
      </Reveal>

      <Reveal as="section" className="get-involved-page__updates-band" delay={250} variant="rise" cascade>
        <div className="get-involved-page__section-lead" data-reveal-group>
          <SectionIntro
            eyebrow="Latest updates"
            title="Recent public updates stay close to the supporter journey."
            body="These updates help visitors understand that the mission is active before or after they submit a request."
          />
        </div>

        <div className="card-grid-v2 card-grid-v2--2 get-involved-page__updates-grid" data-reveal-group>
          {latestUpdates.map((update) => (
            <article key={update.title} className="card-v2 card-v2--paper get-involved-page__update-card">
              <div className="card-v2__top">
                <p className="card-v2__eyebrow">{update.category}</p>
                <span className="card-v2__index card-v2__index--date">{update.date}</span>
              </div>
              <h3 className="card-v2__title">{update.title}</h3>
              <p className="card-v2__body">{update.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="get-involved-page__cta-strip" delay={300} variant="zoom" intensity="lg" cascade>
        <div className="get-involved-page__cta-copy" data-reveal-group>
          <p className="dark-panel-v2__eyebrow">Need a simple next step?</p>
          <h2 className="dark-panel-v2__title">
            Start the conversation here, then move into the right part of the mission.
          </h2>
          <p className="dark-panel-v2__body">
            Support requests, sponsorship conversations, and partnership offers all begin with the same clear intake route.
          </p>
        </div>

        <div className="hero-actions get-involved-page__cta-actions" data-reveal-group>
          <a href="#support-intake" className="button button--primary">
            Start with the form
          </a>
          <LoadingLink href="/donate" className="button button--secondary" loadingLabel="Opening">
            Sponsor a program
          </LoadingLink>
        </div>
      </Reveal>
    </main>
  );
}
