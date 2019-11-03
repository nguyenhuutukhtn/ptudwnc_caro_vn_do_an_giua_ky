const express = require('express');
var userModel = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var jwtOptions = {};
var passport = require('passport');
var passportJWT = require('passport-jwt');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = '3ln8TKJw2lOGllPJToyW';

module.exports = {
  register: (req, res, next) => {
    console.log(req);
    console.log(req.body);
    // const { name, password } = req.body;
    var password = req.body.password;
    var password2 = req.body.password2;

    userModel.getByUsername(req.body.username).then(userInfo => {
      if (userInfo.length > 0) {
        console.log(userInfo);
        res
          .status(500)
          .json('{message: "Tên đăng nhập đã tồn tại"}')
          .end();
      } else {
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
          //   console.log(user);

          userModel
            .add(req.body.username, req.body.email, hashedPassword)
            .then(result => {
              console.log(result);
              userModel.getByUsername(req.body.username).then(userInfo => {
                var payload = {
                  id: userInfo[0].id,
                  username: userInfo[0].username,
                  fullName: userInfo[0].fullName
                };
                console.log(userInfo);
                console.log(payload);
                var token = jwt.sign(payload, jwtOptions.secretOrKey);
                res.json({ message: 'success', session: token });
              });
              //   console.log(result);
            });
        } else {
          res
            .status(500)
            .json('{message: "Mật khẩu không chính xác"}')
            .end();
        }
      }
    });
  }
};
