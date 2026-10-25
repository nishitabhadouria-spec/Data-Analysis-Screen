
"use client";

import { useRef, useState } from "react";

export function Topbar() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
    setUploadMessage(`Selected: ${file.name}`);
  }

  function clearSelectedFile() {
    setSelectedFile(null);
    setUploadMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function openMobileSidebar() {
    window.dispatchEvent(
      new Event("stechgrow:open-mobile-sidebar")
    );
  }

  return (
    <header className="topbar">
      <button
        type="button"
        className="mobile-menu-button"
        aria-label="Open navigation menu"
        onClick={openMobileSidebar}
      >
        ☰
      </button>

      <div className="topbar-left">
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.xlsx,.xls,.json,.txt"
          hidden
          onChange={handleFileChange}
          aria-label="Choose a dataset file"
        />

        <button
          type="button"
          className="upload-button"
          onClick={() => fileInputRef.current?.click()}
        >
          ♧ <span>Upload</span>
        </button>

        <div className="global-search">
          <span>⌕</span>
          <input
            type="search"
            placeholder="Search for anything"
            aria-label="Search for anything"
          />
        </div>
      </div>

      <div className="topbar-right">
        <button
          type="button"
          className="icon-button"
          aria-label="Refresh page"
          title="Refresh"
          onClick={() => window.location.reload()}
        >
          ⟳
        </button>

        <button
          type="button"
          className="icon-button"
          aria-label="Notifications"
          title="Notifications"
          onClick={() =>
            window.alert("You have no new notifications.")
          }
        >
          ♧
        </button>

        <button
          type="button"
          className="profile-button"
          aria-label="Profile"
          title="Profile"
        >
          N
        </button>
      </div>

      {selectedFile && (
        <div className="upload-status" role="status">
          <span>{uploadMessage}</span>
          <button type="button" onClick={clearSelectedFile}>
            Clear
          </button>
        </div>
      )}
    </header>
  );
}
