angular.module('fitnessSpotter').config(function($routeProvider, $locationProvider) {
  // Takes '#' out of url
  $locationProvider.html5Mode(true);

  // Specifying what controllers and views to use on what route
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html'
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .when('/add-client', {
      templateUrl: 'views/addClient.html',
      controller: 'NewClientCtrl'
    })
    .when('/admin/:gymName/dashboard', {
      templateUrl: 'views/dashboard.html',
      controller: 'DashboardCtrl'
    })
    .when('/admin/:gymName/:clientId/profile', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl'
    })
    .otherwise('/')
})
// Allows logout function to run
.run(function($rootScope, $http){
  $rootScope.logout = function(){
    $http.post('/logout');
  };
});
