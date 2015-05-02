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
    var rent = {name: 'Rent', value: 1000};
    var bills = {name: 'Bills', value: 200};
    var healthInsurance = {name: 'Health and insurance', value: 600};

    $scope.showSettings = false;
    $scope.showRatesDetails = false;
    $scope.currencySymbol = '$';
    $scope.settings = {
      workDaysInMonth: 20.0,
      workHoursInDay: 8.0
    }
    $scope.expenses = [rent, bills, healthInsurance];
    $scope.rate = {
      minimal: { yearly: 0,
                 monthly: 0,
                 daily: 0,
                 hourly: 0 },
      suggested: { yearly: 0,
                 monthly: 0,
                 daily: 0,
                 hourly: 0 }
    };

    $scope.savings = {
      monthly: 1000
    };

    $scope.$watchCollection('expenses', function(newValue, oldValue) {
      $scope.updateRates();
    });

    $scope.$watchCollection('savings', function(newValue, oldValue) {
      $scope.updateRates();
    });

    $scope.addExpense = function () {
      $scope.expenses.push($scope.expense);
      $scope.expense = '';
    };

    $scope.removeExpense = function (index) {
      $scope.expenses.splice(index, 1);
    };

    $scope.updateRates = function() {
      var workDaysInMonth = $scope.settings.workDaysInMonth;
      var workHoursInDay = $scope.settings.workHoursInDay;

      var minimal = $scope.rate.minimal;
      var suggested = $scope.rate.suggested;

      minimal.monthly = totalExpenses();
      minimal = baseRatesOnMonthly(minimal);

      suggested.monthly = minimal.monthly + parseFloat($scope.savings.monthly);
      // suggested.monthy *= 2.0; // Double it!
      suggested = baseRatesOnMonthly(suggested);
    }

    function baseRatesOnMonthly(ratesBase) {
      var workDaysInMonth = $scope.settings.workDaysInMonth;
      var workHoursInDay = $scope.settings.workHoursInDay;

      ratesBase.yearly = ratesBase.monthly * 12.0;
      ratesBase.daily = ratesBase.monthly / workDaysInMonth;
      ratesBase.hourly = ratesBase.daily / workHoursInDay;
      return ratesBase;
    }

    $scope.setSavings = function() {
      $scope.updateRates();
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
