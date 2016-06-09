var fitnessSpotter = angular.module('fitnessSpotter', ['ngRoute', 'ngAnimate', 'cloudinary', 'ngFileUpload'])

angular.module('fitnessSpotter').config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
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
    .when('/dashboard/:gym-name/admin', {
      templateUrl: 'views/dashboard.html',
      controller: 'LoginCtrl'
    })
    .otherwise('/');
}]).run(["$rootScope", "$http", function($rootScope, $http){
  $rootScope.logout = function(){
    $http.post('/logout');
  };
}]);

/*
// you route to get there
    var username = _.fixthisshit($scope.authData.username)
    $location.path('/dashboard/'+ username +'/admin')

// once you're in that controller
    bring in $routeParams (with $scope)
    :username = $routeParams.username

*/

angular.module('fitnessSpotter').controller('DashboardCtrl', ["$scope", "$location", "$http", function($scope, $location, $http) {
  $http.get('/api/dashboard')
  .then(function(data) {
    console.log("DATA:", data);
  })
  .catch(function(err) {
    console.log(err);
  })
}]);

angular.module('fitnessSpotter').controller('LoginCtrl', ["$rootScope", "$scope", "$location", "$http", function($rootScope, $scope, $location, $http) {
  $scope.login = function() {
    var email = $scope.email;
    var password = $scope.password;

    $http.post('/api/login', {
      email: email,
      password: password
    })
    .success(function(data) {
      $location.path('/dashboard');
      console.log('Authentication successful!');
    })
    .error(function() {
      console.log('Authentication unsuccessful!');
      $location.path('/');
    })
  }
}]);

angular.module('fitnessSpotter').controller('RegisterCtrl', ['$scope', '$location', '$http', 'Upload', 'cloudinary', function($scope, $location, $http, $upload, cloudinary) {
  $scope.uploadImage = function(files){
    $scope.files = files;
    if (!$scope.files) return;
    angular.forEach(files, function(file){
      if (file && !file.$error) {
        file.upload = $upload.upload({
          url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
          data: {
            upload_preset: cloudinary.config().upload_preset,
            tags: 'myphotoalbum',
            file: file
          }
        }).success(function (data, status, headers, config) {
          file.result = data;
          var imageUrl = data.url;
          $scope.photo = imageUrl;
        }).error(function (data, status, headers, config) {
          // Sends error if any
          file.result = data;
        });
      }
    });
  }

  $scope.register = function() {
    var email = $scope.email;
    var password = $scope.password;
    var name = $scope.name;
    var profilePic = $scope.photo;
    var number = $scope.number;
    var basic = $scope.basic;
    var plus = $scope.plus;
    var premium = $scope.premium;
    var cardName = $scope.cardName;
    var cardNumber = $scope.cardNumber;
    var securityCode = $scope.securityCode;
    var month = $scope.month;
    var year = $scope.year;

    if(typeof basic !== undefined && plus === undefined && premium === undefined) {
      var plan = basic;
    } else if(typeof plus !== undefined && basic === undefined && premium === undefined) {
      var plan = plus;
    } else if(typeof premium !== undefined && basic === undefined && plus === undefined) {
      var plan = premium;
    }

    $http.post('/api/register', {
      email: email,
      password: password,
      gymName: name,
      profilePicture: profilePic,
      phoneNumber: number,
      paymentPlan: plan,
      cardHolder: cardName,
      cardNumber: cardNumber,
      securityCode: securityCode,
      month: month,
      year: year
    })
    .then(function(data) {
      console.log('COMING BACK: ', data);
    })

    $scope.email = '';
    $scope.password = '';
    $scope.name = '';
    $scope.number = '';
    $scope.basic = '';
    $scope.plus = '';
    $scope.premium = '';
    $scope.cardName = '';
    $scope.cardNumber = '';
    $scope.securityCode = '';
    $scope.month = '';
    $scope.year = '';
  }
}]);
