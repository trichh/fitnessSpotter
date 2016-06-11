var mongoose = require('../db.js');

var Schema = mongoose.Schema;

var clientSchema = new Schema({
  name: String,
  weight: String,
  profilePicture: String,
  workoutPlan: String,
  mealPlan: String,
  clientAssessment: String
});

var Client = mongoose.model("Client", clientSchema);

module.exports = Client;
