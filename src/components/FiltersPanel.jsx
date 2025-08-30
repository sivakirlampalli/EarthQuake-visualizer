function FiltersPanel({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filters-panel">
      <label>
        Time Range:
        <select name="period" value={filters.period} onChange={handleChange}>
          <option value="day">Past Day</option>
          <option value="week">Past Week</option>
          <option value="month">Past Month</option>
        </select>
      </label>

      <label>
        Min Magnitude:
        <select name="minMag" value={filters.minMag} onChange={handleChange}>
          <option value="all">All</option>
          <option value="1">1.0+</option>
          <option value="2.5">2.5+</option>
          <option value="4.5">4.5+</option>
        </select>
      </label>

      <button onClick={() => setFilters({ ...filters })}>Refresh</button>
    </div>
  );
}
export default FiltersPanel;
