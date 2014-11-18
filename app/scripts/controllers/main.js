/*global alert, confirm */
'use strict';

/**
 * @ngdoc function
 * @name SatoshiLabsHomework.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the SatoshiLabsHomework
 */
angular.module('SatoshiLabsHomework')
  .controller('MainCtrl', function ($scope) {
    var savedPasswords = JSON.parse(localStorage.getItem('satoshiLabsHomework')) || [];

    $scope.editedItemIndex = 0;

    $scope.data = savedPasswords;

    $scope.formNew = {};
    $scope.formEdit = {};

    $scope.dismissForm = '';

    $scope.passwordDisplayed = false;
    $scope.passwordInputType = 'password';
    $scope.passwordStrength = 0;

    var verifyForm = function(form) {
      var errors = [];

      if (!form.name) {
        errors.push('item name');
      }
      if (!form.username) {
        errors.push('username');
      }
      if (!form.password) {
        errors.push('password');
      }

      if (errors.length === 0) {
        return false;
      } else {
        return 'You need to fill ' + errors.join(', ') + ' before sending the form.';
      }
    };

    var addHttpPrefix = function(address) {
      if (address && !(/^https?:[/]{2}/).test(address)) {
        return 'http://' + address;
      } else {
        return address;
      }
    };

    var turnOffPasswordDisplay = function() {
      $scope.passwordDisplayed = false;
      $scope.passwordInputType = 'password';
    };

    var saveToLocalStorage = function() {
      var save = [];
      for (var i = 0; i < savedPasswords.length; i++) {
        save.push({
          name: savedPasswords[i].name,
          website: savedPasswords[i].website,
          username: savedPasswords[i].username,
          password: savedPasswords[i].password
        });
      }

      localStorage.setItem('satoshiLabsHomework', JSON.stringify(save));
    };

    // add/edit/delete password functions

    $scope.addPassword = function(form) {
      var errors = verifyForm(form);

      if (!errors) {
        savedPasswords.push({
          name: form.name,
          website: addHttpPrefix(form.website),
          username: form.username,
          password: form.password
        });

        $scope.formNew = {};
        $scope.passwordStrength = 0;
        $scope.dismissForm = 'modal';

        saveToLocalStorage();
      } else {
        $scope.dismissForm = false;
        alert(errors);
      }
    };

    $scope.deletePassword = function(index) {
      var dialog = confirm('Do you really want to delete this password?');

      if (dialog) {
        savedPasswords.splice(index, 1);
        $scope.dismissForm = 'modal';

        saveToLocalStorage();
      } else {
        $scope.dismissForm = '';
      }
    };

    $scope.editPassword = function(index, form) {
      var errors = verifyForm(form);

      $scope.dismissForm = '';
      if (!errors) {
        var dialog = confirm('Do you really want to save changes you made?');

        if (dialog) {
          savedPasswords[index] = {
            name: form.name,
            website: addHttpPrefix(form.website),
            username: form.username,
            password: form.password
          };        
          $scope.dismissForm = 'modal';

          saveToLocalStorage();
        }
      } else {
        alert(errors);
      }
    };

    $scope.setEditedPasswordIndex = function(index) {
      $scope.editedItemIndex = index;
    };

    // Form functions

    $scope.fillEditForm = function(form) {
      turnOffPasswordDisplay();
      $scope.computePasswordStrength(form.password.length);

      $scope.formEdit = {
        name: form.name,
        website: form.website,
        username: form.username,
        password: form.password
      };
    };

    $scope.clearAddFrom = function() {
      turnOffPasswordDisplay();
      $scope.passwordStrength = 0;

      $scope.formAdd = {
        name: '',
        website: '',
        username: '',
        password: ''
      };
    };

    // Password functions

    $scope.tooglePasswordDisplay = function() {
      if ($scope.passwordDisplayed) {
        $scope.passwordInputType = 'password';
        $scope.passwordDisplayed = false;    
      } else {
        $scope.passwordInputType = 'text';
        $scope.passwordDisplayed = true;    
      }
    };

    // returns password strength in <0;100> range
    $scope.computePasswordStrength = function(passwordLength) {
      var optimalLength = 16;
      var strength = 0;
      var type = '';
      
      if (passwordLength > optimalLength) {
        strength = 100;
      } else {
        strength = Math.round(passwordLength / optimalLength * 100);
      }
      
      if (strength < 50) {
        type = 'progress-bar-danger';
      } else if (strength < 80) {
        type = 'progress-bar-warning';
      } 

      $scope.passwordStrength = strength;
      $scope.progressbarType = type;
    };

  });
