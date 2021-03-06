'use strict';

angular.module("projectList").component("projectList", {
	templateUrl: 'sim/projects.template.html',
	controller: ['$location', '$http', 'Sim', 'SweetAlert', function projectController($location, $http, Sim, SweetAlert) {
		if (Sim.getProjects() === undefined)
			this.projects = [{
				stage: "Issues",
				itemList: [],
				category: "issue"
			},
			{
				stage: "Projects",
				itemList: [],
				category: "project"
			},
			{
				stage: "Opportunities",
				itemList: [],
				category: "opportunity"
			}];
		else
			this.projects = Sim.getProjects();

    	this.step = 0;
      this.submitValue = "Submit";
      let ctrl = this;

      this.updateDisabled = function() {
        var invalidForm = false;

        this.projects[this.step].itemList.forEach(p => {
                    Object.keys(p).forEach(k => {
            if (p[k] == undefined || p[k] == "--Select--" || p[k] == "")
            {
              this.isDisabled = true;
              invalidForm = true;
            }
          })
        });

        if (!invalidForm)
          this.isDisabled = false;
      }

    	this.addProject = function() {
        	let project = {description: "", owner: "", status: "--Select--", targetDate: "", category: this.projects[this.step].category};

          this.isDisabled = true;
        	this.projects[this.step].itemList.push(project);
        	Sim.setProjects(this.projects);
      	};

      	this.removeProject = function(project) {
	        for (var i = 0; i < this.projects[this.step].itemList.length; i++)
	        {
	          if (this.projects[this.step].itemList[i] == project)
	          {
              if (this.projects[this.step].itemList[i].id)
                Sim.setRemoved(this.projects[this.step].itemList[i].id, "task");
	            this.projects[this.step].itemList.splice(i, 1);
	          }

            this.updateDisabled();
	        }
      	}

        this.cancel = function()
        {
          Sim.resetRemoved();
          $location.path('/home');
        }

      	this.next = function()
      	{
      		this.step += 1;
      	}

      	this.back = function()
      	{
      		if (this.step == 0)
      			$location.path('/services');
      		else
      			this.step -= 1;
      	}

      	this.submit = function()
      	{
      		var tasks = [];
          this.submitValue = "Submiting..."

      		this.projects.forEach(p => {
      			var tList = p.itemList;

      			tList.forEach(t => {
      				tasks.push(t);
      			});
      		});

      		var body = {
      			services: Sim.getServices() === undefined ? [] : Sim.getServices(),
      			tasks: tasks,
            removed: Sim.getRemoved()
      		};

      		$http.post(Sim.getConfig().apiWizard, body).then(function(response) {
      			$location.path('/home');
            Sim.resetRemoved();
      		})
      		.catch(function(error) {
            var message;

            if (error.data)
              message = error.data;
            else
              message = "Error submiting wizard";

      			SweetAlert.swal({
              type: "error",
                title: "Submition error",
                text: message
            });

            ctrl.submitValue = "Submit";
      		});
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