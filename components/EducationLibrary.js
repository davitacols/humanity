"use client";

import { useEffect, useMemo, useState } from "react";

import { LoadingLink } from "./LoadingLink";

function isExternalHref(href) {
  return typeof href === "string" && /^https?:\/\//i.test(href);
}

function ResourceAction({ item }) {
  if (isExternalHref(item.href)) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className="button button--secondary">
        {item.actionLabel}
      </a>
    );
  }

  return (
    <LoadingLink href={item.href} className="button button--secondary" loadingLabel="Opening">
      {item.actionLabel}
    </LoadingLink>
  );
}

export function EducationLibrary({
  items,
  initialCategory = "All",
  initialLevel = "All levels",
  initialQuery = ""
}) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeLevel, setActiveLevel] = useState(initialLevel);
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setActiveCategory(initialCategory);
    setActiveLevel(initialLevel);
    setQuery(initialQuery);
  }, [initialCategory, initialLevel, initialQuery]);

  const categories = useMemo(() => {
    const preferred = ["Downloads", "Lessons", "Toolkits"];
    const extra = Array.from(new Set(items.map((item) => item.category))).filter(
      (category) => !preferred.includes(category)
    );
    return ["All", ...preferred.filter((category) => items.some((item) => item.category === category)), ...extra];
  }, [items]);

  const levels = useMemo(() => {
    return [
      "All levels",
      ...Array.from(new Set(items.map((item) => item.level))).sort((a, b) => a.localeCompare(b))
    ];
  }, [items]);

  const visible = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      if (activeCategory !== "All" && item.category !== activeCategory) {
        return false;
      }

      if (activeLevel !== "All levels" && item.level !== activeLevel) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      return `${item.title} ${item.summary} ${item.category} ${item.format} ${item.level}`
        .toLowerCase()
        .includes(normalizedQuery);
    });
  }, [activeCategory, activeLevel, items, query]);

  function clearFilters() {
    setActiveCategory("All");
    setActiveLevel("All levels");
    setQuery("");
  }

  const hasCustomFilter =
    activeCategory !== "All" || activeLevel !== "All levels" || Boolean(query.trim());

  return (
    <div className="edu-library" id="library-explorer">
      <div className="edu-library__toolbar">
        <div className="edu-library__search">
          <label className="edu-library__search-label" htmlFor="resource-search">
            Search resources
          </label>
          <input
            id="resource-search"
            className="edu-library__search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, summary, category, format, or audience"
          />
        </div>

        <div className="edu-library__filter-groups" aria-label="Resource filters">
          <div className="edu-library__filters">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`edu-library__filter${category === activeCategory ? " is-active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="edu-library__filters edu-library__filters--subtle">
            {levels.map((level) => (
              <button
                key={level}
                type="button"
                className={`edu-library__filter${level === activeLevel ? " is-active" : ""}`}
                onClick={() => setActiveLevel(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="edu-library__summary">
          <p className="edu-library__count">
            {visible.length} of {items.length} resources
          </p>
          {hasCustomFilter ? (
            <button type="button" className="edu-library__clear" onClick={clearFilters}>
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {visible.length ? (
        <div className="edu-library__grid">
          {visible.map((item) => (
            <article key={`${item.title}-${item.href}`} className="edu-library__card">
              <div className="edu-library__card-meta">
                <span className="edu-library__card-tag">{item.category}</span>
                <span className="edu-library__card-format">{item.format}</span>
              </div>
              <h3 className="edu-library__card-title">{item.title}</h3>
              <p className="edu-library__card-body">{item.summary}</p>
              <div className="edu-library__card-footer">
                <span className="edu-library__card-level">{item.level}</span>
                <ResourceAction item={item} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="edu-library__empty">
          <h3 className="edu-library__empty-title">No resources match this combination yet.</h3>
          <p className="edu-library__empty-body">
            Try a different keyword, reset the category, or switch the audience level filter.
          </p>
          {hasCustomFilter ? (
            <button type="button" className="button button--secondary" onClick={clearFilters}>
              Reset library filters
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
