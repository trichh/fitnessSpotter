angular.module('fitnessSpotter').controller('HomeCtrl', function($rootScope) {
  // Specifying what header to display
  $rootScope.homeHeader = true;
  document.getElementById('homeHeader').style.display = "none";
  $rootScope.clientHeader = false;
});
