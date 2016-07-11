angular.module('fitnessSpotter').controller('ProfileCtrl', function($scope, $location, $http) {
  // Get request to /api/profile
  $http.get('/api/profile')
  .then(function(data) {
    // Data coming back
  })
  .catch(function(err) {
    // If any errors console log error
    console.log(err);
  })
});
