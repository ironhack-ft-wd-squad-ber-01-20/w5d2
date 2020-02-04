const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.get("/signup", (req, res, next) => {
  res.render("signup.hbs");
});

router.post("/signup", (req, res, next) => {
  // const username = req.body.username;
  // const password = req.body.password;
  const { username, password } = req.body;

  if (!username) {
    res.render("signup.hbs", {
      errorMessage: "Username cannot be empty"
    });
    return;
  }
  if (password.length < 6) {
    res.render("signup.hbs", {
      errorMessage: "Password must be 6 char. min"
    });
    return;
  }

  // User.findOne({ username });
  User.findOne({ username: username })
    .then(user => {
      if (user) {
        res.render("signup.hbs", {
          errorMessage: "Username already taken"
        });
        return;
      }

      return bcrypt.hash(password, 10);
    })
    .then(hash => {
      return User.create({ username: username, password: hash });
    })
    .then(createdUser => {
      console.log(createdUser);
      // log user the in
      res.redirect("/");
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
