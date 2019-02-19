
angular.module('core.sim').
	factory('Sim', function() {
		var services, projects, removed = {};

        return {
            setServices: setServices,
            getServices: getServices,
            setProjects: setProjects,
            getProjects: getProjects,
            getRemoved: getRemoved,
            setRemoved: setRemoved,
            resetRemoved: resetRemoved
        };

        function getServices() {
            return services;
        }

        function setServices(sList) {
            services = sList;
        }

        function getProjects() {
            return projects;
        }

        function setProjects(pList) {
            projects = pList;
        }

        function getRemoved()
        {
            return removed;
        }

        function setRemoved(id, type) {
            removed[id] = type; 
        }

        function resetRemoved()
        {
            removed = {};
        }
	}
);