// routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all users
router.get('/', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(rows);
  });
});

// Get a specific user by ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  db.get('SELECT * FROM users WHERE id = ?', [userId], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(row);
  });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Validate the username and password against the database
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.get(sql, [username, password], (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      if (!row) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }
      res.json(row);
    });
  });

// Create a new user
router.post('/', (req, res) => {
  const { username, password, full_name, role, team_id, phone_number } = req.body;
  db.run(
    'INSERT INTO users (username, password, full_name, role, team_id, phone_number) VALUES (?, ?, ?, ?, ?, ?)',
    [username, password, full_name, role, team_id, phone_number],
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

// Update user details
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { full_name, role, team_id, phone_number } = req.body;
  db.run(
    'UPDATE users SET full_name = ?, role = ?, team_id = ?, phone_number = ? WHERE id = ?',
    [full_name, role, team_id, phone_number, userId],
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ message: 'User updated successfully' });
    }
  );
});

// Delete a user
router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  db.run('DELETE FROM users WHERE id = ?', [userId], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ message: 'User deleted successfully' });
  });
});

module.exports = router;
