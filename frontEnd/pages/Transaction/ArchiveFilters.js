import React from "react";

const ArchiveFilters = ({ filters, categories, onChange }) => {
    return (
        <div className="filters-section">
            <h2 className="section-title">
                <span className="spyglass-icon">ð­</span>
                Search the Archives
            </h2>

            <div className="filters-grid">
                <div className="filter-group">
                    <label>Type</label>
                    <select name="type" value={filters.type} onChange={onChange}>
                        <option value="all">ðºï¸ All Adventures</option>
                        <option value="income">ð° Treasures</option>
                        <option value="expense">âï¸ Storms</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Category</label>
                    <select name="category" value={filters.category} onChange={onChange}>
                        <option value="all">ðï¸ All Categories</option>
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
                    <label>ð Search</label>
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
