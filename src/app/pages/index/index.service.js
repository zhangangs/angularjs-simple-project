(function () {
    'use strict';
    var app = angular.module('App');
    app.factory('indexService', indexService);

    indexService.$inject = ['$resource'];

    function indexService($resource) {
        var resourceUrl = '';
        return $resource(resourceUrl, {}, {

            //根据查询行情列表
            'findMarketLite': {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                url: '/exchmarcket-web-biz/v1/exchdex/findMarketLite'
            },

            //收藏列表
            'DexFavoritesReadList': {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                url: '/exchmarcket-web-biz/exch/dexFavorites/read/list'
            },

            //添加收藏
            'DexFavoritesAdd': {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                url: '/exchmarcket-web-biz/exch/dexFavorites/add'
            },

            //取消收藏
            'DexFavoritesDelete': {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                url: '/exchmarcket-web-biz/exch/dexFavorites/delete'
            },

            //获取币种列表
            'getDigiccyByType': {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                url: '/exchmarcket-web-biz/api/v1/exchmd/getDigiccyByType'
            },

            //获取法币价格参考
            'fTradeReferPriceReadDetailByPram': {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                url: '/exchmarcket-web-biz/exch/fTradeReferPrice/read/detailByPram'
            },

        });
    }
})();