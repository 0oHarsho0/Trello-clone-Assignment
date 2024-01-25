// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('task_manager.db');

db.serialize(() => {
  // Create users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      full_name TEXT NOT NULL,
      role TEXT NOT NULL,
      team_id INTEGER NOT NULL,
      phone_number TEXT NOT NULL
    )
  `);

  // Create tasks table
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      priority TEXT NOT NULL,
      planned_date TEXT NOT NULL,
      status TEXT NOT NULL,
      assignee_id INTEGER NOT NULL,
      reporter_id INTEGER NOT NULL,
      FOREIGN KEY (assignee_id) REFERENCES users(id),
      FOREIGN KEY (reporter_id) REFERENCES users(id)
    )
  `);
});

module.exports = db;
