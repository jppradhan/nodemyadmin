angular.module('app')
    .directive('login', login)

login.$inject = ['Env'];

function login (Env) {
    var directive = {
        restrict: 'EA',
        link : link,
        templateUrl : Env.MODULE_PATH + '/login/login.html',
        controller: LoginController,
        controllerAs: 'vm',
        bindToController: true
    }

    return directive;
    
    function link (scope, element, attrs) {
        
    }
}

LoginController.$inject = ['$scope', '$state', 'loginService', 'Auth']

function LoginController ($scope, $state, loginService, Auth) {
    var vm = this;

    vm.loginUser = function () {
        return loginService
            .login(vm.user)
            .then(function (res) {
                return Auth.login(res.data.token);
            })
            .then(function () {
                return $state.go('home.dashboard');
            })
    }
}