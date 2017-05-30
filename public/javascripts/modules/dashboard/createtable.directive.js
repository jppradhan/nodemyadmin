angular.module('app')
    .directive('createTable', createTable)

createTable.$inject = ['Env'];

function createTable (Env) {
    var directive = {
        restrict: 'EA',
        link : link,
        replace : true,
        templateUrl : Env.MODULE_PATH + '/dashboard/createtable.html',
        controller: createTableController,
        controllerAs: 'vm',
        bindToController: true
    }

    return directive;

    function link (scope, element, attrs) {
        scope.openCreateTableModal = function (e) {
            e.preventDefault();
            var createTableModal = $('#create_table');
            createTableModal.modal('show');
        }
    }
}

createTableController.$inject = ['$scope', 'Auth']

function createTableController ($scope, Auth) {
    var vm = this;
}