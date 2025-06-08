const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { findUserByEmail } = require("../models/users.models");

exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  findUserByEmail(email)
    .then((user) => {
      return bcrypt.compare(password, user.password_hash).then((match) => {
        if (!match) {
          return Promise.reject({ status: 401, msg: "Invalid credentials" });
        }
        const token = jwt.sign(
          { user_id: user.user_id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );
        res
          .status(200)
          .send({ token, user: { name: user.name, role: user.role } });
      });
    })
    .catch(next);
};
