angular
    .module('app')
    .factory('loginService', loginService)

loginService.$inject = ['$http', 'Env']
function loginService ($http, Env) {
    return {
        login : _login
    }
    
    function _login( user ) {
        return $http({
            url : Env.BASE_URL + '/login',
            method : 'POST',
            data : user
        })
    }
}