var fitnessSpotter = angular.module('fitnessSpotter', ['ngRoute', 'ngAnimate', 'cloudinary', 'ngFileUpload'])

angular.module('fitnessSpotter').config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
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
    .otherwise('/')
}])
// Allows logout function to run
.run(["$rootScope", "$http", function($rootScope, $http){
  $rootScope.logout = function(){
    $http.post('/logout');
  };
}]);

angular.module('fitnessSpotter').controller('DashboardCtrl', ["$scope", "$location", "$http", function($scope, $location, $http) {
  // Get request to /api/dashboard
  $http.get('/api/dashboard')
  .then(function(data) {
    // Data coming back
    console.log("SESSION DATA MOTHA FUCKA:", data.data.sessionData.passport.user);
    console.log("CLIENT DATA MOTHA FUCKA:", data.data.clientData);
    // Making scope variable to use users gym name in dashboard view
    $scope.gymName = data.data.sessionData.passport.user.gymName;
    // Making scope variable to use users profile picture in dashboard view
    $scope.profilePicture = data.data.sessionData.passport.user.profilePicture;

    $scope.clients = data.data.clientData;
  })
  .catch(function(err) {
    // If any errors console log error
    console.log(err);
  })
}]);

angular.module('fitnessSpotter').controller('LoginCtrl', ["$rootScope", "$scope", "$location", "$http", function($rootScope, $scope, $location, $http) {
  // Function runs when users submit login form
  $scope.login = function() {
    // Grabbing users email and password from the email and password input fields
    var email = $scope.email;
    var password = $scope.password;

    // Making post request to /api/login
    $http.post('/api/login', {
      // Sends data to backend
      email: email,
      password: password
    })
    .success(function(data) {
      // If successful redirect to dashboard
      var gymName = data.passport.user.gymName;
      gymName = gymName.replace(/\s+/g, '-').toLowerCase();
      $location.path('/admin/' + gymName + '/dashboard');
      console.log('Authentication successful!');
    })
    .error(function(err) {
      // If any errors redirect back to homepage
      console.log('Authentication unsuccessful!', err);
      $location.path('/');
    })
  }
}]);

angular.module('fitnessSpotter').controller('NewClientCtrl', ['$scope', '$location', '$http', 'Upload', 'cloudinary', function($scope, $location, $http, $upload, cloudinary) {
  // Function that uploads image to cloudinary
  $scope.uploadImage = function(files){
    $scope.files = files;
    if (!$scope.files) return;
    angular.forEach(files, function(file){
      if (file && !file.$error) {
        // Configuring cloudinary api and specifying where to upload image
        file.upload = $upload.upload({
          url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
          data: {
            upload_preset: cloudinary.config().upload_preset,
            tags: 'myphotoalbum',
            file: file
          }
        }).success(function (data, status, headers, config) {
          file.result = data;
          // Set variable to the image url where cloudinary is hosting it
          var imageUrl = data.url;
          // Set scope variable to previous variable that has the image url in order to send it with post request
          $scope.photo = imageUrl;
        }).error(function (data, status, headers, config) {
          // Sends error if any
          file.result = data;
        });
      }
    });
  }

  // Function runs when users submit add client form
  $scope.addClient = function() {
    // Grabbing new clients info from the input fields
    var fullName = $scope.fullName;
    var weight = $scope.weight;
    var profilePic = $scope.photo;
    var workoutPlan = $scope.workoutPlan;
    var mealPlan = $scope.mealPlan;
    var clientAssessment = $scope.clientAssessment;

    // Making post request to /api/add-client
    $http.post('/api/add-client', {
      // Sends data to backend so we can insert this information into the database
      name: fullName,
      weight: weight,
      profilePicture: profilePic,
      workoutPlan: workoutPlan,
      mealPlan: mealPlan,
      clientAssessment: clientAssessment
    })
    .then(function(data) {
      console.log('COMING BACK: ', data);
    })
  }
}]);

angular.module('fitnessSpotter').controller('RegisterCtrl', ['$scope', '$location', '$http', 'Upload', 'cloudinary', function($scope, $location, $http, $upload, cloudinary) {
  // Function that uploads image to cloudinary
  $scope.uploadImage = function(files){
    $scope.files = files;
    if (!$scope.files) return;
    angular.forEach(files, function(file){
      if (file && !file.$error) {
        // Configuring cloudinary api and specifying where to upload image
        file.upload = $upload.upload({
          url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
          data: {
            upload_preset: cloudinary.config().upload_preset,
            tags: 'myphotoalbum',
            file: file
          }
        }).success(function (data, status, headers, config) {
          file.result = data;
          // Set variable to the image url where cloudinary is hosting it
          var imageUrl = data.url;
          // Set scope variable to previous variable that has the image url in order to send it with post request
          $scope.photo = imageUrl;
        }).error(function (data, status, headers, config) {
          // Sends error if any
          file.result = data;
        });
      }
    });
  }

  // Function runs when users submit sign up form
  $scope.register = function() {
    // Grabbing new users info from the input fields
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
      // If user selects basic plan set plan variable to basic
      var plan = basic;
    } else if(typeof plus !== undefined && basic === undefined && premium === undefined) {
      // If user selects plus plan set plan variable to plus
      var plan = plus;
    } else if(typeof premium !== undefined && basic === undefined && plus === undefined) {
      // If user selects premium plan set plan variable to premium
      var plan = premium;
    }

    // Making post request to /api/register
    $http.post('/api/register', {
      // Sends data to backend so we can insert this information into the database
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
