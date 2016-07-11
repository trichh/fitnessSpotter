angular.module('fitnessSpotter').controller('ProfileCtrl', function($scope, $location, $http) {
  // Get request to /api/profile
  $http.get('/api/profile')
  .then(function(data) {
    // Data coming back
    // Making scope variable to users gymName to set up link
    var gymName = data.data.sessionData.passport.user.gymName;
    gymName = gymName.replace(/\s+/g, '-').toLowerCase();
    $scope.dashboardRoute = gymName;
  })
  .catch(function(err) {
    // If any errors console log error
    console.log(err);
  })
});
