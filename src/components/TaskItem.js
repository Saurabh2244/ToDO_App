import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, markComplete, updateTask } from "../Redux/Slices/todoSlice";
import { FaTrash, FaCheckCircle, FaEdit } from "react-icons/fa";
import DatePicker from "react-datepicker";

function TaskItem({ task }) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);
    const [editedDate, setEditedDate] = useState(new Date(task.date));

    function handleUpdate() {
        if (!editedText.trim()) return;
        dispatch(updateTask({ id: task.id, text: editedText, date: editedDate.toISOString() }));
        setIsEditing(false);
    }

    return (
        <li
            className={`flex justify-between items-center p-4 border rounded-lg shadow-md transition ${task.completed ? "bg-green-100 hover:bg-green-200" : "bg-white hover:bg-gray-100"
                }`}
        >
            {isEditing ? (
                <div className="flex flex-col md:flex-row gap-2 w-full">
                    <input
                        type="text"
                        className="border p-2 w-full rounded-lg outline-none focus:border-blue-500 transition h-full"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                    />
                    <DatePicker selected={editedDate} onChange={setEditedDate} className="border p-2 rounded-lg w-full h-full" />
                    <button className="bg-green-500 hover:bg-green-600 px-3 py-1 text-white rounded-lg transition" onClick={handleUpdate}>
                        💾 Save
                    </button>
                    <button className="bg-gray-400 hover:bg-gray-500 px-3 py-1 text-white rounded-lg transition" onClick={() => setIsEditing(false)}>
                        ❌ Cancel
                    </button>
                </div>
            ) : (
                <div className="flex justify-between w-full">
                    <span className={`text-lg font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                        {task.text} - <span className="text-sm text-gray-600">{new Date(task.date).toDateString()}</span>
                    </span>
                    <div className="flex gap-3">
                        <button className="text-green-600 hover:text-green-800 transition" onClick={() => dispatch(markComplete(task.id))}>
                            <FaCheckCircle size={20} />
                        </button>
                        <button className="text-yellow-500 hover:text-yellow-700 transition" onClick={() => setIsEditing(true)}>
                            <FaEdit size={20} />
                        </button>
                        <button className="text-red-500 hover:text-red-700 transition" onClick={() => dispatch(deleteTask(task.id))}>
                            <FaTrash size={20} />
                        </button>
                    </div>
                </div>
            )}
        </li>
    );
}

export default TaskItem;