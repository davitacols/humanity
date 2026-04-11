import { InfoCard } from "../../components/InfoCard";
import { PageHero } from "../../components/PageHero";
import { SectionIntro } from "../../components/SectionIntro";

const values = [
  {
    title: "Dignity first",
    body: "Every story, image, and ask should protect the dignity of the people being served."
  },
  {
    title: "Transparency",
    body: "Donors and partners should understand where support goes and what kind of outcome it helps create."
  },
  {
    title: "Community voice",
    body: "Programs are strongest when they are shaped with local participation rather than imposed from the outside."
  },
  {
    title: "Creative empowerment",
    body: "Arts, music, and storytelling are treated as real tools for healing, visibility, and advocacy."
  }
];

export default function AboutPage() {
  return (
    <main className="site-main">
      <PageHero
        eyebrow="About the initiative"
        title="A founder story that feels human, credible, and built to grow."
        body="The about page is designed to build trust through story, mission, values, and a visible path to regional expansion without slipping into generic nonprofit language."
        primary={{ href: "/get-involved", label: "Partner With Us" }}
        secondary={{ href: "/projects", label: "See Impact" }}
        asideTitle="Editorial story structure"
        asideBody="This page keeps biography, mission, and growth direction close together so visitors understand both the heart behind the work and its long-term ambition."
      />

      <section className="section section-grid section-grid--split">
        <InfoCard
          eyebrow="Why this started"
          title="A story shaped by what was seen in the field."
          body="Use this block for the founder narrative: what became impossible to ignore, why visibility matters, and why structure and trust are essential if humanitarian work is going to keep growing."
        />
        <InfoCard
          eyebrow="Vision and mission"
          title="Visibility, trust, and practical support for local changemakers."
          body="The platform exists to document and amplify grassroots interventions while building a stronger bridge between communities, supporters, and long-term partners."
          tone="mist"
        />
      </section>

      <section className="section">
        <SectionIntro
          eyebrow="Core values"
          title="Show the ethics behind the platform, not just the activity."
          body="These cards keep the initiative from feeling abstract. They make the standards behind future campaigns and partnerships visible from the start."
        />

        <div className="info-grid info-grid--two">
          {values.map((value, index) => (
            <InfoCard
              key={value.title}
              title={value.title}
              body={value.body}
              tone={index % 2 === 0 ? "paper" : "mist"}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionIntro
          eyebrow="Growth map"
          title="Built to expand beyond one founder, one program, or one country."
          body="The long-term structure supports collaborators, country-specific interventions, campaign pages, and more formal partnership blocks as the initiative grows."
        />

        <div className="growth-map">
          <div className="growth-map__visual">
            <div className="growth-map__continent">Africa expansion map placeholder</div>
          </div>
          <div className="growth-map__cards">
            <InfoCard
              eyebrow="Current base"
              title="Founder-led programs"
              body="Launch the first version with a clear origin point and a strong sense of who is driving the work."
            />
            <InfoCard
              eyebrow="Active partner"
              title="Ghana-based collaboration"
              body="Show the first expansion node with room for partner profile, country context, and joint campaigns."
              tone="blush"
            />
            <InfoCard
              eyebrow="Future structure"
              title="Contributor onboarding and campaign growth"
              body="Reserve space for partner logos, country clusters, and future program leads without redesigning the site later."
              tone="leaf"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
