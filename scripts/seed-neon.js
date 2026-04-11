const path = require("path");

if (typeof process.loadEnvFile === "function") {
  process.loadEnvFile(path.join(process.cwd(), ".env.local"));
}

const postgres = require("postgres");

const educationMetrics = [
  { value: "12", label: "starter resources ready for download or embedding" },
  { value: "3", label: "learning tracks designed for different entry levels" },
  { value: "Low-data", label: "content structure designed for mobile and low-bandwidth access" },
  { value: "Weekly", label: "space for fresh lessons, links, and community updates" }
];

const educationTracks = [
  {
    title: "Coding Foundations",
    body: "A beginner-friendly path covering web basics, problem solving, and digital confidence for first-time learners.",
    eyebrow: "Track 01",
    tone: "mist"
  },
  {
    title: "Digital Skills for Work",
    body: "Practical sessions on internet use, productivity tools, online safety, and employability-oriented digital habits.",
    eyebrow: "Track 02",
    tone: "sand"
  },
  {
    title: "Community Learning Library",
    body: "Books, guides, worksheets, and curated materials that can be downloaded and reused in community settings.",
    eyebrow: "Track 03",
    tone: "leaf"
  }
];

const educationResources = [
  {
    title: "Starter book pack",
    body: "A grouped download area for youth-friendly books, reading guides, and early digital literacy materials.",
    eyebrow: "Downloadable resource",
    tone: "paper"
  },
  {
    title: "External lesson playlist",
    body: "An embedded or linked lesson rail for coding tutorials, recorded sessions, and curated learning videos.",
    eyebrow: "Hosted externally",
    tone: "blush"
  },
  {
    title: "Facilitator toolkit",
    body: "Printable guides, session outlines, and activity templates for teachers, volunteers, and community mentors.",
    eyebrow: "Community delivery",
    tone: "mist"
  },
  {
    title: "Learner spotlight",
    body: "A story section for showcasing participant progress, projects, and practical outcomes from the hub.",
    eyebrow: "Proof of learning",
    tone: "paper"
  }
];

const educationLibraryItems = [
  {
    title: "Digital basics starter guide",
    summary:
      "A simple PDF-style resource for learners getting started with internet use, devices, and digital confidence.",
    category: "Downloads",
    format: "PDF guide",
    level: "Beginner",
    action_label: "Open sample guide",
    href: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    external: true
  },
  {
    title: "Getting started with the web",
    summary:
      "A lightweight external lesson path that introduces how websites work, HTML, CSS, and beginner web concepts.",
    category: "Lessons",
    format: "External lesson",
    level: "Beginner",
    action_label: "Open lesson",
    href: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web",
    external: true
  },
  {
    title: "Community facilitator session outline",
    summary:
      "A session plan template for teachers and volunteers running short digital literacy or coding introductions.",
    category: "Toolkits",
    format: "Facilitator kit",
    level: "Community",
    action_label: "Preview toolkit",
    href: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    external: true
  },
  {
    title: "Code.org beginner course",
    summary:
      "A youth-friendly coding entry point that can be linked as part of a structured beginner pathway in the hub.",
    category: "Lessons",
    format: "Interactive course",
    level: "Beginner",
    action_label: "Open course",
    href: "https://code.org/learn",
    external: true
  },
  {
    title: "Printable workbook set",
    summary:
      "A reusable worksheet collection for offline follow-up after workshops or classroom sessions.",
    category: "Downloads",
    format: "Worksheet pack",
    level: "Mixed level",
    action_label: "View pack",
    href: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    external: true
  },
  {
    title: "Mentor checklist for cohort support",
    summary:
      "A practical checklist for volunteers, mentors, and facilitators supporting learners over multiple sessions.",
    category: "Toolkits",
    format: "Checklist",
    level: "Mentor",
    action_label: "Open checklist",
    href: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    external: true
  }
];

const educationSessions = [
  {
    title: "Mobile-first coding club",
    body: "A short-format learning cohort designed for phones first, covering web basics and simple project practice.",
    eyebrow: "Upcoming cohort",
    tone: "mist"
  },
  {
    title: "Volunteer-led digital literacy workshop",
    body: "A community session format focused on internet confidence, online safety, and essential digital skills.",
    eyebrow: "Workshop format",
    tone: "sand"
  },
  {
    title: "Facilitator resource drop",
    body: "A growing release area for guides, worksheets, and lesson outlines that mentors can reuse locally.",
    eyebrow: "Resource stream",
    tone: "leaf"
  }
];

const educationActions = [
  {
    title: "Submit a learning resource",
    body: "Invite educators, contributors, and volunteers to share vetted books, lessons, or toolkits.",
    tone: "forest-ink"
  },
  {
    title: "Sponsor a learning cohort",
    body: "Create a clear support path for devices, printing, connectivity, or local training sessions.",
    tone: "mist"
  }
];

async function seedSimpleTable(sql, tableName, columns, rows) {
  const table = sql(tableName);
  await sql`truncate ${table} restart identity`;

  if (!rows.length) {
    return;
  }

  const values = rows.map((row, index) => {
    const record = { display_order: index + 1 };

    for (const column of columns) {
      record[column] = row[column];
    }

    return record;
  });

  await sql`insert into ${table} ${sql(values, ["display_order", ...columns])}`;
}

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is missing. Add it to .env.local before seeding.");
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
        create table if not exists education_metrics (
          id integer generated always as identity primary key,
          display_order integer not null,
          value text not null,
          label text not null
        )
      `;

      await tx`
        create table if not exists education_tracks (
          id integer generated always as identity primary key,
          display_order integer not null,
          eyebrow text not null,
          title text not null,
          body text not null,
          tone text not null
        )
      `;

      await tx`
        create table if not exists education_resources (
          id integer generated always as identity primary key,
          display_order integer not null,
          eyebrow text not null,
          title text not null,
          body text not null,
          tone text not null
        )
      `;

      await tx`
        create table if not exists education_library_items (
          id integer generated always as identity primary key,
          display_order integer not null,
          title text not null,
          summary text not null,
          category text not null,
          format text not null,
          level text not null,
          action_label text not null,
          href text not null,
          external boolean not null default true
        )
      `;

      await tx`
        create table if not exists education_sessions (
          id integer generated always as identity primary key,
          display_order integer not null,
          eyebrow text not null,
          title text not null,
          body text not null,
          tone text not null
        )
      `;

      await tx`
        create table if not exists education_actions (
          id integer generated always as identity primary key,
          display_order integer not null,
          title text not null,
          body text not null,
          tone text not null
        )
      `;

      await tx`
        create table if not exists education_resource_submissions (
          id integer generated always as identity primary key,
          contact_name text not null,
          email text not null,
          organization text,
          role text not null,
          resource_title text not null,
          resource_type text not null,
          audience_level text not null,
          resource_url text,
          summary text not null,
          notes text,
          consent_to_contact boolean not null default false,
          rights_confirmed boolean not null default false,
          status text not null default 'pending',
          created_at timestamptz not null default now(),
          updated_at timestamptz not null default now()
        )
      `;

      await tx`
        create index if not exists education_resource_submissions_status_idx
          on education_resource_submissions (status, created_at desc)
      `;

      await seedSimpleTable(tx, "education_metrics", ["value", "label"], educationMetrics);
      await seedSimpleTable(
        tx,
        "education_tracks",
        ["eyebrow", "title", "body", "tone"],
        educationTracks
      );
      await seedSimpleTable(
        tx,
        "education_resources",
        ["eyebrow", "title", "body", "tone"],
        educationResources
      );
      await seedSimpleTable(
        tx,
        "education_library_items",
        ["title", "summary", "category", "format", "level", "action_label", "href", "external"],
        educationLibraryItems
      );
      await seedSimpleTable(
        tx,
        "education_sessions",
        ["eyebrow", "title", "body", "tone"],
        educationSessions
      );
      await seedSimpleTable(
        tx,
        "education_actions",
        ["title", "body", "tone"],
        educationActions
      );
    });

    console.log("Neon education hub tables created and seeded successfully.");
  } finally {
    await sql.end({ timeout: 5 });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
