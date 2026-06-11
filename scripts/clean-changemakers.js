/**
 * One-off cleanup: replace the `changemakers` table with the accurate, current
 * team data. The live DB held stale "Founding lead" / "Founding partner" copy
 * that the idempotent seed (insert-if-empty) never overwrote. This script does a
 * transactional replace so the DB matches the canonical site data:
 *   - Adam Mustafa (the actual founder)
 *   - Ikokwu Chidozie Ikemba (strategy & communications — no founder framing)
 *   - Regional partner in Ghana (no founder framing)
 *   - Sib (film & pay-per-view screenings, real photo)
 *
 * Run: node scripts/clean-changemakers.js
 */
const path = require("path");

if (typeof process.loadEnvFile === "function") {
  process.loadEnvFile(path.join(process.cwd(), ".env.local"));
}

const postgres = require("postgres");

const columns = [
  "eyebrow",
  "name",
  "role",
  "location",
  "summary",
  "body",
  "tags",
  "href",
  "href_label",
  "image_src",
  "image_alt",
  "image_label",
  "image_ratio"
];

const changemakers = [
  {
    eyebrow: "Founder",
    name: "Adam Mustafa",
    role: "Founder — mental health and community support advocate",
    location: "United Kingdom",
    summary:
      "Founder of Humanity First Initiative, drawing on more than a decade supporting families affected by mental health challenges through community engagement and talking therapies.",
    body:
      "Adam has supported families affected by mental health challenges for over ten years, drawing on both professional and personal experience following a family breakdown in 2016. He works closely with local authorities to strengthen community relations and bridge the gap between Community Mental Health Teams and the people they serve, championing communication, support, and talking therapies alongside medical treatment where appropriate. As a former BAME Officer for the Labour Party, he gained valuable experience engaging communities across a wide range of cultural backgrounds, and brings more than twenty years of community work to improving mental health awareness, support, and engagement for individuals and families.",
    tags: "Mental health advocacy, Community relations, Talking therapies, Diversity & inclusion",
    href: "",
    href_label: "",
    image_src: "/Adams.jpeg",
    image_alt: "Adam Mustafa, founder of Humanity First Initiative.",
    image_label: "Founder",
    image_ratio: "portrait"
  },
  {
    eyebrow: "Strategy and communications",
    name: "Ikokwu Chidozie Ikemba",
    role: "Psychologist, strategist, media practitioner, and environmental entrepreneur",
    location: "Nigeria",
    summary:
      "Supports campaign strategy, public communication, sustainability framing, and partner-facing storytelling for the initiative.",
    body:
      "Ikemba brings experience from psychology, media practice, environmental enterprise, and civic communication. His contribution helps projects with clearer messaging, public context, campaign structure, and sustainability framing.",
    tags: "Strategic communication, Sustainability, Creative direction, Public impact",
    href: "https://www.rwms.ng",
    href_label: "Visit RWMS",
    image_src: "/profile/chidozie-portrait.jpeg",
    image_alt: "Ikokwu Chidozie Ikemba in a white traditional outfit during a public event.",
    image_label: "Contributor profile",
    image_ratio: "portrait"
  },
  {
    eyebrow: "Ghana partnerships",
    name: "Regional partner in Ghana",
    role: "Community collaborator and regional growth partner",
    location: "Ghana",
    summary:
      "Helps build Ghana-based relationships, listen to community needs, and identify credible local collaboration paths.",
    body:
      "This partner gives the team a practical regional point of view as the platform grows beyond one country. The role is focused on introductions, community listening, field coordination, and helping local changemakers or organizations connect with the right support route.",
    tags: "Regional partnerships, Community outreach, Field coordination, Growth across countries",
    href: "/get-involved",
    href_label: "Discuss partnership",
    image_src: "/stock/community-gathering.jpg",
    image_alt: "Women and children gathered in a shared community space.",
    image_label: "Ghana partnership",
    image_ratio: "landscape"
  },
  {
    eyebrow: "Film, pay-per-view screenings & visual storytelling",
    name: "Sib",
    role: "Cinematographer, video editor, creative photographer, and pay-per-view screening contributor",
    location: "West Midlands, United Kingdom",
    summary:
      "Contributes film, editing, photography, and pay-per-view screening content for campaigns, profiles, and supporter-facing updates.",
    body:
      "Sib is a West Midlands-based cinematographer and video editor crafting visually compelling stories that connect with audiences and drive impact — for brands, organisations, and independent projects, including a feature documentary. For Humanity First Initiative, this includes producing pay-per-view screening content that helps fund and sustain the work. Their practice is shaped by a commitment to more accessible content and a perspective informed by being autistic, and extends to creative food and travel photography focused on authenticity.",
    tags: "Cinematography, Video editing, Pay-per-view screenings, Accessibility-led storytelling, Food and travel photography, Documentary",
    href: "https://sib-cinematographer.squarespace.com/",
    href_label: "View portfolio",
    image_src: "/sib.jpeg",
    image_alt: "Sib, cinematographer and video editor based in the West Midlands.",
    image_label: "Film & visual storytelling",
    image_ratio: "portrait"
  }
];

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is missing. Add it to .env.local before running this script.");
  }

  const sql = postgres(connectionString, {
    prepare: false,
    max: 1,
    idle_timeout: 20,
    connect_timeout: 20
  });

  try {
    const before = await sql`select display_order, name, eyebrow from changemakers order by display_order asc, id asc`;
    console.log("Before:");
    console.table(before);

    await sql.begin(async (tx) => {
      await tx`delete from changemakers`;

      const values = changemakers.map((row, index) => {
        const record = { display_order: index + 1 };
        for (const column of columns) {
          record[column] = row[column] ?? "";
        }
        return record;
      });

      await tx`insert into ${tx("changemakers")} ${tx(values, ["display_order", ...columns])}`;
    });

    const after = await sql`select display_order, name, eyebrow from changemakers order by display_order asc, id asc`;
    console.log("After:");
    console.table(after);
    console.log("changemakers table replaced with accurate, founder-language-free data.");
  } finally {
    await sql.end({ timeout: 5 });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
