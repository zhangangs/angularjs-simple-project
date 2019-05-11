(function() {
  'use strict';

  angular
    .module('App')
    .config(stateConfig);

  stateConfig.$inject = ['$stateProvider'];

  function stateConfig($stateProvider) {
    $stateProvider.state('register', {
      parent: 'account',
      url: '/register?type:mobile',
      data: {
        authorities: [],
        pageTitle: 'register.title'
      },
      views: {
        'content@': {
          templateUrl: 'app/pages/account/register/register.html',
          controller: 'RegisterController',
          controllerAs: 'vm'
        }
      },
      resolve: {
        translatePartialLoader: ['$translate', '$translatePartialLoader', function($translate, $translatePartialLoader) {
          $translatePartialLoader.addPart('register');
          return $translate.refresh();
        }]
      }
    });
  }
})();