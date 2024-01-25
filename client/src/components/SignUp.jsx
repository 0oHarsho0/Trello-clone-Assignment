import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [team_id, setTeamId] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();

    console.log(username, password, full_name, role, team_id, phone_number);

    try {
      const response = await axios.post("http://localhost:3001/users", {
        username,
        password,
        full_name,
        role,
        team_id,
        phone_number,
      });
      console.log(response);
      if (response.status === 200) {
        // Registration successful, navigate to login page
        navigate("/");
        setMessage("");
      } else {
        // Handle registration failure, show error message or handle as needed
        console.error("Registration failed");
        setMessage("Registration Failed!!");
      }
    } catch (error) {
      // Handle any errors during the request
      console.error("Error during registration:", error);
      setMessage("Registration Failed!!");
    }
  };

  return (
    <div className="container">
      <div className="login">
        <h2 style={{ textAlign: "center", color:"#eae0d5" }}>Sign Up</h2>
        <form onSubmit={handleRegistration}>
          <label className="label">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label className="label">
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <label className="label">
            <input
              type="text"
              placeholder="Full Name"
              value={full_name}
              required
              onChange={(e) => setFullName(e.target.value)}
            />
          </label>
          <br />
          <label className="label">
            <input
              type="text"
              placeholder="Role"
              value={role}
              required
              onChange={(e) => setRole(e.target.value)}
            />
          </label>
          <br />
          <label className="label">
            <input
              type="number"
              placeholder="Team Id"
              value={team_id}
              required
              onChange={(e) => setTeamId(e.target.value)}
            />
          </label>
          <br />
          <label className="label">
            <input
              type="text"
              placeholder="Phone Number"
              value={phone_number}
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
          <br />
          {/* <button type="submit">Register</button> */}
          <div className="btnBox">
            <button type="submit" className="loginSubmit">Sign Up</button>
          </div>
          <Link style={{ textAlign: "center", display: "block", marginTop: "10px", color:"#c6ac8f" }} to={"/"}>
            Already a user? Login
          </Link>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default SignUp;
