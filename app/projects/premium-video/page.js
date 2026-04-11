import { InfoCard } from "../../../components/InfoCard";
import { LoadingLink } from "../../../components/LoadingLink";
import { PageHero } from "../../../components/PageHero";
import { PayPerViewExperience } from "../../../components/PayPerViewExperience";
import { premiumVideoProject } from "../../../components/siteData";

export default function PremiumVideoPage() {
  return (
    <main className="site-main">
      <PageHero
        eyebrow={premiumVideoProject.eyebrow}
        title="A dedicated pay-per-view video experience for premium project films."
        body="This route is built for campaign documentaries, special event footage, premium project storytelling, or supporter-only releases that should unlock after payment."
        primary={{ href: "/projects", label: "Back to Projects" }}
        secondary={{ href: "/donate", label: "Support the Platform" }}
        asideTitle="Feature direction"
        asideBody="The frontend experience is now in place: locked state, purchase action, timed access, and a dedicated watch screen. The next backend step is payment verification and signed playback."
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
          body="The same structure can gate one premium documentary, a single conference replay, or limited-time campaign content tied to a fundraising goal."
          tone="mist"
        />
        <InfoCard
          eyebrow="Next backend step"
          title="Connect verified payments to secure stream delivery"
          body="To make this production-safe, the payment webhook should grant access, the stream should be served through a signed URL or protected player, and order history should be stored in the database."
          tone="forest-ink"
        />
      </section>

      <section className="section section--band">
        <div className="closing-cta">
          <div>
            <p className="section-kicker section-kicker--light">Premium content flow</p>
            <h2 className="closing-cta__title">
              Ready for a real payment provider and premium campaign launches.
            </h2>
            <p className="closing-cta__body">
              Once you choose the gateway and final video source, we can turn this from demo
              unlock logic into a proper commerce flow.
            </p>
          </div>
          <div className="closing-cta__actions">
            <LoadingLink href="/donate" className="button button--secondary" loadingLabel="Opening">
              Setup Payments Next
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
