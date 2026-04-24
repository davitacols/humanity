import { LoadingLink } from "../../components/LoadingLink";
import { PageHero } from "../../components/PageHero";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { StockPhoto } from "../../components/StockPhoto";
import { stockMedia } from "../../components/stockMedia";

const musicLinks = [
  {
    platform: "Facebook Reel",
    label: "Watch first artist",
    href: "https://www.facebook.com/share/r/18KMAN2G4k/?mibextid=wwXIfr",
    description: "The first featured artist performance now linked directly from the arts and music section."
  },
  {
    platform: "YouTube",
    label: "Watch on YouTube",
    href: "https://youtube.com",
    description: "Campaign films, spoken word performances, and community event recordings."
  },
  {
    platform: "Audiomack",
    label: "Listen on Audiomack",
    href: "https://audiomack.com",
    description: "Original tracks, advocacy anthems, and community-produced audio."
  },
  {
    platform: "Spotify",
    label: "Listen on Spotify",
    href: "https://spotify.com",
    description: "Curated playlists tied to campaign themes and cultural storytelling."
  }
];

const artistSpotlights = [
  {
    name: "First featured artist",
    role: "Music artist",
    body: "The first artist profile is now live in the music section with a direct Facebook reel link for supporters and visitors to watch.",
    href: "https://www.facebook.com/share/r/18KMAN2G4k/?mibextid=wwXIfr",
    hrefLabel: "Watch artist"
  },
  {
    name: "Community storytellers",
    role: "Spoken word and oral history",
    body: "Local voices documenting community experience through performance, poetry, and narrative."
  },
  {
    name: "Visual advocates",
    role: "Photography and illustration",
    body: "Artists using imagery to amplify humanitarian stories and campaign visibility."
  },
  {
    name: "Music for change",
    role: "Songwriting and production",
    body: "Musicians creating original work tied to health, education, and youth empowerment themes."
  }
];

const campaigns = [
  {
    title: "Voices of resilience",
    body: "A spoken word series capturing stories of mothers, youth, and community leaders navigating change.",
    status: "Active"
  },
  {
    title: "Lens on community",
    body: "A photo essay project documenting grassroots interventions across health, education, and sports.",
    status: "In progress"
  },
  {
    title: "Rhythm of hope",
    body: "A music-led campaign connecting local artists with humanitarian messaging for wider reach.",
    status: "Planning"
  }
];

export default function ArtsPage() {
  return (
    <main className="site-main page-v2 arts-page">
      <PageHero
        eyebrow="Arts and music"
        title="Creative expression as a tool for impact and advocacy."
        body="A curated space where film, photography, music, spoken word, and storytelling amplify community voices and drive social change."
        primary={{ href: "/get-involved", label: "Submit creative work" }}
        secondary={{ href: "/programs", label: "Back to programs" }}
        highlights={[
          "External music links",
          "Art gallery",
          "Spoken word",
          "Artist spotlights",
          "Creative campaigns"
        ]}
        media={stockMedia.homeStories[2]}
      />

      <Reveal as="section" delay={120}>
        <SectionIntro
          eyebrow="Listen and watch"
          title="Music and video linked from platforms communities already use."
          body="External links keep the site fast and accessible while connecting supporters to the creative work."
        />
        <div className="card-grid-v2 card-grid-v2--3">
          {musicLinks.map((link) => (
            <article key={link.platform} className="card-v2">
              <p className="card-v2__eyebrow">{link.platform}</p>
              <h3 className="card-v2__title">{link.description}</h3>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="button button--secondary"
                style={{ justifySelf: "start" }}
              >
                {link.label}
              </a>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" delay={180}>
        <SectionIntro
          eyebrow="Art gallery"
          title="Visual storytelling from the field."
          body="Photography, illustration, and creative media from community events, outreach, and advocacy campaigns."
        />
        <div className="split-v2">
          <StockPhoto
            src={stockMedia.homeStories[2].src}
            alt={stockMedia.homeStories[2].alt}
            label="Community storytelling"
            sizes="(max-width: 1120px) 100vw, 48vw"
          />
          <StockPhoto
            src={stockMedia.homeStories[0].src}
            alt={stockMedia.homeStories[0].alt}
            label="Health outreach"
            sizes="(max-width: 1120px) 100vw, 48vw"
          />
        </div>
        <div className="split-v2" style={{ marginTop: "0.85rem" }}>
          <StockPhoto
            src={stockMedia.educationFeature.src}
            alt={stockMedia.educationFeature.alt}
            label="Education access"
            sizes="(max-width: 1120px) 100vw, 48vw"
          />
          <StockPhoto
            src={stockMedia.homeHero.src}
            alt={stockMedia.homeHero.alt}
            label="Youth development"
            sizes="(max-width: 1120px) 100vw, 48vw"
          />
        </div>
      </Reveal>

      <Reveal as="section" delay={240}>
        <SectionIntro
          eyebrow="Artist spotlights"
          title="The people behind the creative work."
          body="Highlighting storytellers, visual artists, and musicians whose work supports the mission."
        />
        <div className="card-grid-v2 card-grid-v2--3">
          {artistSpotlights.map((artist) => (
            <article key={artist.name} className="card-v2">
              <p className="card-v2__eyebrow">{artist.role}</p>
              <h3 className="card-v2__title">{artist.name}</h3>
              <p className="card-v2__body">{artist.body}</p>
              {artist.href && artist.hrefLabel ? (
                <a
                  href={artist.href}
                  target="_blank"
                  rel="noreferrer"
                  className="button button--secondary"
                  style={{ justifySelf: "start" }}
                >
                  {artist.hrefLabel}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" delay={300}>
        <SectionIntro
          eyebrow="Creative campaigns"
          title="Advocacy through art, music, and storytelling."
          body="Active and upcoming campaigns that use creative expression to raise awareness and drive support."
        />
        <div className="card-grid-v2 card-grid-v2--3">
          {campaigns.map((campaign) => (
            <article key={campaign.title} className="card-v2">
              <div className="card-v2__top">
                <p className="card-v2__eyebrow">Campaign</p>
                <span
                  className="card-v2__index"
                  style={{ width: "auto", padding: "0 0.6rem", fontSize: "0.72rem" }}
                >
                  {campaign.status}
                </span>
              </div>
              <h3 className="card-v2__title">{campaign.title}</h3>
              <p className="card-v2__body">{campaign.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="dark-panel-v2" delay={360}>
        <h2 className="dark-panel-v2__title">Share your creative work with the initiative.</h2>
        <p className="dark-panel-v2__body">
          Artists, musicians, filmmakers, and storytellers can submit work for review and inclusion in campaigns, galleries, and advocacy projects.
        </p>
        <div className="hero-actions">
          <LoadingLink href="/get-involved" className="button button--primary" loadingLabel="Opening">
            Submit creative work
          </LoadingLink>
          <LoadingLink href="/programs" className="button button--secondary" loadingLabel="Opening">
            Back to programs
          </LoadingLink>
        </div>
      </Reveal>
    </main>
  );
}
