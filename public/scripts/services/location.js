angular.module('GetTogetherApp')
.factory('LocationService', function($http, $q, SessionService){
  var d = $q.defer();
  var service = {
    markers: {},
    initializeMap: function(map) {
      service.map = map;
      service
      .getLocation(map)
      .then(function(position) {
        service.displayMap(position);
        service.storePosition(position);
      }, function(){console.log('location promise error')});
    },
    getLocation: function(map) {
      if(navigator.geolocation) {
        // service.watchID = navigator.geolocation.watchPosition(service.watchPosition);
        service.watchID = navigator.geolocation.watchPosition(service.watchPosition, function(){
          console.log('getCurrentPosition error')}, {'enableHighAccuracy':true,'timeout':5000,'maximumAge':0});
        navigator.geolocation.getCurrentPosition(function(position) {
          d.resolve(position);
        }, function(){console.log('getCurrentPosition error')}, {'enableHighAccuracy':true,'timeout':5000,'maximumAge':0});
      } else {
        alert("Browser doesn't support Geolocation");
      }
      return d.promise;
    },
    watchPosition: function(position) {
      // alert('watchPosition: user moved');
      console.log('Watch location:', SessionService.getUsername(), ' moved');
      service.storePosition(position);
    },
    displayMap: function(position) {
      var username = SessionService.getUsername();
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      service.map.setCenter(pos);
    },
    displayMarker: function(position, username) {
      console.log(position, username);
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var marker = new google.maps.Marker({
        // map: service.map,
        position: pos,
        title: username
      });

      var infowindow = new google.maps.InfoWindow({
        content: marker.title
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(service.map,marker);
      });
      return marker;
    },
    storePosition: function(position) {
      var username = SessionService.getUsername();
      usersRef.child(username).set({username: username, position: position});
      console.log('Position stored in Firebase');
    },
    startListeners: function() {
      usersRef.on('child_added', function(user) {
        console.log(user.val().username, 'logged in');
        var marker = service.displayMarker(user.val().position, user.val().username);
        service.markers[user.val().username] = marker;
        marker.setMap(service.map);
      });

      usersRef.on('child_removed', function(user) {
        console.log(user.val().username, 'logged out');
        service.markers[user.val().username].setMap(null);
        delete service.markers[user.val().username];
      });

      usersRef.on('child_changed', function(user) {
        console.log(user.val().username, 'marker moved');
        // alert(user.val().username + 'moved');
        var position = user.val().position;
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        service.markers[user.val().username].setPosition(pos);
      });
    },
    logout: function() {
      console.log('clearWatch', service.watchID);
      navigator.geolocation.clearWatch(service.watchID);
    }
  };
  return service;
});