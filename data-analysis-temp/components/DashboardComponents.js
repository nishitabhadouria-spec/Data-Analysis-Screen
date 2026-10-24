"use client";

import { useRef, useState } from "react";


export function StatCard({ stat }) {
  return (
    <article className="stat-card">
      <div className="stat-card-heading">
        <span>{stat.title}</span>
        <span className="card-action">↗</span>
      </div>

      <div className="stat-card-bottom">
        <strong className="stat-value">{stat.value}</strong>
        <span className={`stat-change ${stat.direction}`}>
          {stat.direction === "up" ? "↑" : "↓"} {stat.change}
        </span>
      </div>
    </article>
  );
}

export function InsightCard({ group }) {
  return (
    <article className="insight-card">
      <div className="section-card-heading">
        <h2>{group.title}</h2>
        <span className="card-action">↗</span>
      </div>

      <ul className={`insight-list ${group.type}`}>
        {group.items.map((item, index) => (
          <li key={item}>
            <span className={`insight-dot dot-${index + 1}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function AIInsights() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <article className="ai-card">
      <h2>AI insights</h2>
      <p>
        Revenue decline observed in Subscription Plan B,
        correlation with increased churn in Segment B.
      </p>

      <button
        type="button"
        className="details-button"
        onClick={() => setShowDetails((current) => !current)}
      >
        {showDetails ? "Hide Details" : "View Detailed Analysis"}
      </button>

      {showDetails && (
        <div className="details-content">
          <strong>Analysis summary</strong>
          <p>
            This is demo content. Investigate Subscription Plan B
            and Segment B using verified business data.
          </p>
        </div>
      )}
    </article>
  );
}

export function AffectedDatasets({ datasets }) {
  return (
    <section className="datasets-card">
      <div className="datasets-heading">
        <h2>Affected Datasets</h2>
        <span className="muted-label">Issues</span>
        <span className="muted-label">Count</span>
        <span className="muted-label">Suggestions</span>
      </div>

      <div className="dataset-rows">
        {datasets.map((dataset, index) => (
          <div
            className="dataset-row"
            key={`${dataset.name}-${index}`}
          >
            <span className="dataset-file">▤</span>

            <span className="dataset-name" title={dataset.name}>
              {dataset.name}
            </span>

            <span className="issue-badge">{dataset.issue}</span>
            <span className="dataset-count">{dataset.count}</span>

            <button type="button" className="review-button">
              {dataset.suggestion}
            </button>

            <input
              className="dataset-checkbox"
              type="checkbox"
              aria-label={`Select dataset ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}