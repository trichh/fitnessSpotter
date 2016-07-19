angular.module('fitnessSpotter').controller('RegisterCtrl', ['$scope', '$http', 'Upload', 'cloudinary', function($scope, $http, $upload, cloudinary) {
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
    // Determining what plan the user selected
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
    // Setting inputs back to empty
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
