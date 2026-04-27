import { LoadingLink } from "../../components/LoadingLink";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { StockPhoto } from "../../components/StockPhoto";
import { VideoPreview } from "../../components/VideoPreview";
import { stockMedia } from "../../components/stockMedia";

const musicLinks = [
  { platform: "Facebook Reel", label: "Watch first artist", href: "https://www.facebook.com/share/r/1E5HyPvYgP/", description: "The first featured artist performance linked directly from the arts section." },
  { platform: "YouTube", label: "Watch on YouTube", href: "https://youtube.com", description: "Campaign films, spoken word performances, and community event recordings." },
  { platform: "Audiomack", label: "Listen on Audiomack", href: "https://audiomack.com", description: "Original tracks, advocacy anthems, and community-produced audio." },
  { platform: "Spotify", label: "Listen on Spotify", href: "https://spotify.com", description: "Curated playlists tied to campaign themes and cultural storytelling." }
];

const featuredArtist = {
  name: "First featured artist",
  role: "Music artist",
  body: "The first artist performance is now live on Facebook. Tap the preview to watch the full reel.",
  href: "https://www.facebook.com/share/r/1E5HyPvYgP/"
};

const artistSpotlights = [
  { name: "Community storytellers", role: "Spoken word and oral history", body: "Local voices documenting community experience through performance, poetry, and narrative." },
  { name: "Visual advocates", role: "Photography and illustration", body: "Artists using imagery to amplify humanitarian stories and campaign visibility." },
  { name: "Music for change", role: "Songwriting and production", body: "Musicians creating original work tied to health, education, and youth empowerment themes." }
];

const campaigns = [
  { title: "Voices of resilience", body: "A spoken word series capturing stories of mothers, youth, and community leaders navigating change.", status: "Active" },
  { title: "Lens on community", body: "A photo essay project documenting grassroots interventions across health, education, and sports.", status: "In progress" },
  { title: "Rhythm of hope", body: "A music-led campaign connecting local artists with humanitarian messaging for wider reach.", status: "Planning" }
];

const galleryImages = [
  { ...stockMedia.homeStories[2], label: "Community storytelling" },
  { ...stockMedia.homeStories[0], label: "Health outreach" },
  { ...stockMedia.educationFeature, label: "Education access" },
  { ...stockMedia.homeHero, label: "Youth development" }
];

export default function ArtsPage() {
  return (
    <main className="site-main arts-v2">
      {/* Hero */}
      <Reveal as="section" className="about-hero" delay={60}>
        <img src={stockMedia.homeStories[2].src} alt={stockMedia.homeStories[2].alt} className="about-hero__bg" />
        <div className="about-hero__overlay" />
        <div className="about-hero__content">
          <p className="about-hero__eyebrow">Arts and music</p>
          <h1 className="about-hero__title">Creative expression as a tool for impact and advocacy.</h1>
          <p className="about-hero__body">
            Film, photography, music, spoken word, and storytelling amplify community voices
            and drive social change across the initiative.
          </p>
          <div className="hero-actions">
            <LoadingLink href="/get-involved" className="button button--primary" loadingLabel="Opening">Submit creative work</LoadingLink>
            <LoadingLink href="/programs" className="button button--ghost-light" loadingLabel="Opening">Back to programs</LoadingLink>
          </div>
        </div>
        <div className="about-hero__stats">
          <article className="about-hero__stat"><p className="about-hero__stat-value">4</p><p className="about-hero__stat-label">external music platforms linked</p></article>
          <article className="about-hero__stat"><p className="about-hero__stat-value">3</p><p className="about-hero__stat-label">active creative campaigns</p></article>
          <article className="about-hero__stat"><p className="about-hero__stat-value">4</p><p className="about-hero__stat-label">artist spotlights published</p></article>
        </div>
      </Reveal>

      {/* Listen & watch */}
      <Reveal as="section" className="arts-v2__section" delay={100}>
        <SectionIntro eyebrow="Listen and watch" title="Music and video linked from platforms communities already use." body="External links keep the site fast while connecting supporters to the creative work." />
        <div className="arts-v2__platforms">
          {musicLinks.map((link) => (
            <a key={link.platform} href={link.href} target="_blank" rel="noreferrer" className="arts-v2__platform">
              <span className="arts-v2__platform-name">{link.platform}</span>
              <p className="arts-v2__platform-desc">{link.description}</p>
              <span className="arts-v2__platform-action">{link.label} →</span>
            </a>
          ))}
        </div>
      </Reveal>

      {/* Gallery */}
      <Reveal as="section" className="arts-v2__section" delay={160}>
        <SectionIntro eyebrow="Art gallery" title="Visual storytelling from the field." body="Photography, illustration, and creative media from community events, outreach, and advocacy campaigns." />
        <div className="arts-v2__gallery">
          {galleryImages.map((img, i) => (
            <StockPhoto key={img.label} src={img.src} alt={img.alt} label={img.label} ratio={i === 0 ? "portrait" : "landscape"} sizes="(max-width: 1120px) 100vw, 32vw" className={i === 0 ? "arts-v2__gallery-tall" : ""} />
          ))}
        </div>
      </Reveal>

      {/* Featured artist preview */}
      <Reveal as="section" className="arts-v2__section" delay={220}>
        <SectionIntro eyebrow="Featured artist" title="Watch the first artist performance." body="A live reel preview embedded directly — no need to leave the page." />
        <div className="arts-v2__featured-artist">
          <VideoPreview
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            poster={stockMedia.homeStories[2].src}
            href={featuredArtist.href}
            label="Watch on Facebook"
          />
          <div className="arts-v2__featured-copy">
            <p className="arts-v2__artist-role">{featuredArtist.role}</p>
            <h3 className="arts-v2__artist-name">{featuredArtist.name}</h3>
            <p className="arts-v2__artist-body">{featuredArtist.body}</p>
            <a href={featuredArtist.href} target="_blank" rel="noreferrer" className="button button--primary">
              Open reel on Facebook
            </a>
          </div>
        </div>
      </Reveal>

      {/* More artist spotlights */}
      <Reveal as="section" className="arts-v2__section" delay={250}>
        <SectionIntro eyebrow="More spotlights" title="The people behind the creative work." body="Highlighting storytellers, visual artists, and musicians whose work supports the mission." />
        <div className="arts-v2__artists">
          {artistSpotlights.map((artist) => (
            <article key={artist.name} className="arts-v2__artist">
              <p className="arts-v2__artist-role">{artist.role}</p>
              <h3 className="arts-v2__artist-name">{artist.name}</h3>
              <p className="arts-v2__artist-body">{artist.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Campaigns */}
      <Reveal as="section" className="arts-v2__section" delay={280}>
        <SectionIntro eyebrow="Creative campaigns" title="Advocacy through art, music, and storytelling." body="Active and upcoming campaigns that use creative expression to raise awareness and drive support." />
        <div className="arts-v2__campaigns">
          {campaigns.map((c) => (
            <article key={c.title} className="arts-v2__campaign">
              <div className="arts-v2__campaign-top">
                <span className="arts-v2__campaign-status">{c.status}</span>
              </div>
              <h3 className="arts-v2__campaign-title">{c.title}</h3>
              <p className="arts-v2__campaign-body">{c.body}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section" className="arts-v2__section" delay={340}>
        <div className="arts-v2__cta">
          <h2 className="arts-v2__cta-title">Share your creative work with the initiative.</h2>
          <p className="arts-v2__cta-body">Artists, musicians, filmmakers, and storytellers can submit work for review and inclusion in campaigns, galleries, and advocacy projects.</p>
          <div className="hero-actions">
            <LoadingLink href="/get-involved" className="button button--primary" loadingLabel="Opening">Submit creative work</LoadingLink>
            <LoadingLink href="/programs" className="button button--ghost-light" loadingLabel="Opening">Back to programs</LoadingLink>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
