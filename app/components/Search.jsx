"use client";
import React from "react";
import PropTypes from "prop-types";

const Search = ({ onSubmit }) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        className="bg-gray-800 text-white w-48 sm:w-64 p-2 rounded focus:outline-none"
        placeholder="Search..."
      />
      <button
        onClick={onSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ml-2"
      >
        Search
      </button>
    </div>
  );
};

Search.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Search;
