angular.module('GetTogetherApp')
.factory('LocationService', function($http){
  var service = {
    getLocation: function(map) {
      debugger;
      service.map = map;
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(service.displayMap);
      } else {
        alert("Browser doesn't support Geolocation");
      }
    },
    displayMap: function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      service.displayContent(service.map, pos, 'Here');
      service.map.setCenter(pos);
    },
    displayContent: function(map, pos, content) {
      new google.maps.InfoWindow({
        map: service.map,
        position: pos,
        content: content
      });
    }
  };
  return service;
});