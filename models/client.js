// Requiring packages
var mongoose = require('../db.js');
var shortid = require('shortid');

// Creating new schema
var Schema = mongoose.Schema;

// Configuring client collection
var clientSchema = new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  trainerId: String,
  gymName: String,
  name: String,
  weight: String,
  profilePicture: String,
  workoutPlan: String,
  mealPlan: String,
  clientAssessment: String
});

// Making client collection accessible to other files
var Client = mongoose.model("Client", clientSchema);

module.exports = Client;
