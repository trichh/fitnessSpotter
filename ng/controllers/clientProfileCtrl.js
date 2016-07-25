angular.module('fitnessSpotter').controller('ClientProfileCtrl', function($rootScope, $scope, $http, $routeParams) {
  // Specifying what header to display
  $rootScope.homeHeader = true;
  $rootScope.hide = true;
  $rootScope.clientHeader = true;

  // Get request to /api/clientProfile to get unique client's data
  $http.get('/api/clientProfile', {
    params: {gymName: $routeParams.gymName, clientId: $routeParams.clientId}
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
});
