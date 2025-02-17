import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../Redux/Slices/todoSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TaskForm() {
    const dispatch = useDispatch();
    const [taskText, setTaskText] = useState("");
    const [taskDate, setTaskDate] = useState(new Date());

    function handleSubmit(e) {
        e.preventDefault();
        if (!taskText.trim()) return;

        dispatch(addTask({ id: Date.now(), text: taskText, date: taskDate.toISOString(), completed: false }));
        setTaskText("");
        setTaskDate(new Date());
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
            <input
                type="text"
                className="border p-2 w-full rounded"
                placeholder="Enter Task..."
                value={taskText}
                onChange={function (e) { setTaskText(e.target.value); }}
            />
            <DatePicker selected={taskDate} onChange={setTaskDate} dateFormat="d MMM yyyy" className="border p-2 rounded" />
            <button type="submit" className="bg-blue-500 px-4 py-2 text-white rounded">Add</button>
        </form>
    );
}

export default TaskForm;