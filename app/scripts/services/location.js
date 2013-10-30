angular.module('GetTogetherApp')
.factory('LocationService', function($q){
  var service = {
    getLocation: function() {
      var d = $q.defer();
      navigator.geolocation.getCurrentPosition(function(position) {
        d.resolve(position);
      }, d.reject);
      return d.promise;
    }
  };
  return service;
});