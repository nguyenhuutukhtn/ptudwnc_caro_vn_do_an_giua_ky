var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var morgan = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var store = require('express-session').Store;
// var BetterMemoryStore = require(__dirname + '/memory');
// var store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true });
var authRouter = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(bodyParser());

// required for passport
// app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user', authRouter);

app.use(
  session({
    name: 'session',
    secret: '3ln8TKJw2lOGllPJToyW',
    resave: true,
    saveUninitialized: true
  })
);

// require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err.status + 'an=bc' + err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Login and register
// app.use("/login", require("./routes/login.route"));
// app.use('/register', require('./routes/register.route'));

module.exports = app;
