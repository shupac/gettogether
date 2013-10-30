angular.module('GetTogetherApp')
.run(function($rootScope, $location, SessionService) {
  $rootScope.$on("$routeChangeStart", function(evt, next, current) {
    if (!SessionService.isLoggedIn() && next.controller !== "SignupCtrl") {
        $location.path('/login');
    }
  });
})
.controller('SignupCtrl', function($scope, SessionService, $location){
  $scope.submitUser = function(username, password){
    SessionService
    .signup(username, password)
    .then(function() {
      $location.path('/');
    }, function() {
      console.log('Signup error/main.js');
    });
  };
})
.controller('LoginCtrl', function($scope, SessionService, $location){
  $scope.user = {
    username: 'user',
    password: 'test'
  };

  $scope.submitUser = function(username, password){
    SessionService
    .login(username, password)
    .then(function() {
      $location.path('/');
    }, function() {
      console.log('Login error/main.js');
    });
  };
})
.controller('MainCtrl', function($scope, SessionService, LocationService){
  var mapOptions = {
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  LocationService
  .getLocation(map)
  .then(function(position) {
    LocationService.displayMap(position);
    LocationService.storePosition(position);
  }, function(){console.log('location promise error')});

  $scope.logout = function() {
    SessionService.logout();
  };

});