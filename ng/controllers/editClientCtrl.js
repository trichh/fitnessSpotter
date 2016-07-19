angular.module('fitnessSpotter').controller('EditClientCtrl', ['$scope', '$http', 'Upload', 'cloudinary', '$q', '$routeParams', function($scope, $http, $upload, cloudinary, $q, $routeParams) {
  // Creates a deferred object which will finish when request is done
  var requestFinished = $q.defer();
  // Get request to /api/editClient to get clients current data
  $http.get('/api/editClient', {
    params: {gymName: $routeParams.gymName, clientId: $routeParams.clientId}
  })
  .then(function(data) {
    // Making scope variable to users gymName to set up link
    var gymName = data.data.sessionData.passport.user.gymName;
    gymName = gymName.replace(/\s+/g, '-').toLowerCase();
    $scope.dashboardRoute = gymName;
    // Making scope variables to current data in case user doesn't update this information
    $scope.oldName = data.data.clientData[0].name;
    $scope.oldWeight = data.data.clientData[0].weight;
    $scope.oldProfilePic = data.data.clientData[0].profilePicture;
    $scope.oldWorkoutPlan = data.data.clientData[0].workoutPlan;
    $scope.oldMealPlan = data.data.clientData[0].mealPlan;
    $scope.oldAssessment = data.data.clientData[0].clientAssessment;
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

  // Function runs when user submits edit client form
  $scope.editClient = function() {
    // Run functions asynchronously, and uses return values when it is done processing.
    requestFinished.promise.then(function() {
      // If statements to see if user updated the specific information or not. If they did, set variables that are being passed to backend equal to new data. If not set varialbes to old data.
      if($scope.fullName === undefined) {
        var fullName = $scope.oldName;
      } else if(typeof $scope.fullName !== undefined) {
        var fullName = $scope.fullName;
      }
      if($scope.weight === undefined) {
        var weight = $scope.oldWeight;
      } else if(typeof $scope.weight !== undefined) {
        var weight = $scope.weight;
      }
      if($scope.photo === undefined) {
        var profilePic = $scope.oldProfilePic;
      } else if(typeof $scope.photo !== undefined) {
        var profilePic = $scope.photo;
      }
      if($scope.workoutPlan === undefined) {
        var workoutPlan = $scope.oldWorkoutPlan;
      } else if(typeof $scope.workoutPlan !== undefined) {
        var workoutPlan = $scope.workoutPlan;
      }
      if($scope.mealPlan === undefined) {
        var mealPlan = $scope.oldMealPlan;
      } else if(typeof $scope.mealPlan !== undefined) {
        var mealPlan = $scope.mealPlan;
      }
      if($scope.clientAssessment === undefined) {
        var clientAssessment = $scope.oldAssessment;
      } else if(typeof $scope.clientAssessment !== undefined) {
        var clientAssessment = $scope.clientAssessment;
      }

      // Making post request to /api/updateClient
      $http.post('/api/updateClient', {
        // Sends data to backend so we can insert this information into the database
        _id: $routeParams.clientId,
        name: fullName,
        weight: weight,
        profilePicture: profilePic,
        workoutPlan: workoutPlan,
        mealPlan: mealPlan,
        clientAssessment: clientAssessment
      })
      .then(function(data) {
        console.log('COMING BACK: ', data);
      });
    });
  }
}]);
