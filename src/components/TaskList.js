import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilterDate, setSortOrder } from "../Redux/Slices/todoSlice";
import TaskItem from "./TaskItem";
import DatePicker from "react-datepicker";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import SearchBar from "./SearchBar";

function TaskList() {
    const dispatch = useDispatch();
    const { tasks, filterDate, sortOrder, searchQuery } = useSelector((state) => state.todo);

    // Search and Filtering
    const filteredTasks = tasks
        .filter((task) =>
            task.text.toLowerCase().includes(searchQuery.toLowerCase()) // 🔍 Filter tasks by search query
        )
        .filter((task) => (filterDate ? new Date(task.date).toDateString() === filterDate.toDateString() : true));

    // Sorting
    const sortedTasks = [...filteredTasks].sort((a, b) =>
        sortOrder === "asc" ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
    );

    return (
        <div className="mt-5 bg-gray-50 p-5 rounded-lg shadow-md">
            <SearchBar />

            <div className="flex justify-between items-center mt-4">
                <h2 className="text-lg font-bold text-gray-800">📝 Tasks</h2>
                <button
                    className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded-lg flex items-center gap-2 transition"
                    onClick={() => dispatch(setSortOrder(sortOrder === "asc" ? "desc" : "asc"))}
                >
                    {sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />} Sort
                </button>
            </div>

            <div className="mt-3">
                <DatePicker
                    selected={filterDate}
                    onChange={(date) => dispatch(setFilterDate(date))}
                    className="border p-2 rounded-lg w-full"
                    placeholderText="📅 Filter by Date"
                />
                <button className="mt-2 text-red-500 text-sm underline hover:text-red-700 transition" onClick={() => dispatch(setFilterDate(null))}>
                    Clear Filter
                </button>
            </div>

            <ul className="mt-5 space-y-3 max-h-72 overflow-y-auto">
                {sortedTasks.length > 0 ? (
                    sortedTasks.map((task) => <TaskItem key={task.id} task={task} />)
                ) : (
                    <p className="text-gray-500 text-center mt-5">No tasks found!</p>
                )}
            </ul>
        </div>
    );
}

export default TaskList;