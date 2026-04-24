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
        <div className="project-explorer__search-container">
          <label className="project-explorer__search-label" htmlFor="project-search">
            Search projects
          </label>
          <input
            id="project-search"
            className="project-explorer__search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, category, location..."
          />
        </div>

        <div className="project-explorer__filters-group">
          <div className="project-explorer__filter-section">
            <p className="project-explorer__filter-label">Filter by Collection</p>
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

          <div className="project-explorer__filter-section">
            <p className="project-explorer__filter-label">Filter by Category</p>
            <div className="project-explorer__filters project-explorer__filters--wrap">
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
        </div>

        <div className="project-explorer__results-info">
          <p className="project-explorer__count">
            <strong>{visibleItems.length}</strong> of <strong>{items.length}</strong> projects shown
          </p>
        </div>
      </div>

      {visibleItems.length ? (
        <div className="project-explorer__results">
          <div className="project-explorer__grid">
            {visibleItems.map((item) => (
              <article key={item.title} className="project-explorer__card">
                <div className="project-explorer__card-header">
                  <StockPhoto
                    src={item.image.src}
                    alt={item.image.alt}
                    label={item.image.label}
                    sizes="(max-width: 900px) 100vw, 32vw"
                    className="project-explorer__media"
                  />
                </div>

                <div className="project-explorer__card-body">
                  <div className="project-explorer__card-tags">
                    <span className="project-explorer__tag project-explorer__tag--category">{item.category}</span>
                    <span className="project-explorer__tag project-explorer__tag--collection">{item.collection}</span>
                  </div>

                  <h3 className="project-explorer__title">{item.title}</h3>
                  <p className="project-explorer__summary">{item.summary}</p>

                  <div className="project-explorer__card-meta">
                    <div className="project-explorer__meta-item">
                      <span className="project-explorer__meta-label">Status</span>
                      <span className="project-explorer__meta-value">{item.status}</span>
                    </div>
                    <div className="project-explorer__meta-item">
                      <span className="project-explorer__meta-label">Location</span>
                      <span className="project-explorer__meta-value">{item.location}</span>
                    </div>
                  </div>

                  <LoadingLink
                    href={item.href}
                    className="button button--secondary button--compact"
                    loadingLabel="Opening"
                  >
                    View project
                  </LoadingLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="project-explorer__empty">
          <p className="project-explorer__empty-message">No projects match your filters.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveCollection("All");
              setActiveCategory("All");
            }}
            className="button button--secondary"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
