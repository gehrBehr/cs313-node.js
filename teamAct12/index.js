var express = require('express');
var session = require('express-session');
var http = require('http');

var app = express();
const PORT = process.env.PORT || 5000;

//express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true

  }));

app.set('port', PORT)
.use(express.static('views'))
.use(express.json())
.use(express.urlencoded({extended: true}))
.use( (req, res, next) => { console.log('Received a request for: ' + req.url); next(); })
.use( '/getServerTime', (req, res, next) => { 
    if(!req.session.username){
        res.status(401).json({error:'Request denied'});
    }
    else{
        next();
    }})
.post('/login', login)
.post('/logout', logout)
.get('/getServerTime', getServerTime)
.listen(app.get('port'), ()=> {
    console.log('Listening on port:' + app.get('port'));
});

function getServerTime(req, res) {
    res.json({success: true, time: new Date()});
}

function login(req, res) {
    var userN = req.body.username;
    var pass = req.body.password;

    if (userN == 'admin' && pass == 'password') {
        req.session.username = userN;
        res.json({success: true}); 
    }
    else
    {
        res.json({success: false});
    }
}

function logout(req, res) {

    if (req.session.username) {
        req.session.destroy();    
        res.json({success: true});
    }
    else{
        res.json({success: false});
                
    }
    
}