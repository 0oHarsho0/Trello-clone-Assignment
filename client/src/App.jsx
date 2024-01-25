// import { useState } from 'react'
// // import './App.css'

// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import TaskBoard from './components/TaskBoard.jsx';
// import TaskDetails from './components/TaskDetails';
// import Login from './components/Login.jsx'


// function App() {
//   const [userData, setUserData] = useState(null)

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" exact element={<Login userData={userData} setUserData={setUserData}/>} />
//         <Route path="/taskboard"exact element = {userData ? <TaskBoard userData={userData} setUserData={setUserData} /> : <Navigate to="/" />} />
//         <Route path="/task/:taskId" element={userData ? <TaskDetails /> : <Navigate to="/"/>} />
//       </Routes>
//     </Router>
//   )
// }

// export default App

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TaskBoard from './components/TaskBoard.jsx';
import TaskDetails from './components/TaskDetails';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';

function App() {
  // Initialize userData state with the value from local storage, if available
  const [userData, setUserData] = useState(() => {
    try {
      const storedUserData = localStorage.getItem('userData');
      console.log('Stored User Data:', storedUserData);
      return storedUserData ? JSON.parse(storedUserData) : null;
    } catch (error) {
      console.error('Error reading user data from local storage:', error);
      return null;
    }
  });

  useEffect(() => {
    // Update local storage whenever userData changes
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login setUserData={setUserData} />}
        />
        <Route
          path="/signup"
          element={<SignUp setUserData={setUserData} />}
        />
        <Route
          path="/taskboard"
          element={userData ? <TaskBoard userData={userData} setUserData={setUserData} /> : <Navigate to="/" />}
        />
        <Route path="/task/:taskId" element={userData ? <TaskDetails userData={userData} setUserData={setUserData}/> : <Navigate to="/" />}/>
      </Routes>
    </Router>
  );
}

export default App;


