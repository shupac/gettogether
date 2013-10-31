angular.module('GetTogetherApp')
.factory(function(SessionService, $location, $q){
  var defer = $q.defer();
  var service = {
    service.auth: new FirebaseSimpleLogin(fbRef, function(error, user) {
      if (error) {
        alert(error);
      } else if (user) {
        console.log(user);
        defer.resolve(user);
      } else {
        // user is logged out
      }
      return defer.promise;
    },
    service.fbLogin: function() {
      service.auth.login('facebook');
    }
  };
  return service;
});