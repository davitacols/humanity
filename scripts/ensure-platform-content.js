const path = require("path");

if (typeof process.loadEnvFile === "function") {
  process.loadEnvFile(path.join(process.cwd(), ".env.local"));
}

const postgres = require("postgres");

const changemakers = [
  {
    eyebrow: "Strategic contributor",
    name: "Ikokwu Chidozie Ikemba",
    role: "Psychologist, strategist, media practitioner, and environmental entrepreneur",
    location: "Nigeria",
    summary:
      "Contributes public communication, sustainability experience, partnership thinking, and cross-sector storytelling with a focus on civic relevance and visible social impact.",
    body:
      "This profile sits alongside other public collaborators in the network. It represents one contributor's communication, sustainability, and public-impact experience without implying a leadership designation.",
    tags: "Strategic communication, Sustainability, Creative direction, Public impact",
    href: "https://www.rwms.ng",
    href_label: "Visit RWMS",
    image_src: "/profile/chidozie-portrait.jpeg",
    image_alt: "Ikokwu Chidozie Ikemba in a white traditional outfit during a public event.",
    image_label: "Contributor profile",
    image_ratio: "portrait"
  },
  {
    eyebrow: "Regional collaborator",
    name: "Regional partner in Ghana",
    role: "Community collaborator and regional growth partner",
    location: "Ghana",
    summary:
      "Supports the platform's expansion into Ghana through local relationship building, community listening, partnership development, and field-level collaboration.",
    body:
      "This regional collaborator role represents the platform's multi-country direction, helping shape how projects, campaigns, and local changemakers can be represented beyond one public profile.",
    tags: "Regional partnerships, Community outreach, Field coordination, Growth across countries",
    href: "/get-involved",
    href_label: "Discuss partnership",
    image_src: "/stock/community-gathering.jpg",
    image_alt: "Women and children gathered in a shared community space.",
    image_label: "Ghana partnership",
    image_ratio: "landscape"
  }
];

const platformUpdates = [
  {
    category: "Field report",
    date_label: "April 2026",
    title: "Maternal health kits reach 50 families in first outreach",
    body:
      "The first batch of maternal health kits was distributed to mothers and newborns across three communities, with follow-up visits scheduled for the coming weeks.",
    href: "",
    cta_label: ""
  },
  {
    category: "Program update",
    date_label: "March 2026",
    title: "Dodoma Best Sports Center launches U-7 training group",
    body:
      "The youngest age group at the sports center began structured training sessions, expanding the program's reach to children as young as seven.",
    href: "/projects/dodoma-best-sports-center",
    cta_label: "Open project"
  },
  {
    category: "Milestone",
    date_label: "March 2026",
    title: "Education hub crosses 12 curated resources",
    body:
      "The education library now includes downloadable guides, external lessons, facilitator toolkits, and coding pathways - all reviewed and organized into tracks.",
    href: "/education",
    cta_label: "Open education hub"
  },
  {
    category: "Campaign",
    date_label: "February 2026",
    title: "Community storytelling campaign opens for submissions",
    body:
      "Artists, photographers, and spoken word performers are invited to submit work for the Voices of Resilience creative advocacy campaign.",
    href: "/arts",
    cta_label: "Visit arts section"
  },
  {
    category: "Volunteer",
    date_label: "February 2026",
    title: "Volunteer call for community tournament support",
    body:
      "The initiative is looking for volunteers to help organize, referee, and document upcoming community football tournaments.",
    href: "/get-involved",
    cta_label: "Get involved"
  },
  {
    category: "Campaign",
    date_label: "January 2026",
    title: "Nutrition flyer campaign enters design phase",
    body:
      "Quick-use nutrition guides for parents and caregivers are being designed for print distribution at community health events.",
    href: "/health",
    cta_label: "Visit health section"
  }
];

const blogPosts = [
  {
    slug: "why-visible-proof-matters-in-humanitarian-work",
    title: "Why visible proof matters in humanitarian work",
    excerpt:
      "Humanitarian trust grows when communities, supporters, and partners can see what is happening, where support is going, and what still needs attention.",
    category: "Field notes",
    author: "Humanity First Initiative",
    published_at: "2026-04-18",
    reading_time: "4 min read",
    image_src: "/stock/volunteer-sorting.jpg",
    image_alt: "Volunteers sorting donated supplies together.",
    status: "published",
    featured: true,
    body:
      "Humanitarian work cannot rely on good intentions alone. People need to see the route from concern to action: the community need, the support pathway, the people served, and the follow-up that happens after the first visit.\n\nThat is why the platform treats stories, transparent donation routes, program pages, and field updates as part of the work itself. They help supporters understand where help is useful, and they help communities stay visible without being reduced to statistics.\n\nThe goal is simple: publish proof that is respectful, practical, and connected to real needs. When the work is documented clearly, trust becomes easier to build and easier to protect."
  },
  {
    slug: "building-support-routes-around-real-community-needs",
    title: "Building support routes around real community needs",
    excerpt:
      "Donation routes work best when they are connected to specific program areas: maternal health, education access, youth sports, and creative advocacy.",
    category: "Transparency",
    author: "Humanity First Initiative",
    published_at: "2026-04-10",
    reading_time: "5 min read",
    image_src: "/stock/community-gathering.jpg",
    image_alt: "Women and children gathered in a shared community space.",
    status: "published",
    featured: false,
    body:
      "A useful support route starts with a real need, not a vague appeal. Families may need maternal health kits, learners may need low-data resources, youth programs may need equipment, and creative campaigns may need documentation support.\n\nThe platform organizes these needs into clear routes so donors and partners can understand what each contribution is meant to strengthen. That structure also makes it easier to report back with practical updates instead of broad promises.\n\nAs the work grows, the route system can keep expanding: new programs, new countries, new community partners, and new evidence from the field."
  },
  {
    slug: "creative-storytelling-without-losing-dignity",
    title: "Creative storytelling without losing dignity",
    excerpt:
      "Photography, film, writing, and design can make humanitarian work more visible while still protecting the dignity of people and communities.",
    category: "Storytelling",
    author: "Humanity First Initiative",
    published_at: "2026-03-29",
    reading_time: "3 min read",
    image_src: "/stock/community-gathering.jpg",
    image_alt: "A community gathering suitable for documentary and campaign storytelling.",
    status: "published",
    featured: false,
    body:
      "Creative work can carry humanitarian stories farther than reports alone. A photograph, short film, field note, or campaign poster can help people understand the human reality behind a program.\n\nBut visibility must be handled with care. The aim is not to turn people into symbols of suffering. The aim is to show context, strength, need, and practical action with consent and respect.\n\nThat is the standard this platform is moving toward: storytelling that invites support without flattening the people it exists to serve."
  }
];

const galleryItems = [
  {
    src: "/stock/mother-clinic.jpg",
    alt: "A mother holding a newborn while receiving care support.",
    label: "Health outreach",
    category: "Health",
    ratio: "landscape"
  },
  {
    src: "/stock/youth-football.jpg",
    alt: "Young people playing football together in a neighborhood street.",
    label: "Current program imagery",
    category: "Sports",
    ratio: "landscape"
  },
  {
    src: "/stock/community-gathering.jpg",
    alt: "Women and children gathered together during a community event.",
    label: "Community storytelling",
    category: "Community",
    ratio: "landscape"
  },
  {
    src: "/stock/classroom-session.jpg",
    alt: "Students gathered in a classroom during a learning session.",
    label: "Education access",
    category: "Education",
    ratio: "landscape"
  },
  {
    src: "/stock/youth-football.jpg",
    alt: "Children and young people playing football in a community street.",
    label: "Youth development",
    category: "Sports",
    ratio: "landscape"
  },
  {
    src: "/stock/mother-village.jpg",
    alt: "A mother carrying her child in a rural community setting.",
    label: "Community life",
    category: "Community",
    ratio: "portrait"
  },
  {
    src: "/stock/volunteer-sorting.jpg",
    alt: "Volunteers sorting donated supplies together.",
    label: "Support in action",
    category: "Volunteer",
    ratio: "landscape"
  },
  {
    src: "/stock/community-gathering.jpg",
    alt: "Women and children gathered in a shared community space.",
    label: "People and place",
    category: "Community",
    ratio: "landscape"
  }
];

const donationFunds = [
  {
    slug: "maternal-child-health",
    eyebrow: "Health route",
    title: "Maternal and child health outreach",
    support_area: "Maternal and child health support",
    summary:
      "Supports hygiene kits, maternal check-ins, community health education, and nutrition-focused follow-up for women and children.",
    amount_label: "Current goal: NGN 2,500,000",
    target_amount_ngn: 2500000,
    raised_amount_ngn: 850000,
    beneficiaries_label: "50 families in the active outreach pipeline",
    status_label: "Current quarter funding gap",
    href: "/health",
    href_label: "Visit health program",
    payment_url: ""
  },
  {
    slug: "education-access",
    eyebrow: "Education route",
    title: "Education access and digital skills",
    support_area: "Education access and digital skills",
    summary:
      "Keeps books, low-bandwidth learning materials, facilitator guides, and beginner digital-skills sessions available to learners.",
    amount_label: "Current goal: NGN 1,800,000",
    target_amount_ngn: 1800000,
    raised_amount_ngn: 620000,
    beneficiaries_label: "Three learning tracks in active development",
    status_label: "Resource build-out in progress",
    href: "/education",
    href_label: "Visit education hub",
    payment_url: ""
  },
  {
    slug: "youth-sports",
    eyebrow: "Sports route",
    title: "Youth sports development",
    support_area: "Youth sports development",
    summary:
      "Backs grassroots training, equipment, tournament logistics, and mentorship for youth programs like Dodoma Best Sports Center.",
    amount_label: "Current goal: NGN 1,950,000",
    target_amount_ngn: 1950000,
    raised_amount_ngn: 740000,
    beneficiaries_label: "Current pathway includes 100 youth participants",
    status_label: "Equipment and logistics still needed",
    href: "/sports",
    href_label: "Visit sports program",
    payment_url: ""
  },
  {
    slug: "creative-advocacy",
    eyebrow: "Arts route",
    title: "Creative advocacy campaigns",
    support_area: "Creative advocacy campaigns",
    summary:
      "Supports documentary production, photography, storytelling campaigns, and artist-led advocacy tied directly to humanitarian work.",
    amount_label: "Current goal: NGN 950,000",
    target_amount_ngn: 950000,
    raised_amount_ngn: 310000,
    beneficiaries_label: "Campaign storytelling and artist collaboration fund",
    status_label: "Next creative campaign preparing for release",
    href: "/arts",
    href_label: "Visit arts section",
    payment_url: ""
  }
];

const transparencyEntries = [
  {
    period_label: "Q2 2026 tracker",
    title: "Health outreach and family support snapshot",
    summary:
      "Current documented allocations cover maternal kits, follow-up visits, and practical community health support for women and children.",
    amount_label: "NGN 850,000 documented this cycle",
    allocation_label: "Maternal kits 45%, follow-up visits 30%, nutrition support 15%, volunteer logistics 10%",
    status_label: "Published for supporter review",
    href: "/health",
    cta_label: "Open health work"
  },
  {
    period_label: "Q2 2026 tracker",
    title: "Education resources and facilitator preparation",
    summary:
      "Funding in this window supports downloadable materials, coding introductions, and the practical preparation needed for community-led learning sessions.",
    amount_label: "NGN 620,000 documented this cycle",
    allocation_label: "Learning materials 40%, facilitator prep 30%, printing 20%, connectivity support 10%",
    status_label: "Published for supporter review",
    href: "/education",
    cta_label: "Open education hub"
  },
  {
    period_label: "Q1 2026 tracker",
    title: "Youth sports equipment and training logistics",
    summary:
      "This snapshot covers balls, bibs, markers, and session logistics tied to structured youth development through sports.",
    amount_label: "NGN 740,000 documented this cycle",
    allocation_label: "Equipment 55%, coaching logistics 25%, community events 20%",
    status_label: "Published for supporter review",
    href: "/projects/dodoma-best-sports-center",
    cta_label: "Open sports project"
  },
  {
    period_label: "Q1 2026 tracker",
    title: "Creative advocacy production prep",
    summary:
      "Documented creative spend currently covers concept development, field documentation, and campaign delivery planning for public-interest storytelling.",
    amount_label: "NGN 310,000 documented this cycle",
    allocation_label: "Field capture 50%, editing prep 30%, campaign distribution 20%",
    status_label: "Published for supporter review",
    href: "/arts",
    cta_label: "Open arts section"
  }
];

async function insertIfEmpty(sql, tableName, columns, rows) {
  const table = sql(tableName);
  const [{ total }] = await sql`select count(*)::int as total from ${table}`;

  if (total > 0 || !rows.length) {
    return false;
  }

  const values = rows.map((row, index) => {
    const record = { display_order: index + 1 };

    for (const column of columns) {
      record[column] = row[column] ?? "";
    }

    return record;
  });

  await sql`insert into ${table} ${sql(values, ["display_order", ...columns])}`;
  return true;
}

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
    await sql.begin(async (tx) => {
      await tx`
        create table if not exists changemakers (
          id integer generated always as identity primary key,
          display_order integer not null,
          eyebrow text not null,
          name text not null,
          role text not null,
          location text not null,
          summary text not null,
          body text not null,
          tags text,
          href text,
          href_label text,
          image_src text,
          image_alt text,
          image_label text,
          image_ratio text
        )
      `;

      await tx`
        create table if not exists platform_updates (
          id integer generated always as identity primary key,
          display_order integer not null,
          category text not null,
          date_label text not null,
          title text not null,
          body text not null,
          href text,
          cta_label text
        )
      `;

      await tx`
        create table if not exists blog_posts (
          id integer generated always as identity primary key,
          display_order integer not null,
          slug text not null unique,
          title text not null,
          excerpt text not null,
          category text not null,
          author text not null,
          published_at date,
          reading_time text,
          image_src text,
          image_alt text,
          status text not null default 'draft',
          featured boolean not null default false,
          body text not null,
          created_at timestamptz not null default now(),
          updated_at timestamptz not null default now()
        )
      `;

      await tx`
        create index if not exists blog_posts_status_idx
          on blog_posts (status, published_at desc)
      `;

      await tx`
        create table if not exists gallery_items (
          id integer generated always as identity primary key,
          display_order integer not null,
          src text not null,
          alt text not null,
          label text not null,
          category text not null,
          ratio text
        )
      `;

      await tx`
        create table if not exists donation_funds (
          id integer generated always as identity primary key,
          display_order integer not null,
          slug text not null,
          eyebrow text not null,
          title text not null,
          support_area text not null,
          summary text not null,
          amount_label text not null,
          target_amount_ngn integer not null default 0,
          raised_amount_ngn integer not null default 0,
          beneficiaries_label text not null,
          status_label text not null,
          href text,
          href_label text,
          payment_url text
        )
      `;

      await tx`
        create table if not exists transparency_entries (
          id integer generated always as identity primary key,
          display_order integer not null,
          period_label text not null,
          title text not null,
          summary text not null,
          amount_label text not null,
          allocation_label text not null,
          status_label text not null,
          href text,
          cta_label text
        )
      `;

      await tx`
        create table if not exists donation_payments (
          id integer generated always as identity primary key,
          reference text not null unique,
          fund_slug text not null,
          fund_title text not null,
          provider text not null,
          provider_payment_id text,
          donor_name text not null,
          donor_email text not null,
          amount numeric(12, 2) not null,
          currency text not null,
          status text not null default 'pending',
          checkout_url text,
          raw_payload jsonb,
          completed_at timestamptz,
          created_at timestamptz not null default now(),
          updated_at timestamptz not null default now()
        )
      `;

      await tx`
        create index if not exists donation_payments_status_idx
          on donation_payments (status, created_at desc)
      `;

      await tx`
        create index if not exists donation_payments_provider_idx
          on donation_payments (provider, created_at desc)
      `;

      const seeded = {
        changemakers: await insertIfEmpty(
          tx,
          "changemakers",
          [
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
          ],
          changemakers
        ),
        platformUpdates: await insertIfEmpty(
          tx,
          "platform_updates",
          ["category", "date_label", "title", "body", "href", "cta_label"],
          platformUpdates
        ),
        blogPosts: await insertIfEmpty(
          tx,
          "blog_posts",
          [
            "slug",
            "title",
            "excerpt",
            "category",
            "author",
            "published_at",
            "reading_time",
            "image_src",
            "image_alt",
            "status",
            "featured",
            "body"
          ],
          blogPosts
        ),
        galleryItems: await insertIfEmpty(
          tx,
          "gallery_items",
          ["src", "alt", "label", "category", "ratio"],
          galleryItems
        ),
        donationFunds: await insertIfEmpty(
          tx,
          "donation_funds",
          [
            "slug",
            "eyebrow",
            "title",
            "support_area",
            "summary",
            "amount_label",
            "target_amount_ngn",
            "raised_amount_ngn",
            "beneficiaries_label",
            "status_label",
            "href",
            "href_label",
            "payment_url"
          ],
          donationFunds
        ),
        transparencyEntries: await insertIfEmpty(
          tx,
          "transparency_entries",
          [
            "period_label",
            "title",
            "summary",
            "amount_label",
            "allocation_label",
            "status_label",
            "href",
            "cta_label"
          ],
          transparencyEntries
        )
      };

      console.log("Platform tables ensured.");
      console.log("Seeded empty tables:", seeded);
    });
  } finally {
    await sql.end({ timeout: 5 });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
