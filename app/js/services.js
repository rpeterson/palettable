'use strict';

/* Services */

var parseUrl = "https://api.parse.com/1";
var parseHeaders = {
  "X-Parse-Application-Id": "",
  "X-Parse-REST-API-Key": "",
  "Content-Type": "application/json"
};
var sessionCookieName = 'UserCookie';

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('palettable.services', []).
  value('version', '0.1').
  factory('parseObject', function($rootScope, $http) {
      //options: { parameters: [par1, par2, par3], success: successCall, failure: failCall }
      return {
        //Create a db object on server
        create: function(className, data, callback) {
          $http.post(
            parseUrl+'/classes/'+className,
            data,
            { headers: parseHeaders }
          ).success(function(response) {
            $rootScope.$apply(function() { callback(null, response); });
          }).error(function(response) {
            $rootScope.$apply(function() { callback("Cannot submit data!"); });
          });
        },
        //Get a db object by id
        get: function(className, objectId, callback) {
          $http.get(
            parseUrl+'/classes/'+className+'/'+objectId,
            { headers: parseHeaders }
          ).success(function(response) {
            $rootScope.$apply(function() { callback(null, response); });
          }).error(function(response) {
            $rootScope.$apply(function() { callback(response.error || "Cannot get object "+className+"/"+objectId+"!"); });
          });
        },
        //Get a list of db objects with query
        query: function(className, query, callback) {
          var config = { headers: parseHeaders };
          if (query) config.params = { where: query };
          $http.get(
            parseUrl+'/classes/'+className,
            config
          ).success(function(response) {
            $rootScope.$apply(function() { callback(null, response); });
          }).error(function(response) {
            $rootScope.$apply(function() { callback(response.error || "Could not query "+className+"!"); });
          });
        },
        //Remove a db object
        remove: function(className, objectId, callback) {
          $http['delete']( //['delete'] to get around using delete js keyword
            parseUrl+'/classes/'+className+'/'+objectId,
            { headers: parseHeaders }
          ).success(function(response) {
            $rootScope.$apply(function() { callback(null, response); });
          }).error(function(response) {
            $rootScope.$apply(function() { callback(response.error || "Cannot delete object "+className+"/"+objectId+"!"); });
          });
        }
      };
  }, {$inject:['$cookieStore']}).
  factory('parseUser', function($rootScope, $http, $cookieStore) {
    return {
      //Create a user on server
      create: function(data, callback) {
        $http.post(
          parseUrl+'/users',
          data,
          { headers: parseHeaders }
        ).success(function(response) {
          $rootScope.$apply(function() { callback(null, response); });
        }).error(function(response) {
          callback(response, null);
        });
      },
      //Get a user by id
      get: function(objectId, callback) {
        $http.get(
          parseUrl+'/users/'+objectId,
          { headers: parseHeaders }
        ).success(function(response) {
          $rootScope.$apply(function() { callback(null, response); });
        }).error(function(response) {
          callback(response, null);
        });
      },
      //Remove a user
      remove: function(objectId, callback) {
        $http['delete']( //['delete'] to get around using delete js keyword
          parseUrl+'/users/'+objectId,
          { headers: parseHeaders }
        ).success(function(response) {
          $rootScope.$apply(function() { callback(null, response); });
        }).error(function(response) {
          callback(response, null);
        });
      },

      login: function(data, callback){
        $http.get(
          parseUrl+'/login',
          { headers: parseHeaders, params: data }
        ).success(function(response) {
          callback(null, response);
        }).error(function(response) {
          callback(response, null);
        });
      },

      logout: function(callback){
        $cookieStore.remove(sessionCookieName);
        callback();
      },

      store: function(data, callback){
        $cookieStore.put(sessionCookieName, data);
        callback();
      },

      check: function(){
        return $cookieStore.get(sessionCookieName);
      }
    };
  }, {$inject:['$cookieStore']});