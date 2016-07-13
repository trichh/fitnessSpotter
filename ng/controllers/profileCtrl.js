angular.module('fitnessSpotter').controller('ProfileCtrl', function($scope, $location, $http, $routeParams) {
  // Get request to /api/clientData
  $http.get('/api/clientData', {
    params: {gymName: $routeParams.gymName, clientId: $routeParams.clientId}
  })
  .then(function(data) {
    console.log("DATA SENT:", data.data.clientData);
    $scope.clients = data.data.clientData;
  })
  .catch(function(err) {
    console.log(err);
  });

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
  });

  $scope.delete = function() {
    $http.get('/api/deleteClient', {
      params: {gymName: $routeParams.gymName, clientId: $routeParams.clientId}
    })
    .then(function(data) {
      console.log("CLIENT DELETED", data);
    })
    .catch(function(err) {
      console.log(err);
    })
  }
});
