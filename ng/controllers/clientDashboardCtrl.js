angular.module('fitnessSpotter').controller('ClientDashboardCtrl', function($scope, $location, $http, $routeParams) {
  // Get request to /api/clientDashboard
  $http.get('/api/clientDashboard', {
    params: {gymName: $routeParams.gymName}
  })
  .then(function(data) {
    console.log("DATA SENT:", data.data.clientData);
    $scope.dashboardRoute = $routeParams.gymName;
    $scope.clients = data.data.clientData;
  })
  .catch(function(err) {
    console.log(err);
  });

  // Get request to /api/trainerInfo
  $http.get('/api/trainerInfo', {
    params: {gymName: $routeParams.gymName}
  })
  .then(function(data) {
    console.log("DATA SENT:", data.data.trainerData);
    $scope.gymName = data.data.trainerData[0].gymName;
    $scope.profilePicture = data.data.trainerData[0].profilePicture;
  })
  .catch(function(err) {
    console.log(err);
  });
});
