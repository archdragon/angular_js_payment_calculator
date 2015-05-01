'use strict';

/**
 * @ngdoc function
 * @name payCalculatorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the payCalculatorApp
 */
angular.module('payCalculatorApp')
  .controller('MainCtrl', function ($scope) {
    $scope.expenses = [
      'Flat and office rent',
      'Flat and office bills',
      'ZUS',
      'Servers',
      'Health and medicine'
    ];
    $scope.addExpense = function () {
      $scope.expenses.push($scope.expense);
      $scope.expense = '';
    };
    $scope.removeExpense = function (index) {
        $scope.expenses.splice(index, 1);
    };
  });
