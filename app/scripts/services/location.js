angular.module('GetTogetherApp')
.factory('LocationService', function($http, $q, SessionService){
  var username = SessionService.getUser();
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
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      service.displayContent(service.map, pos, username);
      service.map.setCenter(pos);
    },
    displayContent: function(map, pos, content) {
      new google.maps.InfoWindow({
        map: service.map,
        position: pos,
        content: content
      });
    },
    storePosition: function(position) {
      usersRef.child(username).child('position').set(position);
      console.log('Position stored in Firebase');
    }
  };
  return service;
});