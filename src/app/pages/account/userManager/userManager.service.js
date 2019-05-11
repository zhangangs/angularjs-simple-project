(function () {
  'use strict';
  angular
    .module('App')
    .factory('UserManager', UserManager);

  UserManager.$inject = ['$resource'];

  function UserManager($resource) {
    return $resource('', {}, {
      // 例子接口，获取用户详细信息
      'getUserDetail': {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        url: '/api/user/detail'
      }

    });
  }
})();