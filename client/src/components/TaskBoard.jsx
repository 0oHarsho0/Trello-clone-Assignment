import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Task from "./Task";
import AddTask from "./AddTask";

const TaskBoard = ({ userData, setUserData }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "High",
    planned_date: "",
    status: "Todo",
    assignee_id: "",
    reporter_id: "",
  });

  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const [filterAssignee, setFilterAssignee] = useState("");
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/tasks")
      .then((response) => {
        setTasks(response.data);
        setOriginalData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const handleSort = (field) => {
    if (sortBy === field) {
      // If the same field is clicked again, toggle the sort order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleAddTask = () => {
    axios
      .post("http://localhost:3001/tasks", newTask)
      .then((response) => {
        axios
          .get("http://localhost:3001/tasks")
          .then((response) => {
            setTasks(response.data);
            setOriginalData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching tasks:", error);
          });
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  const handleInputChange = (e) => {
    // console.log(e.target)
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleFilterAssignee = () => {
    if (filterAssignee !== "") {
      const filteredTasks = originalData.filter(
        (task) => task.assignee_id == filterAssignee
      );
      setTasks(filteredTasks);
    }
  };

  const handleReset = () => {
    setFilterAssignee("");
    setTasks(originalData);
  };

  let data = tasks;
  if (userData.role != "admin")
    data = tasks.filter((e) => e.reporter_id === userData.team_id);

  if (sortBy === "priority") {
    const priorityValues = { High: 3, Medium: 2, Low: 1 };

    data.sort((a, b) => {
      const priorityA = priorityValues[a.priority];
      const priorityB = priorityValues[b.priority];

      if (priorityA === priorityB) 
        return sortOrder === "asc" ? a.priority.localeCompare(b.priority) : b.priority.localeCompare(a.priority);
      else
        return sortOrder === "asc" ? priorityA - priorityB : priorityB - priorityA;
    });
  } else if (sortBy === "planned_date") {
    data.sort((a, b) =>
      sortOrder === "asc" ? new Date(a.planned_date) - new Date(b.planned_date) : new Date(b.planned_date) - new Date(a.planned_date)
    );
  }

  const todoTasks = data.filter((task) => task.status === "Todo");
  const inProgressTasks = data.filter((task) => task.status === "In Progress");
  const completedTasks = data.filter((task) => task.status === "Completed");

  return (
    <div>
      <nav className="navbar">
        <h3>Hi {userData.username}</h3>
        <button className="logOutBtn" onClick={() => setUserData(null)}>
          Log Out
        </button>
      </nav>

      <div className="main">
        <div className="sorting-buttons">
          <button className="priorityBtn mRight" onClick={() => handleSort("priority")}>Sort by Priority</button>
          <button className="dateBtn mLeft" onClick={() => handleSort("planned_date")}>Sort by Planned Date</button>
        </div>

        <div className="filter center">
          <label style={{ marginRight: "1rem" }}>
            <input
              type="text"
              value={filterAssignee}
              placeholder="Enter ID to filter"
              style={{
                borderRadius: "10px",
                padding: "10px",
                borderColor: "#eae0d5",
              }}
              onChange={(e) => setFilterAssignee(e.target.value)}
            />
          </label>
          <div>
            <button className="filterBtn mRight" onClick={handleFilterAssignee}>Filter</button>
            <button className="resetBtn mLeft" onClick={handleReset}>Reset</button>
          </div>
        </div>

        <div>
          {userData.role == "admin" && <AddTask handleInputChange={handleInputChange} handleAddTask={handleAddTask} newTask={newTask} />}
        </div>

        <div style={{ display: "flex", overflow: "auto", whiteSpace: "nowrap" }}>
          <div className="taskCol">
            <h2 className="taskHead">Todo</h2>
            {/* {todoTasks.map((task) => (
              <Task key={task.id} task={task}/>
            ))} */}
            {todoTasks.length != 0 ? (
              <>
                {todoTasks.map((task) => (
                  <Task key={task.id} task={task} />
                ))}
              </>
            ) : (
              <div className="task" style={{textAlign:"center"}}>No Data, Ask admin to assign task</div>
            )}
          </div>
          <div className="taskCol">
            <h2 className="taskHead">In Progress</h2>
            {/* {inProgressTasks.map((task) => (
              <Task key={task.id} task={task} />
            ))} */}
            {inProgressTasks.length != 0 ? (
              <>
                {inProgressTasks.map((task) => (
                  <Task key={task.id} task={task} />
                ))}
              </>
            ) : (
              <div className="task" style={{textAlign:"center"}}>No Data, Ask admin to assign task</div>
            )}
          </div>
          <div className="taskCol">
            <h2 className="taskHead">Completed</h2>
            {/* {completedTasks.map((task) => (
              <Task key={task.id} task={task} />
            ))} */}
            {completedTasks.length != 0 ? (
              <>
                {completedTasks.map((task) => (
                  <Task key={task.id} task={task} />
                ))}
              </>
            ) : (
              <div className="task" style={{textAlign:"center"}}>No Data, Ask admin to assign task</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
