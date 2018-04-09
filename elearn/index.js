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
var http = require('http');
var LocalStrategy = require('passport-local'),Strategy;
var fs = require('fs');
var mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1:27017/elearn');
//var db = mongoose.connection;
mongoose.connect('mongodb://heroku_n7fqkhx9:nn6ao650go64njqku8nld8torq@ds125068.mlab.com:25068/heroku_n7fqkhx9');
var db = mongoose.connection;

fs.readdirSync(__dirname + '/models/').forEach(function(filename){
  if(~filename.indexOf('.js')) require(__dirname + '/models/' + filename);
});

//global vars
const PORT = process.env.PORT || 3000;
var app = express();
app.use(function  (req, res, next){
  res.locals.messages = require('express-messages')(req, res);
  next();
});


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

app.use(express.static('views'));

// view engine setup 
app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .engine('handlebars', exphbs({defaultLayout:'layout'}))
  .set('view engine', 'handlebars');


//routes
app.get('/', function(req, res, next){
      res.render('index.handlebars');
  });

app.get('/', function(req, res, next){
  mongoose.model('classes').find(function(err, classes){
    res.send(classes);
  });
});


app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

module.exports = app;



