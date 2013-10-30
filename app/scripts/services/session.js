angular.module('GetTogetherApp')
.factory('SessionService', function($http, $location) {
  var service = {
    var fbRef = new Firebase(firebaseUrl);
    var usersRef = fbRef.child('users');
    var groupsRef = fbRef.child('groups');

    currentUser: null,
    isLoggedIn: function() {
      return !!service.currentUser;
    },
    login: function(username, password) {
      console.log('Login: ', username, password);
      $http({
        url: usersRef.child('')
        method: 'GET'
      })
      .success(function(data) {
        console.log(data);
        // TODO assign currentUser
      })
      .error(function(data) {
        // report error
      });
      service.currentUser = id;
      $location.path('/');
    },
    signup: function(username, password) {
      console.log('Signup: ', username, password);
      usersRef.child(username).child('password').set(password, function(error) {
        if(error) {
          console.log('error during signup');
        } else {
          currentUser = username;
          $location.path('/');
        }
      });

      // $http({
      //   url: firebaseUrl + '/users/',
      //   method: 'POST',
      //   data: {
      //     username: username,
      //     password: password
      //   }
      // })
      // .success(function(data) {
      //   // TODO assign currentUser
      // })
      // .error(function(data) {
      //   // report error
      // });
      // service.currentUser = id;
    },
    logout: function() {
      service.currentUser = null;
      $location.path('/login');
    }
  };
  return service;
});