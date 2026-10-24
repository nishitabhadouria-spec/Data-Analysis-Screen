"use client";

import { useState } from "react";
export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);

  const mainItems = [
    ["▦", "Dashboard"],
    ["◉", "Exploratory Data Analysis"],
    ["◷", "Data Analysis"],
    ["✳", "Risk Detection & Health"],
    ["✓", "Advisory Recommendation"],
    ["▤", "Report"],
    ["▦", "Employee Dashboard"],
  ];

  const bottomItems = [
    ["☷", "Preferences"],
    ["◐", "Theme"],
    ["?", "Help & Support"],
    ["⚙", "Settings"],
  ];

  function toggleTheme() {
    const nextTheme = !isLightTheme;
    document.body.classList.toggle("light-theme", nextTheme);
    setIsLightTheme(nextTheme);
  }

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="brand">
        <img
          src="/stechgrow-logo.svg"
          alt="Stechgrow logo"
          className="brand-logo"
        />

        {!isCollapsed && (
          <span className="brand-name">Stechgrow</span>
        )}

        <button
          type="button"
          className="brand-collapse"
          onClick={() => setIsCollapsed((current) => !current)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          ◫
        </button>

        {!isCollapsed && (
          <div className="sidebar-search">
            <span>⌕</span>
            <span>AI Quick Search</span>
          </div>
        )}
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {mainItems.map(([icon, label]) => (
          <button
            type="button"
            key={label}
            className={`nav-item ${label === "Data Analysis" ? "active" : ""}`}
            title={isCollapsed ? label : undefined}
            aria-current={label === "Data Analysis" ? "page" : undefined}
            onClick={() => {
              // Other pages belong to other team members.
            }}
          >
            <span className="nav-icon">{icon}</span>
            {!isCollapsed && <span className="nav-label">{label}</span>}
          </button>
        ))}
      </nav>

      <nav className="sidebar-bottom" aria-label="Settings navigation">
        {bottomItems.map(([icon, label]) => (
          <button
            type="button"
            className="nav-item"
            key={label}
            title={isCollapsed ? label : undefined}
            onClick={() => {
              if (label === "Theme") {
                toggleTheme();
              }
            }}
          >
            <span className="nav-icon">{icon}</span>
            {!isCollapsed && (
              <span className="nav-label">
                {label === "Theme" && isLightTheme
                  ? "Light Theme"
                  : label}
              </span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}