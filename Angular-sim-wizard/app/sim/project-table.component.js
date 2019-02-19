angular.module("projectTable").component("projectTable", {
	templateUrl: 'sim/project-table.template.html',
	/*controller: function tableController()
	{
		this.$onChanges = function() {
			this.itemList.forEach(e => {
				e.targetDate = dateFormat(new Date(e.targetDate), 'dd/mm/yyyy');
			});
		}
	},*/
	bindings: {
		title: '@',
		itemList: '<'
	}
});