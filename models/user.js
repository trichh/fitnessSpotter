var mongoose = require('../db.js');
var shortid = require('shortid');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  email: String,
  password: String,
  gymName: String,
  profilePicture: String,
  phoneNumber: String,
  paymentPlan: String,
  cardHolder: String,
  cardNumber: String,
  securityCode: String,
  month: String,
  year: String
});

var User = mongoose.model("User", userSchema);

module.exports = User;
