angular.module('fitnessSpotter').controller('ClientProfileCtrl', function($scope, $location, $http, $routeParams) {
  // Get request to /api/clientProfile
  $http.get('/api/clientProfile', {
    params: {gymName: $routeParams.gymName, clientId: $routeParams.clientId}
  })
  .then(function(data) {
    console.log("DATA SENT:", data.data.clientData);
    $scope.dashboardRoute = $routeParams.gymName;
    $scope.clients = data.data.clientData;
  })
  .catch(function(err) {
    console.log(err);
  });
});
