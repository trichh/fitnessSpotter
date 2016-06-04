module.exports = function(app, passport) {
  // have to be logged in to go to dashboard route
  app.get('/dashboard', isLoggedIn, function(req, res) {
    res.render('./public/assets/views/dashboard.html', {
      user : req.user // get the user out of session and pass to template
    });
  });
};

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session log them in
  if (req.isAuthenticated())
    return next();

  // if they aren't authenticated redirect them to the home route
  res.redirect('/');
}
