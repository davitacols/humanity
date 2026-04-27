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
        body="Supporter films, special event footage, and documentary stories can sit in one focused release page with context, playback, and a timed viewing window."
        primary={{ href: "/projects", label: "Back to Projects" }}
        secondary={{ href: "/donate", label: "Support the Initiative" }}
        media={stockMedia.screeningHero}
        asideTitle="Release experience"
        asideBody="The release page includes a locked state, access window, film context, and dedicated viewing screen for campaign content."
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
          <InfoCard eyebrow="Payments and access" title="Access can connect to the final payment provider" body="The screening route is structured for paid or private campaign releases once the payment and entitlement layer is connected." tone="forest-ink" />
        </div>
      </Reveal>

      <Reveal as="section" delay={200}>
        <div className="dark-panel-v2">
          <h2 className="dark-panel-v2__title">Ready for documentary and campaign film releases.</h2>
          <p className="dark-panel-v2__body">Campaign films can use this route for context, acknowledgement, timed viewing, and a support call after the release.</p>
          <div className="hero-actions">
            <LoadingLink href="/donate" className="button button--secondary" loadingLabel="Opening">Support the Platform</LoadingLink>
            <LoadingLink href="/projects" className="button button--secondary" loadingLabel="Opening">Return to Archive</LoadingLink>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
