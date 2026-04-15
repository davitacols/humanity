"use client";

import { useDeferredValue, useMemo, useState } from "react";

import { LoadingLink } from "./LoadingLink";
import { StockPhoto } from "./StockPhoto";

export function ProjectExplorer({ items }) {
  const [query, setQuery] = useState("");
  const [activeCollection, setActiveCollection] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const deferredQuery = useDeferredValue(query);

  const collections = useMemo(() => {
    const ordered = Array.from(new Set(items.map((item) => item.collection)));
    return ["All", ...ordered];
  }, [items]);

  const categories = useMemo(() => {
    const ordered = Array.from(new Set(items.map((item) => item.category)));
    return ["All", ...ordered];
  }, [items]);

  const visibleItems = useMemo(() => {
    const trimmed = deferredQuery.trim().toLowerCase();

    return items.filter((item) => {
      const matchesCollection =
        activeCollection === "All" || item.collection === activeCollection;
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      if (!matchesCollection || !matchesCategory) {
        return false;
      }

      if (!trimmed) {
        return true;
      }

      const haystack = [
        item.title,
        item.summary,
        item.category,
        item.collection,
        item.status,
        item.location
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(trimmed);
    });
  }, [activeCategory, activeCollection, deferredQuery, items]);

  return (
    <div className="project-explorer">
      <div className="project-explorer__toolbar">
        <div className="project-explorer__search">
          <label className="project-explorer__search-label" htmlFor="project-search">
            Search projects, campaigns, and media
          </label>
          <input
            id="project-search"
            className="project-explorer__search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, category, status, or location"
          />
          <p className="project-explorer__search-note">
            Browse active appeals, media releases, and program routes from one place.
          </p>
        </div>

        <div className="project-explorer__control-group">
          <p className="project-explorer__control-label">Collections</p>
          <div className="project-explorer__filters" role="tablist" aria-label="Project collections">
            {collections.map((collection) => (
              <button
                key={collection}
                type="button"
                className={`project-filter${collection === activeCollection ? " is-active" : ""}`}
                onClick={() => setActiveCollection(collection)}
                role="tab"
                aria-selected={collection === activeCollection}
              >
                {collection}
              </button>
            ))}
          </div>
        </div>

        <div className="project-explorer__control-group">
          <p className="project-explorer__control-label">Categories</p>
          <div className="project-explorer__filters project-explorer__filters--compact">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`project-filter${category === activeCategory ? " is-active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <p className="project-explorer__count">
          Showing {visibleItems.length} of {items.length} routes
        </p>
      </div>

      {visibleItems.length ? (
        <div className="project-explorer__grid">
          {visibleItems.map((item) => (
            <article key={item.title} className="project-explorer__card">
              <StockPhoto
                src={item.image.src}
                alt={item.image.alt}
                label={item.image.label}
                sizes="(max-width: 1180px) 100vw, 25vw"
                className="project-explorer__media"
              />

              <div className="project-explorer__meta">
                <span className="project-explorer__meta-pill">{item.category}</span>
                <span className="project-explorer__meta-pill">{item.collection}</span>
              </div>

              <h3 className="project-explorer__title">{item.title}</h3>
              <p className="project-explorer__summary">{item.summary}</p>

              <div className="project-explorer__details">
                <p>
                  <span>Status</span>
                  {item.status}
                </p>
                <p>
                  <span>Location</span>
                  {item.location}
                </p>
              </div>

              <div className="project-explorer__actions">
                <LoadingLink
                  href={item.href}
                  className="button button--primary"
                  loadingLabel="Opening"
                >
                  {item.actionLabel}
                </LoadingLink>
                <LoadingLink
                  href={item.supportHref}
                  className="button button--secondary"
                  loadingLabel="Opening"
                >
                  {item.supportLabel}
                </LoadingLink>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="project-explorer__empty">
          <p className="project-explorer__empty-title">No routes match that search yet.</p>
          <p className="project-explorer__empty-body">
            Try a different keyword or switch the collection and category filters.
          </p>
        </div>
      )}
    </div>
  );
}
