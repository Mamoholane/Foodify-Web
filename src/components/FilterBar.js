import React from 'react';

const FilterBar = ({ categories, setFilter }) => {
  return (
    <div className="filter-bar">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setFilter(category)}
          className="filter-button"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
