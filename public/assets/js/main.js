var fitnessSpotter=angular.module("fitnessSpotter",["ngRoute","ngAnimate","cloudinary","ngFileUpload"]);angular.module("fitnessSpotter").config(["$routeProvider","$locationProvider",function(e,o){o.html5Mode(!0),e.when("/",{templateUrl:"views/home.html",controller:"HomeCtrl"}).when("/register",{templateUrl:"views/register.html",controller:"RegisterCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/admin/:gymName/add-client",{templateUrl:"views/addClient.html",controller:"NewClientCtrl"}).when("/admin/:gymName/dashboard",{templateUrl:"views/dashboard.html",controller:"DashboardCtrl"}).when("/admin/:gymName/edit",{templateUrl:"views/editUser.html",controller:"EditUserCtrl"}).when("/admin/:gymName/:clientId/profile",{templateUrl:"views/profile.html",controller:"ProfileCtrl"}).when("/admin/:gymName/:clientId/edit",{templateUrl:"views/editClient.html",controller:"EditClientCtrl"}).when("/:gymName/dashboard",{templateUrl:"views/clientDashboard.html",controller:"ClientDashboardCtrl"}).when("/:gymName/:clientId/profile",{templateUrl:"views/clientProfile.html",controller:"ClientProfileCtrl"}).otherwise("/")}]).run(["$rootScope","$http",function(e,o){e.logout=function(){o.post("/logout")}}]),angular.module("fitnessSpotter").controller("ClientDashboardCtrl",["$rootScope","$scope","$http","$routeParams",function(e,o,a,t){e.homeHeader=!0,e.hide=!0,e.clientHeader=!0,a.get("/api/clientDashboard",{params:{gymName:t.gymName}}).then(function(a){e.dashboardRoute=t.gymName,o.clients=a.data.clientData})["catch"](function(e){}),a.get("/api/trainerInfo",{params:{gymName:t.gymName}}).then(function(e){o.gymName=e.data.trainerData[0].gymName,o.profilePicture=e.data.trainerData[0].profilePicture})["catch"](function(e){})}]),angular.module("fitnessSpotter").controller("ClientProfileCtrl",["$rootScope","$scope","$http","$routeParams",function(e,o,a,t){e.homeHeader=!0,e.hide=!0,e.clientHeader=!0,a.get("/api/clientProfile",{params:{gymName:t.gymName,clientId:t.clientId}}).then(function(a){e.dashboardRoute=t.gymName,o.clients=a.data.clientData})["catch"](function(e){})}]),angular.module("fitnessSpotter").controller("DashboardCtrl",["$rootScope","$scope","$http",function(e,o,a){e.homeHeader=!1,a.get("/api/dashboard").then(function(a){o.gymName=a.data.sessionData.passport.user.gymName,o.profilePicture=a.data.sessionData.passport.user.profilePicture,o.clients=a.data.clientData;var t=a.data.sessionData.passport.user.gymName;t=t.replace(/\s+/g,"-").toLowerCase(),e.dashboardRoute=t})["catch"](function(e){})}]),angular.module("fitnessSpotter").controller("EditClientCtrl",["$rootScope","$scope","$http","Upload","cloudinary","$q","$routeParams",function(e,o,a,t,r,i,l){e.homeHeader=!1;var n=i.defer();a.get("/api/clientData",{params:{gymName:l.gymName,clientId:l.clientId}}).then(function(a){var t=a.data.sessionData.passport.user.gymName;t=t.replace(/\s+/g,"-").toLowerCase(),e.dashboardRoute=t,o.oldName=a.data.clientData[0].name,o.oldWeight=a.data.clientData[0].weight,o.oldProfilePic=a.data.clientData[0].profilePicture,o.oldWorkoutPlan=a.data.clientData[0].workoutPlan,o.oldMealPlan=a.data.clientData[0].mealPlan,o.oldAssessment=a.data.clientData[0].clientAssessment,n.resolve()})["catch"](function(e){}),o.uploadImage=function(e){o.files=e,o.files&&angular.forEach(e,function(e){e&&!e.$error&&(e.upload=t.upload({url:"https://api.cloudinary.com/v1_1/"+r.config().cloud_name+"/upload",data:{upload_preset:r.config().upload_preset,tags:"myphotoalbum",file:e}}).success(function(a,t,r,i){e.result=a;var l=a.url;o.photo=l}).error(function(o,a,t,r){e.result=o}))})},o.editClient=function(){n.promise.then(function(){if(void 0===o.fullName)var e=o.oldName;else if(void 0!==typeof o.fullName)var e=o.fullName;if(void 0===o.weight)var t=o.oldWeight;else if(void 0!==typeof o.weight)var t=o.weight;if(void 0===o.photo)var r=o.oldProfilePic;else if(void 0!==typeof o.photo)var r=o.photo;if(void 0===o.workoutPlan)var i=o.oldWorkoutPlan;else if(void 0!==typeof o.workoutPlan)var i=o.workoutPlan;if(void 0===o.mealPlan)var n=o.oldMealPlan;else if(void 0!==typeof o.mealPlan)var n=o.mealPlan;if(void 0===o.clientAssessment)var s=o.oldAssessment;else if(void 0!==typeof o.clientAssessment)var s=o.clientAssessment;a.post("/api/updateClient",{_id:l.clientId,name:e,weight:t,profilePicture:r,workoutPlan:i,mealPlan:n,clientAssessment:s}).then(function(e){})})}}]),angular.module("fitnessSpotter").controller("EditUserCtrl",["$rootScope","$scope","$http","Upload","cloudinary","$q",function(e,o,a,t,r,i){e.homeHeader=!1;var l=i.defer();a.get("/api/getGym").then(function(a){var t=a.data.sessionData.passport.user.gymName;t=t.replace(/\s+/g,"-").toLowerCase(),e.dashboardRoute=t,o.oldEmail=a.data.sessionData.passport.user.email,o.oldPassword=a.data.sessionData.passport.user.password,o.oldName=a.data.sessionData.passport.user.gymName,o.oldProfilePic=a.data.sessionData.passport.user.profilePicture,o.oldNumber=a.data.sessionData.passport.user.phoneNumber,o.oldPlan=a.data.sessionData.passport.user.paymentPlan,o.oldCardName=a.data.sessionData.passport.user.cardHolder,o.oldCardNumber=a.data.sessionData.passport.user.cardNumber,o.oldSecurityCode=a.data.sessionData.passport.user.securityCode,o.oldMonth=a.data.sessionData.passport.user.month,o.oldYear=a.data.sessionData.passport.user.year,l.resolve()})["catch"](function(e){}),o.uploadImage=function(e){o.files=e,o.files&&angular.forEach(e,function(e){e&&!e.$error&&(e.upload=t.upload({url:"https://api.cloudinary.com/v1_1/"+r.config().cloud_name+"/upload",data:{upload_preset:r.config().upload_preset,tags:"myphotoalbum",file:e}}).success(function(a,t,r,i){e.result=a;var l=a.url;o.photo=l}).error(function(o,a,t,r){e.result=o}))})},o.editUser=function(){l.promise.then(function(){if(void 0===o.email)var e=o.oldEmail;else if(void 0!==typeof o.email)var e=o.email;if(void 0===o.password)var t=o.oldPassword;else if(void 0!==typeof o.password)var t=o.password;if(void 0===o.name)var r=o.oldName;else if(void 0!==typeof o.name)var r=o.name;if(void 0===o.photo)var i=o.oldProfilePic;else if(void 0!==typeof o.photo)var i=o.photo;if(void 0===o.number)var l=o.oldNumber;else if(void 0!==typeof o.number)var l=o.number;if(void 0===o.basic&&void 0===o.plus&&void 0===o.premium)var n=o.oldPlan;else if(void 0!==typeof o.basic||void 0!==typeof o.plus||void 0!==typeof o.premium)if(void 0!==typeof o.basic&&void 0===o.plus&&void 0===o.premium)var n=o.basic;else if(void 0!==typeof o.plus&&void 0===o.basic&&void 0===o.premium)var n=o.plus;else if(void 0!==typeof o.premium&&void 0===o.basic&&void 0===o.plus)var n=o.premium;if(void 0===o.cardName)var s=o.oldCardName;else if(void 0!==typeof o.cardName)var s=o.cardName;if(void 0===o.cardNumber)var d=o.oldCardNumber;else if(void 0!==typeof o.cardNumber)var d=o.cardNumber;if(void 0===o.securityCode)var c=o.oldSecurityCode;else if(void 0!==typeof o.securityCode)var c=o.securityCode;if(void 0===o.month)var p=o.oldMonth;else if(void 0!==typeof o.month)var p=o.month;if(void 0===o.year)var u=o.oldYear;else if(void 0!==typeof o.year)var u=o.year;a.post("/api/updateUser",{email:e,password:t,gymName:r,profilePicture:i,phoneNumber:l,paymentPlan:n,cardHolder:s,cardNumber:d,securityCode:c,month:p,year:u}).then(function(e){})})},o["delete"]=function(){a.get("/api/deleteUser").then(function(e){})["catch"](function(e){})}}]),angular.module("fitnessSpotter").controller("HomeCtrl",["$rootScope",function(e){e.homeHeader=!0,document.getElementById("homeHeader").style.display="none",e.clientHeader=!1}]),angular.module("fitnessSpotter").controller("LoginCtrl",["$scope","$rootScope","$location","$http",function(e,o,a,t){o.homeHeader=!0,document.getElementById("homeHeader").style.display="block",o.clientHeader=!1,e.login=function(){var o=e.email,r=e.password;t.post("/api/login",{email:o,password:r}).success(function(e){var o=e.passport.user.gymName;o=o.replace(/\s+/g,"-").toLowerCase(),a.path("/admin/"+o+"/dashboard")}).error(function(e){a.path("/")})}}]),angular.module("fitnessSpotter").controller("NewClientCtrl",["$rootScope","$scope","$http","Upload","cloudinary",function(e,o,a,t,r){e.homeHeader=!1,a.get("/api/getGym").then(function(o){var a=o.data.sessionData.passport.user.gymName;a=a.replace(/\s+/g,"-").toLowerCase(),e.dashboardRoute=a})["catch"](function(e){}),o.uploadImage=function(e){o.files=e,o.files&&angular.forEach(e,function(e){e&&!e.$error&&(e.upload=t.upload({url:"https://api.cloudinary.com/v1_1/"+r.config().cloud_name+"/upload",data:{upload_preset:r.config().upload_preset,tags:"myphotoalbum",file:e}}).success(function(a,t,r,i){e.result=a;var l=a.url;o.photo=l}).error(function(o,a,t,r){e.result=o}))})},o.addClient=function(){var e=o.fullName,t=o.weight,r=o.photo,i=o.workoutPlan,l=o.mealPlan,n=o.clientAssessment;a.post("/api/add-client",{name:e,weight:t,profilePicture:r,workoutPlan:i,mealPlan:l,clientAssessment:n}).then(function(e){})}}]),angular.module("fitnessSpotter").controller("ProfileCtrl",["$rootScope","$scope","$http","$routeParams",function(e,o,a,t){e.homeHeader=!1,a.get("/api/clientData",{params:{gymName:t.gymName,clientId:t.clientId}}).then(function(a){var t=a.data.sessionData.passport.user.gymName;t=t.replace(/\s+/g,"-").toLowerCase(),e.dashboardRoute=t,o.clients=a.data.clientData})["catch"](function(e){}),o["delete"]=function(){a.get("/api/deleteClient",{params:{gymName:t.gymName,clientId:t.clientId}}).then(function(e){})["catch"](function(e){})}}]),angular.module("fitnessSpotter").controller("RegisterCtrl",["$scope","$rootScope","$http","Upload","cloudinary","$location",function(e,o,a,t,r,i){o.homeHeader=!0,document.getElementById("homeHeader").style.display="block",o.clientHeader=!1,e.uploadImage=function(o){e.files=o,e.files&&angular.forEach(o,function(o){o&&!o.$error&&(o.upload=t.upload({url:"https://api.cloudinary.com/v1_1/"+r.config().cloud_name+"/upload",data:{upload_preset:r.config().upload_preset,tags:"myphotoalbum",file:o}}).success(function(a,t,r,i){o.result=a;var l=a.url;e.photo=l}).error(function(e,a,t,r){o.result=e}))})},e.register=function(){var o=e.email,t=e.password,r=e.name,l=e.photo,n=e.number,s=e.basic,d=e.plus,c=e.premium,p=e.cardName,u=e.cardNumber,m=e.securityCode,f=e.month,h=e.year;if(void 0!==typeof s&&void 0===d&&void 0===c)var v=s;else if(void 0!==typeof d&&void 0===s&&void 0===c)var v=d;else if(void 0!==typeof c&&void 0===s&&void 0===d)var v=c;a.post("/api/register",{email:o,password:t,gymName:r,profilePicture:l,phoneNumber:n,paymentPlan:v,cardHolder:p,cardNumber:u,securityCode:m,month:f,year:h}).then(function(e){})["catch"](function(e){}),i.path("/")}}]);