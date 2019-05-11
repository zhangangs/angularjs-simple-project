(function() {
  'use strict';

  angular
    .module('App')
    .config(stateConfig);

  stateConfig.$inject = ['$stateProvider'];

  function stateConfig($stateProvider) {
    $stateProvider.state('LoginMain', {
      parent: 'account',
      url: '/LoginMain?route_id',
      data: {
        pageTitle: 'login.title'
      },
      views: {
        'content@': {
          templateUrl: 'app/pages/account/loginMain/loginMain.html',
          controller: 'LoginMainController',
          controllerAs: 'vm'
        }
      },
      resolve: {
        translatePartialLoader: ['$translate', '$translatePartialLoader', function($translate, $translatePartialLoader) {
          $translatePartialLoader.addPart('login');
          return $translate.refresh();
        }]
      }
    })
  }

})();