angular.module("projectTable").component("projectTable", {
	templateUrl: 'sim/project-table.template.html',
	bindings: {
		title: '@',
		itemList: '<',
		data: '<'
	}
});