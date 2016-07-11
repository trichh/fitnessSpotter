angular.module('fitnessSpotter').controller('EditUserCtrl', function($scope, $location, $http) {
  // Get request to /api/editUser
  $http.get('/api/editUser')
  .then(function(data) {
    // Making scope variable to users gymName to set up link
    var gymName = data.data.sessionData.passport.user.gymName;
    gymName = gymName.replace(/\s+/g, '-').toLowerCase();
    $scope.dashboardRoute = gymName;
  })
  .catch(function(err) {
    // If any errors console log error
    console.log(err);
  });
});
