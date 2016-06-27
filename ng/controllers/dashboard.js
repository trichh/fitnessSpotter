angular.module('fitnessSpotter').controller('DashboardCtrl', function($scope, $location, $http) {
  // Get request to /api/dashboard
  $http.get('/api/dashboard')
  .then(function(data) {
    // Data coming back
    console.log("SESSION DATA:", data.data.sessionData.passport.user);
    console.log("CLIENT DATA:", data.data.clientData);
    // Making scope variable to use users gym name in dashboard view
    $scope.gymName = data.data.sessionData.passport.user.gymName;
    // Making scope variable to use users profile picture in dashboard view
    $scope.profilePicture = data.data.sessionData.passport.user.profilePicture;

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
