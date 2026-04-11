import "server-only";

import {
  educationAudienceLevels,
  educationSubmissionRoles,
  educationSubmissionTypes
} from "../components/siteData";
import { getSql } from "./db";

const roleSet = new Set(educationSubmissionRoles);
const typeSet = new Set(educationSubmissionTypes);
const audienceSet = new Set(educationAudienceLevels);

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidHttpUrl(value) {
  if (!value) {
    return true;
  }

  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateEducationSubmission(payload) {
  const data = {
    contactName: normalizeText(payload.contactName),
    email: normalizeText(payload.email).toLowerCase(),
    organization: normalizeText(payload.organization),
    role: normalizeText(payload.role),
    resourceTitle: normalizeText(payload.resourceTitle),
    resourceType: normalizeText(payload.resourceType),
    audienceLevel: normalizeText(payload.audienceLevel),
    resourceUrl: normalizeText(payload.resourceUrl),
    summary: normalizeText(payload.summary),
    notes: normalizeText(payload.notes),
    consentToContact: payload.consentToContact === true,
    rightsConfirmed: payload.rightsConfirmed === true,
    website: normalizeText(payload.website)
  };

  const fieldErrors = {};

  if (data.website) {
    return {
      ok: true,
      isSpam: true,
      data,
      fieldErrors
    };
  }

  if (data.contactName.length < 2 || data.contactName.length > 80) {
    fieldErrors.contactName = "Enter the contributor's full name.";
  }

  if (!isValidEmail(data.email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (data.organization.length > 120) {
    fieldErrors.organization = "Keep the organization name under 120 characters.";
  }

  if (!roleSet.has(data.role)) {
    fieldErrors.role = "Choose the role that best fits this submission.";
  }

  if (data.resourceTitle.length < 4 || data.resourceTitle.length > 120) {
    fieldErrors.resourceTitle = "Add a clear resource title.";
  }

  if (!typeSet.has(data.resourceType)) {
    fieldErrors.resourceType = "Choose the resource type.";
  }

  if (!audienceSet.has(data.audienceLevel)) {
    fieldErrors.audienceLevel = "Choose the main audience level.";
  }

  if (!data.summary || data.summary.length < 40 || data.summary.length > 900) {
    fieldErrors.summary = "Add a short summary between 40 and 900 characters.";
  }

  if (!isValidHttpUrl(data.resourceUrl)) {
    fieldErrors.resourceUrl = "Use a valid http or https link.";
  }

  if (data.notes.length > 700) {
    fieldErrors.notes = "Keep the extra notes under 700 characters.";
  }

  if (!data.consentToContact) {
    fieldErrors.consentToContact = "Confirm that we can contact you about this submission.";
  }

  if (!data.rightsConfirmed) {
    fieldErrors.rightsConfirmed = "Confirm that you have the right to share this material.";
  }

  return {
    ok: Object.keys(fieldErrors).length === 0,
    isSpam: false,
    data,
    fieldErrors
  };
}

export async function createEducationSubmission(data) {
  const sql = getSql();

  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const [submission] = await sql`
    insert into education_resource_submissions (
      contact_name,
      email,
      organization,
      role,
      resource_title,
      resource_type,
      audience_level,
      resource_url,
      summary,
      notes,
      consent_to_contact,
      rights_confirmed
    )
    values (
      ${data.contactName},
      ${data.email},
      ${data.organization || null},
      ${data.role},
      ${data.resourceTitle},
      ${data.resourceType},
      ${data.audienceLevel},
      ${data.resourceUrl || null},
      ${data.summary},
      ${data.notes || null},
      ${data.consentToContact},
      ${data.rightsConfirmed}
    )
    returning id, status, created_at
  `;

  return {
    id: submission.id,
    reference: `EDU-${String(submission.id).padStart(4, "0")}`,
    status: submission.status,
    createdAt: submission.created_at
  };
}

function formatSubmissionReference(id) {
  return `EDU-${String(id).padStart(4, "0")}`;
}

function formatSubmissionRecord(record) {
  return {
    id: record.id,
    reference: formatSubmissionReference(record.id),
    contactName: record.contact_name,
    email: record.email,
    organization: record.organization,
    role: record.role,
    resourceTitle: record.resource_title,
    resourceType: record.resource_type,
    audienceLevel: record.audience_level,
    resourceUrl: record.resource_url,
    summary: record.summary,
    notes: record.notes,
    status: record.status,
    createdAt: record.created_at
  };
}

const fallbackDashboardData = {
  metrics: [
    { value: "0", label: "submissions received so far" },
    { value: "0", label: "pending review right now" },
    { value: "0", label: "submitted in the last 7 days" },
    { value: "0", label: "resources shared with a live link" }
  ],
  submissions: [],
  statusCards: [
    {
      eyebrow: "Queue state",
      title: "The review board is ready for the first submission.",
      body: "As contributors begin sending books, lesson links, and toolkits, this board will show queue health and recent items in one place.",
      tone: "mist"
    },
    {
      eyebrow: "Next layer",
      title: "Moderation actions can be added after auth is in place.",
      body: "This first pass stays read-only on purpose so the workflow is useful now without exposing approval controls publicly.",
      tone: "sand"
    }
  ]
};

export async function getEducationSubmissionDashboardData() {
  const sql = getSql();

  if (!sql) {
    return fallbackDashboardData;
  }

  try {
    const [counts, recentSubmissions, typeBreakdown] = await Promise.all([
      sql`
        select
          count(*)::int as total,
          count(*) filter (where status = 'pending')::int as pending,
          count(*) filter (where created_at >= now() - interval '7 days')::int as recent,
          count(*) filter (where resource_url is not null and resource_url <> '')::int as linked
        from education_resource_submissions
      `,
      sql`
        select *
        from education_resource_submissions
        order by created_at desc, id desc
        limit 12
      `,
      sql`
        select resource_type, count(*)::int as total
        from education_resource_submissions
        group by resource_type
        order by total desc, resource_type asc
        limit 3
      `
    ]);

    const countRow = counts[0];
    const typeCards = typeBreakdown.length
      ? typeBreakdown.map((item, index) => ({
          eyebrow: `Top format ${index + 1}`,
          title: item.resource_type,
          body: `${item.total} submission${item.total === 1 ? "" : "s"} currently in the review stream.`,
          tone: index === 0 ? "forest-ink" : index === 1 ? "mist" : "paper"
        }))
      : fallbackDashboardData.statusCards;

    return {
      metrics: [
        { value: String(countRow.total), label: "submissions received so far" },
        { value: String(countRow.pending), label: "pending review right now" },
        { value: String(countRow.recent), label: "submitted in the last 7 days" },
        { value: String(countRow.linked), label: "resources shared with a live link" }
      ],
      submissions: recentSubmissions.map(formatSubmissionRecord),
      statusCards: typeCards
    };
  } catch (error) {
    console.error("Failed to load education submission dashboard data from Neon:", error);
    return fallbackDashboardData;
  }
}
