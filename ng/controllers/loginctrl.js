angular.module('fitnessSpotter').controller('LoginCtrl', function($scope, $location, $http) {
  $scope.login = function() {
    var email = $scope.email;
    var password = $scope.password;

    $http.post('/api/login', {
      email: email,
      password: password
    })
    .success(function(user) {
      console.log('Authentication successful!');
      $location.path('/dashboard');
    })
    .error(function() {
      console.log('Authentication unsuccessful!');
      $location.path('/');
    })
  }
});
