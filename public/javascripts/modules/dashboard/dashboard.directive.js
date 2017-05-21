angular.module('app')
    .directive('dashboard', dashboard)

dashboard.$inject = ['Env'];

function dashboard (Env) {
    var directive = {
        restrict: 'EA',
        link : link,
        templateUrl : Env.MODULE_PATH + '/dashboard/dashboard.html',
        controller: DashboardController,
        controllerAs: 'vm',
        bindToController: true
    }

    return directive;

    function link (scope, element, attrs) {
        //console.log(scope.selectedTable)
    }
}

DashboardController.$inject = ['$scope', 'Auth']

function DashboardController ($scope, Auth) {
    var vm = this;
}