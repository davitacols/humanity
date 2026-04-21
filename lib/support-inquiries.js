import "server-only";

import {
  donationCadences,
  supportAvailabilityOptions,
  supportInquiryAreas,
  supportInquiryRoutes
} from "../components/siteData";
import { getSql } from "./db";

const routeLabels = new Map(supportInquiryRoutes.map((item) => [item.value, item.label]));
const routeSet = new Set(routeLabels.keys());
const supportAreaSet = new Set(supportInquiryAreas);
const cadenceSet = new Set(donationCadences);
const availabilitySet = new Set(supportAvailabilityOptions);
const sourcePageSet = new Set(["donate", "get-involved"]);

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function formatSupportInquiryReference(id) {
  return `SUP-${String(id).padStart(4, "0")}`;
}

function formatRouteLabel(value) {
  return routeLabels.get(value) || value;
}

export function validateSupportInquiry(payload) {
  const data = {
    sourcePage: normalizeText(payload.sourcePage),
    routeType: normalizeText(payload.routeType),
    contactName: normalizeText(payload.contactName),
    email: normalizeText(payload.email).toLowerCase(),
    organization: normalizeText(payload.organization),
    country: normalizeText(payload.country),
    supportArea: normalizeText(payload.supportArea),
    amount: normalizeText(payload.amount),
    cadence: normalizeText(payload.cadence),
    availability: normalizeText(payload.availability),
    message: normalizeText(payload.message),
    consentToContact: payload.consentToContact === true,
    wantsUpdates: payload.wantsUpdates === true,
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

  if (!sourcePageSet.has(data.sourcePage)) {
    fieldErrors.sourcePage = "Choose a valid support route.";
  }

  if (data.contactName.length < 2 || data.contactName.length > 80) {
    fieldErrors.contactName = "Enter your full name.";
  }

  if (!isValidEmail(data.email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (data.organization.length > 120) {
    fieldErrors.organization = "Keep the organization name under 120 characters.";
  }

  if (data.country.length > 80) {
    fieldErrors.country = "Keep the country or city line under 80 characters.";
  }

  if (!routeSet.has(data.routeType)) {
    fieldErrors.routeType = "Choose the support route that fits you best.";
  }

  if (!supportAreaSet.has(data.supportArea)) {
    fieldErrors.supportArea = "Choose the program area you want to support.";
  }

  if (data.sourcePage === "donate") {
    if (data.routeType !== "donor") {
      fieldErrors.routeType = "Donation intake is currently set up for donor follow-up.";
    }

    if (!data.amount || data.amount.length > 80) {
      fieldErrors.amount = "Choose the amount or giving level you want to discuss.";
    }

    if (!cadenceSet.has(data.cadence)) {
      fieldErrors.cadence = "Choose the giving rhythm that fits your plan.";
    }
  } else {
    if (data.routeType === "donor") {
      fieldErrors.routeType = "Choose a volunteer, partner, sponsor, or contributor route here.";
    }

    if (!availabilitySet.has(data.availability)) {
      fieldErrors.availability = "Choose when you would like to be contacted.";
    }
  }

  if (!data.message || data.message.length < 30 || data.message.length > 900) {
    fieldErrors.message = "Add a short note between 30 and 900 characters.";
  }

  if (!data.consentToContact) {
    fieldErrors.consentToContact = "Confirm that we can contact you about this request.";
  }

  return {
    ok: Object.keys(fieldErrors).length === 0,
    isSpam: false,
    data,
    fieldErrors
  };
}

export async function createSupportInquiry(data) {
  const sql = getSql();

  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const [submission] = await sql`
    insert into support_inquiries (
      source_page,
      route_type,
      contact_name,
      email,
      organization,
      country,
      support_area,
      amount,
      cadence,
      availability,
      message,
      consent_to_contact,
      wants_updates
    )
    values (
      ${data.sourcePage},
      ${data.routeType},
      ${data.contactName},
      ${data.email},
      ${data.organization || null},
      ${data.country || null},
      ${data.supportArea},
      ${data.amount || null},
      ${data.cadence || null},
      ${data.availability || null},
      ${data.message},
      ${data.consentToContact},
      ${data.wantsUpdates}
    )
    returning id, status, created_at
  `;

  return {
    id: submission.id,
    reference: formatSupportInquiryReference(submission.id),
    status: submission.status,
    createdAt: submission.created_at
  };
}

function formatSupportInquiryRecord(record) {
  return {
    id: record.id,
    reference: formatSupportInquiryReference(record.id),
    sourcePage: record.source_page,
    routeType: record.route_type,
    routeLabel: formatRouteLabel(record.route_type),
    contactName: record.contact_name,
    email: record.email,
    organization: record.organization,
    country: record.country,
    supportArea: record.support_area,
    amount: record.amount,
    cadence: record.cadence,
    availability: record.availability,
    message: record.message,
    consentToContact: record.consent_to_contact,
    wantsUpdates: record.wants_updates,
    status: record.status,
    createdAt: record.created_at
  };
}

const fallbackDashboardData = {
  metrics: [
    { value: "0", label: "support requests received" },
    { value: "0", label: "pending follow-up" },
    { value: "0", label: "donor and sponsor requests" },
    { value: "0", label: "volunteer and partner requests" }
  ],
  submissions: [],
  statusCards: [
    {
      eyebrow: "Queue state",
      title: "The support inbox is ready for the first request.",
      body: "Donor, volunteer, and partner submissions will appear here with contact details and follow-up context.",
      tone: "mist"
    },
    {
      eyebrow: "Next layer",
      title: "This first release focuses on reliable intake and review.",
      body: "Payment processing and deeper workflow automation can be added next without rebuilding the form structure.",
      tone: "sand"
    }
  ]
};

export async function getSupportInquiryDashboardData() {
  const sql = getSql();

  if (!sql) {
    return fallbackDashboardData;
  }

  try {
    const [counts, recentSubmissions, routeBreakdown] = await Promise.all([
      sql`
        select
          count(*)::int as total,
          count(*) filter (where status = 'pending')::int as pending,
          count(*) filter (where route_type in ('donor', 'sponsor'))::int as donor_total,
          count(*) filter (where route_type in ('volunteer', 'partner', 'creative', 'specialist'))::int as involvement_total
        from support_inquiries
      `,
      sql`
        select *
        from support_inquiries
        order by created_at desc, id desc
        limit 16
      `,
      sql`
        select route_type, count(*)::int as total
        from support_inquiries
        group by route_type
        order by total desc, route_type asc
        limit 3
      `
    ]);

    const countRow = counts[0];
    const routeCards = routeBreakdown.length
      ? routeBreakdown.map((item, index) => ({
          eyebrow: `Top route ${index + 1}`,
          title: formatRouteLabel(item.route_type),
          body: `${item.total} request${item.total === 1 ? "" : "s"} currently in the support queue.`,
          tone: index === 0 ? "mist" : index === 1 ? "sand" : "paper"
        }))
      : fallbackDashboardData.statusCards;

    return {
      metrics: [
        { value: String(countRow.total), label: "support requests received" },
        { value: String(countRow.pending), label: "pending follow-up" },
        { value: String(countRow.donor_total), label: "donor and sponsor requests" },
        { value: String(countRow.involvement_total), label: "volunteer and partner requests" }
      ],
      submissions: recentSubmissions.map(formatSupportInquiryRecord),
      statusCards: routeCards
    };
  } catch (error) {
    console.error("Failed to load support inquiry dashboard data from Neon:", error);
    return fallbackDashboardData;
  }
}
