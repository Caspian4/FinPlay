import React from "react";

const ArchiveFilters = ({ filters, categories, onChange }) => {
  return (
    <div className="filters-section">
      <h2 className="section-title">
        <span className="spyglass-icon">🔭</span>
        Search the Archives
      </h2>

      <div className="filters-grid">
        <div className="filter-group">
          <label>Type</label>
          <select name="type" value={filters.type} onChange={onChange}>
            <option value="all">🗺️ All Adventures</option>
            <option value="income">💰 Treasures</option>
            <option value="expense">⛈️ Storms</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Category</label>
          <select name="category" value={filters.category} onChange={onChange}>
            <option value="all">🗂️ All Categories</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.icon} {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>From Date</label>
          <input
            type="date"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={onChange}
          />
        </div>

        <div className="filter-group">
          <label>To Date</label>
          <input
            type="date"
            name="dateTo"
            value={filters.dateTo}
            onChange={onChange}
          />
        </div>

        <div className="filter-group full-width">
          <label>🔍 Search</label>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={onChange}
            placeholder="Search treasure descriptions..."
          />
        </div>
      </div>
    </div>
  );
};

export default ArchiveFilters;
