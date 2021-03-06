var fbRef = new Firebase('https://gettogether.firebaseio.com');
var usersRef = fbRef.child('users');
var groupsRef = fbRef.child('groups');

angular.module('GetTogetherApp', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    controller: 'MainCtrl',
    templateUrl: 'views/main.html'
  })
  .when('/signup', {
    controller: 'SignupCtrl',
    templateUrl: 'views/signup.html'
  })
  .when('/login', {
    controller: 'LoginCtrl',
    templateUrl: 'views/login.html'
  })
  .otherwise({
    redirectTo: '/'
  });
  $locationProvider.html5Mode(true);
});