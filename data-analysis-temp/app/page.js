
"use client";

import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { GrowthBanner } from "../components/GrowthBanner";
import {
  StatCard,
  InsightCard,
  AIInsights,
  AffectedDatasets,
} from "../components/DashboardComponents";

import {
  stats,
  insightGroups,
  datasets,
} from "../data/dashboardData";

export default function DataAnalysisPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [listView, setListView] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState("All");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [dashboardName, setDashboardName] = useState("");

  function createDashboard(e) {
    e.preventDefault();

    if (!dashboardName.trim()) return;

    alert(`Dashboard "${dashboardName.trim()}" created.`);
    setDashboardName("");
    setShowCreateDialog(false);
  }

  return (
    <main className="dashboard">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar />

        <div className="page-content">
          <div className="page-heading">
            <div className="page-heading-title">
              <p className="eyebrow">BUSINESS INTELLIGENCE</p>
              <h1>Data Analysis</h1>
            </div>

            <div className="heading-actions">
              <button
                className="icon-button"
                aria-label="Filter dashboard"
                title="Filter by metric"
                onClick={() => {
                  setShowFilters((prev) => !prev);
                  setShowInfo(false);
                }}
              >
                ☷
              </button>

              <button
                className={`icon-button ${
                  listView ? "active-view" : ""
                }`}
                aria-label="Toggle content listing"
                title={listView ? "Grid view" : "List view"}
                onClick={() => setListView((prev) => !prev)}
              >
                ☰
              </button>

              <button
                className="icon-button"
                aria-label="Refresh dashboard"
                title="Refresh dashboard"
                onClick={() => window.location.reload()}
              >
                ⟳
              </button>

              <button
                className="icon-button"
                aria-label="Dashboard information"
                title="Dashboard information"
                onClick={() => {
                  setShowInfo((prev) => !prev);
                  setShowFilters(false);
                }}
              >
                ⓘ
              </button>

              <button
                className="create-button"
                onClick={() => setShowCreateDialog(true)}
              >
                <span>▦</span> Create Dashboard
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="dashboard-popup">
              <strong>Filter by metric</strong>

              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
              >
                <option value="All">All metrics</option>
                <option value="Revenue">Revenue</option>
                <option value="Orders">Orders</option>
                <option value="Conversation Rate">
                  Conversation Rate
                </option>
                <option value="Avg. Order Value">
                  Avg. Order Value
                </option>
              </select>

              <button onClick={() => setSelectedMetric("All")}>
                Clear filter
              </button>
            </div>
          )}

          {showInfo && (
            <div className="dashboard-popup">
              <strong>About Data Analysis</strong>
              <p>
                View business statistics, key insights, growth
                opportunities, risks, and affected datasets.
              </p>
              <button onClick={() => setShowInfo(false)}>
                Close
              </button>
            </div>
          )}

          <GrowthBanner />

          <section
            className={`stats-grid ${listView ? "list-view" : ""}`}
            aria-label="Business statistics"
          >
            {stats
              .filter(
                (stat) =>
                  selectedMetric === "All" ||
                  stat.title === selectedMetric
              )
              .map((stat) => (
                <StatCard key={stat.title} stat={stat} />
              ))}
          </section>

          <section
            className={`insights-grid ${
              listView ? "list-view" : ""
            }`}
            aria-label="Business insights"
          >
            {insightGroups.map((group) => (
              <InsightCard key={group.title} group={group} />
            ))}
          </section>

          <section className="bottom-grid">
            <AIInsights />
            <AffectedDatasets datasets={datasets} />
          </section>

          {showCreateDialog && (
            <div
              className="dashboard-popup"
              role="dialog"
              aria-label="Create dashboard"
            >
              <form onSubmit={createDashboard}>
                <strong>Create Dashboard</strong>

                <p>Enter a name for your new dashboard.</p>

                <input
                  type="text"
                  placeholder="Dashboard name"
                  value={dashboardName}
                  onChange={(e) =>
                    setDashboardName(e.target.value)
                  }
                  required
                  autoFocus
                />

                <button type="submit">Create</button>

                <button
                  type="button"
                  onClick={() => setShowCreateDialog(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
