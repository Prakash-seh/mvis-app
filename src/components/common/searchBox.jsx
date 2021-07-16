import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      name="query"
      className="form-control my-2 shadow-sm"
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      type="text"
      placeholder="Search movie"
    />
  );
};

export default SearchBox;
