angular.module('fitnessSpotter').controller('ProfileCtrl', function($scope, $http, $routeParams) {
  // Get request to /api/clientData to get unique client's data and session data
  $http.get('/api/clientData', {
    params: {gymName: $routeParams.gymName, clientId: $routeParams.clientId}
  })
  .then(function(data) {
    console.log("DATA SENT:", data.data.clientData);
    // Making scope variable to users gymName to set up link
    var gymName = data.data.sessionData.passport.user.gymName;
    gymName = gymName.replace(/\s+/g, '-').toLowerCase();
    $scope.dashboardRoute = gymName;
    // Making scope variable to an array of the clients data to loop through in views
    $scope.clients = data.data.clientData;
  })
  .catch(function(err) {
    console.log(err);
  });

  // Function runs when delete button is clicked
  $scope.delete = function() {
    // Get request to /api/deleteClient to remove client from database
    $http.get('/api/deleteClient', {
      params: {gymName: $routeParams.gymName, clientId: $routeParams.clientId}
    })
    .then(function(data) {
      console.log("CLIENT DELETED", data);
    })
    .catch(function(err) {
      console.log(err);
    });
  }
});
