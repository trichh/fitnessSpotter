var express = require('express');
var path = require('path');

var app = express();

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
