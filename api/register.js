// Requiring packages
var router = require('express').Router();
var bodyParser = require('body-parser');

// Requiring models
var User = require('../models/user.js');
var Client = require('../models/client.js');

// When post request is made to /api/register save new user to database
router.post('/register', function(req, res) {
  var trainer = new User({
    email: req.body.email,
    password: req.body.password,
    gymName: req.body.gymName,
    profilePicture: req.body.profilePicture,
    phoneNumber: req.body.phoneNumber,
    paymentPlan: req.body.paymentPlan,
    cardHolder: req.body.cardHolder,
    cardNumber: req.body.cardNumber,
    securityCode: req.body.securityCode,
    month: req.body.month,
    year: req.body.year,
  });
  trainer.save(function(err) {
    if(err) throw err;
    console.log("New trainer saved succesfully");
  });
});

// When post request is made to /api/add-client save new client to database
router.post('/add-client', function(req, res) {
  console.log('Users Id', req.session.passport.user)
  var client = new Client({
    trainerId: req.session.passport.user._id,
    name: req.body.fullname,
    weight: req.body.weight,
    profilePicture: req.body.profilePic,
    workoutPlan: req.body.workoutPlan,
    mealPlan: req.body.mealPlan,
    clientAssessment: req.body.clientAssessment,
    dateCreated: Date.now
  });
  client.save(function(err) {
    if(err) throw err;
    console.log("New client saved succesfully");
  });
});

// When get request is made to /api/dashboard find users data from database
router.get('/dashboard', function(req, res) {
  res.json(req.session);
});

module.exports = router;
