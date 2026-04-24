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
const statusSet = new Set(["pending", "approved", "rejected", "published"]);

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

function normalizeStatus(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function getLibraryCategory(resourceType) {
  switch (resourceType) {
    case "Lesson link":
    case "Course":
      return "Lessons";
    case "Toolkit":
      return "Toolkits";
    case "Worksheet pack":
    case "Book or PDF":
      return "Downloads";
    default:
      return "Toolkits";
  }
}

function getLibraryFormat(resourceType) {
  switch (resourceType) {
    case "Lesson link":
      return "External lesson";
    case "Course":
      return "Interactive course";
    case "Toolkit":
      return "Facilitator kit";
    case "Worksheet pack":
      return "Worksheet pack";
    case "Book or PDF":
      return "PDF guide";
    default:
      return resourceType || "External resource";
  }
}

function getLibraryActionLabel(resourceType) {
  switch (resourceType) {
    case "Lesson link":
      return "Open lesson";
    case "Course":
      return "Open course";
    case "Toolkit":
      return "Open toolkit";
    case "Worksheet pack":
      return "Open worksheet pack";
    case "Book or PDF":
      return "Open guide";
    default:
      return "Open resource";
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

export async function updateEducationSubmissionStatus(id, nextStatus) {
  const sql = getSql();

  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const normalizedStatus = normalizeStatus(nextStatus);

  if (!Number.isFinite(Number(id)) || !statusSet.has(normalizedStatus)) {
    throw new Error("Invalid submission update request.");
  }

  const [submission] = await sql`
    update education_resource_submissions
    set status = ${normalizedStatus}, updated_at = now()
    where id = ${Number(id)}
    returning id, status, created_at
  `;

  if (!submission) {
    throw new Error("Submission not found.");
  }

  return {
    id: submission.id,
    reference: formatSubmissionReference(submission.id),
    status: submission.status,
    createdAt: submission.created_at
  };
}

export async function publishEducationSubmission(id) {
  const sql = getSql();

  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const submissionId = Number(id);

  if (!Number.isFinite(submissionId)) {
    throw new Error("Invalid submission ID.");
  }

  return sql.begin(async (tx) => {
    const [submission] = await tx`
      select *
      from education_resource_submissions
      where id = ${submissionId}
      limit 1
    `;

    if (!submission) {
      throw new Error("Submission not found.");
    }

    if (!submission.resource_url) {
      throw new Error("This submission needs a public resource link before it can be published.");
    }

    const [existingLibraryItem] = await tx`
      select id
      from education_library_items
      where title = ${submission.resource_title}
        and href = ${submission.resource_url}
      limit 1
    `;

    let libraryItemId = existingLibraryItem?.id || null;

    if (!libraryItemId) {
      const [{ max_order: maxOrder }] = await tx`
        select coalesce(max(display_order), 0)::int as max_order
        from education_library_items
      `;

      const [libraryItem] = await tx`
        insert into education_library_items (
          display_order,
          title,
          summary,
          category,
          format,
          level,
          action_label,
          href,
          external
        )
        values (
          ${Number(maxOrder || 0) + 1},
          ${submission.resource_title},
          ${submission.summary},
          ${getLibraryCategory(submission.resource_type)},
          ${getLibraryFormat(submission.resource_type)},
          ${submission.audience_level},
          ${getLibraryActionLabel(submission.resource_type)},
          ${submission.resource_url},
          ${true}
        )
        returning id
      `;

      libraryItemId = libraryItem.id;
    }

    const [updatedSubmission] = await tx`
      update education_resource_submissions
      set status = 'published', updated_at = now()
      where id = ${submissionId}
      returning id, status, created_at
    `;

    return {
      id: updatedSubmission.id,
      reference: formatSubmissionReference(updatedSubmission.id),
      status: updatedSubmission.status,
      createdAt: updatedSubmission.created_at,
      libraryItemId
    };
  });
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

const fallbackStatusCards = [
  {
    eyebrow: "Queue state",
    title: "The review board is ready for the first submission.",
    body: "As contributors begin sending books, lesson links, and toolkits, this board will show queue health and recent items in one place.",
    tone: "mist"
  },
  {
    eyebrow: "Next layer",
    title: "Review can now lead directly into publication.",
    body: "Approve, reject, or publish a linked resource into the live library without re-entering the content by hand.",
    tone: "sand"
  }
];

function buildFallbackDashboardData(dashboardNotice = "") {
  return {
    metrics: [
      { value: "0", label: "submissions received so far" },
      { value: "0", label: "pending review right now" },
      { value: "0", label: "published to the live hub" },
      { value: "0", label: "resources shared with a live link" }
    ],
    submissions: [],
    statusCards: fallbackStatusCards,
    dashboardNotice,
    isFallback: true
  };
}

function isTransientDatabaseConnectivityError(error) {
  const code = typeof error?.code === "string" ? error.code.toUpperCase() : "";

  return (
    code === "CONNECT_TIMEOUT" ||
    code === "ECONNREFUSED" ||
    code === "ECONNRESET" ||
    code === "ENOTFOUND" ||
    code === "ETIMEDOUT"
  );
}

function logDashboardLoadError(error) {
  if (isTransientDatabaseConnectivityError(error)) {
    console.warn(
      "Education review dashboard is using fallback data because Neon is temporarily unreachable.",
      error?.code || "UNKNOWN_DB_ERROR"
    );
    return;
  }

  console.error("Failed to load education submission dashboard data from Neon:", error);
}

const fallbackDashboardData = buildFallbackDashboardData();

export async function getEducationSubmissionDashboardData() {
  const sql = getSql();

  if (!sql) {
    return buildFallbackDashboardData(
      "The review board is running without a live database connection right now, so this dashboard is showing a safe empty-state snapshot."
    );
  }

  try {
    const [counts, recentSubmissions, typeBreakdown] = await Promise.all([
      sql`
        select
          count(*)::int as total,
          count(*) filter (where status = 'pending')::int as pending,
          count(*) filter (where status = 'published')::int as published,
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
      : fallbackStatusCards;

    return {
      metrics: [
        { value: String(countRow.total), label: "submissions received so far" },
        { value: String(countRow.pending), label: "pending review right now" },
        { value: String(countRow.published), label: "published to the live hub" },
        { value: String(countRow.linked), label: "resources shared with a live link" }
      ],
      submissions: recentSubmissions.map(formatSubmissionRecord),
      statusCards: typeCards,
      dashboardNotice: "",
      isFallback: false
    };
  } catch (error) {
    logDashboardLoadError(error);
    return buildFallbackDashboardData(
      "Neon is taking too long to respond right now, so the review board is showing a safe empty-state snapshot until the connection returns."
    );
  }
}
