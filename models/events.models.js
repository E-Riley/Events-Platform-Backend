const db = require("../db/connection");

exports.fetchEvents = () => {
  return db
    .query("SELECT * FROM events ORDER BY date ASC;")
    .then(({ rows }) => {
      return rows;
    });
};

exports.fetchEventById = (event_id) => {
  return db
    .query("SELECT * FROM events WHERE event_id = $1;", [event_id])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "Event not found" });
      }
      return rows[0];
    });
};

exports.createEvent = ({ title, description, date, location, created_by }) => {
  return db
    .query(
      `INSERT INTO events (title, description, date, location, created_by)
     VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [title, description, date, location, created_by]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.removeEvent = (event_id) => {
  return db
    .query("DELETE FROM events WHERE event_id = $1 RETURNING *;", [event_id])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "Event not found" });
      }
    });
};

exports.getEventsCreatedByAdmin = (user_id) => {
  const query = `
    SELECT * FROM events
    WHERE creator_id = $1;
  `;
  return db.query(query, [user_id]).then((result) => result.rows);
};
