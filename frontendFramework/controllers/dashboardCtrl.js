angular.module('fitnessSpotter').controller('DashboardCtrl', function($rootScope, $scope, $http) {
  // Specifying what header to display
  $rootScope.homeHeader = false;

  // Get request to /api/dashboard to get list of clients for specific gym or trainer and also session data
  $http.get('/api/dashboard')
  .then(function(data) {
    // Making scope variable to use users gym name in dashboard view
    $scope.gymName = data.data.sessionData.passport.user.gymName;
    // Making scope variable to use users profile picture in dashboard view
    $scope.profilePicture = data.data.sessionData.passport.user.profilePicture;
    // Making scope variable to clientData array to use ng-repeat to loop through it
    $scope.clients = data.data.clientData;
    // Making scope variable to users gymName to set up link
    var gymName = data.data.sessionData.passport.user.gymName;
    gymName = gymName.replace(/\s+/g, '-').toLowerCase();
    $rootScope.dashboardRoute = gymName;
  })
  .catch(function(err) {
    // console.log(err);
  });
});
