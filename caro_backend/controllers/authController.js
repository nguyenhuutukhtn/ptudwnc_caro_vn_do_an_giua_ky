const express = require('express');
var userModel = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var jwtOptions = {};
var passport = require('passport');
var passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = '3ln8TKJw2lOGllPJToyW';

// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    function(username, password, cb) {
      return userModel
        .getByUsername(username)
        .then(user => {
          if (user.length === 0) {
            return cb(null, false, {
              message: 'Tên đăng nhập hoặc mật khẩu không đúng.'
            });
          }
          bcrypt.compare(password, user[0].password, function(err, res) {
            if (res == false) {
              return cb(null, false, {
                message: 'Tên đăng nhập hoặc mật khẩu không đúng.'
              });
            } else {
              return cb(null, user, { message: 'Đăng nhập thành công' });
            }
          });
          //   if (!user) {
          //     return cb(null, false, { message: "Incorrect email or password." });
          //   }
          //   return cb(null, user, { message: "Logged In Successfully" });
        })
        .catch(err => cb(err));
    }
  )
);

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
          .json({ message: 'Tên đăng nhập đã tồn tại' })
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
            .json({ message: 'Mật khẩu không chính xác' })
            .end();
        }
      }
    });
  },
  login: (req, res, next) => {
    // console.log(req);
    // console.log(req.body.email);
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        console.log('err' + err);
        console.log('user' + user);
        console.log('info' + info);

        return res.status(400).json({
          message: info.message,
          user: user
        });
      }
      req.login(user, { session: false }, err => {
        if (err) {
          res.send(err);
        }
        // generate a signed son web token with the contents of user object and return it in the response

        var userInfo = {
          id: user[0].id,
          username: user[0].username,
          fullName: user[0].fullName
        };
        const session = jwt.sign(userInfo, jwtOptions.secretOrKey);
        return res.json({ userInfo, session });
      });
    })(req, res);
  }
};
