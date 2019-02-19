'use strict';

angular.
  module('phonecatApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/home', {
          template: '<home></home>'
        }).
        when('/services', {
          template: '<service-list></service-list>'
        }).
        when('/projects', {
          template: '<project-list></project-list>'
        }).
        otherwise('/home');
    }
  ]);
