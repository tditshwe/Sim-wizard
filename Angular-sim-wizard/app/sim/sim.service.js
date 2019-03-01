
angular.module('core.sim').
	factory('Sim', function() {
		var services, projects, config, removed = {};

        return {
            setServices: setServices,
            getServices: getServices,
            setProjects: setProjects,
            getProjects: getProjects,
            getRemoved: getRemoved,
            setRemoved: setRemoved,
            resetRemoved: resetRemoved,
            setConfig: setConfig,
            getConfig: getConfig
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

        function getConfig()
        {
            return config;
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

        function setConfig(con) {
            config = con;
        }
	}
);