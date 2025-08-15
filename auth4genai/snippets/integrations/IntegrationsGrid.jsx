import { useState, useMemo } from "react";
import { IntegrationCard } from "/snippets/integrations/IntegrationCard.jsx";
import Columns from "@theme/Columns";

export const IntegrationsGrid = ({ items = [], filters = [] }) => {

  const fuzzySearch = (needle, haystack) => {
  if (!needle || !haystack) return false;
  const needleLower = needle.toLowerCase();
  const haystackLower = haystack.toLowerCase();
  return haystackLower.includes(needleLower);
}

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(null);

  const filteredItems = useMemo(() => {
    let filtered = items;

    if (searchTerm.trim()) {
      filtered = filtered.filter((item) => {
        return (
          fuzzySearch(searchTerm, item.title) ||
          fuzzySearch(searchTerm, item.description)
        );
      });
    }

    if (filter) {
      filtered = filtered.filter((item) => item.type === filter);
    }
    
    return filtered;
  }, [searchTerm, filter]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      if (a.status === "Available" && b.status === "Coming Soon") return -1;
      if (a.status === "Coming Soon" && b.status === "Available") return 1;
      return a.title.localeCompare(b.title);
    });
  }, [filteredItems]);

  return (
    <div className="integrations-container">
      <div className="integrations-search-container">
        <div className="integrations-search-filter-wrapper">
          <div className="integrations-search-input-wrapper">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="integrations-search-input"
            />
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="integrations-search-icon"
            >
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      </div>

      <Columns cols={3}>
        {sortedItems.map((item) => (
          <IntegrationCard integration={item} key={item.id} />
        ))}
      </Columns>

      {sortedItems.length === 0 && (
        <div className="integrations-no-results">
          <div className="integrations-no-results-icon">🔍</div>
          <h3 className="integrations-no-results-title">
            No results found
          </h3>
          <p className="integrations-no-results-text">
            {searchTerm ? `No results for "${searchTerm}". ` : ""}Try adjusting
            your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};