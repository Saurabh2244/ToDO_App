import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../Redux/Slices/todoSlice";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.todo.searchQuery);

  return (
    <div className="flex items-center gap-2 border p-2 rounded-lg shadow-sm bg-gray-100">
      <FaSearch className="text-gray-500" />
      <input
        type="text"
        className="w-full p-2 outline-none bg-transparent"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />
    </div>
  );
}

export default SearchBar;