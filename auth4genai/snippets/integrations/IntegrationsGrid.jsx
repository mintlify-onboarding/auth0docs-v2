import { useState, useMemo, useEffect, useRef } from "react";
import { IntegrationCard } from "/snippets/integrations/IntegrationCard.jsx";

const fuzzySearch = (needle, haystack) => {
  if (!needle || !haystack) return false;

    const needleLower = needle.toLowerCase();
    const haystackLower = haystack.toLowerCase();

    // Simple contains check - can be enhanced with more sophisticated fuzzy matching
    return haystackLower.includes(needleLower);
}

export const IntegrationsGrid = ({ items = [], filters = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(null);

  const filteredIntegrations = useMemo(() => {
    let filtered = items;

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter((integration) => {
        return (
          fuzzySearch(searchTerm, integration.title) ||
          fuzzySearch(searchTerm, integration.description)
        );
      });
    }

    if (!filter) {
      return filtered;
    }

    filtered = filtered.filter((item) => item.type === filter);
    
    return filtered;
  }, [searchTerm, filter]);

  const sortedIntegrations = useMemo(() => {
    return [...filteredIntegrations].sort((a, b) => {
      if (a.status === "Available" && b.status === "Coming Soon") return -1;
      if (a.status === "Coming Soon" && b.status === "Available") return 1;
      return a.title.localeCompare(b.title);
    });
  }, [filteredIntegrations]);

  const handleFilterClick = (filter) => {
    setFilter(filter);
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      {/* Search and Filter Controls */}
      <div
        style={{
          marginBottom: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "flex-start",
        }}
      >
        {/* Search and Filter Container */}
        <div style={{ 
          display: "flex", 
          gap: "1rem", 
          alignItems: "center",
          maxWidth: "600px", 
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "flex-start"
        }}>
          {/* Search Bar */}
          <div style={{ position: "relative", width: "400px" }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem 0.5rem 0.5rem 2.5rem",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                color: "#374151",
                fontSize: "0.875rem",
                outline: "none",
                transition: "all 0.2s ease",
                boxSizing: "border-box",
                boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.05)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#6366f1";
                e.target.style.backgroundColor = "#ffffff";
                e.target.style.boxShadow = "inset 0 1px 2px rgba(0, 0, 0, 0.05), 0 0 0 3px rgba(99, 102, 241, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db";
                e.target.style.backgroundColor = "#f9fafb";
                e.target.style.boxShadow = "inset 0 1px 2px rgba(0, 0, 0, 0.05)";
              }}
            />
            { /* Magnifying Glass Icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              style={{
                position: "absolute",
                left: "0.875rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9ca3af",
              }}
            >
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Integration Grid */}
      <Columns cols={3}>
        {sortedIntegrations.map((integration) => (
          <IntegrationCard integration={integration}/>
        ))}
      </Columns>

      {/* No Results State */}
      {sortedIntegrations.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem 2rem",
            border: "2px dashed var(--ifm-color-emphasis-300)",
            borderRadius: "8px",
            backgroundColor: "var(--ifm-color-emphasis-50)",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</div>
          <h3
            style={{
              margin: "0 0 0.5rem 0",
              color: "var(--ifm-color-emphasis-800)",
              fontSize: "1.25rem",
            }}
          >
            No results found
          </h3>
          <p
            style={{
              color: "var(--ifm-color-emphasis-600)",
              margin: 0,
              fontSize: "0.875rem",
            }}
          >
            {searchTerm ? `No results for "${searchTerm}". ` : ""}Try adjusting
            your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};