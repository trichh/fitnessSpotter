angular.module('fitnessSpotter').controller('LoginCtrl', function($scope, $rootScope, $location, $http) {
  // Specifying what header to display
  $rootScope.homeHeader = true;
  document.getElementById('homeHeader').style.display = "block";
  $rootScope.clientHeader = false;

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
    })
    .error(function(err) {
      // If any errors redirect back to homepage
      $location.path('/');
    })
  }
});
