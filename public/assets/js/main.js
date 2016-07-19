var fitnessSpotter=angular.module("fitnessSpotter",["ngRoute","ngAnimate","cloudinary","ngFileUpload"]);angular.module("fitnessSpotter").config(["$routeProvider","$locationProvider",function(e,o){o.html5Mode(!0),e.when("/",{templateUrl:"views/home.html"}).when("/register",{templateUrl:"views/register.html",controller:"RegisterCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/admin/:gymName/add-client",{templateUrl:"views/addClient.html",controller:"NewClientCtrl"}).when("/admin/:gymName/dashboard",{templateUrl:"views/dashboard.html",controller:"DashboardCtrl"}).when("/admin/:gymName/edit",{templateUrl:"views/editUser.html",controller:"EditUserCtrl"}).when("/admin/:gymName/:clientId/profile",{templateUrl:"views/profile.html",controller:"ProfileCtrl"}).when("/admin/:gymName/:clientId/edit",{templateUrl:"views/editClient.html",controller:"EditClientCtrl"}).when("/:gymName/dashboard",{templateUrl:"views/clientDashboard.html",controller:"ClientDashboardCtrl"}).otherwise("/")}]).run(["$rootScope","$http",function(e,o){e.logout=function(){o.post("/logout")}}]),angular.module("fitnessSpotter").controller("ClientDashboardCtrl",["$scope","$location","$http","$routeParams",function(e,o,a,t){a.get("/api/clientDashboard",{params:{gymName:t.gymName}}).then(function(o){console.log("DATA SENT:",o.data.clientData),e.dashboardRoute=t.gymName,e.clients=o.data.clientData})["catch"](function(e){console.log(e)}),a.get("/api/trainerInfo",{params:{gymName:t.gymName}}).then(function(o){console.log("DATA SENT:",o.data.trainerData),e.gymName=o.data.trainerData[0].gymName,e.profilePicture=o.data.trainerData[0].profilePicture})["catch"](function(e){console.log(e)})}]),angular.module("fitnessSpotter").controller("DashboardCtrl",["$scope","$location","$http",function(e,o,a){a.get("/api/dashboard").then(function(o){console.log("SESSION DATA:",o.data.sessionData.passport.user),console.log("CLIENT DATA:",o.data.clientData),e.gymName=o.data.sessionData.passport.user.gymName,e.profilePicture=o.data.sessionData.passport.user.profilePicture,e.clients=o.data.clientData;var a=o.data.sessionData.passport.user.gymName;a=a.replace(/\s+/g,"-").toLowerCase(),e.dashboardRoute=a})["catch"](function(e){console.log(e)})}]),angular.module("fitnessSpotter").controller("EditClientCtrl",["$scope","$location","$http","Upload","cloudinary","$q","$routeParams",function(e,o,a,t,r,i,l){var n=i.defer();e.uploadImage=function(o){e.files=o,e.files&&angular.forEach(o,function(o){o&&!o.$error&&(o.upload=t.upload({url:"https://api.cloudinary.com/v1_1/"+r.config().cloud_name+"/upload",data:{upload_preset:r.config().upload_preset,tags:"myphotoalbum",file:o}}).success(function(a,t,r,i){o.result=a;var l=a.url;e.photo=l}).error(function(e,a,t,r){o.result=e}))})},a.get("/api/editClient").then(function(o){var a=o.data.sessionData.passport.user.gymName;a=a.replace(/\s+/g,"-").toLowerCase(),e.dashboardRoute=a})["catch"](function(e){console.log(e)}),e.editClient=function(){a.get("/api/editClient",{params:{gymName:l.gymName,clientId:l.clientId}}).then(function(o){e.oldName=o.data.clientData[0].name,e.oldWeight=o.data.clientData[0].weight,e.oldProfilePic=o.data.clientData[0].profilePicture,e.oldWorkoutPlan=o.data.clientData[0].workoutPlan,e.oldMealPlan=o.data.clientData[0].mealPlan,e.oldAssessment=o.data.clientData[0].clientAssessment,n.resolve()}),n.promise.then(function(){if(void 0===e.fullName)var o=e.oldName;else if(void 0!==typeof e.fullName)var o=e.fullName;if(void 0===e.weight)var t=e.oldWeight;else if(void 0!==typeof e.weight)var t=e.weight;if(void 0===e.photo)var r=e.oldProfilePic;else if(void 0!==typeof e.photo)var r=e.photo;if(void 0===e.workoutPlan)var i=e.oldWorkoutPlan;else if(void 0!==typeof e.workoutPlan)var i=e.workoutPlan;if(void 0===e.mealPlan)var n=e.oldMealPlan;else if(void 0!==typeof e.mealPlan)var n=e.mealPlan;if(void 0===e.clientAssessment)var s=e.oldAssessment;else if(void 0!==typeof e.clientAssessment)var s=e.clientAssessment;a.post("/api/updateClient",{_id:l.clientId,name:o,weight:t,profilePicture:r,workoutPlan:i,mealPlan:n,clientAssessment:s}).then(function(e){console.log("COMING BACK: ",e)})})}}]),angular.module("fitnessSpotter").controller("EditUserCtrl",["$scope","$location","$http","Upload","cloudinary","$q",function(e,o,a,t,r,i){var l=i.defer();e.uploadImage=function(o){e.files=o,e.files&&angular.forEach(o,function(o){o&&!o.$error&&(o.upload=t.upload({url:"https://api.cloudinary.com/v1_1/"+r.config().cloud_name+"/upload",data:{upload_preset:r.config().upload_preset,tags:"myphotoalbum",file:o}}).success(function(a,t,r,i){o.result=a;var l=a.url;e.photo=l}).error(function(e,a,t,r){o.result=e}))})},a.get("/api/editUser").then(function(o){var a=o.data.sessionData.passport.user.gymName;a=a.replace(/\s+/g,"-").toLowerCase(),e.dashboardRoute=a})["catch"](function(e){console.log(e)}),e.editUser=function(){a.get("/api/editUser").then(function(o){e.oldEmail=o.data.sessionData.passport.user.email,e.oldPassword=o.data.sessionData.passport.user.password,e.oldName=o.data.sessionData.passport.user.gymName,e.oldProfilePic=o.data.sessionData.passport.user.profilePicture,e.oldNumber=o.data.sessionData.passport.user.phoneNumber,e.oldPlan=o.data.sessionData.passport.user.paymentPlan,e.oldCardName=o.data.sessionData.passport.user.cardHolder,e.oldCardNumber=o.data.sessionData.passport.user.cardNumber,e.oldSecurityCode=o.data.sessionData.passport.user.securityCode,e.oldMonth=o.data.sessionData.passport.user.month,e.oldYear=o.data.sessionData.passport.user.year,l.resolve()}),l.promise.then(function(){if(void 0===e.email)var o=e.oldEmail;else if(void 0!==typeof e.email)var o=e.email;if(void 0===e.password)var t=e.oldPassword;else if(void 0!==typeof e.password)var t=e.password;if(void 0===e.name)var r=e.oldName;else if(void 0!==typeof e.name)var r=e.name;if(void 0===e.photo)var i=e.oldProfilePic;else if(void 0!==typeof e.photo)var i=e.photo;if(void 0===e.number)var l=e.oldNumber;else if(void 0!==typeof e.number)var l=e.number;if(void 0===e.basic&&void 0===e.plus&&void 0===e.premium)var n=e.oldPlan;else if(void 0!==typeof e.basic||void 0!==typeof e.plus||void 0!==typeof e.premium)if(void 0!==typeof e.basic&&void 0===e.plus&&void 0===e.premium)var n=e.basic;else if(void 0!==typeof e.plus&&void 0===e.basic&&void 0===e.premium)var n=e.plus;else if(void 0!==typeof e.premium&&void 0===e.basic&&void 0===e.plus)var n=e.premium;if(void 0===e.cardName)var s=e.oldCardName;else if(void 0!==typeof e.cardName)var s=e.cardName;if(void 0===e.cardNumber)var d=e.oldCardNumber;else if(void 0!==typeof e.cardNumber)var d=e.cardNumber;if(void 0===e.securityCode)var c=e.oldSecurityCode;else if(void 0!==typeof e.securityCode)var c=e.securityCode;if(void 0===e.month)var u=e.oldMonth;else if(void 0!==typeof e.month)var u=e.month;if(void 0===e.year)var p=e.oldYear;else if(void 0!==typeof e.year)var p=e.year;a.post("/api/updateUser",{email:o,password:t,gymName:r,profilePicture:i,phoneNumber:l,paymentPlan:n,cardHolder:s,cardNumber:d,securityCode:c,month:u,year:p}).then(function(e){console.log("COMING BACK: ",e)})})},e["delete"]=function(){a.get("/api/deleteUser").then(function(e){console.log("CLIENT DELETED",e)})["catch"](function(e){console.log(e)})}}]),angular.module("fitnessSpotter").controller("LoginCtrl",["$rootScope","$scope","$location","$http",function(e,o,a,t){o.login=function(){var e=o.email,r=o.password;t.post("/api/login",{email:e,password:r}).success(function(e){var o=e.passport.user.gymName;o=o.replace(/\s+/g,"-").toLowerCase(),a.path("/admin/"+o+"/dashboard"),console.log("Authentication successful!")}).error(function(e){console.log("Authentication unsuccessful!",e),a.path("/")})}}]),angular.module("fitnessSpotter").controller("NewClientCtrl",["$scope","$location","$http","Upload","cloudinary",function(e,o,a,t,r){a.get("/api/add-client").then(function(o){var a=o.data.sessionData.passport.user.gymName;a=a.replace(/\s+/g,"-").toLowerCase(),e.dashboardRoute=a})["catch"](function(e){console.log(e)}),e.uploadImage=function(o){e.files=o,e.files&&angular.forEach(o,function(o){o&&!o.$error&&(o.upload=t.upload({url:"https://api.cloudinary.com/v1_1/"+r.config().cloud_name+"/upload",data:{upload_preset:r.config().upload_preset,tags:"myphotoalbum",file:o}}).success(function(a,t,r,i){o.result=a;var l=a.url;e.photo=l}).error(function(e,a,t,r){o.result=e}))})},e.addClient=function(){var o=e.fullName,t=e.weight,r=e.photo,i=e.workoutPlan,l=e.mealPlan,n=e.clientAssessment;a.post("/api/add-client",{name:o,weight:t,profilePicture:r,workoutPlan:i,mealPlan:l,clientAssessment:n}).then(function(e){console.log("COMING BACK: ",e)})}}]),angular.module("fitnessSpotter").controller("ProfileCtrl",["$scope","$location","$http","$routeParams",function(e,o,a,t){a.get("/api/clientData",{params:{gymName:t.gymName,clientId:t.clientId}}).then(function(o){console.log("DATA SENT:",o.data.clientData),e.clients=o.data.clientData})["catch"](function(e){console.log(e)}),a.get("/api/profile").then(function(o){var a=o.data.sessionData.passport.user.gymName;a=a.replace(/\s+/g,"-").toLowerCase(),e.dashboardRoute=a})["catch"](function(e){console.log(e)}),e["delete"]=function(){a.get("/api/deleteClient",{params:{gymName:t.gymName,clientId:t.clientId}}).then(function(e){console.log("CLIENT DELETED",e)})["catch"](function(e){console.log(e)})}}]),angular.module("fitnessSpotter").controller("RegisterCtrl",["$scope","$location","$http","Upload","cloudinary",function(e,o,a,t,r){e.uploadImage=function(o){e.files=o,e.files&&angular.forEach(o,function(o){o&&!o.$error&&(o.upload=t.upload({url:"https://api.cloudinary.com/v1_1/"+r.config().cloud_name+"/upload",data:{upload_preset:r.config().upload_preset,tags:"myphotoalbum",file:o}}).success(function(a,t,r,i){o.result=a;var l=a.url;e.photo=l}).error(function(e,a,t,r){o.result=e}))})},e.register=function(){var o=e.email,t=e.password,r=e.name,i=e.photo,l=e.number,n=e.basic,s=e.plus,d=e.premium,c=e.cardName,u=e.cardNumber,p=e.securityCode,m=e.month,f=e.year;if(void 0!==typeof n&&void 0===s&&void 0===d)var g=n;else if(void 0!==typeof s&&void 0===n&&void 0===d)var g=s;else if(void 0!==typeof d&&void 0===n&&void 0===s)var g=d;a.post("/api/register",{email:o,password:t,gymName:r,profilePicture:i,phoneNumber:l,paymentPlan:g,cardHolder:c,cardNumber:u,securityCode:p,month:m,year:f}).then(function(e){console.log("COMING BACK: ",e)}),e.email="",e.password="",e.name="",e.number="",e.basic="",e.plus="",e.premium="",e.cardName="",e.cardNumber="",e.securityCode="",e.month="",e.year=""}}]);