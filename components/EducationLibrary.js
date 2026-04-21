"use client";

import { useMemo, useState } from "react";

export function EducationLibrary({ items }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const base = ["Downloads", "Lessons", "Toolkits"];
    const extra = Array.from(new Set(items.map((i) => i.category))).filter((c) => !base.includes(c));
    const ordered = [...base.filter((c) => items.some((i) => i.category === c)), ...extra];
    return ["All", ...ordered];
  }, [items]);

  const counts = useMemo(() => {
    return items.reduce((acc, i) => { acc.all += 1; acc[i.category] = (acc[i.category] || 0) + 1; return acc; }, { all: 0 });
  }, [items]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (activeFilter !== "All" && item.category !== activeFilter) return false;
      if (!q) return true;
      return `${item.title} ${item.summary} ${item.category} ${item.format} ${item.level}`.toLowerCase().includes(q);
    });
  }, [activeFilter, items, query]);

  return (
    <div className="edu-library">
      <div className="edu-library__toolbar">
        <div className="edu-library__search">
          <label className="edu-library__search-label" htmlFor="resource-search">Search resources</label>
          <input
            id="resource-search"
            className="edu-library__search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, category, format, or level"
          />
        </div>
        <div className="edu-library__filters" role="tablist" aria-label="Resource filters">
          {categories.map((f) => {
            const count = f === "All" ? counts.all : counts[f] || 0;
            return (
              <button
                key={f}
                type="button"
                className={`edu-library__filter${f === activeFilter ? " is-active" : ""}`}
                onClick={() => setActiveFilter(f)}
                role="tab"
                aria-selected={f === activeFilter}
              >
                {f} <span className="edu-library__filter-count">{count}</span>
              </button>
            );
          })}
        </div>
        <p className="edu-library__count">
          {visible.length} of {items.length} resources
        </p>
      </div>

      {visible.length ? (
        <div className="edu-library__grid">
          {visible.map((item) => (
            <article key={item.title} className="edu-library__card">
              <div className="edu-library__card-meta">
                <span className="edu-library__card-tag">{item.category}</span>
                <span className="edu-library__card-format">{item.format}</span>
              </div>
              <h3 className="edu-library__card-title">{item.title}</h3>
              <p className="edu-library__card-body">{item.summary}</p>
              <div className="edu-library__card-footer">
                <span className="edu-library__card-level">{item.level}</span>
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="button button--secondary"
                >
                  {item.actionLabel || item.action_label}
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="edu-library__empty">
          <h3 className="edu-library__empty-title">No resources match that search.</h3>
          <p className="edu-library__empty-body">Try a different keyword or switch the category filter.</p>
        </div>
      )}
    </div>
  );
}
