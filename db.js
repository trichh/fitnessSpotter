// Requiring packages
var mongoose = require('mongoose');

// Making database connection
mongoose.connect(process.env.MONGODB_URI);

module.exports = mongoose;
