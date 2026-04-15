"use client";

import { useMemo, useState } from "react";

export function EducationLibrary({ items }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const base = ["Downloads", "Lessons", "Toolkits"];
    const extra = Array.from(new Set(items.map((item) => item.category))).filter(
      (item) => !base.includes(item)
    );
    const ordered = [...base.filter((item) => items.some((entry) => entry.category === item)), ...extra];
    return ["All", ...ordered];
  }, [items]);

  const counts = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        acc.all += 1;
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      },
      { all: 0 }
    );
  }, [items]);

  const visibleItems = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesFilter = activeFilter === "All" || item.category === activeFilter;
      if (!matchesFilter) {
        return false;
      }

      if (!trimmed) {
        return true;
      }

      const haystack = `${item.title} ${item.summary} ${item.category} ${item.format} ${item.level}`.toLowerCase();
      return haystack.includes(trimmed);
    });
  }, [activeFilter, items, query]);

  return (
    <div className="education-library">
      <div className="education-library__toolbar">
        <div className="education-library__search">
          <label className="education-library__search-label" htmlFor="resource-search">
            Search resources
          </label>
          <input
            id="resource-search"
            className="education-library__search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <p className="education-library__search-note">
            Filter by title, category, format, or level.
          </p>
        </div>

        <div className="education-library__filters" role="tablist" aria-label="Resource filters">
          {categories.map((filter) => {
            const count = filter === "All" ? counts.all : counts[filter] || 0;
            return (
            <button
              key={filter}
              type="button"
              className={`library-filter${filter === activeFilter ? " is-active" : ""}`}
              onClick={() => setActiveFilter(filter)}
              role="tab"
              aria-selected={filter === activeFilter}
            >
              {filter} ({count})
            </button>
          );
          })}
        </div>

        <p className="education-library__count">
          Showing {visibleItems.length} of {items.length} resources
        </p>
      </div>

      {visibleItems.length ? (
        <div className="education-library__grid">
          {visibleItems.map((item) => (
            <article key={item.title} className="resource-card">
              <div className="resource-card__meta">
                <span className="resource-card__tag">{item.category}</span>
                <span className="resource-card__format">{item.format}</span>
              </div>

              <h3 className="resource-card__title">{item.title}</h3>
              <p className="resource-card__summary">{item.summary}</p>

              <div className="resource-card__footer">
                <span className="resource-card__level">{item.level}</span>
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="button button--secondary resource-card__action"
                >
                  <span className="button__label">{item.actionLabel || item.action_label}</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="education-library__empty">
          <p className="education-library__empty-title">No resources match that search.</p>
          <p className="education-library__empty-body">
            Try a different keyword or switch the category filter.
          </p>
        </div>
      )}
    </div>
  );
}
