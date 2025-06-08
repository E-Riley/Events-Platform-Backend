const db = require("../db/connection");
const bcrypt = require("bcrypt");

exports.fetchUsers = () => {
  return db.query(`SELECT * FROM USERS;`).then(({ rows }) => {
    return rows;
  });
};

exports.createUser = ({ email, password, name, role }) => {
  return bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      return db.query(
        `INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4) RETURNING *;`,
        [email, hashedPassword, name, role]
      );
    })
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.findUserByEmail = (email) => {
  return db
    .query(`SELECT * FROM users WHERE email = $1;`, [email])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 401, msg: "Invalid credentials" });
      }
      return rows[0];
    });
};
