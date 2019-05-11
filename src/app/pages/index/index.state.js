(function () {
    'use strict';

    var app = angular.module('App');
    app.config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('index', {
                parent: 'app',
                url: '/',
                data: {
                    authorities: [],
                    pageTitle: 'home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/pages/index/index.html',
                        controller: 'IndexController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('home');
                        return $translate.refresh();
                    }]
                }
            });
    }
})();
