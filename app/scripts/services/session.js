angular.module('GetTogetherApp')
.factory('SessionService', function($http, $q, $location) {
  var service = {
    currentUser: null,
    isLoggedIn: function() {
      return !!service.currentUser;
    },
    getUser: function() {
      return service.currentUser;
    },
    setUser: function(username) {
      service.currentUser = username;
    },
    signup: function(username, password) {
      var defer = $q.defer();
      console.log('Signup: ', username, password);
      var user = usersRef.child(username);
      user.once('value', function(user){
        if(user.val() === null) {
          service.currentUser = username;
          usersRef.child(username).child('password').set(password);
          defer.resolve();
          console.log('user created');
        } else {
          console.log('Username already exists');
        }
      });
      return defer.promise;
    },
    login: function(username, password) {
      var defer = $q.defer();
      console.log('Login: ', username, password);
      var user = usersRef.child(username);
      user.once('value', function(user){
        if(user.val() === null) {
          console.log('login: user not found');
          defer.reject();
        } else {
          if(user.val().password === password) {
            service.currentUser = username;
            defer.resolve(user);
            console.log('promise resolve: successful login');
          } else {
            console.log('wrong password');
            defer.reject();
          }
        }
      });
      return defer.promise;
    },
    logout: function() {
      service.currentUser = null;
      $location.path('/login');
    }
  };
  return service;
});