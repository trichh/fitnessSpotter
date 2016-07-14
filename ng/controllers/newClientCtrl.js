angular.module('fitnessSpotter').controller('NewClientCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {
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
