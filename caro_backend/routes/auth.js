const express = require('express');
const router = express.Router();
// const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport'); /* POST login. */
var userModel = require('../models/user');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');

router.post('/register', function(req, res, next) {
  console.log(req.body);
  // const { name, password } = req.body;
  var password = req.body.password;
  var password2 = req.body.password2;

  if (password == password2) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    // console.log(hashedPassword);
    var user = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
      // first_name: userInfo.first_name,
      // last_name: userInfo.last_name,
      // birth_date: userInfo.birth_date,
      // pseudonym: userInfo.pseudonym
    };
    // console.log(user);

    userModel
      .add(req.body.username, req.body.email, hashedPassword)
      .then(result => {
        console.log(result);
        res.json('{message: "success"}');
      });
  } else {
    res
      .status(500)
      .json('{errors: "Passwords don\'t match"}')
      .end();
  }
});

module.exports = router;
