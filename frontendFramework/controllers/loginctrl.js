angular.module('fitnessSpotter').controller('LoginCtrl', function($scope, $location, $http) {
  // Function runs when users submit login form
  $scope.login = function() {
    // Grabbing users email and password from the email and password input fields
    var email = $scope.email;
    var password = $scope.password;
    // Making post request to /api/login
    $http.post('/api/login', {
      // Sends data to backend
      email: email,
      password: password
    })
    .success(function(data) {
      // Making gymName cleaner for URL
      var gymName = data.passport.user.gymName;
      gymName = gymName.replace(/\s+/g, '-').toLowerCase();
      // If successful redirect to users dashboard
      $location.path('/admin/' + gymName + '/dashboard');
      console.log('Authentication successful!');
    })
    .error(function(err) {
      // If any errors redirect back to homepage
      console.log('Authentication unsuccessful!', err);
      $location.path('/');
    })
  }
});