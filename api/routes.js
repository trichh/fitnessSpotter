// Requiring packages
var express = require('express');
var app = express();
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
  var client = new Client({
    trainerId: req.session.passport.user._id,
    name: req.body.name,
    weight: req.body.weight,
    profilePicture: req.body.profilePicture,
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

// When post request is made to /api/register save new user to database
router.post('/updateUser', function(req, res) {
  User.findOneAndUpdate({_id: req.session.passport.user._id}, {$set: {email: req.body.email, password: req.body.password, gymName: req.body.gymName, profilePicture: req.body.profilePicture, phoneNumber: req.body.phoneNumber, paymentPlan: req.body.paymentPlan, cardHolder: req.body.cardHolder, cardNumber: req.body.cardNumber, securityCode: req.body.securityCode, month: req.body.month, year: req.body.year}}, {new: true}, function(err, data) {
    if(err) {
      console.log("ERROR:", err);
    }
    console.log("UPDATED DATA", data);
  })
});

// When get request is made to /api/dashboard find clients data from database and send then send that data and the session data
router.get('/dashboard', function(req, res) {
  Client.find({trainerId : req.session.passport.user._id}, function(err, data) {
    res.json({
      clientData: data,
      sessionData: req.session
    });
  })
});

// When get request is made to /api/add-client find clients data from database and send then send that data and the session data
router.get('/add-client', function(req, res) {
  Client.find({trainerId : req.session.passport.user._id}, function(err, data) {
    res.json({
      sessionData: req.session
    });
  })
});

// When get request is made to /api/editUser find clients data from database and send then send that data and the session data
router.get('/editUser', function(req, res) {
  Client.find({trainerId : req.session.passport.user._id}, function(err, data) {
    res.json({
      sessionData: req.session
    });
  })
});

// When get request is made to /api/profile find clients data from database and send then send that data and the session data
router.get('/profile', function(req, res) {
  Client.find({trainerId : req.session.passport.user._id}, function(err, data) {
    res.json({
      sessionData: req.session
    });
  })
});

// When get request is made to /api/editClient find clients data from database and send then send that data and the session data
router.get('/editClient', function(req, res) {
  Client.find({trainerId : req.session.passport.user._id}, function(err, data) {
    res.json({
      sessionData: req.session
    });
  })
});

module.exports = router;
