angular
    .module('app')
    .factory('dataService', dataService)

dataService.$inject = ['$http', 'Env', 'Auth']

function dataService ($http, Env, Auth) {
    return {
        getDatabase : _getDatabase,
        getTables : _getTables,
        getTable : _getTable
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

    function _getTables (database) {
        return $http({
            url : Env.BASE_URL + '/showtables' + '/' + database,
            method : 'GET',
            headers : {
                'Authorization' : Auth.getToken()
            }
        })
    }

    function _getTable (table) {
        return $http({
            url : Env.BASE_URL + '/table' + '/' + table,
            method : 'GET',
            headers : {
                'Authorization' : Auth.getToken()
            }
        })
    }
}