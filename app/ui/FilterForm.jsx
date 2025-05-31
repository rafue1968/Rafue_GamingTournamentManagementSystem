"use client";

export default function FilterForm({ filters, onFilterChange }) {
  return (
    <div>
      <div>
        <label>Game Title:</label>
        <input
          type="text"
          name="title"
          value={filters.title}
          onChange={onFilterChange}
          placeholder="Search by game title"
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={onFilterChange}
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={onFilterChange}
          placeholder="Search by location"
        />
      </div>
    </div>
  );
}
