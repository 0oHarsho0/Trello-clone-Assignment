import React from "react";
import { Link, Navigate } from "react-router-dom";

export default function Task({task}) {
  return (
    <div className="task">
      <h3 style={{textAlign:"center", margin:0, padding:"1rem 0", backgroundColor:"#d8c6b2", borderRadius:"10px", border:"2px solid #eae0d5"}}>{task.title}</h3>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Planned Date: {task.planned_date}</p>
      <p>Status: {task.status}</p>
      <p>Assignee: {task.assignee_id}</p>
      <p>Reporter: {task.reporter_id}</p>
      <Link to={`/task/${task.id}`}>
        <button className="taskDetailBtn">View Details</button>
      </Link>
    </div>
  );
}
