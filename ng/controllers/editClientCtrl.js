angular.module('fitnessSpotter').controller('EditClientCtrl', ['$scope', '$location', '$http', '$q', '$routeParams', function($scope, $location, $http, $q, $routeParams) {
  // Creates a deferred object which will finish when request is done
  var requestFinished = $q.defer();

  // Get request to /api/editClient
  $http.get('/api/editClient')
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

  $scope.editClient = function() {
    // Get request to /api/editClient
    $http.get('/api/editClient', {
      params: {gymName: $routeParams.gymName, clientId: $routeParams.clientId}
    })
    .then(function(data) {
      $scope.oldName = data.data.clientData[0].name;
      $scope.oldWeight = data.data.clientData[0].weight;
      $scope.oldProfilePic = data.data.clientData[0].profilePicture;
      $scope.oldWorkoutPlan = data.data.clientData[0].workoutPlan;
      $scope.oldMealPlan = data.data.clientData[0].mealPlan;
      $scope.oldAssessment = data.data.clientData[0].clientAssessment;

      // Returns a promise of the passed value or promise
      requestFinished.resolve();
    });

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
