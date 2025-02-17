import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],  // Load tasks from localStorage
  filterDate: null,
  sortOrder: "asc",
  searchQuery: ""
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? { ...task, text: action.payload.text, date: action.payload.date } : task
      );
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    markComplete: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    setFilterDate: (state, action) => {
      state.filterDate = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});


export const { addTask, deleteTask, updateTask, markComplete, setFilterDate, setSortOrder, setSearchQuery } =
  todoSlice.actions;
export default todoSlice.reducer;