import { useEffect, useRef, useState } from "react";

export default function DownloadOrCloneButton({
                                                category,
                                                framework,
                                                label = "Download sample",
                                                githubRepo = "auth0-samples/auth0-ai-samples",
                                                branch = "main",
                                                showSSH = true,
                                                showGitHubLink = true,
                                                codespacesUrl,
                                                stackblitzUrl,
                                              }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [protocol, setProtocol] = useState("https");
  const groupRef = useRef(null);
  const menuRef = useRef(null);

  const filename = `${category}-${framework}-sample.zip`;
  const downloadUrl = `https://github.com/${githubRepo}/releases/latest/download/${filename}`;
  const httpsClone = `git clone https://github.com/${githubRepo}.git`;
  const sshClone = `git clone git@github.com:${githubRepo}.git`;
  const githubUrl = `https://github.com/${githubRepo}`;
  const cloneCmd = protocol === "https" ? httpsClone : sshClone;

  // minimal styles (kept inline to avoid leaking classes)
  const s = {
    group: {
      display: "inline-flex",
      position: "relative",
      borderRadius: 10,
      overflow: "hidden",
    },
    primary: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "12px 16px",
    },
    chevronBtn: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 40,
      padding: "12px 0",
    },
    divider: {
      width: 1,
      opacity: 0.2,
      background: "#fff",
    },
    menu: {
      position: "absolute",
      top: "calc(100% + 8px)",
      left: 0,
      minWidth: 280,
      background: "#fff",
      color: "#111",
      boxShadow: "0 10px 30px rgba(0,0,0,.12)",
      borderRadius: 12,
      padding: 8,
      zIndex: 1000,
    },
    item: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      textAlign: "left",
      padding: "10px 12px",
      borderRadius: 8,
      cursor: "pointer",
      color: "inherit",
      textDecoration: "none",
    },
    kbd: {
      fontSize: 12,
      opacity: 0.7,
      border: "1px solid #e5e7eb",
      padding: "0 6px",
      borderRadius: 6,
    },
    proto(active) {
      return {
        fontSize: 12,
        padding: "4px 8px",
        borderRadius: 8,
        border: active ? "1px solid #4f46e5" : "1px solid #e5e7eb",
        background: active ? "#eef2ff" : "#fff",
      };
    },
    sep: { height: 1, background: "#eef0f2", margin: "6px 8px" },
  };

  useEffect(() => {
    function closeOnOutside(e) {
      if (!open) return;
      const t = e.target;
      if (
        groupRef.current &&
        !groupRef.current.contains(t) &&
        menuRef.current &&
        !menuRef.current.contains(t)
      ) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", closeOnOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", closeOnOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied");
    } catch {
      toast("Copy failed");
    }
  }

  function toast(msg) {
    const el = document.createElement("div");
    el.textContent = msg;
    Object.assign(el.style, {
      position: "fixed",
      left: "50%",
      bottom: "24px",
      transform: "translateX(-50%)",
      background: "#111",
      color: "#fff",
      padding: "8px 12px",
      borderRadius: "9999px",
      fontSize: "12px",
      zIndex: 9999,
    });
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 900);
  }

  function handleDownload() {
    setBusy(true);
    window.open(downloadUrl, "_blank");
    setTimeout(() => setBusy(false), 700);
  }

  return (
    <div ref={groupRef} role="group" aria-label="Get sample" style={s.group}>
      {/* Left: primary download — keeps your existing .download-button look */}
      <button
        onClick={handleDownload}
        disabled={busy}
        className={`download-button ${busy ? "downloading" : ""}`}
        style={s.primary}
        aria-label={`Download ${category} ${framework} sample code`}
      >
        {busy ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray="31.416"
              strokeDashoffset="31.416"
            >
              <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite" />
              <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite" />
            </circle>
          </svg>
        ) : (
          <>
            {/* Uses your existing Icon just like your old button */}
            <Icon icon="download" color="white" />
            <span>{label}</span>
          </>
        )}
      </button>

      {/* Divider between primary and chevron */}
      <div aria-hidden="true" style={s.divider} />

      {/* Right: chevron toggles the menu only */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="repo-actions-menu"
        className="download-button"
        style={s.chevronBtn}
        title="More options"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Menu */}
      {open && (
        <div ref={menuRef} id="repo-actions-menu" role="menu" aria-label="Sample actions" style={s.menu}>
          <button role="menuitem" onClick={handleDownload} style={s.item}>
            <span>{`Download ZIP (${category} ${framework})`}</span>
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 10px",
              fontSize: 12,
              opacity: 0.85,
            }}
          >
            <span>Clone protocol</span>
            <div role="group" aria-label="Clone protocol" style={{ display: "inline-flex", gap: 6 }}>
              <button onClick={() => setProtocol("https")} aria-pressed={protocol === "https"} style={s.proto(protocol === "https")}>
                HTTPS
              </button>
              {showSSH && (
                <button onClick={() => setProtocol("ssh")} aria-pressed={protocol === "ssh"} style={s.proto(protocol === "ssh")}>
                  SSH
                </button>
              )}
            </div>
          </div>

          <button role="menuitem" onClick={() => copy(cloneCmd)} style={s.item}>
            <span>Copy git clone</span>
            <span style={s.kbd}>g</span>
          </button>

          <button
            role="menuitem"
            onClick={() =>
              copy(protocol === "https" ? httpsClone.replace("git clone ", "") : sshClone.replace("git clone ", ""))
            }
            style={s.item}
          >
            <span>Copy repo URL</span>
          </button>

          <div style={s.sep} />

          {codespacesUrl && (
            <a href={codespacesUrl} target="_blank" rel="noreferrer" role="menuitem" style={s.item}>
              <span>Open in Codespaces</span>
            </a>
          )}
          {stackblitzUrl && (
            <a href={stackblitzUrl} target="_blank" rel="noreferrer" role="menuitem" style={s.item}>
              <span>Open in StackBlitz</span>
            </a>
          )}
          {showGitHubLink && (
            <a href={githubUrl} target="_blank" rel="noreferrer" role="menuitem" style={s.item}>
              <span>View on GitHub</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
