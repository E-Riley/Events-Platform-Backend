const db = require("./connection");
const format = require("pg-format");
const formatData = require("../utils/utils");

const seed = ({ eventData, signupData, userData }) => {
  return db
    .query(`DROP TABLE IF EXISTS signups;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS events;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users (
              user_id SERIAL PRIMARY KEY,
              email VARCHAR(255) NOT NULL UNIQUE,
              password_hash TEXT NOT NULL,
              name VARCHAR(100) NOT NULL,
              role VARCHAR(50) NOT NULL CHECK (role IN ('user', 'admin')));
          `);
    })
    .then(() => {
      return db.query(`CREATE TABLE events (
          event_id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          date TIMESTAMP NOT NULL,
          location VARCHAR(255) NOT NULL,
          created_by INT REFERENCES users(user_id) ON DELETE SET NULL);`);
    })
    .then(() => {
      return db.query(`CREATE TABLE signups (
          signup_id SERIAL PRIMARY KEY,
          user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
          event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
          UNIQUE (user_id, event_id));`);
    })
    .then(() => {
      const formatSql = format(
        `INSERT INTO users (email, password_hash, name, role) VALUES %L RETURNING *;`,
        formatData(userData)
      );
      return db.query(formatSql);
    })
    .then(() => {
      const formatSql = format(
        `INSERT INTO events (title, description, date, location, created_by) VALUES %L RETURNING *;`,
        formatData(eventData)
      );
      return db.query(formatSql);
    })
    .then(() => {
      const formatSql = format(
        `INSERT INTO signups (user_id, event_id) VALUES %L RETURNING *;`,
        formatData(signupData)
      );
      return db.query(formatSql);
    });
};

module.exports = seed;
