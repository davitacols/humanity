import { InfoCard } from "../../../components/InfoCard";
import { LoadingLink } from "../../../components/LoadingLink";
import { PageHero } from "../../../components/PageHero";
import { PayPerViewExperience } from "../../../components/PayPerViewExperience";
import { Reveal } from "../../../components/Reveal";
import { stockMedia } from "../../../components/stockMedia";
import { premiumVideoProject } from "../../../components/siteData";

export default function PremiumVideoPage() {
  return (
    <main className="site-main page-v2">
      <PageHero
        eyebrow={premiumVideoProject.eyebrow}
        title="A dedicated screening experience for campaign documentaries."
        body="Built as a screening prototype for supporter films, special event footage, and documentary storytelling with timed access."
        primary={{ href: "/projects", label: "Back to Projects" }}
        secondary={{ href: "/donate", label: "Support the Initiative" }}
        media={stockMedia.screeningHero}
        asideTitle="Release experience"
        asideBody="Shows the locked state, timed access window, and dedicated viewing screen that can later connect to real entitlements."
      />

      <Reveal as="section" delay={100}>
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
      </Reveal>

      <Reveal as="section" delay={160}>
        <div className="split-v2">
          <InfoCard eyebrow="Where this fits" title="Films, event streams, or special access project reports" body="The same structure supports one documentary, a conference replay, or limited-time campaign content tied to a fundraising goal." tone="mist" />
          <InfoCard eyebrow="Payments and access" title="Current release is a screening prototype" body="This page demonstrates the access experience locally. A real payment, entitlement, and order-history layer still needs to be connected." tone="forest-ink" />
        </div>
      </Reveal>

      <Reveal as="section" delay={200}>
        <div className="dark-panel-v2">
          <h2 className="dark-panel-v2__title">Ready for documentary and campaign film releases.</h2>
          <p className="dark-panel-v2__body">The current flow previews the screening experience and can be upgraded once the final payment and access layer is approved.</p>
          <div className="hero-actions">
            <LoadingLink href="/donate" className="button button--secondary" loadingLabel="Opening">Support the Platform</LoadingLink>
            <LoadingLink href="/projects" className="button button--secondary" loadingLabel="Opening">Return to Archive</LoadingLink>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
