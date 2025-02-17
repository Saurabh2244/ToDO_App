import React from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function TodoApp() {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">📝 To-Do List</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default TodoApp;