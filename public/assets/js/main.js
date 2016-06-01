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
    .otherwise('/');
}])

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

    $http.post("/api/register", { email: email, password: password, gymName: name, profilePicture: profilePic, phoneNumber: number, paymentPlan: plan, cardHolder: cardName, cardNumber: cardNumber, securityCode: securityCode, month: month, year: year})
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
