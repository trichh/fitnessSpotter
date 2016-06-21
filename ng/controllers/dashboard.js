angular.module('fitnessSpotter').controller('DashboardCtrl', function($scope, $location, $http) {
  // Get request to /api/dashboard
  $http.get('/api/dashboard')
  .then(function(data) {
    // Data coming back
    console.log("DATA MOTHA FUCKA:", data.data);
    // Making scope variable to use users gym name in dashboard view
    $scope.gymName = data.data.gymName;
    // Making scope variable to use users profile picture in dashboard view
    $scope.profilePicture = data.data.profilePicture;
  })
  .catch(function(err) {
    // If any errors console log error
    console.log(err);
  })
});
