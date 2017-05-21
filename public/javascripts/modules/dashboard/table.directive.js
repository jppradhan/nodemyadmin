angular.module('app')
    .directive('tableDir', table)

table.$inject = ['Env'];

function table (Env) {
    var directive = {
        restrict: 'EA',
        link : link,
        templateUrl : Env.MODULE_PATH + '/dashboard/table.html',
        controller: TableController,
        controllerAs: 'vm',
        bindToController: true
    }

    return directive;

    function link (scope, element, attrs) {

    }
}

TableController.$inject = ['$scope', 'Auth', 'dataService', 'sharedVar']

function TableController ($scope, Auth, DataService, sharedVar) {
    var vm = this;

    vm.$onInit = init;

    vm.getTable = function (table) {
        return DataService.getTable(table)
            .then(function (res) {
                vm.rows = res.data.data;
                vm.headers = res.data.table_headers;
            })
    }

    sharedVar.loadTable = function () {
        return vm.getTable(sharedVar.tableName);
    }

    function init () {
        vm.getTable(sharedVar.tableName);
    }
}