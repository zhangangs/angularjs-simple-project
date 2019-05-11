(function () {
    'use strict';

    angular
        .module('App')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', '$state', 'Auth', 'Principal', 'LoginService', 'utils', '$rootScope'];

    function NavbarController($scope, $state, Auth, Principal, LoginService, utils, $rootScope) {
        var vm = this;

        vm.isNavbarCollapsed = true;
        vm.isAuthenticated = Principal.isAuthenticated;

        vm.login = login;
        vm.logout = logout;
        vm.toggleNavbar = toggleNavbar;
        vm.collapseNavbar = collapseNavbar;
        vm.$state = $state;
        vm.logoState = false;   //logo状态

        //未读消息数量
        vm.unreadMag = 0;

       
        getPageStatus(vm.$state.current.name);

        function login() {
            collapseNavbar();
            LoginService.open();
        }

        function logout() {
            collapseNavbar();
            Auth.logout();
            if ($state.current.name != 'index') {
                $state.go('LoginMain');
            }
           
        }

        function toggleNavbar() {
            vm.isNavbarCollapsed = !vm.isNavbarCollapsed;
        }

        function collapseNavbar() {
            vm.isNavbarCollapsed = true;
        }

     
        

        function getPageStatus(name) {
            //需要转换成logo_dark的路由
            var arr = ['index', 'fund-list', 'dex-list', 'quick-trade-list'];
            vm.logoState = arr.indexOf(name) == -1 ? false : true;
        }

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            getPageStatus(toState.name);
        })

        //登录成功
        $scope.$on('authenticationSuccess', function (event, data) {
            getAccount();
        })

        //更新未读消息数量
        $scope.$on('readMessageSuccess', function () {
            queryAllMessage();
        })
    }
})();
