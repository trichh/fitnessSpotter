angular.module('fitnessSpotter').controller('LoginCtrl', function($rootScope, $scope, $location, $http) {
  $scope.login = function() {
    var email = $scope.email;
    var password = $scope.password;

    $http.post('/api/login', {
      email: email,
      password: password
    })
    .success(function(data) {
      $location.path('/dashboard');
      console.log('Authentication successful!');
    })
    .error(function() {
      console.log('Authentication unsuccessful!');
      $location.path('/');
    })
  }
});
