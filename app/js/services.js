'use strict';

/* Services */

angular.module('palettable.services', []).
  value('version', '0.1').
  factory('settings', function($rootScope, $http){
    var data = false;
    $http.get('js/libs/config.json').then(function(results){
        data = results.data;
    });
    return {
      get: function(){
        return data;
      }
    }
  }).
  factory('parseObject', function($rootScope, $http, settings, $cookieStore) {
      return {
        //Create a db object on server
        create: function(className, data, callback) {
          $http.post(
            settings.get().parse.url+'/classes/'+className,
            data,
            { headers: settings.get().parse.headers }
          ).success(function(response) {
            $rootScope.$apply(function() { callback(null, response); });
          }).error(function(response) {
            $rootScope.$apply(function() { callback("Cannot submit data!"); });
          });
        },
        //Get a db object by id
        get: function(className, objectId, callback) {
          $http.get(
            settings.get().parse.url+'/classes/'+className+'/'+objectId,
            { headers: settings.get().parse.headers }
          ).success(function(response) {
            $rootScope.$apply(function() { callback(null, response); });
          }).error(function(response) {
            $rootScope.$apply(function() { callback(response.error || "Cannot get object "+className+"/"+objectId+"!"); });
          });
        },
        //Get a list of db objects with query
        query: function(className, query, callback) {
          var config = { headers: settings.get().parse.headers };
          if (query) config.params = { where: query };
          $http.get(
            settings.get().parse.url+'/classes/'+className,
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
            settings.get().parse.url+'/classes/'+className+'/'+objectId,
            { headers: settings.get().parse.headers }
          ).success(function(response) {
            $rootScope.$apply(function() { callback(null, response); });
          }).error(function(response) {
            $rootScope.$apply(function() { callback(response.error || "Cannot delete object "+className+"/"+objectId+"!"); });
          });
        }
      };
  }, {$inject:['settings', '$cookieStore']}).
  factory('parseUser', function($rootScope, $http, settings, $cookieStore) {
    return {
      //Create a user on server
      create: function(data, callback) {
        $http.post(
          settings.get().parse.url+'/users',
          data,
          { headers: settings.get().parse.headers }
        ).success(function(response) {
          $rootScope.$apply(function() { callback(null, response); });
        }).error(function(response) {
          callback(response, null);
        });
      },
      //Get a user by id
      get: function(objectId, callback) {
        $http.get(
          settings.get().parse.url+'/users/'+objectId,
          { headers: settings.get().parse.headers }
        ).success(function(response) {
          $rootScope.$apply(function() { callback(null, response); });
        }).error(function(response) {
          callback(response, null);
        });
      },
      //Remove a user
      remove: function(objectId, callback) {
        $http['delete']( //['delete'] to get around using delete js keyword
          settings.get().parse.url+'/users/'+objectId,
          { headers: settings.get().parse.headers }
        ).success(function(response) {
          $rootScope.$apply(function() { callback(null, response); });
        }).error(function(response) {
          callback(response, null);
        });
      },

      login: function(data, callback){
        $http.get(
          settings.get().parse.url + '/login',
          { headers: settings.get().parse.headers, params: data }
        ).success(function(response) {
          callback(null, response);
        }).error(function(response) {
          callback(response, null);
        });
      },

      logout: function(callback){
        $cookieStore.remove(settings.get().cookie.name);
        callback();
      },

      store: function(data, callback){
        $cookieStore.put(settings.get().cookie.name, data);
        callback();
      },

      check: function(){
        return $cookieStore.get();
      }
    };
  }, {$inject:['settings', '$cookieStore']});