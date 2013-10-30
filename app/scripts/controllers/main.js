angular.module('GetTogetherApp')
.run(function($rootScope, $location, SessionService) {
  $rootScope.$on('$routeChangeStart', function(evt, next, current){
    if(!SessionService.isLoggedIn()) {
      if(next.controller !== 'SignupCtrl') {
        $location.path('/login');
      }
    }
  });
})
.factory('HttpService', function($http, $q) {
  var service = {

  };
  return service;
})
.controller('SignupCtrl', function($scope, $http, SessionService, $location){
  $scope.submit = function(){
    SessionService.login($scope.user.username, $scope.user.password);
  };
})
.controller('LoginCtrl', function($scope, $http, SessionService, $location){
  $scope.submit = function(){
    SessionService.login($scope.user.username, $scope.user.password);
  };
})
.controller('MainCtrl', function($scope, $http, SessionService){
  $scope.logout = function() {
    SessionService.logout();
  };
});

  // var getLocation = function(user) {
  //   navigator.geolocation.getCurrentPosition(user.updateLocation.bind(user), handleError);
  // };

  // var handleError = function(error) {
  //   console.log(error.code);
  // }

  // // **************** Backbone Model ******************

  //   firebase: new Firebase("https://maproom.firebaseio.com")

  // // *************** Backbone View ********************

  //     var pos = new google.maps.LatLng(this.model.get('position').coords.latitude, this.model.get('position').coords.longitude);
  //     var marker = new google.maps.Marker({
  //       position: pos,
  //       map: map,
  //       title: this.model.name
  //     });
  //     map.setCenter(pos);

  // $(document).ready(function() {
  //   if(navigator.geolocation) {
  //     getLocation(me);
  //   }



  //   var mapOptions = {
  //     zoom: 13,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   };
  //   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  // });