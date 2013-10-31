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
    clearInterval(running);
  };

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

  var getLocation = function() {
    console.log('running');
    LocationService
    .getLocation(map)
    .then(function(position) {
      LocationService.storePosition(position);
    }, function(){console.log('location promise error')});
  };

  var running = setInterval(getLocation, 5000);

  usersRef.on('child_added', function(user) {
    LocationService.displayContent(user.val().position, user.val().username).setMap(map);
    console.log(user.val());
  });

  usersRef.on('child_removed', function(user) {
    // TODO remove user from DOM
    
  });

  usersRef.on('child_changed', function(user) {
    LocationService.displayContent(user.val().position, user.val().username).setMap(map);
  });
});