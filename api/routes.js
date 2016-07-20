// Requiring packages
var express = require('express');
var app = express();
var router = require('express').Router();
var bodyParser = require('body-parser');
var cloudinary = require('cloudinary');

// Requiring models
var User = require('../models/user.js');
var Client = require('../models/client.js');

// When post request is made to /api/register save new user to database
router.post('/register', function(req, res) {
  cloudinary.uploader.upload(req.files.picture.path, function(result) {
    console.log(result.url);
    var imageUrl = result.url;
    var trainer = new User({
      email: req.body.email,
      password: req.body.password,
      gymName: req.body.gymName,
      profilePicture: imageUrl,
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
    clientAssessment: req.body.clientAssessment
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

router.post('/updateClient', function(req, res) {
  Client.findOneAndUpdate({_id: req.body._id}, {$set: {trainerId: req.session.passport.user._id, name: req.body.name, weight: req.body.weight, profilePicture: req.body.profilePicture, workoutPlan: req.body.workoutPlan, mealPlan: req.body.mealPlan, clientAssessment: req.body.clientAssessment}}, {new: true}, function(err, data) {
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

// URL Parameter to find unique client's data
router.get('/clientData', function(req, res) {
  Client.find({_id: req.query.clientId}, function(err, data) {
    console.log("FOUND DATA", data);
    res.json({
      clientData: data
    })
  });
});

// When get request is made to /api/editClient find clients data from database and send then send that data and the session data
router.get('/editClient', function(req, res) {
  Client.find({_id: req.query.clientId}, function(err, data) {
    res.json({
      sessionData: req.session,
      clientData: data
    });
  })
});

// When get request is made to /api/deleteClient find clients data from database and send then send that data and the session data
router.get('/deleteClient', function(req, res) {
  Client.find({_id: req.query.clientId}).remove().exec();
});

// When get request is made to /api/deleteUser find clients data from database and send then send that data and the session data
router.get('/deleteUser', function(req, res) {
  User.find({_id: req.session.passport.user._id}).remove().exec();
});

module.exports = router;
