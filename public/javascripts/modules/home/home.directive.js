angular.module('app')
    .directive('home', home)

login.$inject = ['Env', 'sharedVar'];

function home (Env, sharedVar) {
    var directive = {
        restrict: 'EA',
        link : link,
        templateUrl : Env.MODULE_PATH + '/home/home.html',
        controller: HomeController,
        controllerAs: 'vm',
        bindToController: true
    }

    return directive;

    function link (scope, element, attrs) {
        scope.selectedTable = 0;
        sharedVar.tableName = '';

        scope.selectTable = function (index) {
            scope.selectedTable = index;
            sharedVar.tableName = scope.vm.tables[scope.selectedTable];
            sharedVar.loadTable();
        }
        
        scope.selectDatabase = function (event, context) {
            scope.vm.getTables(scope.vm.selectedDB);
        }
    }
}

HomeController.$inject = ['$scope', 'Auth', 'dataService', 'sharedVar']

function HomeController ($scope, Auth, DataService, sharedVar) {
    var vm = this;

    vm.$onInit = init;
    vm.selectedDB = '';
    
    function init () {
        vm.getDataBases();
    }

    vm.getTables = function (database) {
        return DataService.getTables(database)
            .then(function (res) {
                vm.tables = res.data.data;
                sharedVar.tableName = vm.tables[0];
                $scope.homeLoaded = true;
            })
    }
    
    vm.getDataBases = function () {
        $scope.homeLoaded = false;
        return DataService.getDatabase()
            .then(function (res) {
                vm.databases = res.data.data;
                vm.selectedDB = vm.databases[0]
            })
            .then(function () {
                vm.getTables(vm.selectedDB);
            })
    }
}