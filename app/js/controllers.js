'use strict';

/* Controllers */

function AppCtrl($rootScope, $scope, $http) {
  $('.dropdown-menu').find('form').click(function (e) {
    e.stopPropagation();
  });
  $('#signUpModal').modal({
    keyboard: false,
    backdrop: true,
    show: false
  });
}
AppCtrl.$inject = ['$rootScope', '$scope'];

function UserCtrl($scope, $defer, UserService) {
  
  $scope.loaded = false;
  
  $scope.regErrMsg = false;

  $scope.isLoggedIn = false;

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
  
  $defer(function(){
    $scope.isLoggedIn = UserService.check();
    $scope.loaded = true;
  }, 100);

}
UserCtrl.$inject = ['$scope', '$defer', 'parseUser']