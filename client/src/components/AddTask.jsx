import React from "react";

export default function AddTask({ handleInputChange, handleAddTask, newTask }) {
  return (
    <div className="taskForm">
      <form className="addTaskForm">
        <h2 style={{ textAlign: "center", marginTop:0 }}>Enter Details</h2>
        <div className="mTop">
          {/* <label>Title:</label> */}
          <input
            className="addTaskInput"
            type="text"
            name="title"
            placeholder="Title"
            value={newTask.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mTop">
          {/* <label>Description:</label> */}
          <textarea
            className="addTaskText"
            name="description"
            placeholder="Task Description"
            value={newTask.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="selectable">
          <div className="mTop">
            <label>Priority </label>
            <select
              name="priority"
              value={newTask.priority}
              onChange={handleInputChange}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="mTop">
            <label>Status </label>
            <select
              name="status"
              value={newTask.status}
              onChange={handleInputChange}
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="mTop">
            <label>Planned Date </label>
            <input
              type="date"
              name="planned_date"
              value={newTask.planned_date}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mTop">
          {/* <label>Assignee ID:</label> */}
          <input
            className="addTaskInput"
            type="text"
            name="assignee_id"
            placeholder="assignee_id"
            value={newTask.assignee_id}
            onChange={handleInputChange}
          />
        </div>

        <div className="mTop">
          {/* <label>Reporter ID:</label> */}
          <input
            className="addTaskInput"
            type="text"
            name="reporter_id"
            placeholder="reporter_id"
            value={newTask.reporter_id}
            onChange={handleInputChange}
          />
        </div>

        <button
          type="button"
          className="addTaskBtn center"
          style={{ margin: "1rem 2rem 0 2rem" }}
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
