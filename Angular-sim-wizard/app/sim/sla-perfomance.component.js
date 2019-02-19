'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('serviceList').
  component('serviceList', {
    templateUrl: 'sim/sla-perfomance.template.html',
    controller: ['$location', 'Sim', function serviceController($location, Sim) {    

      if (Sim.getServices() === undefined)
        this.services = [];
      else
        this.services = Sim.getServices();

      this.date = new Date();

      this.updateDisabled = function() {
        var invalidForm = false;

        this.services.forEach(s => {
          Object.keys(s).forEach(k => {
            if (s[k] == undefined || s[k] == "--Select--" || s[k] == "")
            {
              this.isDisabled = true;
              invalidForm = true;
            }
          })
        });

        if (!invalidForm)
          this.isDisabled = false;
      }

      this.addService = function() {
        var srv = {name: "", status: "--Select--", month: "--Select--"};

        this.isDisabled = true;
        this.services.push(srv);
        Sim.setServices(this.services);
      };

      this.removeService = function(service) {
        for (var i = 0; i < this.services.length; i++)
        {
          if (this.services[i] == service)
          {
            if (this.services[i].id)
              Sim.setRemoved(this.services[i].id, "service");

            this.services.splice(i, 1);
          }
        }

        this.updateDisabled();
      }

      this.redirect = function(path) {
        $location.path(path)
      }
    }
  ]}).directive('select', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.select = function(modelValue, viewValue) {
        if (modelValue != "--Select--") {
          return true;
        }

        return false
      };
    }
  };
});