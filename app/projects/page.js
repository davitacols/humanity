import { InfoCard } from "../../components/InfoCard";
import { LoadingLink } from "../../components/LoadingLink";
import { PageHero } from "../../components/PageHero";
import { PhotoPanel } from "../../components/PhotoPanel";
import { premiumVideoProject, projectCards } from "../../components/siteData";

export default function ProjectsPage() {
  return (
    <main className="site-main">
      <PageHero
        eyebrow="Projects and stories"
        title="A project archive that feels rich, editorial, and easy to scan."
        body="The archive is structured so flagship stories feel important, while the wider project grid still gives equal visibility to health, education, arts, and sports interventions."
        primary={{ href: "/donate", label: "Support a Project" }}
        secondary={{ href: "/programs", label: "Browse Programs" }}
        asideTitle="Archive design"
        asideBody="A Getty-style influence works best when one case study leads, then a cleaner grid carries the rest of the stories without becoming noisy."
      />

      <section className="section">
        <div className="feature-panel">
          <PhotoPanel
            title="Featured case study"
            caption="community outreach with visible follow-up and partner context"
            tone="forest"
          />
          <div className="feature-panel__content">
            <span className="pill pill--soft">Flagship impact story</span>
            <h3>Community health outreach with measurable follow-up</h3>
            <p>
              This lead story block is designed for one anchor intervention with space for a
              concise summary, one testimonial, and a visible outcome or metric panel.
            </p>
            <div className="chip-row">
              <span className="chip">1,200+ reached</span>
              <span className="chip">4 partner clinics</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="feature-panel">
          <PhotoPanel
            title={premiumVideoProject.title}
            caption="locked premium storytelling or event playback"
            tone="sunset"
          />
          <div className="feature-panel__content">
            <span className="pill pill--soft">{premiumVideoProject.eyebrow}</span>
            <h3>Premium watch access is now part of the project system.</h3>
            <p>{premiumVideoProject.description}</p>
            <div className="chip-row">
              <span className="chip">{premiumVideoProject.price}</span>
              <span className="chip">{premiumVideoProject.accessWindow}</span>
            </div>
            <div className="hero-actions">
              <LoadingLink
                href={`/projects/${premiumVideoProject.slug}`}
                className="button button--primary"
                loadingLabel="Opening"
              >
                Open Premium Video
              </LoadingLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="card-grid">
          {projectCards.map((project, index) => (
            <InfoCard
              key={project.title}
              eyebrow={project.tag}
              title={project.title}
              body={project.body}
              tone={index % 3 === 1 ? "blush" : index % 3 === 2 ? "mist" : "paper"}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
