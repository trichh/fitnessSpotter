var mongoose = require('../db.js');
var shortid = require('shortid');

var Schema = mongoose.Schema;

var clientSchema = new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  trainerId: String,
  name: String,
  weight: String,
  profilePicture: String,
  workoutPlan: String,
  mealPlan: String,
  clientAssessment: String
});

var Client = mongoose.model("Client", clientSchema);

module.exports = Client;
