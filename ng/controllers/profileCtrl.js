angular.module('fitnessSpotter').controller('ProfileCtrl', function($scope, $location, $http) {
  // Get request to /api/profile
  $http.get('/api/profile')
  .then(function(data) {
    // Data coming back
    console.log("CLIENT DATA:", data.data.clientData);

    // Making scope variable to clientData array to use ng-repeat to loop through it
    $scope.clients = data.data.clientData;

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
