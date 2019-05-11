(function() {
  'use strict';

  angular
    .module('App')
    .config(stateConfig);

  stateConfig.$inject = ['$stateProvider'];

  function stateConfig($stateProvider) {
    $stateProvider
      .state('userManager', {
        parent: 'app',
        url: '/userManager',
        data: {
          authorities: [],
          pageTitle: 'userInfo.title'
        },
        views: {
          'content@': {
            templateUrl: 'app/pages/account/userManager/userManager.html',
            controller: 'UserManagerController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          translatePartialLoader: ['$translate', '$translatePartialLoader', function($translate, $translatePartialLoader) {
            $translatePartialLoader.addPart('usermanager');
            return $translate.refresh();
          }]
        }
      })
    ;
  }
})();