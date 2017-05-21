angular
    .module('app')
    .service('Auth', Auth)

Auth.$inject = ['$cookies']

function Auth ($cookies) {
    this.user = {
        isLoggedIn : false,
        token : ''
    }

    this.init = function() {
        var token = $cookies.get('token');
        if(token) {
            this.user.isLoggedIn = true;
            this.user.token = token;
        }
    }

    this.login = function (token) {
        this.user.isLoggedIn = true;
        this.user.token = token;
        $cookies.put('token', token);
    }

    this.logout = function () {
        this.user = {
            isLoggedIn : false,
            token : ''
        }
        $cookies.remove('token', token);
    }

    this.isLoggedIn = function () {
        return this.user.isLoggedIn;
    }

    this.getToken = function () {
        return this.user.token;
    }

    this.init();
}