var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

mongoose.connect('mongodb://localhost/fitnessSpotter');

var User = require('./public/models/user.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/register", function(req, res) {
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
    year: req.body.year
  });
  trainer.save(function(err) {
    if(err) throw err;
    console.log("New trainer saved succesfully");
  });
});

app.get('*', function(req, res, next) {
  if(path.extname(req.path).length > 0) {
    next()
  }
  else {
    req.url = '/index.html'
    next()
  }
});

app.use(express.static('public'));

var server = app.listen(process.env.PORT || 3000, function(){
  console.log('Server running on PORT: ', server.address().port);
});
