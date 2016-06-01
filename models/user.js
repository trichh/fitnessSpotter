var mongoose = require('../db.js');

var Schema = mongoose.Schema;
var userSchema = new Schema({
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
