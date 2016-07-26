angular.module('fitnessSpotter').controller('ProfileCtrl', function($rootScope, $scope, $http, $routeParams) {
  // Specifying what header to display
  $rootScope.homeHeader = false;

  // Get request to /api/clientData to get unique client's data and session data
  $http.get('/api/clientData', {
    params: {gymName: $routeParams.gymName, clientId: $routeParams.clientId}
  })
  .then(function(data) {
    // Making scope variable to users gymName to set up link
    var gymName = data.data.sessionData.passport.user.gymName;
    gymName = gymName.replace(/\s+/g, '-').toLowerCase();
    $rootScope.dashboardRoute = gymName;
    // Making scope variable to an array of the clients data to loop through in views
    $scope.clients = data.data.clientData;
  })
  .catch(function(err) {
    // console.log(err);
  });

  // Function runs when delete button is clicked
  $scope.delete = function() {
    // Get request to /api/deleteClient to remove client from database
    $http.get('/api/deleteClient', {
      params: {gymName: $routeParams.gymName, clientId: $routeParams.clientId}
    })
    .then(function(data) {
      // console.log("CLIENT DELETED", data);
    })
    .catch(function(err) {
      // console.log(err);
    });
  }
});
