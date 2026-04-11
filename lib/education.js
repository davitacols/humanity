import "server-only";

import {
  educationActions,
  educationLibraryItems,
  educationMetrics,
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

async function selectOrdered(sql, tableName) {
  const table = sql(tableName);
  return sql`select * from ${table} order by display_order asc, id asc`;
}

export async function getEducationHubData() {
  const sql = getSql();

  if (!sql) {
    return fallbackEducationData;
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

    return {
      metrics: metrics.length ? metrics : fallbackEducationData.metrics,
      tracks: tracks.length ? tracks : fallbackEducationData.tracks,
      resources: resources.length ? resources : fallbackEducationData.resources,
      libraryItems: libraryItems.length ? libraryItems : fallbackEducationData.libraryItems,
      sessions: sessions.length ? sessions : fallbackEducationData.sessions,
      actions: actions.length ? actions : fallbackEducationData.actions
    };
  } catch (error) {
    console.error("Failed to load education hub data from Neon:", error);
    return fallbackEducationData;
  }
}
