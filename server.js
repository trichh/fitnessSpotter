var express = require('express');
var path = require('path');
var passport = require('passport');
var mongoose = require('./db.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user.js');

passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
function(req, email, password, done){
  process.nextTick(function(){
    User.findOne({'email': email, 'password': password}, function(err, user){
      if(user)
        return done(null, user);
      if(err)
        return err;
      return false;
    });
  });
}
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

var app = express();

mongoose.createConnection('mongodb://localhost/fitnessSpotter');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

app.get('/dashboard', isLoggedIn, function(req, res) {
  res.render('./public/assets/views/dashboard.html', {
    user : req.user
  });
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
  saveUninitialized: true,
  secret: '00308118',
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/logout', function(req, res) {
  req.logout();
  res.send(200);
});

app.post('/api/login', passport.authenticate('login'), function(req, res) {
  res.redirect('/dashboard/' + req.user.gymName);
  console.log(req.user);
});

app.use('/api', require('./api/register.js'));

var server = app.listen(process.env.PORT || 3000, function(){
  console.log('Server running on PORT: ', server.address().port);
});
