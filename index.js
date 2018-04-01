const express = require('express');
const path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local'),Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var http = require('http');
var router = express.Router();

// var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//express session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true

}));

//passport
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//connect flash
app.use(flash());

//global vars
app.use(function  (req, res, next){
  res.locals.messages = require('express-messages')(req, res);
  next();
})


const PORT = process.env.PORT || 3000
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

var Class = require('../models/class');

client.connect();

// app.use('/', routes);
// app.use('/users', users);
// app.use(express.static('views'));

// view engine setup
app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .engine('handlebars', exphbs({defaultLayout:'layout'}))
  .set('view engine', 'handlebars')
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
    
// app.get('/', function(req,res){
//       res.render('index');
//     });
router.get('/', function(req, res, next){
    Class.getClasses(function(err, classes){
        res.render('index', {title: 'Express'});

    }, 3);
});
  
module.exports = router;

  

