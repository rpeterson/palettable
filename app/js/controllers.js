'use strict';

/* Controllers */


function AppCtrl($rootScope, $scope) {
  $scope.login = function(user){
    $scope.$emit('event:loginRequest', user.username, user.password);
  };
}
AppCtrl.$inject = ['$rootScope', '$scope'];

function UserCtrl($scope, parseUserService) {
  $scope.register = function() {
    parseUserService.create();
  };
}
UserCtrl.$inject = ['$scope','parseUser']