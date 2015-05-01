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

    $scope.settings = {
      workDaysInMonth: 20.0,
      workHoursInDay: 8.0
    }
    $scope.expenses = [rent, zus];
    $scope.rate = {
      minimal: { yearly: 0,
                 monthly: 0,
                 daily: 0,
                 hourly: 0 }
    };

    $scope.$watchCollection('expenses', function(newValue, oldValue) {
      updateRates();
    });

    $scope.addExpense = function () {
      $scope.expenses.push($scope.expense);
      $scope.expense = '';
    };

    $scope.removeExpense = function (index) {
      $scope.expenses.splice(index, 1);
    };

    function updateRates() {
      var workDaysInMonth = 20.0;
      var workHoursInDay = 8.0;
      var minimal = $scope.rate.minimal;
      minimal.monthly = totalExpenses();
      minimal.yearly = totalExpenses() * 12.0;
      minimal.daily = minimal.monthly / workDaysInMonth;
      minimal.hourly = minimal.daily / workHoursInDay;
    }

    function totalExpenses() {
      var aLength = $scope.expenses.length;
      var sum = 0;
      for(var i=0; i<aLength; i++) {
        if($scope.expenses[i] !== undefined) {
          sum += parseFloat($scope.expenses[i].value);
        }
      }
      return sum;
    }
  });
