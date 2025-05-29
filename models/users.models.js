const db = require("../db/connection");

exports.fetchUsers = () => {
  return db.query(`SELECT * FROM USERS;`).then(({ rows }) => {
    return rows;
  });
};

exports.createUser = ({ email, password_hash, name, role }) => {
  return db
    .query(
      `INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4) RETURNING *;`,
      [email, password_hash, name, role]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
