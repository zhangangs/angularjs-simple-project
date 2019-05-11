(function () {
  'use strict';

  angular
    .module('App')
    .controller('UserManagerController', UserManagerController);

  UserManagerController.$inject = ["$scope", '$stateParams', '$state', 'UserManager', '$uibModal', 'toastr', 'Popup', 'utils'];

  function UserManagerController($scope, $stateParams, $state, UserManager, $uibModal, toastr, Popup, utils) {
    var vm = this;
    
    vm.data = {

    }

    vm.method = {

    };

    function init(){

    }




    init();
  }
})();