'use strict';

/**
 * @ngdoc overview
 * @name SatoshiLabsHomework
 * @description
 * # SatoshiLabsHomework
 *
 * Main module of the application.
 */
angular
  .module('SatoshiLabsHomework', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngClipboard'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
