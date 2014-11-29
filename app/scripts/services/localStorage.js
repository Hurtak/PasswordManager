'use strict';

/**
* Services that persists and retrieves passwords from localStorage.
*/
angular.module('PasswordManager')
  .factory('StorageService', function () {
    var storageName = 'passwords';

    return {
      get: function () {
        return JSON.parse(localStorage.getItem(storageName) || '[]');
      },

      put: function (passwords) {
        localStorage.setItem(storageName, JSON.stringify(passwords));
      }
    };

  });
