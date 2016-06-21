angular.module('fitnessSpotter').controller('DashboardCtrl', function($scope, $location, $http) {
  $http.get('/api/dashboard')
  .then(function(data) {
    console.log("DATA MOTHA FUCKA:", data.data);
    $scope.gymName = data.data.gymName;
  })
  .catch(function(err) {
    console.log(err);
  })
});
