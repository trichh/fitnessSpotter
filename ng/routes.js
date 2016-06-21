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
    .when('/dashboard', {
      templateUrl: 'views/dashboard.html',
      controller: 'DashboardCtrl'
    })
    .when('/add-client', {
      templateUrl: 'views/addClient.html',
      controller: 'NewClientCtrl'
    })
    // .when('/dashboard/:gym-name/admin', {
    //   templateUrl: 'views/dashboard.html',
    //   controller: 'LoginCtrl'
    // })
    .otherwise('/');
})
// Allows logout function to run
.run(function($rootScope, $http){
  $rootScope.logout = function(){
    $http.post('/logout');
  };
});
