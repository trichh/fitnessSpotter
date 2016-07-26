angular.module('fitnessSpotter').controller('NewClientCtrl', function($rootScope, $scope, $http) {
  // Specifying what header to display
  $rootScope.homeHeader = false;

  // Get request to /api/getGym to get users current data
  $http.get('/api/getGym')
  .then(function(data) {
    // Making scope variable to users gymName to set up link
    var gymName = data.data.sessionData.passport.user.gymName;
    gymName = gymName.replace(/\s+/g, '-').toLowerCase();
    $rootScope.dashboardRoute = gymName;
  })
  .catch(function(err) {
    // If any errors console log error
    console.log(err);
  });

  // Function that gets file uploaded
  var getFiles= function() {
    var selectedFile = document.getElementById('profilePhoto').files;
    var fileListLength = selectedFile.length;
    var i = 0;
    // Loops through files uploaded
    while ( i < fileListLength) {
        var file = selectedFile[i];
        console.log("FILE:", file);
        console.log("FILE NAME", file.name);
        $scope.photo = file.name;
        i++;
    }
  }

  // Updates file input when changed
  document.getElementById('profilePhoto').onchange=getFiles;

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
      // console.log(data);
    })
  }
});
