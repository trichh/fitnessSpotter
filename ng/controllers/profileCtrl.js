angular.module('fitnessSpotter').controller('ProfileCtrl', function($scope, $location, $http) {
  // Forcing page to reload to hack bug lol
  window.location.reload(true);
  // $http.get('/admin/:gymName/:clientId/profile')
  // .then(function(data) {
  //   // Data coming back
  //   console.log("FINALLY GOT DATA", data);
  // })
  // .catch(function(err) {
  //   // If any errors console log error
  //   console.log(err);
  // });

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
