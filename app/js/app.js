'use strict';

// Declare app level module which depends on filters, and services
angular.module('palettable', ['ngCookies', 'palettable.filters', 'palettable.services', 'palettable.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {template: 'partials/home.html', controller: AppCtrl});
    $routeProvider.when('/about', {template: 'partials/about.html', controller: AppCtrl});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);