// routes/tasks.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all tasks
router.get('/', (req, res) => {
  db.all('SELECT * FROM tasks', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(rows);
  });
});

// Get a specific task by ID
router.get('/:id', (req, res) => {
  const taskId = req.params.id;
  db.get('SELECT * FROM tasks WHERE id = ?', [taskId], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json(row);
  });
});

// Create a new task
router.post('/', (req, res) => {
  const {
    title,
    description,
    priority,
    planned_date,
    status,
    assignee_id,
    reporter_id,
  } = req.body;
  db.run(
    `INSERT INTO tasks (title, description, priority, planned_date, status, assignee_id, reporter_id)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [title, description, priority, planned_date, status, assignee_id, reporter_id],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Update task details
router.put('/:id', (req, res) => {
  const taskId = req.params.id;
  const { status } = req.body;
  db.run('UPDATE tasks SET status = ? WHERE id = ?', [status, taskId], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ message: 'Task status updated successfully' });
  });
});


// Update task priority
// router.put('/:id', (req, res) => {
//   const taskId = req.params.id;
//   const { priority } = req.body;
//   db.run('UPDATE tasks SET priority = ? WHERE id = ?', [priority, taskId], (err) => {
//     if (err) {
//       console.error(err.message);
//       res.status(500).json({ error: 'Internal Server Error' });
//       return;
//     }
//     res.json({ message: 'Task status updated successfully' });
//   });
// });

// Delete a task
router.delete('/:id', (req, res) => {
  const taskId = req.params.id;
  db.run('DELETE FROM tasks WHERE id = ?', [taskId], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ message: 'Task deleted successfully' });
  });
});

module.exports = router;
