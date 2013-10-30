angular.module('GetTogetherApp')
.factory('SessionService', function($http, $q, $location) {
  var fbRef = new Firebase('https://gettogether.firebaseio.com');
  var usersRef = fbRef.child('users');
  var groupsRef = fbRef.child('groups');
  var service = {

    currentUser: null,
    isLoggedIn: function() {
      return !!service.currentUser;
    },
    setUser: function(username) {
      service.currentUser = username;
    },
    signup: function(username, password) {
      var defer = $q.defer();
      console.log('Signup: ', username, password);
      usersRef.child(username).child('password').set(password, function(error) {
        if(error) {
          console.log('error during signup');
          defer.reject();
        } else {
          service.currentUser = username;
          defer.resolve();
          console.log('successful signup');
        }
      });
      return defer.promise;
    },
    login: function(username, password) {
      var defer = $q.defer();
      console.log('Login: ', username, password);
      var user = usersRef.child(username).on('value', function(user){
        if(user.val() === null) {
          console.log('user not found');
          defer.reject();
        } else {
          if(user.val().password === password) {
            service.currentUser = username;
            defer.resolve(user);
            console.log('successful login');
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