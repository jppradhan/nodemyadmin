angular.module('app')
    .directive('home', home)

login.$inject = ['Env'];

function home (Env) {
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
        scope.selectedDB = 0;

        scope.selectDatabase = function (index) {
            scope.selectedDB = index;
        }
    }
}

HomeController.$inject = ['$scope', 'Auth', 'dataService']

function HomeController ($scope, Auth, DataService) {
    var vm = this;

    vm.$onInit = init;
    
    function init () {
        getDataBases();
    }
    
    function getDataBases () {
        return DataService.getDatabase()
            .then(function (res) {
                vm.databases = res.data.data;
            })
    }
}