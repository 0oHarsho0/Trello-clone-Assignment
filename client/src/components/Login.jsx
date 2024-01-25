// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = ({userData, setUserData}) => {
//     const navigate = useNavigate();
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('')

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // Send a request to the server for authentication using Axios
//     try {
//       const response = await axios.post('http://localhost:3001/users/login', {
//         username,
//         password,
//       });

//       if (response.status === 200) {
//         // If authentication is successful, redirect to TaskBoard
//         console.log(response.data.username)
//         setUserData(response.data)
//         navigate('/taskboard');
//         setMessage('')
//       } else {
//         // Handle authentication failure, show error message or handle as needed
//         console.error('Login failed');
//         setMessage("Login Failed!!")
//       }
//     } catch (error) {
//       // Handle any errors during the request
//       console.error('Error during login:', error);
//       setMessage("Login Failed!!")
//     }
//   };

//   return (
//     <>
//       <h2>Login Page</h2>
//       <form onSubmit={handleLogin}>
//         <label>
//           Username:
//           <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </label>
//         <br />
//         <button type="submit">Login</button>
//       </form>
//       <p>{message}</p>
//     </>
//   );
// };

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SignUp from "./SignUp.jsx";

const Login = ({ setUserData }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/users/login", {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("userData", JSON.stringify(response.data));
        setUserData(response.data);
        navigate("/taskboard");
        setMessage("");
      } else {
        console.error("Login failed");
        setMessage("Login Failed!!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("Login Failed!!");
    }
  };

  return (
    <div className="container">
      <div className="login">
        <h2 style={{ textAlign: "center", color:"#eae0d5" }}>Login Page</h2>
        <form onSubmit={handleLogin}>
          <label className="label">
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label className="label">
            {/* Password: */}
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <div className="btnBox">
            <button type="submit" className="loginSubmit">
              Login
            </button>
          </div>
          <Link style={{textAlign: "center", display:"block", marginTop:"10px", color:"#c6ac8f"}} to={"/signup"}>Not a user? SignUp</Link>
        </form>
        <h3 style={{textAlign:"center", color:"#c6ac8f"}}>{message}</h3>
      </div>
    </div>
  );
};

export default Login;
