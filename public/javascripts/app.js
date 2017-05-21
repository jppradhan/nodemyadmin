angular.module('app', [
    'ui.router',
    'ngCookies'
])
.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('home', {
            url : '/home',
            abstract: true,
            template : '<home></home>',
            onEnter : function (Auth, $state) {
                if(!Auth.isLoggedIn()) {
                    $state.go('login')
                }
            }
        })
        .state('home.dashboard', {
            url : '/dashboard',
            template : '<dashboard></dashboard>',
        })
        .state('login', {
            url : '/login',
            template : '<login></login>',
            onEnter : function (Auth, $state) {
                if(Auth.isLoggedIn()) {
                    $state.go('home.dashboard')
                }
            }
        })
}])


$(document).ready(function () {
    angular.bootstrap(document, ['app'])
})