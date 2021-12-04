import React from "react";

export default ({ setFilter, filter }) => {
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  return (
    <div>
      filter: <input onChange={handleFilterChange} value={filter} />
    </div>
  );
};
