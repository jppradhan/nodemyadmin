angular
    .module('app')
    .factory('dataService', dataService)

dataService.$inject = ['$http', 'Env', 'Auth']

function dataService ($http, Env, Auth) {
    return {
        getDatabase : _getDatabase
    }

    function _getDatabase () {
        return $http({
            url : Env.BASE_URL + '/showdbs',
            method : 'GET',
            headers : {
                'Authorization' : Auth.getToken()
            }
        })
    }
}