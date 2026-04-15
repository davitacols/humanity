import { InfoCard } from "../../../components/InfoCard";
import { LoadingLink } from "../../../components/LoadingLink";
import { PageHero } from "../../../components/PageHero";
import { PayPerViewExperience } from "../../../components/PayPerViewExperience";
import { stockMedia } from "../../../components/stockMedia";
import { premiumVideoProject } from "../../../components/siteData";

export default function PremiumVideoPage() {
  return (
    <main className="site-main">
      <PageHero
        eyebrow={premiumVideoProject.eyebrow}
        title="A dedicated screening experience for campaign documentaries and special project films."
        body="This route is built for supporter screenings, special event footage, and documentary storytelling that unlocks after payment or access approval."
        primary={{ href: "/projects", label: "Back to Projects" }}
        secondary={{ href: "/donate", label: "Support the Initiative" }}
        media={stockMedia.screeningHero}
        asideTitle="Release experience"
        asideBody="The screening route supports a locked state, purchase action, timed access window, and a dedicated viewing screen for campaign film releases."
      />

      <section className="section">
        <PayPerViewExperience
          storageKey="humanity-first-premium-video"
          title={premiumVideoProject.title}
          price={premiumVideoProject.price}
          runtime={premiumVideoProject.runtime}
          accessWindow={premiumVideoProject.accessWindow}
          teaser={premiumVideoProject.teaser}
          benefits={premiumVideoProject.benefits}
          videoSrc={premiumVideoProject.videoSrc}
        />
      </section>

      <section className="section section-grid section-grid--campaign">
        <InfoCard
          eyebrow="Where this fits"
          title="Use it for films, event streams, or special access project reports"
          body="The same structure can support one documentary, a conference replay, or limited-time campaign content tied to a fundraising goal."
          tone="mist"
        />
        <InfoCard
          eyebrow="Payments and access control"
          title="Connect verified payments to secure stream delivery"
          body="Payment verification grants access, the stream is served through a protected player, and order history is stored in the database."
          tone="forest-ink"
        />
      </section>

      <section className="section section--band">
        <div className="closing-cta">
          <div>
            <h2 className="closing-cta__title">
              Ready for documentary and campaign film releases.
            </h2>
            <p className="closing-cta__body">
              The flow runs with payment verification and protected playback for each release.
            </p>
          </div>
          <div className="closing-cta__actions">
            <LoadingLink href="/donate" className="button button--secondary" loadingLabel="Opening">
              Support the Platform
            </LoadingLink>
            <LoadingLink
              href="/projects"
              className="button button--ghost-light"
              loadingLabel="Opening"
            >
              Return to Archive
            </LoadingLink>
          </div>
        </div>
      </section>
    </main>
  );
}
