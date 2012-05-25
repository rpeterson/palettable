'use strict';

/* Controllers */


function AppCtrl($rootScope, $scope) {

}
AppCtrl.$inject = ['$rootScope', '$scope'];

function UserCtrl($scope, UserService) {

  $scope.regErrMsg = false;

  $scope.isLoggedIn = UserService.check();

  $scope.gravatar = "";

  $scope.$watch('isLoggedIn', function() {
    if($scope.isLoggedIn) {
      $scope.gravatar = "http://www.gravatar.com/avatar/" + jQuery.md5($scope.isLoggedIn.email);
    } else {
      $scope.gravatar = "";
    }
  });

  $scope.register = function(user) {
    UserService.create(user, function(err, results){
      if(err){
        switch(err.code){
          case 202:
          case 203:
            $scope.regErrMsg = err.error.charAt(0).toUpperCase() + err.error.slice(1);
            break;
          default:
            break;
        }
      } else {
        UserService.store(results, function(){
          $scope.isLoggedIn = UserService.check();
        });
      }
    });
  };
  
  $scope.login = function(user) {
    UserService.login(user, function(err, results){
      if(err) {
        console.log(err);
      } else {
        UserService.store(results, function(){
          $scope.isLoggedIn = UserService.check();
        });
      }
    });
  };

  $scope.logout = function() {
    UserService.logout(function(){
      $scope.isLoggedIn = UserService.check();
    });
  };

}
UserCtrl.$inject = ['$scope', 'parseUser']