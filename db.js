// Requiring packages
var mongoose = require('mongoose');

// Making database connection
mongoose.connect('mongodb://localhost/fitnessSpotter');

module.exports = mongoose;
