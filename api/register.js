var router = require('express').Router();
var bodyParser = require('body-parser');
var User = require('../models/user.js');

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
    dateCreated: Date.now
  });
  trainer.save(function(err) {
    if(err) throw err;
    console.log("New trainer saved succesfully");
  });
});

module.exports = router;
