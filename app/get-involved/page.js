import { InfoCard } from "../../components/InfoCard";
import { LoadingLink } from "../../components/LoadingLink";
import { PageHero } from "../../components/PageHero";
import { involvementPaths, updateCards } from "../../components/siteData";

export default function GetInvolvedPage() {
  return (
    <main className="site-main">
      <PageHero
        eyebrow="Get involved"
        title="Turn interest into action without overwhelming people."
        body="This route gives different supporter types their own path, whether they want to volunteer, partner, contribute creatively, or sponsor a program."
        primary={{ href: "/donate", label: "Sponsor a Program" }}
        secondary={{ href: "/education/contribute", label: "Submit a Resource" }}
        asideTitle="Conversion structure"
        asideBody="A strong involvement page routes different audiences clearly while still keeping the site warm, human, and visually consistent."
      />

      <section className="section">
        <div className="info-grid info-grid--two">
          {involvementPaths.map((path, index) => (
            <InfoCard
              key={path.title}
              title={path.title}
              body={path.body}
              tone={index % 2 === 0 ? "paper" : "mist"}
            />
          ))}
        </div>
      </section>

      <section className="section section-grid section-grid--campaign">
        <div className="hub-card">
          <InfoCard
            eyebrow="Submission flow"
            title="The education contributor form is now live."
            body="Educators, mentors, and partner organizations can now submit books, lesson links, and toolkits into a real review queue backed by Neon."
            tone="blush"
          />
          <LoadingLink
            href="/education/contribute"
            className="button button--secondary hub-card__cta"
            loadingLabel="Opening"
          >
            Open Contributor Form
          </LoadingLink>
        </div>
        <div className="stack-grid">
          {updateCards.map((update) => (
            <InfoCard
              key={update.title}
              eyebrow="Latest update"
              title={update.title}
              body={update.body}
              tone="paper"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
