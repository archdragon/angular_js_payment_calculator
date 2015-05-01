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
    var rent = {name: 'Rent', value: '2000'};
    var zus = {name: 'ZUS', value: '1200'};

    $scope.expenses = [rent, zus];
    $scope.rate = {
      minimal: { yearly: 0, monthly: 0, daily: 0 }
    };

    $scope.$watchCollection('expenses', function(newValue, oldValue) {
    });

    $scope.addExpense = function () {
      $scope.expenses.push($scope.expense);
      $scope.expense = '';
    };

    $scope.removeExpense = function (index) {
        $scope.expenses.splice(index, 1);
    };

    function updateRates() {
    }
  });
