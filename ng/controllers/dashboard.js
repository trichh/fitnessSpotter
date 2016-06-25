angular.module('fitnessSpotter').controller('DashboardCtrl', function($scope, $location, $http) {
  // Get request to /api/dashboard
  $http.get('/api/dashboard')
  .then(function(data) {
    // Data coming back
    console.log("SESSION DATA MOTHA FUCKA:", data.data.sessionData.passport.user);
    console.log("CLIENT DATA MOTHA FUCKA:", data.data.clientData);
    // Making scope variable to use users gym name in dashboard view
    $scope.gymName = data.data.sessionData.passport.user.gymName;
    // Making scope variable to use users profile picture in dashboard view
    $scope.profilePicture = data.data.sessionData.passport.user.profilePicture;

    $scope.clients = data.data.clientData;
  })
  .catch(function(err) {
    // If any errors console log error
    console.log(err);
  })
});
