angular.module('fitnessSpotter').controller('ClientDashboardCtrl', function($rootScope, $scope, $http, $routeParams) {
  // Specifying what header to display
  $rootScope.homeHeader = true;
  $rootScope.hide = true;
  $rootScope.clientHeader = true;

  // Get request to /api/clientDashboard to get list of clients for specific gym or trainer
  $http.get('/api/clientDashboard', {
    params: {gymName: $routeParams.gymName}
  })
  .then(function(data) {
    // Making scope variable to users gymName to set up link
    $rootScope.dashboardRoute = $routeParams.gymName;
    // Making scope variable to an array of the clients data to loop through in views
    $scope.clients = data.data.clientData;
  })
  .catch(function(err) {
    // console.log(err);
  });

  // Get request to /api/trainerInfo to get trainer info for gym name and logo
  $http.get('/api/trainerInfo', {
    params: {gymName: $routeParams.gymName}
  })
  .then(function(data) {
    // Making scope variable to the gyms name
    $scope.gymName = data.data.trainerData[0].gymName;
    // Making scope variable to the gyms profile picture
    $scope.profilePicture = data.data.trainerData[0].profilePicture;
  })
  .catch(function(err) {
    // console.log(err);
  });
});
