import React, { useState, useEffect } from "react";
import { Link, useNavigate, redirect } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import deleteIcon from "./../assets/delete.png"

const TaskDetails = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/tasks/${taskId}`)
      .then((response) => {
        console.log(response);
        setTask(response.data);
        setSelectedStatus(response.data.status);
      })
      .catch((error) => {
        console.error("Error fetching task details:", error);
      });
  }, [taskId]);

  const handleUpdateStatus = () => {
    axios
      .put(`http://localhost:3001/tasks/${taskId}`, { status: selectedStatus })
      .then((response) => {
        console.log(response);

        setTask((prevTask) => ({ ...prevTask, status: selectedStatus }));
        navigate('/taskboard')
      })
      .catch((error) => {
        console.error("Error updating task status:", error);
      });
  };

  const handleDeleteTask = () => {
    axios
      .delete(`http://localhost:3001/tasks/${taskId}`)
      .then((response) => {
        console.log(response, "deleted");
        navigate('/taskboard');
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };


  return (
    <div className="mainDetails">
      <nav className="navbar">
        <h3>Task Details</h3>
        <div>
          <button className="logOutBtn" onClick={() => setUserData(null)}>
            Log Out
          </button>
          <Link style={{marginLeft:"1rem"}} to="/taskboard">
            <button className="backBtn">
              Back
            </button>
          </Link>
        </div>
      </nav>

      {task ? (
        <div className="details">
          <div className="taskDetails">
            <h2 style={{textAlign:"center", margin:0, padding:"1rem 0", backgroundColor:"#d8c6b2", borderRadius:"10px", border:"2px solid #eae0d5"}}>{task.title}</h2>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Planned Date: {task.planned_date}</p>
            <p>Status: {task.status}</p>
            <p>Assignee: {task.assignee_id}</p>
            <p>Reporter: {task.reporter_id}</p>

            <div className="center">
              <select
                className="selector mRight"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <button className="updateBtn mLeft" onClick={handleUpdateStatus}>Update Status</button>

              
            </div>
            
            {userData.role == "admin" && (
              <div className="iconContainer">
                <img src={deleteIcon} alt="delete Task" className="deleteIcon" onClick={handleDeleteTask} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <p>No Such Task Id exist</p>
          <Link to="/taskboard">
            <button>Back</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default TaskDetails;
