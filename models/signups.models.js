const db = require("../db/connection");

exports.fetchSignups = () => {
  return db.query("SELECT * FROM signups;").then(({ rows }) => {
    return rows;
  });
};

exports.createSignup = ({ user_id, event_id }) => {
  return db
    .query(
      `INSERT INTO signups (user_id, event_id) VALUES ($1, $2) RETURNING *;`,
      [user_id, event_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.removeSignup = (signup_id) => {
  return db
    .query("DELETE FROM signups WHERE signup_id = $1 RETURNING *;", [signup_id])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "Signup not found" });
      }
    });
};

exports.getEventsSignedUpByUser = (user_id) => {
  const query = `
    SELECT events.*
    FROM events
    JOIN signups ON events.event_id = signups.event_id
    WHERE signups.user_id = $1;
  `;
  return db.query(query, [user_id]).then((result) => result.rows);
};
