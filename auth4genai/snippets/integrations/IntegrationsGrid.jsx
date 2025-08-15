import { useState, useMemo, useEffect, useRef } from "react";
import Columns from "@theme/Columns";
import { IntegrationCard } from "/snippets/integrations/IntegrationCard.jsx";

export const IntegrationsGrid = ({ items = [], filters = [] }) => {
  const initialFilterState = Object.fromEntries(filters.map(item => [item, false]));
  
  // Simple fuzzy search function
  function fuzzySearch(needle, haystack) {
    if (!needle || !haystack) return false;

    const needleLower = needle.toLowerCase();
    const haystackLower = haystack.toLowerCase();

    // Simple contains check - can be enhanced with more sophisticated fuzzy matching
    return haystackLower.includes(needleLower);
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState(initialFilterState);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

    // Filter by selected types
    const activeTypes = Object.keys(selectedTypes).filter(type => selectedTypes[type]);
    if (activeTypes.length > 0) {
      filtered = filtered.filter(
        (integration) => activeTypes.includes(integration.type)
      );
    }

    return filtered;
  }, [searchTerm, selectedTypes]);

  const sortedIntegrations = useMemo(() => {
    return [...filteredIntegrations].sort((a, b) => {
      if (a.status === "Available" && b.status === "Coming Soon") return -1;
      if (a.status === "Coming Soon" && b.status === "Available") return 1;
      return a.title.localeCompare(b.title);
    });
  }, [filteredIntegrations]);

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleReset = () => {
    setSelectedTypes(initialFilterState);
  };

  const handleApply = () => {
    setIsDropdownOpen(false);
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
          alignItems: "center",
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
          justifyContent: "center"
        }}>
          {/* Search Bar */}
          <div style={{ position: "relative", flex: "1", minWidth: "300px" }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "0.875rem 1rem 0.875rem 2.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                backgroundColor: "#f9fafb",
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

          {/* Type Filter Dropdown */}
          <div ref={dropdownRef} style={{ position: "relative", minWidth: "120px" }}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                width: "100%",
                padding: "0.875rem 2rem 0.875rem 0.875rem",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                backgroundColor: "#f9fafb",
                color: "#374151",
                fontSize: "0.875rem",
                outline: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxSizing: "border-box",
                boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.05)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!isDropdownOpen) {
                  e.target.style.backgroundColor = "#ffffff";
                  e.target.style.borderColor = "#9ca3af";
                }
              }}
              onMouseLeave={(e) => {
                if (!isDropdownOpen) {
                  e.target.style.backgroundColor = "#f9fafb";
                  e.target.style.borderColor = "#d1d5db";
                }
              }}
            >
              <span>Type</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                style={{
                  color: "#6b7280",
                  transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m6 8 4 4 4-4"
                />
              </svg>
            </button>

            {/* Custom Dropdown Menu */}
            {isDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  marginTop: "0.25rem",
                  backgroundColor: "#ffffff",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  zIndex: 50,
                  padding: "0.75rem",
                  minWidth: "200px",
                }}
              >
                {/* Filter Options */}
                <div style={{ marginBottom: "1rem" }}>
                  {filters.map((type) => (
                    <label
                      key={type}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.5rem 0",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        color: "#374151",
                      }}
                    >
                      <span>{type}</span>
                      <input
                        type="checkbox"
                        checked={selectedTypes[type]}
                        onChange={() => handleTypeToggle(type)}
                        style={{
                          width: "16px",
                          height: "16px",
                          accentColor: "#6366f1",
                          cursor: "pointer",
                        }}
                      />
                    </label>
                  ))}
                </div>

                {/* Action Buttons */}
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  borderTop: "1px solid #e5e7eb",
                  paddingTop: "0.75rem",
                  gap: "0.5rem"
                }}>
                  <button
                    onClick={handleReset}
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#6b7280",
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      borderRadius: "6px",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => e.target.style.color = "#374151"}
                    onMouseLeave={(e) => e.target.style.color = "#6b7280"}
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleApply}
                    style={{
                      padding: "0.5rem 1.5rem",
                      backgroundColor: "#4338ca",
                      border: "none",
                      color: "#ffffff",
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      borderRadius: "6px",
                      fontWeight: "500",
                      transition: "background-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = "#3730a3"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "#4338ca"}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
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