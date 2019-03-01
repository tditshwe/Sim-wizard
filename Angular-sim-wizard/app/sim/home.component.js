'use strict';

angular.module("home").component("home", {
	templateUrl: 'sim/home.template.html',
	controller: function HomeController($location, $http, Sim, SweetAlert) {
		var ctrl = this;
		this.currentButton = "Create Wizard";
		this.wizardExists = false;
		this.dataError = false;
		this.dataStatus = "No data"
		this.projectData = {error: false, status: "No data", loading: false}
		this.deleteValue = "Delete Wizard";

		this.$onInit = function()
		{
			function taskFilter(task) {
		      return task.category == this;
		    }

		    ctrl.loading = true;
		    ctrl.projectData.loading = true;
		    $http.get('config.json').then(function(config) {
		    	Sim.setConfig(config.data);

				$http.get(config.data.apiWizard).then(function(response) {
					ctrl.projects = [{
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

					ctrl.services = [];

					if (response.data.tasks.length != 0 || response.data.services.length != 0)
					{
						ctrl.currentButton = "Edit Wizard";
						ctrl.wizardExists = true;

						response.data.tasks.forEach(e => {
							e.targetDate = dateFormat(e.targetDate, "dd/mm/yyyy");
						});

					    let projects = response.data.tasks.filter(taskFilter, "project"); 
					    let issues = response.data.tasks.filter(taskFilter, "issue");
					    let opportunities = response.data.tasks.filter(taskFilter, "opportunity");

					    ctrl.projects[0].itemList = issues;
					    ctrl.projects[1].itemList = projects;
					    ctrl.projects[2].itemList = opportunities;
					    ctrl.pivotRows = response.data.pivotRows;
					    ctrl.services = response.data.services;

					    //alert(JSON.stringify(ctrl.pivotRows[0].rowData.Jan));

						Sim.setProjects(ctrl.projects);
						Sim.setServices(ctrl.services);
					}
				}).catch(function(error) {
					ctrl.dataError = true;
					ctrl.dataStatus = "Data error!"
					ctrl.projectData.error = true;
					ctrl.projectData.status = "Data error!";

	      			SweetAlert.swal({
			        	type: "error",
			            title: "Connection failed",
			            text: setMessage(error, "Error fetcing data")
			        });
	      		}).
	      		finally(function() {
	      			ctrl.loading = false;
	      			ctrl.projectData.loading = false;
	      		});
	      	});
		}

		this.new = function() {
			this.projects.forEach(p => {
				p.itemList.forEach(e => {
					let dateTokens = e.targetDate.split('/');
					let targetDate = dateTokens[1] + '/' + dateTokens[0] + '/' + dateTokens[2];
					e.targetDate = new Date(targetDate);
				});
			})

	        $location.path('/services')
	    }

	    this.delete = function() {
	    	SweetAlert.swal({
	            title: "Do you really want to delete wizard?", //Bold text
	            text: "Your will not be able to recover it", //light text
	            type: "warning", //type -- adds appropiriate icon
	            showCancelButton: true, // displays cancel btton
	            confirmButtonColor: "#DD6B55",
	            confirmButtonText: "Yes, delete it!",
	            closeOnConfirm: false, //do not close popup after click on confirm, usefull when you want to display a subsequent popup
	            closeOnCancel: true
	        }, 
	        function(canDelete) { //Function that triggers on user action.
	            if(canDelete) {
	            	ctrl.deleteValue = "Deleting...";

	            	$http.delete(Sim.getConfig().apiWizard).then(function()
			    	{
			    		for (let i = 0; i < ctrl.projects.length; i++)
			    		{
			    			ctrl.projects[i].itemList = [];
			    		}

			    		Sim.setServices([]);
			    		ctrl.currentButton = "New Wizard";
						ctrl.wizardExists = false;
			    		SweetAlert.swal("Wizard Deleted!");
			    	}).catch(function(error) {
		      			SweetAlert.swal({
				        	type: "error",
				            title: "Deleting Error",
				            text: setMessage(error, "Error deleting wizard")
				        });
		      		}).
		      		finally(function() {
		      			ctrl.deleteValue = "Delete Wizard";
		      		});	                
	            }
	        });
	    }

	    function setMessage(error, m)
	    {
	    	var message;

	    	if (error.data)
              message = error.data;
            else
              message = m;

        	return message
	    }
	}
});