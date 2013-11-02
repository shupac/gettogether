angular.module('GetTogetherApp')
.factory('SessionService', function($http, $q, $location) {
  var service = {
    currentUserID: null,
    currentUsername: null,
    isLoggedIn: function() {
      return !!service.currentUserID;
    },
    getUserID: function() {
      return service.currentUserID;
    },
    getUsername: function() {
      return service.currentUsername;
    },
    setUserID: function(userID) {
      service.currentUserID = userID;
    },
    setUsername: function(username) {
      service.currentUsername = username;
    },
    signup: function(username, password) {
      service.submitCred(username, password, 'signup');
    },
    login: function(username, password) {
      service.submitCred(username, password, 'login');
    },
    submitCred: function(username, password, type) {
      var url;
      if(type === 'login') {
        // url = '/login';
        url = 'http://gettogetherapp.herokuapp.com/login';
      }
      if(type === 'signup') {
        // url = '/signup';
        url = 'http://gettogetherapp.herokuapp.com/signup';
      }

      console.log(type + ': ', username, password);
      $http({
        url: url,
        method: 'POST',
        data: {
          username: username,
          password: password
        }
      })
      .success(function(data) {
        if(data.success) {
          service.setUserID(data.id);
          service.setUsername(username);
          $location.path('/');
        } else {
          console.log(data.message);
        }
      })
      .error(function() {
        console.log('signup')
      });
    },
    logout: function() {
      service.currentUserID = null;
      usersRef.child(service.currentUsername).remove();
      usersRef.off();
      $location.path('/login');
    }
  };
  return service;
});