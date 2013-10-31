angular.module('GetTogetherApp')
.factory('LocationService', function($http, $q, SessionService){
  var d = $q.defer();
  var service = {
    getLocation: function(map) {
      service.map = map;
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          d.resolve(position);
        });
      } else {
        alert("Browser doesn't support Geolocation");
      }
      return d.promise;
    },
    displayMap: function(position) {
      var username = SessionService.getUsername();
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      service.displayContent(service.map, pos, username);
      service.map.setCenter(pos);
    },
    displayContent: function(map, pos, username) {
      new google.maps.InfoWindow({
        map: service.map,
        position: pos,
        content: username
      });
    },
    storePosition: function(position) {
      var username = SessionService.getUsername();
      usersRef.child(username).child('position').set(position);
      console.log('Position stored in Firebase');
    }
  };
  return service;
});