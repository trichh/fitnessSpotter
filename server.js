// Requiring packages
var express = require('express');
var path = require('path');
var passport = require('passport');
var mongoose = require('./db.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var LocalStrategy = require('passport-local').Strategy;
var MongoStore = require('connect-mongo')(session);
var assert = require('assert');

// Requiring user model and client model
var User = require('./models/user.js');
var Client = require('./models/client.js');

// Running express
var app = express();

// Connecting to database
mongoose.createConnection('mongodb://localhost/fitnessSpotter');

// Defining login strategy to use
passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
function(req, email, password, done){
  process.nextTick(function(){
    //Checking database to see if email and password are correct
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

// Serializes user instance from a session store in order to support login sessions
passport.serializeUser(function(user, done) {
    done(null, user);
});

// Deserializes user so that every request will not contain the user credentials
passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Function makes sure user is authenticated
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    // If user is authenticated continue
    return next();
  // If user isn't authenticated redirect to homepage
  res.redirect('/');
}

// Redirects user to dashboard if they are authenticated
app.get('/admin/:gymName/dashboard', isLoggedIn, function(req, res) {
  res.render('./public/assets/views/dashboard.html', {
    user : req.user
  });
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Configuring Passport sessions
app.use(require('express-session')(
  {
    saveUninitialized: true,
    secret: '00308118',
    resave: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 1 Week
    store: new MongoStore({mongooseConnection: mongoose.createConnection('mongodb://localhost/fitnessSpotter_sessions')})
  }
));

// Initialize user and start sesison
app.use(passport.initialize());
app.use(passport.session());

// Use everything inside of public folder
app.use(express.static('public'));

// Use file that handles database calls and routes
app.use('/api', require('./api/routes.js'));

// After username and password are correct authenticate user
app.post('/api/login', passport.authenticate('login'), function(req, res) {
  res.json(req.session);
});

// URL Parameter to find unique client's data
app.get('/admin/:gymName/:clientId/profile', function(req, res) {
  console.log("URL PARAMETER:", req.params.clientId);
  Client.find({_id: req.params.clientId}, function(err, data) {
    console.log("FOUND DATA", data);
    res.send(data[0]);
  });
});

// On logout route, log user out and end session
app.get('/logout', function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

// Send index.html on any route
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Start server
var server = app.listen(process.env.PORT || 3000, function(){
  console.log('Server running on PORT: ', server.address().port);
});
