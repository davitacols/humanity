import { LoadingLink } from "../../components/LoadingLink";
import { PageHero } from "../../components/PageHero";
import { Reveal } from "../../components/Reveal";
import { SectionIntro } from "../../components/SectionIntro";
import { StockPhoto } from "../../components/StockPhoto";
import { getPlatformContentData } from "../../lib/platform-content";

export const revalidate = 300;

export const metadata = {
  title: "Gallery",
  description: "Photography and media from community outreach, education programs, sports development, and creative advocacy work."
};

export default async function GalleryPage() {
  const { changemakers, galleryItems } = await getPlatformContentData();
  const profilePhotos = changemakers
    .filter((person) => person.imageSrc)
    .slice(0, 3)
    .map((person) => ({
      src: person.imageSrc,
      alt: person.imageAlt,
      label: person.name,
      ratio: person.imageRatio
    }));

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
        <SectionIntro
          eyebrow="Field photography"
          title="Images from programs, outreach, and community events."
          body="Health outreach, youth sports, education sessions, and community gatherings documented by the team."
        />
        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <StockPhoto
              key={`${item.src}-${index}`}
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
        <SectionIntro
          eyebrow="The team"
          title="Leadership, collaboration, and public engagement."
          body="The people and partnerships shaping the platform's regional growth."
        />
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
        <p className="dark-panel-v2__body">
          Field photography, event documentation, and creative media are published as the
          initiative expands across sectors and countries.
        </p>
        <div className="hero-actions">
          <LoadingLink href="/arts" className="button button--primary" loadingLabel="Opening">
            Visit arts section
          </LoadingLink>
          <LoadingLink href="/projects" className="button button--secondary" loadingLabel="Opening">
            Explore projects
          </LoadingLink>
        </div>
      </Reveal>
    </main>
  );
}
