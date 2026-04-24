import "server-only";

import {
  platformGalleryItems,
  platformProfiles,
  platformUpdates
} from "../components/siteData";
import { getSql } from "./db";

const fallbackPlatformContent = {
  changemakers: platformProfiles,
  updates: platformUpdates,
  galleryItems: platformGalleryItems
};

function mergeByKey(primaryItems, fallbackItems, getKey) {
  const seen = new Set();

  return [...primaryItems, ...fallbackItems].filter((item) => {
    const key = getKey(item);

    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

async function selectOrdered(sql, tableName) {
  const table = sql(tableName);
  return sql`select * from ${table} order by display_order asc, id asc`;
}

function parseList(value) {
  if (typeof value !== "string" || !value.trim()) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatChangemaker(record) {
  return {
    eyebrow: record.eyebrow,
    name: record.name,
    role: record.role,
    location: record.location,
    summary: record.summary,
    body: record.body,
    tags: parseList(record.tags),
    href: record.href || "",
    hrefLabel: record.href_label || "",
    imageSrc: record.image_src || "",
    imageAlt: record.image_alt || "",
    imageLabel: record.image_label || "",
    imageRatio: record.image_ratio || "landscape"
  };
}

function formatUpdate(record) {
  return {
    title: record.title,
    category: record.category,
    date: record.date_label,
    body: record.body,
    href: record.href || "",
    ctaLabel: record.cta_label || ""
  };
}

function formatGalleryItem(record) {
  return {
    src: record.src,
    alt: record.alt,
    label: record.label,
    category: record.category,
    ratio: record.ratio || "landscape"
  };
}

export async function getPlatformContentData() {
  const sql = getSql();

  if (!sql) {
    return fallbackPlatformContent;
  }

  try {
    const [changemakers, updates, galleryItems] = await Promise.all([
      selectOrdered(sql, "changemakers"),
      selectOrdered(sql, "platform_updates"),
      selectOrdered(sql, "gallery_items")
    ]);

    return {
      changemakers: mergeByKey(
        changemakers.map(formatChangemaker),
        fallbackPlatformContent.changemakers,
        (item) => item.name
      ),
      updates: mergeByKey(
        updates.map(formatUpdate),
        fallbackPlatformContent.updates,
        (item) => item.title
      ),
      galleryItems: galleryItems.length
        ? galleryItems.map(formatGalleryItem)
        : fallbackPlatformContent.galleryItems
    };
  } catch (error) {
    if (error?.code === "42P01") {
      return fallbackPlatformContent;
    }

    console.error("Failed to load platform content data from Neon:", error);
    return fallbackPlatformContent;
  }
}
