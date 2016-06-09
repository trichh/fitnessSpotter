angular.module('fitnessSpotter').controller('DashboardCtrl', function($scope, $location, $http) {
  $http.get('/dashboard')
  .then(function(data) {
    console.log("DATA:", data);
  })
  .catch(function(err) {
    console.log(err);
  })
});
