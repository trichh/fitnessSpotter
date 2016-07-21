// Requiring packages
var express = require('express');
var router = require('express').Router();
var bodyParser = require('body-parser');
var multiparty = require('multiparty');
var cloudinary = require('cloudinary');

// Requiring models
var User = require('../models/user.js');
var Client = require('../models/client.js');

// When post request is made to /api/register save new user to database
router.post('/register', function(req, res) {
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    var picturePath = files.picture[0].path;
    console.log("FILES:", picturePath);
    cloudinary.uploader.upload(picturePath, function(result) {
      // Storing the gym name all uppercase to use route params later to find trainer info for the client dashboard
      var trainer = new User({
      email: req.body.email,
      password: req.body.password,
      gymName: req.body.gymName.toUpperCase(),
      profilePicture: result.url,
      phoneNumber: req.body.phoneNumber,
      paymentPlan: req.body.paymentPlan,
      cardHolder: req.body.cardHolder,
      cardNumber: req.body.cardNumber,
      securityCode: req.body.securityCode,
      month: req.body.month,
      year: req.body.year,
      });
      trainer.save(function(err) {
        if(err) {
          throw err;
        } else {
          console.log("New trainer saved succesfully");
        }
      });
    });
  });
});

// When post request is made to /api/add-client save new client to database
router.post('/add-client', function(req, res) {
  // Storing the gym name how it is in the url to use route params later to find clients for the client dashboard
  var gymName = req.session.passport.user.gymName;
  gymName = gymName.replace(/\s+/g, '-').toLowerCase();
  var client = new Client({
    trainerId: req.session.passport.user._id,
    gymName: gymName,
    name: req.body.name,
    weight: req.body.weight,
    profilePicture: req.body.profilePicture,
    workoutPlan: req.body.workoutPlan,
    mealPlan: req.body.mealPlan,
    clientAssessment: req.body.clientAssessment
  });
  client.save(function(err) {
    if(err) {
      throw err;
    } else {
      console.log("New client saved succesfully");
    }
  });
});

// When post request is made to /api/updateUser update user info
router.post('/updateUser', function(req, res) {
  User.findOneAndUpdate({_id: req.session.passport.user._id}, {$set: {email: req.body.email, password: req.body.password, gymName: req.body.gymName, profilePicture: req.body.profilePicture, phoneNumber: req.body.phoneNumber, paymentPlan: req.body.paymentPlan, cardHolder: req.body.cardHolder, cardNumber: req.body.cardNumber, securityCode: req.body.securityCode, month: req.body.month, year: req.body.year}}, {new: true}, function(err, data) {
    if(err) {
      throw err;
    } else {
      console.log("UPDATED USER INFO");
    }
  })
});

// When post request is made to /api/updateClient update client info
router.post('/updateClient', function(req, res) {
  Client.findOneAndUpdate({_id: req.body._id}, {$set: {trainerId: req.session.passport.user._id, name: req.body.name, weight: req.body.weight, profilePicture: req.body.profilePicture, workoutPlan: req.body.workoutPlan, mealPlan: req.body.mealPlan, clientAssessment: req.body.clientAssessment}}, {new: true}, function(err, data) {
    if(err) {
      throw err;
    } else {
      console.log("UPDATED CLIENT INFO");
    }
  })
});

// When get request is made to /api/dashboard find all the logged in user's client data and then send the data and session data back
router.get('/dashboard', function(req, res) {
  Client.find({trainerId : req.session.passport.user._id}, function(err, data) {
    if(err) {
      throw err;
    } else {
      res.json({
        clientData: data,
        sessionData: req.session
      });
    }
  })
});

// When get request is made to /api/getGym send session data back
router.get('/getGym', function(req, res) {
  res.json({
    sessionData: req.session
  });
});

// When get request is made to /api/clientData find unique client's data and then send that data and session data back
router.get('/clientData', function(req, res) {
  Client.find({_id: req.query.clientId}, function(err, data) {
    if(err) {
      throw err;
    } else {
      res.json({
        clientData: data,
        sessionData: req.session
      });
    }
  });
});

// When get request is made to /api/editClient find clients data from database and send then send that data and the session data
router.get('/editClient', function(req, res) {
  Client.find({_id: req.query.clientId}, function(err, data) {
    if(err) {
      throw err;
    } else {
      res.json({
        sessionData: req.session,
        clientData: data
      });
    }
  })
});

// When get request is made to /api/deleteClient find the unique client and remove from database
router.get('/deleteClient', function(req, res) {
  Client.find({_id: req.query.clientId}).remove().exec();
});

// When get request is made to /api/deleteUser find the current user and remove from database
router.get('/deleteUser', function(req, res) {
  User.find({_id: req.session.passport.user._id}).remove().exec();
});

// When get request is made to /api/clientDashboard find all clients data from the unique gym and then send that data back
router.get('/clientDashboard', function(req, res) {
  Client.find({gymName: req.query.gymName}, function(err, data) {
    if(err) {
      throw err;
    } else {
      res.json({
        clientData: data
      });
    }
  });
});

// When get request is made to /api/trainerInfo find the trainer info for the unique gym and then send that data back
router.get('/trainerInfo', function(req, res) {
  // Removing '-' from url param and replacing it with a space then making it upper case to find trainer info
  var paramName = req.query.gymName;
  paramName = paramName.replace(/-/g, ' ').toUpperCase();
  User.find({gymName: paramName}, function(err, data) {
    if(err) {
      throw err;
    } else {
      res.json({
        trainerData: data
      });
    }
  });
});

// When get request is made to /api/clientProfile find unique clients data and then send that data back
router.get('/clientProfile', function(req, res) {
  Client.find({_id: req.query.clientId}, function(err, data) {
    if(err) {
      throw err;
    } else {
      res.json({
        clientData: data
      });
    }
  });
});

module.exports = router;
