(function() {
    'use strict';

    angular
        .module('App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('forgetPassword', {
            parent: 'account',
            url: '/forgetPassword',
            data: {
                pageTitle: 'forgetPass.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/pages/account/forgetPassword/forgetPassword.html',
                    controller: 'ForgetPasswordController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function($translate, $translatePartialLoader) {
                  $translatePartialLoader.addPart('forgetPass');
                  return $translate.refresh();
                }]
            }
        })
    }

})();
