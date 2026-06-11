import "./team.css";
import { LoadingLink } from "../../components/LoadingLink";
import { Reveal } from "../../components/Reveal";
import { StockPhoto } from "../../components/StockPhoto";
import { platformProfiles } from "../../components/siteData";

export const revalidate = 300;

// Values the network actually states elsewhere on the site (About page).
const workingPrinciples = [
  { title: "People before sectors", body: "Education, health, sports, and arts are presented through the communities they serve — not as abstract departments." },
  { title: "Proof before promotion", body: "Field updates, needs, and context come before any appeal, so supporters can review the work before committing." },
  { title: "Dignity in storytelling", body: "People are described with care and agency — never reduced to hardship for attention." },
  { title: "Honest collaboration", body: "Everyone is named for the role they actually play, so the network stays clear and accountable." }
];

export const metadata = {
  title: "Founder & Team",
  description:
    "The founder and collaborators behind Humanity First Initiative — from mental health advocacy and strategy to regional partnerships and visual storytelling."
};

function profileLink(person, variant = "secondary") {
  if (!person?.href || !person?.hrefLabel) return null;
  const className = `button button--${variant}`;
  if (person.href.startsWith("http")) {
    return (
      <a href={person.href} target="_blank" rel="noreferrer" className={className}>
        {person.hrefLabel}
      </a>
    );
  }
  return (
    <LoadingLink href={person.href} className={className} loadingLabel="Opening">
      {person.hrefLabel}
    </LoadingLink>
  );
}

function CardMedia({ person, ratio = "portrait", sizes }) {
  if (person.imageSrc) {
    return (
      <StockPhoto
        src={person.imageSrc}
        alt={person.imageAlt || person.name}
        label={person.imageLabel || person.eyebrow}
        ratio={ratio}
        sizes={sizes}
      />
    );
  }
  // No confirmed photo (e.g. Sib) — show an honest labelled tile, not a stock face.
  return (
    <div className="team-monogram" aria-hidden="true">
      <span className="team-monogram__tag">{person.eyebrow}</span>
      <strong>{person.name}</strong>
    </div>
  );
}

export default function TeamPage() {
  // Use the static contributor profiles (clean, role-based framing) rather than
  // the DB content, which labels people "Founding lead/partner" — founder framing
  // that doesn't match how this page is meant to present the team.
  const profiles = platformProfiles.filter((p) => p?.name);
  const [lead, ...collaborators] = profiles;

  const countries = new Set(
    profiles
      .map((p) => (p.location || "").split(",").pop().trim())
      .filter(Boolean)
  );

  const signals = [
    { value: String(profiles.length), label: "people on the team" },
    { value: String(countries.size || 3), label: "countries represented" },
    { value: "4", label: "program routes" }
  ];

  return (
    <main className="site-main team">
      <Reveal as="section" className="team-hero" delay={60}>
        <span className="team-kicker">Founder &amp; team</span>
        <h1 className="team-hero__title">The people behind the work.</h1>
        <p className="team-hero__body">
          Humanity First Initiative is founder-led and built by a small, distributed group of
          contributors — named for the role each one plays across mental health advocacy, strategy,
          regional partnerships, and visual storytelling. No abstractions, no overstated titles:
          just the people doing the work.
        </p>
        <div className="team-hero__actions">
          <LoadingLink href="/about" className="button button--primary" loadingLabel="Opening">
            Read the mission
          </LoadingLink>
          <LoadingLink href="/get-involved" className="button button--ghost-light" loadingLabel="Opening">
            Join the network
          </LoadingLink>
        </div>
        <div className="team-hero__signals" aria-label="Team at a glance">
          {signals.map((signal) => (
            <article key={signal.label} className="team-signal">
              <strong>{signal.value}</strong>
              <span>{signal.label}</span>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="team-section team-roster" delay={120}>
        <div className="team-section__header">
          <span className="team-kicker">Who we are</span>
          <h2 className="team-heading">Named for the role they play.</h2>
          <p className="team-section__body">
            One network, distributed across countries and disciplines. Each profile reflects a real,
            current contribution — and a clear way to reach the work behind it.
          </p>
        </div>

        {lead ? (
          <article className="team-lead">
            <div className="team-lead__media">
              <CardMedia person={lead} ratio="portrait" sizes="(max-width: 1080px) 100vw, 38vw" />
            </div>
            <div className="team-lead__copy">
              <span className="team-lead__eyebrow">{lead.eyebrow || "Contributor"}</span>
              <h3 className="team-lead__name">{lead.name}</h3>
              <p className="team-lead__role">{lead.role}</p>
              {lead.location ? <p className="team-lead__location">{lead.location}</p> : null}
              <p className="team-lead__summary">{lead.summary}</p>
              <p className="team-lead__bio">{lead.body}</p>
              {lead.tags?.length ? (
                <div className="team-tags" aria-label={`${lead.name} focus areas`}>
                  {lead.tags.map((tag) => (
                    <span key={tag} className="team-tag">{tag}</span>
                  ))}
                </div>
              ) : null}
              <div className="team-lead__actions">
                {profileLink(lead, "primary")}
                <LoadingLink href="/projects" className="button button--ghost" loadingLabel="Opening">
                  See the work
                </LoadingLink>
              </div>
            </div>
          </article>
        ) : null}

        {collaborators.length ? (
          <div className="team-grid">
            {collaborators.map((person) => (
              <article key={person.name} id={person.name === "Sib" ? "sib" : undefined} className="team-card">
                <div className="team-card__media">
                  <CardMedia person={person} ratio="landscape" sizes="(max-width: 760px) 100vw, 46vw" />
                </div>
                <div className="team-card__copy">
                  <span className="team-card__eyebrow">{person.eyebrow || "Contributor"}</span>
                  <h3 className="team-card__name">{person.name}</h3>
                  <p className="team-card__role">{person.role}</p>
                  {person.location ? <p className="team-card__location">{person.location}</p> : null}
                  <p className="team-card__summary">{person.summary}</p>
                  {person.tags?.length ? (
                    <div className="team-tags">
                      {person.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="team-tag">{tag}</span>
                      ))}
                    </div>
                  ) : null}
                  {profileLink(person, "secondary")}
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </Reveal>

      <Reveal as="section" className="team-section team-values" delay={160}>
        <div className="team-section__header">
          <span className="team-kicker">How we work</span>
          <h2 className="team-heading">Principles the team holds to.</h2>
        </div>
        <div className="team-principles">
          {workingPrinciples.map((principle, index) => (
            <article key={principle.title} className="team-principle">
              <span className="team-principle__num">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="team-section" delay={200}>
        <div className="team-cta">
          <div>
            <span className="team-cta__kicker">Add your skill</span>
            <h2 className="team-cta__title">There's room in the network for what you do.</h2>
            <p className="team-cta__body">
              Strategists, field partners, coaches, clinicians, educators, and storytellers each have
              a route in. Tell us how you want to contribute, or back the work directly.
            </p>
          </div>
          <div className="team-cta__actions">
            <LoadingLink href="/get-involved" className="button button--primary" loadingLabel="Opening">
              Get involved
            </LoadingLink>
            <LoadingLink href="/donate" className="button button--ghost-light" loadingLabel="Opening">
              Support the work
            </LoadingLink>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
