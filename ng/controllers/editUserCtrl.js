angular.module('fitnessSpotter').controller('EditUserCtrl', ['$rootScope', '$scope', '$http', 'Upload', 'cloudinary', '$q', function($rootScope, $scope, $http, $upload, cloudinary, $q) {
  $rootScope.homeHeader = false;
  // Creates a deferred object which will finish when request is done
  var requestFinished = $q.defer();
  // Get request to /api/getGym to get users current data
  $http.get('/api/getGym')
  .then(function(data) {
    // Making scope variable to users gymName to set up link
    var gymName = data.data.sessionData.passport.user.gymName;
    gymName = gymName.replace(/\s+/g, '-').toLowerCase();
    $rootScope.dashboardRoute = gymName;
    // Making scope variables to users old data just in case they don't update any of the fields
    $scope.oldEmail = data.data.sessionData.passport.user.email;
    $scope.oldPassword = data.data.sessionData.passport.user.password;
    $scope.oldName = data.data.sessionData.passport.user.gymName;
    $scope.oldProfilePic = data.data.sessionData.passport.user.profilePicture;
    $scope.oldNumber = data.data.sessionData.passport.user.phoneNumber;
    $scope.oldPlan = data.data.sessionData.passport.user.paymentPlan;
    $scope.oldCardName = data.data.sessionData.passport.user.cardHolder;
    $scope.oldCardNumber = data.data.sessionData.passport.user.cardNumber;
    $scope.oldSecurityCode = data.data.sessionData.passport.user.securityCode;
    $scope.oldMonth = data.data.sessionData.passport.user.month;
    $scope.oldYear = data.data.sessionData.passport.user.year;
    // Returns a promise of the passed value or promise
    requestFinished.resolve();
  })
  .catch(function(err) {
    // If any errors console log error
    console.log(err);
  });

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

  // Function runs when user submits edit user form
  $scope.editUser = function() {
    // Run functions asynchronously, and uses return values when it is done processing.
    requestFinished.promise.then(function() {
      // If statements to see if user updated the specific information or not. If they did, set variables that are being passed to backend equal to new data. If not set varialbes to old data.
      if($scope.email === undefined) {
        var email = $scope.oldEmail;
      } else if(typeof $scope.email !== undefined) {
        var email = $scope.email;
      }
      if($scope.password === undefined) {
        var password = $scope.oldPassword;
      } else if(typeof $scope.password !== undefined) {
        var password = $scope.password;
      }
      if($scope.name === undefined) {
        var name = $scope.oldName;
      } else if(typeof $scope.name !== undefined) {
        var name = $scope.name;
      }
      if($scope.photo === undefined) {
        var profilePic = $scope.oldProfilePic;
      } else if(typeof $scope.photo !== undefined) {
        var profilePic = $scope.photo;
      }
      if($scope.number === undefined) {
        var number = $scope.oldNumber;
      } else if(typeof $scope.number !== undefined) {
        var number = $scope.number;
      }
      if($scope.basic === undefined && $scope.plus === undefined && $scope.premium === undefined) {
        var plan = $scope.oldPlan;
      } else if(typeof $scope.basic !== undefined || typeof $scope.plus !== undefined || typeof $scope.premium !== undefined) {
        if(typeof $scope.basic !== undefined && $scope.plus === undefined && $scope.premium === undefined) {
          // If user selects basic plan set plan variable to basic
          var plan = $scope.basic;
        } else if(typeof $scope.plus !== undefined && $scope.basic === undefined && $scope.premium === undefined) {
          // If user selects plus plan set plan variable to plus
          var plan = $scope.plus;
        } else if(typeof $scope.premium !== undefined && $scope.basic === undefined && $scope.plus === undefined) {
          // If user selects premium plan set plan variable to premium
          var plan = $scope.premium;
        }
      }
      if($scope.cardName === undefined) {
        var cardName = $scope.oldCardName;
      } else if(typeof $scope.cardName !== undefined) {
        var cardName = $scope.cardName;
      }
      if($scope.cardNumber === undefined) {
        var cardNumber = $scope.oldCardNumber;
      } else if(typeof $scope.cardNumber !== undefined) {
        var cardNumber = $scope.cardNumber;
      }
      if($scope.securityCode === undefined) {
        var securityCode = $scope.oldSecurityCode;
      } else if(typeof $scope.securityCode !== undefined) {
        var securityCode = $scope.securityCode;
      }
      if($scope.month === undefined) {
        var month = $scope.oldMonth;
      } else if(typeof $scope.month !== undefined) {
        var month = $scope.month;
      }
      if($scope.year === undefined) {
        var year = $scope.oldYear;
      } else if(typeof $scope.year !== undefined) {
        var year = $scope.year;
      }
      // Making post request to /api/updateUser
      $http.post('/api/updateUser', {
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
      });
    });
  }

  // Function runs when user clicks delete button
  $scope.delete = function() {
    // Get request to /api/deleteUser to remove user from database
    $http.get('/api/deleteUser')
    .then(function(data) {
      console.log("CLIENT DELETED", data);
    })
    .catch(function(err) {
      console.log(err);
    })
  }
}]);
