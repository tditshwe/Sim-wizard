'use strict';

// Define the `phonecatApp` module
angular.module('phonecatApp', [
  'ngRoute',
  'core',
  'serviceList',
  'projectList',
  'home'
]);

angular.module('serviceList', ['core.sim']);
angular.module('projectList', ['core.sim', 'oitozero.ngSweetAlert']);
angular.module('home', ['projectTable', 'oitozero.ngSweetAlert']);
angular.module('projectTable', [])
angular.module('core', ['core.sim']);
angular.module('core.sim', []);
