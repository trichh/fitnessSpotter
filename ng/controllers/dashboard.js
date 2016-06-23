angular.module('fitnessSpotter').controller('DashboardCtrl', function($scope, $location, $http) {
  // Get request to /api/dashboard
  $http.get('/api/dashboard')
  .then(function(data) {
    // Data coming back
    console.log("SESSION DATA MOTHA FUCKA:", data.data.sessions.passport.user);
    console.log("CLIENT DATA MOTHA FUCKA:", data.data.data);
    // Making scope variable to use users gym name in dashboard view
    $scope.gymName = data.data.sessions.passport.user.gymName;
    // Making scope variable to use users profile picture in dashboard view
    $scope.profilePicture = data.data.sessions.passport.user.profilePicture;

    $scope.client1Name = data.data.data[0].name;
    $scope.client1Picture = data.data.data[0].profilePicture;

    $scope.client2Name = data.data.data[1].name;
    $scope.client2Picture = data.data.data[1].profilePicture;
  })
  .catch(function(err) {
    // If any errors console log error
    console.log(err);
  })
});
