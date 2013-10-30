angular.module('GetTogetherApp')
// .run(function($rootScope, $location, SessionService) {
//   $rootScope.$on("$routeChangeStart", function(evt, next, current) {
//     if (!SessionService.isLoggedIn() && next.controller !== "SignupCtrl") {
//         $location.path('/login');
//     }
//   });
// })
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

  var getLocation = function() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(displayMap);
    } else {
      alert("Browser doesn't support Geolocation");
    }
  };
  var displayMap = function(position) {
    var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    displayContent(map, pos, 'Here');
    map.setCenter(pos);
  };
  var displayContent = function(map, pos, content) {
    new google.maps.InfoWindow({
      map: map,
      position: pos,
      content: content
    });
  };

  $scope.logout = function() {
    SessionService.logout();
  };

});