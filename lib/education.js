import "server-only";

import {
  educationActions,
  educationLibraryItems,
  educationMetrics,
  educationResourcePages,
  educationResources,
  educationSessionCards,
  educationTracks
} from "../components/siteData";
import { getSql } from "./db";

const fallbackEducationData = {
  metrics: educationMetrics,
  tracks: educationTracks,
  resources: educationResources,
  libraryItems: educationLibraryItems,
  sessions: educationSessionCards,
  actions: educationActions
};

function normalizeMetric(record) {
  return {
    value: record.value,
    label: record.label
  };
}

function normalizeTrack(record) {
  return {
    eyebrow: record.eyebrow,
    title: record.title,
    body: record.body,
    tone: record.tone || "mist"
  };
}

function normalizeResource(record) {
  return {
    eyebrow: record.eyebrow,
    title: record.title,
    body: record.body,
    tone: record.tone || "mist"
  };
}

function normalizeLibraryItem(record) {
  return {
    title: record.title,
    summary: record.summary,
    category: record.category,
    format: record.format,
    level: record.level,
    actionLabel: record.actionLabel || record.action_label || "Open resource",
    href: record.href,
    external: Boolean(record.external)
  };
}

function normalizeSession(record) {
  return {
    eyebrow: record.eyebrow,
    title: record.title,
    body: record.body,
    tone: record.tone || "mist"
  };
}

function normalizeAction(record) {
  return {
    title: record.title,
    body: record.body,
    tone: record.tone || "mist"
  };
}

function buildLibrarySummary(libraryItems) {
  const categories = Array.from(new Set(libraryItems.map((item) => item.category))).sort();
  const levels = Array.from(new Set(libraryItems.map((item) => item.level))).sort();
  const internalCount = libraryItems.filter((item) => !item.external).length;
  const externalCount = libraryItems.filter((item) => item.external).length;

  return {
    categories,
    levels,
    internalCount,
    externalCount
  };
}

function withDerivedEducationData(data) {
  const metrics = data.metrics.map(normalizeMetric);
  const tracks = data.tracks.map(normalizeTrack);
  const resources = data.resources.map(normalizeResource);
  const libraryItems = data.libraryItems.map(normalizeLibraryItem);
  const sessions = data.sessions.map(normalizeSession);
  const actions = data.actions.map(normalizeAction);

  return {
    metrics,
    tracks,
    resources,
    libraryItems,
    sessions,
    actions,
    featuredLibraryItems: libraryItems.slice(0, 3),
    librarySummary: buildLibrarySummary(libraryItems)
  };
}

async function selectOrdered(sql, tableName) {
  const table = sql(tableName);
  return sql`select * from ${table} order by display_order asc, id asc`;
}

export async function getEducationHubData() {
  const sql = getSql();

  if (!sql) {
    return withDerivedEducationData(fallbackEducationData);
  }

  try {
    const [metrics, tracks, resources, libraryItems, sessions, actions] = await Promise.all([
      selectOrdered(sql, "education_metrics"),
      selectOrdered(sql, "education_tracks"),
      selectOrdered(sql, "education_resources"),
      selectOrdered(sql, "education_library_items"),
      selectOrdered(sql, "education_sessions"),
      selectOrdered(sql, "education_actions")
    ]);

    return withDerivedEducationData({
      metrics: metrics.length ? metrics : fallbackEducationData.metrics,
      tracks: tracks.length ? tracks : fallbackEducationData.tracks,
      resources: resources.length ? resources : fallbackEducationData.resources,
      libraryItems: libraryItems.length ? libraryItems : fallbackEducationData.libraryItems,
      sessions: sessions.length ? sessions : fallbackEducationData.sessions,
      actions: actions.length ? actions : fallbackEducationData.actions
    });
  } catch (error) {
    console.error("Failed to load education hub data from Neon:", error);
    return withDerivedEducationData(fallbackEducationData);
  }
}

export async function getEducationResourcePageData(slug) {
  const resource = educationResourcePages.find((item) => item.slug === slug);

  if (!resource) {
    return null;
  }

  const hub = await getEducationHubData();
  const currentHref = `/education/resources/${slug}`;
  const currentLibraryItem =
    hub.libraryItems.find((item) => item.href === currentHref) ||
    hub.libraryItems.find((item) => item.title.toLowerCase() === resource.title.toLowerCase()) ||
    null;

  const relatedResources = hub.libraryItems
    .filter((item) => item.href !== currentHref)
    .filter((item) => {
      if (!currentLibraryItem) {
        return item.level === resource.audience || item.category === "Toolkits";
      }

      return item.category === currentLibraryItem.category || item.level === currentLibraryItem.level;
    })
    .slice(0, 3);

  return {
    ...resource,
    currentLibraryItem,
    relatedResources
  };
}
