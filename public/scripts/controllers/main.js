angular.module('GetTogetherApp')
.run(function($rootScope, $location, SessionService) {
  console.log('redirect');
  $rootScope.$on("$routeChangeStart", function(evt, next, current) {
    if (!SessionService.isLoggedIn() && next.controller !== "SignupCtrl") {
        $location.path('/login');
    }
  });
})
.controller('LoginCtrl', function($scope, SessionService, $location){
  $scope.signedIn = SessionService.isLoggedIn();
  $scope.signup = function(username, password){
    SessionService.signup(username, password);
  };
  $scope.login = function(username, password){
    SessionService.login(username, password);
  };
})
.controller('MainCtrl', function($scope, SessionService, LocationService){
  $scope.username = SessionService.getUsername();
  $scope.logout = function() {
    SessionService.logout();
    LocationService.logout();
  };

  var mapOptions = {
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // getting initial location
  LocationService.initializeMap(map);
  LocationService.startListeners();

  // 

});