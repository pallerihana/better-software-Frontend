import React from 'react';
import { SORT_OPTIONS, SORT_ORDER_OPTIONS } from '../utils/constants';

const SearchFilter = ({ filters, onFilterChange, onReset }) => {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value, page: 1 });
  };

  const handleReset = () => {
    onReset();
  };

  return (
    <div className="search-filter">
      <h3>Search & Filters</h3>
      
      <div className="filter-grid">
        {/* Search */}
        <div className="filter-group">
          <label className="filter-label">Search Content</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder="Search in comments..."
            className="filter-input"
          />
        </div>

        {/* Task ID Filter */}
        <div className="filter-group">
          <label className="filter-label">Task ID</label>
          <input
            type="text"
            value={filters.taskId}
            onChange={(e) => handleChange('taskId', e.target.value)}
            placeholder="Filter by task ID..."
            className="filter-input"
          />
        </div>

        {/* Sort By */}
        <div className="filter-group">
          <label className="filter-label">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
            className="filter-select"
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Order */}
        <div className="filter-group">
          <label className="filter-label">Sort Order</label>
          <select
            value={filters.sortOrder}
            onChange={(e) => handleChange('sortOrder', e.target.value)}
            className="filter-select"
          >
            {SORT_ORDER_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="filter-actions">
        <div className="results-per-page">
          <label>Results per page:</label>
          <select
            value={filters.limit}
            onChange={(e) => handleChange('limit', parseInt(e.target.value))}
            className="filter-select"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>

        <button
          onClick={handleReset}
          className="btn btn-secondary"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;