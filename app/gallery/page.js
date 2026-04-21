import { LoadingLink } from "../../components/LoadingLink";
import { PageHero } from "../../components/PageHero";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { StockPhoto } from "../../components/StockPhoto";
import { stockMedia } from "../../components/stockMedia";

const galleryItems = [
  { ...stockMedia.homeStories[0], category: "Health" },
  { ...stockMedia.homeHero, category: "Sports" },
  { ...stockMedia.homeStories[2], category: "Community" },
  { ...stockMedia.educationFeature, category: "Education" },
  { ...stockMedia.homeStories[1], category: "Sports" },
  { ...stockMedia.aboutHero, category: "Community" },
  { ...stockMedia.donateHero, category: "Volunteer" },
  { ...stockMedia.aboutMission, category: "Community" }
];

const profilePhotos = [
  { src: "/profile/chidozie-portrait.jpeg", alt: "Ikokwu Chidozie Ikemba at a public event.", label: "Founder", ratio: "portrait" },
  { src: "/profile/chidozie-group.jpeg", alt: "Circular economy event with international attendees.", label: "Partnership" },
  { src: "/profile/chidozie-event.jpeg", alt: "Nigeria Circular Economy Week conference stage.", label: "Public event" }
];

export default function GalleryPage() {
  return (
    <main className="site-main page-v2">
      <PageHero
        eyebrow="Media gallery"
        title="Photos from fieldwork, events, and programs."
        body="Visual documentation of the initiative's work across health, education, sports, arts, and community development."
        primary={{ href: "/projects", label: "View projects" }}
        secondary={{ href: "/arts", label: "Arts and music" }}
        asideTitle="Visual storytelling"
        asideBody="Every image is tied to real fieldwork, community events, or program delivery. The gallery grows as the initiative expands."
      />

      <Reveal as="section" delay={120}>
        <SectionIntro eyebrow="Field photography" title="Images from programs, outreach, and community events." body="Health outreach, youth sports, education sessions, and community gatherings documented by the team." />
        <div className="gallery-grid">
          {galleryItems.map((item, i) => (
            <StockPhoto
              key={`${item.src}-${i}`}
              src={item.src}
              alt={item.alt}
              label={item.category}
              ratio={item.ratio}
              sizes="(max-width: 820px) 100vw, (max-width: 1120px) 48vw, 32vw"
            />
          ))}
        </div>
      </Reveal>

      <Reveal as="section" delay={200}>
        <SectionIntro eyebrow="Founder and partnerships" title="Leadership, collaboration, and public engagement." body="Images from conferences, partnership events, and public-facing work." />
        <div className="gallery-grid gallery-grid--3">
          {profilePhotos.map((item) => (
            <StockPhoto
              key={item.src}
              src={item.src}
              alt={item.alt}
              label={item.label}
              ratio={item.ratio}
              sizes="(max-width: 820px) 100vw, 32vw"
            />
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="dark-panel-v2" delay={260}>
        <h2 className="dark-panel-v2__title">More images are added as programs grow.</h2>
        <p className="dark-panel-v2__body">Field photography, event documentation, and creative media are published as the initiative expands across sectors and countries.</p>
        <div className="hero-actions">
          <LoadingLink href="/arts" className="button button--primary" loadingLabel="Opening">Visit arts section</LoadingLink>
          <LoadingLink href="/projects" className="button button--secondary" loadingLabel="Opening">Explore projects</LoadingLink>
        </div>
      </Reveal>
    </main>
  );
}
