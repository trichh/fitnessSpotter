angular.module('fitnessSpotter').controller('HomeCtrl', function($rootScope) {
  $rootScope.homeHeader = true;
  document.getElementById('homeHeader').style.display = "none";
  $rootScope.clientHeader = false;
});
