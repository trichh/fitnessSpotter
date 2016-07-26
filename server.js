// Requiring packages
var express = require('express');
var passport = require('passport');
var mongoose = require('./db.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var LocalStrategy = require('passport-local').Strategy;
var MongoStore = require('connect-mongo')(session);
var multiparty = require('multiparty');
var cloudinary = require('cloudinary');

// Making Port variable to run heroku server on
var port = process.env.PORT || 3000;

// Requiring user and client models
var User = require('./models/user.js');
var Client = require('./models/client.js');

// Running express
var app = express();

// Connecting to mlab database
mongoose.createConnection(process.env.MONGODB_URI);

// Defining login strategy to use with passport
passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
  process.nextTick(function(){
    //Checking database to see if email and password are correct
    User.findOne({'email': email, 'password': password}, function(err, data) {
      if(data) {
        return done(null, data);
      }
      if(err) {
        return err;
      } else {
      return false;
      }
    });
  });
}));

// Serializes user instance from a session store in order to support login sessions
passport.serializeUser(function(user, done) {
    done(null, user);
});

// Deserializes user so that every request will not contain the user credentials
passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Function that makes sure user is logged in and authenticated
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    // If the user is authenticated from logging in continue
    return next();
  } else {
    // If the user isn't authenticated and tries to hit specified route redirect them back to homepage
    res.redirect('/');
  }
}

// Making sure user is logged in and authenticated before user can access any admin pages
app.get('/admin/:gymName/*', isLoggedIn, function(req, res) {
  res.render('./public/assets/views/dashboard.html', {
    user : req.user
  });
});

// Parses cookie headers
app.use(cookieParser());

// Parses incoming requests under the req.body property
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Configuring Passport sessions
app.use(session(
  {
    saveUninitialized: true,
    secret: '00308118',
    resave: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 1 }, // Expires in 1 Day
    store: new MongoStore({mongooseConnection: mongoose.createConnection(process.env.MONGODB_URI)}) // Storing session data
  }
));

// Initialize user and start sesison
app.use(passport.initialize());
app.use(passport.session());

// Use everything inside of public folder
app.use(express.static('public'));

// Use file that handles backend requests and database calls
app.use('/api', require('./api/routes.js'));

// After user submits login form and the username and password are correct authenticate them
app.post('/api/login', passport.authenticate('login'), function(req, res) {
  res.json(req.session);
});

// Uploads image for the user to cloudinary and stores image url in database
app.post('/uploadUserImage', function(req, res) {
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    var picturePath = files.picture[0].path;
    console.log("FILES:", picturePath);
    cloudinary.uploader.upload(picturePath, function(result) {
      User.findOneAndUpdate({}, {$set: {profilePicture: result.url}}, {new: true}, function(err, data) {
        if(err) {
          throw err;
        } else {
          console.log("UPLOADED IMAGE TO DATABASE SUCCESFULLY");
        }
      })
      res.redirect("/");
    });
  });
});

// Uploads image for the client to cloudinary and stores image url in database
app.post('/uploadClientImage', function(req, res) {
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    var picturePath = files.picture[0].path;
    console.log("FILES:", picturePath);
    cloudinary.uploader.upload(picturePath, function(result) {
      Client.findOneAndUpdate({}, {$set: {profilePicture: result.url}}, {new: true}, function(err, data) {
        if(err) {
          throw err;
        } else {
          console.log("UPLOADED IMAGE TO DATABASE SUCCESFULLY");
        }
      })
      var gymName = req.session.passport.user.gymName;
      gymName = gymName.replace(/\s+/g, '-').toLowerCase();
      res.redirect("/admin" + gymName + "/dashboard");
    });
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
var server = app.listen(port, function(){
  console.log('Server running on PORT: ', server.address().port);
});
