(function () {
  'use strict';

  var app = angular.module('App');
  app.controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$scope', '$timeout', 'Auth', 'LoginService', 'Register', 'toastr', '$interval', '$state', 'utils', '$stateParams', '$compile'];

  function RegisterController($scope, $timeout, Auth, LoginService, Register, toastr, $interval, $state, utils, $stateParams, $compile) {
    var vm = this;

    // 数据
    vm.data = {
      type: $stateParams.type,
    }

    // 方法
    vm.method = {

    }

    //初始化
    function init() {
      if (!$stateParams.type) {
        $state.go('register', { type: 0 });
      }
    }


    init();
  }
})();