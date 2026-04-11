"use client";

import { useMemo, useState } from "react";

const FILTERS = ["All", "Downloads", "Lessons", "Toolkits"];

export function EducationLibrary({ items }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const visibleItems = useMemo(() => {
    if (activeFilter === "All") {
      return items;
    }

    return items.filter((item) => item.category === activeFilter);
  }, [activeFilter, items]);

  return (
    <div className="education-library">
      <div className="education-library__toolbar">
        <div className="education-library__filters" role="tablist" aria-label="Resource filters">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`library-filter${filter === activeFilter ? " is-active" : ""}`}
              onClick={() => setActiveFilter(filter)}
              role="tab"
              aria-selected={filter === activeFilter}
            >
              {filter}
            </button>
          ))}
        </div>

        <p className="education-library__count">
          {visibleItems.length} resource{visibleItems.length === 1 ? "" : "s"} shown
        </p>
      </div>

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
    </div>
  );
}
