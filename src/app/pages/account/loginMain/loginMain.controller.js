(function () {
  'use strict';

  var app = angular.module('App');
  app.controller('LoginMainController', LoginMainController);

  LoginMainController.$inject = ['$rootScope', '$scope', '$state', '$timeout', 'LoginService', '$uibModal', 'LoginMainService', 'utils', 'toastr', '$stateParams', '$cookies'];

  function LoginMainController($rootScope, $scope, $state, $timeout, LoginService, $uibModal, LoginMainService, utils, toastr, $stateParams, $cookies) {
    var vm = this;  

    vm.login = login;
    vm.password = null;
    vm.register = register;
    vm.rememberMe = false;
    vm.username = null;
    vm.captcha = true;
    vm.ticket = 0;

    //0无，1mobile，2GoogleAuth，3email
    vm.data = '';

    vm.state = false;

    //二次验证弹出框
    vm.showValidatemodal = showValidatemodal;

    //加载滑动验证码，清理一次
    if (typeof capDestroy == 'function') {
      capDestroy();
    }

    getCookies();
    startCaptcha();

    function login() {
      $state.go('userManager');

      return;
      //  加载滑动验证码，如果有
      capDestroy();

      var capOption = {
        type: 'popup',
        showHeader: true,
        themeColor: "aaabbb",
        callback: goLogin,
      };
      capInit($('#form-trans'), capOption);
    }

    function goLogin(captcha) {
      console.log(captcha)
      vm.ticket = captcha.ticket;

      var params = {
        mobile: vm.username,
        password: vm.password,
        ticket: vm.ticket,
        // rememberMe: vm.rememberMe,
        terminal: 0
      }

      LoginMainService.stepOne(utils.urlencoded(params), function (res) {
        if (res.httpCode == 201) {
          //写入username，用于二次验证时候展示
          res.data.mobile = vm.username;

          //使用的认证方式          
          vm.data = res.data;
          showValidatemodal();
        }
        else if (res.httpCode == 200) {
          toastr.success(res.msg, '温馨提示', { closeButton: true });
          //有跳转到地址
          if ($stateParams.route_id) {
            //路由带参,解析参数跳转
            if ($stateParams.route_id.split('?')[1]) {
              var router = $stateParams.route_id.split('?')[0];
              var params = utils.locationSerch($stateParams.route_id.split('?')[1]);
              console.log(params);
              $state.go(router, params);
            } else {
              $state.go($stateParams.route_id);
            }
          } else {
            $state.go('userManager');
          }

          $rootScope.$broadcast('authenticationSuccess');
        }
        else {
          toastr.error(res.msg, '温馨提示', { closeButton: true });
        }
      })
    }

    //注册页面
    function register() {
      $state.go('register');
    }

    //验证弹框
    function showValidatemodal() {
      vm.data.mobileFormat = utils.isMobile(vm.data.mobile) ? utils.mobileFormat(vm.data.mobile) : utils.emailFormat(vm.data.mobile);
      vm.data.isMobile = utils.isMobile(vm.data.mobile) ? true : false;
      vm.data.rememberMe = vm.rememberMe;
      vm.data.username = vm.username;
      vm.data.password = vm.password;
      console.log(vm.data)
      $uibModal.open({
        templateUrl: 'app/account/loginMain/validate.modal.html',
        controller: 'ValidateModalController',
        controllerAs: 'vm',
        size: 'zm',
        backdrop: 'static',
        windowTopClass: "dialog__modal__fix",
        resolve: {
          initData: vm.data
        }
      });
    }

    //获取滑块
    function startCaptcha() {
      LoginMainService.startCaptcha(utils.urlencoded({ terminal: 0 }), function (data) {
        if (data.captchaServerType == '0') {
          //删除以前的代码，重新插入一次
          //removeCaptcha();
          var script = document.createElement('script');
          script.setAttribute('src', data.url);
          script.setAttribute('type', 'text/javascript');
          document.head.appendChild(script);
        }
      })
    }

    //获取Cookies
    function getCookies(){
      var userInfo = $cookies.get('_REMEMBER');
      if(userInfo){
        userInfo = JSON.parse(userInfo);
        vm.username = userInfo.username;
        vm.password = userInfo.password;
      }
     
    }
  }
})();
