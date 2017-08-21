var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var hbs = require('hbs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var HandlebarsIntl = require("handlebars-intl");
var index = require('./routes/index');
var users = require('./routes/users');
var helpers = require('handlebars-helpers')

var app = express();

// Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://dec0mpiled:welcometor4ge@ds028310.mlab.com:28310/anonbombdb', {useMongoClient: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to anonbombdb as dec0mpiled...");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


hbs.registerHelper('isblank', function(lvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if( lvalue!="" ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

hbs.registerHelper('equal', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if( lvalue!=rvalue ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

hbs.registerHelper('ifeq', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

hbs.registerHelper('if', function(v1, options) {
  if(v1 != null) {
    return options.fn(this);
  }
  return options.inverse(this);
});

hbs.registerHelper('ifneq', function(v1, v2, options) {
  if(v1 != v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

hbs.registerHelper('or', function(v1, v2, v3, v4, options) {
  if(v1 == v2 || v3==v4) {
    return options.fn(this);
  }
  return options.inverse(this);
});


HandlebarsIntl.registerWith(hbs);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
