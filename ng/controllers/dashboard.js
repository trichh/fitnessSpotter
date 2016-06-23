angular.module('fitnessSpotter').controller('DashboardCtrl', function($scope, $location, $http) {
  // Get request to /api/dashboard
  $http.get('/api/dashboard')
  .then(function(data) {
    // Data coming back
    console.log("DATA MOTHA FUCKA:", data.data.passport.user);
    // Making scope variable to use users gym name in dashboard view
    $scope.gymName = data.data.passport.user.gymName;
    // Making scope variable to use users profile picture in dashboard view
    $scope.profilePicture = data.data.passport.user.profilePicture;
  })
  .catch(function(err) {
    // If any errors console log error
    console.log(err);
  })
});
