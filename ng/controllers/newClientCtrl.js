angular.module('fitnessSpotter').controller('NewClientCtrl', ['$scope', '$location', '$http', 'Upload', 'cloudinary', function($scope, $location, $http, $upload, cloudinary) {
  // Get request to /api/add-client
  $http.get('/api/add-client')
  .then(function(data) {
    // Making scope variable to users gymName to set up link
    var gymName = data.data.sessionData.passport.user.gymName;
    gymName = gymName.replace(/\s+/g, '-').toLowerCase();
    $scope.dashboardRoute = gymName;
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
