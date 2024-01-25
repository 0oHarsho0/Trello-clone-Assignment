// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const db = require('./db');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// User routes
app.use('/users', require('./routes/users'));

// Task routes
app.use('/tasks', require('./routes/tasks'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
