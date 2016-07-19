angular.module('fitnessSpotter').controller('DashboardCtrl', function($scope, $http) {
  // Get request to /api/dashboard to get list of clients for specific gym or trainer and also session data
  $http.get('/api/dashboard')
  .then(function(data) {
    console.log("SESSION DATA:", data.data.sessionData.passport.user);
    console.log("CLIENTS DATA:", data.data.clientData);
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
