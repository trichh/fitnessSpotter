angular.module('fitnessSpotter').config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
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
}).run(function($rootScope, $http){
  $rootScope.logout = function(){
    $http.post('/logout');
  };
});

/*
// you route to get there
    var username = _.fixthisshit($scope.authData.username)
    $location.path('/dashboard/'+ username +'/admin')

// once you're in that controller
    bring in $routeParams (with $scope)
    :username = $routeParams.username

*/
