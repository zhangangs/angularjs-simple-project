(function() {
  'use strict';

  angular
    .module('App')
    .config(stateConfig);

  stateConfig.$inject = ['$stateProvider'];

  function stateConfig($stateProvider) {
    $stateProvider.state('app', {
      abstract: false,
      views: {
        'navbar@': {
          templateUrl: 'app/layouts/navbar/navbar.html',
          controller: 'NavbarController',
          controllerAs: 'vm'
        }
      },
      resolve: {
        // authorize: ['Auth',
        //   function(Auth) {
        //     return Auth.authorize();
        //   }
        // ],
        translatePartialLoader: ['$translate', '$translatePartialLoader', function($translate, $translatePartialLoader) {
          $translatePartialLoader.addPart('global');
          return $translate.refresh();
        }]
      }
    });
  }
})();