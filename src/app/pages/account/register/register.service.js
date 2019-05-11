(function () {
  'use strict';

  angular
    .module('App')
    .factory('Register', Register);

  Register.$inject = ['$resource'];

  function Register($resource) {
    return $resource('', {}, {
      'getCaptchaImage': {
        method: "GET",
        url: "/api/getcaptchaimage"
      }

    });
  }
})();