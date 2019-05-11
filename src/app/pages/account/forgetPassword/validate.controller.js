(function () {
    'use strict';

    var app = angular.module('App');
    app.controller('forgetPasswordValidateModalController', forgetPasswordValidateModalController);

    forgetPasswordValidateModalController.$inject = ['$uibModalInstance', 'Auth', '$state', 'utils', 'injectData', '$timeout', 'ForgetPasswordService', 'toastr', '$interval', '$rootScope'];

    function forgetPasswordValidateModalController($uibModalInstance, Auth, $state, utils, injectData, $timeout, ForgetPasswordService, toastr, $interval, $rootScope) {
        var vm = this;
        vm.data = {
          
        }

        vm.resoure = {
          
        }

        //方法
        vm.method = {
            
        }
       
    }
})();
