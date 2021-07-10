/*
  Handle logic of Search bar
*/
import "./Search.css";
import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchTerm, setSearchTerm } from "./searchSlice";

export const Search = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        placeholder="Search"
        onChange={handleSearchChange}
      />
      <span><HiOutlineSearch /></span>
    </div>
  );
};
