
"use client";

import { useEffect, useState } from "react";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    function openSidebar() {
      setIsMobileOpen(true);
    }

    function closeSidebar() {
      setIsMobileOpen(false);
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeSidebar();
      }
    }

    window.addEventListener(
      "stechgrow:open-mobile-sidebar",
      openSidebar
    );
    window.addEventListener(
      "stechgrow:close-mobile-sidebar",
      closeSidebar
    );
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "stechgrow:open-mobile-sidebar",
        openSidebar
      );
      window.removeEventListener(
        "stechgrow:close-mobile-sidebar",
        closeSidebar
      );
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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

  function closeMobileSidebar() {
    setIsMobileOpen(false);
  }

  return (
    <>
      {isMobileOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close navigation menu"
          onClick={closeMobileSidebar}
        />
      )}

      <aside
        id="main-sidebar"
        className={`sidebar ${
          isCollapsed ? "collapsed" : ""
        } ${isMobileOpen ? "mobile-open" : ""}`}
        aria-label="Sidebar navigation"
      >
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
            aria-label={
              isMobileOpen
                ? "Close sidebar"
                : isCollapsed
                  ? "Expand sidebar"
                  : "Collapse sidebar"
            }
            title={
              isMobileOpen
                ? "Close sidebar"
                : isCollapsed
                  ? "Expand sidebar"
                  : "Collapse sidebar"
            }
            onClick={() => {
              if (isMobileOpen) {
                closeMobileSidebar();
              } else {
                setIsCollapsed((current) => !current);
              }
            }}
          >
            {isMobileOpen ? "✕" : "◫"}
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
              className={`nav-item ${
                label === "Data Analysis" ? "active" : ""
              }`}
              title={isCollapsed ? label : undefined}
              aria-current={
                label === "Data Analysis" ? "page" : undefined
              }
              onClick={closeMobileSidebar}
            >
              <span className="nav-icon">{icon}</span>
              {!isCollapsed && (
                <span className="nav-label">{label}</span>
              )}
            </button>
          ))}
        </nav>

        <nav
          className="sidebar-bottom"
          aria-label="Settings navigation"
        >
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
                closeMobileSidebar();
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
    </>
  );
}
