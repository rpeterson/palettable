'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('palettable.services', []).
   value('version', '0.1');
  // factory('parse', function($rootScope, $http) {
  //   var parseUrl = "https://api.parse.com/1"
  //   //options: { parameters: [par1, par2, par3], success: successCall, failure: failCall }
  //   return {
  //     //Create a db object on server
  //     create: function(className, data, callback) {
  //       $http.post(
  //         parseUrl+'/classes/'+className,
  //         data,
  //         { headers: parseHeaders }
  //       ).success(function(response) {
  //         forge.logging.log("added object successfully!");
  //         $rootScope.$apply(function() { callback(null, response); });
  //       }).error(function(response) {
  //         forge.logging.log("error adding object!");
  //         $rootScope.$apply(function() { callback("Cannot submit data!"); });
  //       });
  //     },
  //     //Get a db object by id
  //     get: function(className, objectId, callback) {
  //       $http.get(
  //         parseUrl+'/classes/'+className+'/'+objectId,
  //         { headers: parseHeaders }
  //       ).success(function(response) {
  //         $rootScope.$apply(function() { callback(null, response); });
  //       }).error(function(response) {
  //         $rootScope.$apply(function() { callback(response.error || "Cannot get object "+className+"/"+objectId+"!"); });
  //       });
  //     },
  //     //Get a list of db objects with query
  //     query: function(className, query, callback) {
  //       var config = { headers: parseHeaders };
  //       if (query) config.params = { where: query };
  //       $http.get(
  //         parseUrl+'/classes/'+className,
  //         config
  //       ).success(function(response) {
  //         $rootScope.$apply(function() { callback(null, response); });
  //       }).error(function(response) {
  //         $rootScope.$apply(function() { callback(response.error || "Could not query "+className+"!"); });
  //       });
  //     },d
  //     //Remove a db object
  //     remove: function(className, objectId, callback) {
  //       $http['delete']( //['delete'] to get around using delete js keyword
  //         parseUrl+'/classes/'+className+'/'+objectId,
  //         { headers: parseHeaders }
  //       ).success(function(response) {
  //         $rootScope.$apply(function() { callback(null, response); });
  //       }).error(function(response) {
  //         $rootScope.$apply(function() { callback(response.error || "Cannot delete object "+className+"/"+objectId+"!"); });
  //       });
  //     }
  //   };
  // });