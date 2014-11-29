'use strict';

/**
 * @ngdoc overview
 * @name PasswordManager
 * @description
 * # PasswordManager
 *
 * Main module of the application.
 */
angular
  .module('PasswordManager', [
    'ngRoute',
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
