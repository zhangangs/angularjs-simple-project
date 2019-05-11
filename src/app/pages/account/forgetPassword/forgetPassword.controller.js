(function () {
    'use strict';
    /**
     * @ 忘记密码
     * Author：veiss, Date:2018/11/5
     */

    var app = angular.module('App');
    app.controller('ForgetPasswordController', ForgetPasswordController);
    ForgetPasswordController.$inject = ['$scope', '$state', '$timeout', '$uibModal', 'utils', 'ForgetPasswordService', 'toastr'];

    function ForgetPasswordController($scope, $state, $timeout, $uibModal, utils, ForgetPasswordService, toastr) {
        var vm = this;

        vm.data = {
            newpassword: '',
            confirmpassword: '',
            flag: true,
            mobile: '',
            captchacode: '',
            isCaptchShow: true
        }

        vm.method = {
            //二次验证弹出框
            showValidatemodal: showValidatemodal,
            mobileValidator: mobileValidator,
            submit: submit,
            newpasswordValidator: newpasswordValidator,
            confirmpasswordValidator: confirmpasswordValidator,
            updatePassword: updatePassword,
            refreshCaptch: refreshCaptch
        }

        //刷新验证码
        function refreshCaptch() {
            vm.data.isCaptchShow = false;
            $timeout(function () {
                vm.data.isCaptchShow = true;
            }, 0)
        }

        /**
         * 验证登录名
         */
        function submit() {
            //检测用户输入的是手机号码，还是邮箱地址，调用不同的检测接口
            var params = {
                mobile: vm.data.mobile,
                captchacode: vm.data.captchacode
            }
            var regMobile = /^[1][3,4,5,7,8][0-9]{9}$/;
            var regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

            if (!regEmail.test(vm.data.mobile) && !regMobile.test(vm.data.mobile)) {
                toastr.error('请输入正确的手机号或邮箱地址', '温馨提示', { closeButton: true })
            } else {
                ForgetPasswordService.checkAccountExists(utils.urlencoded({ mobile: vm.data.mobile }), function (res) {
                    console.log(res);
                    if (res.httpCode == 200) {
                        if (res.data == 1) {
                            toastr.error(res.msg, '温馨提示', { closeButton: true });
                        } else {
                            showValidatemodal(res.data);
                        }
                    }
                })
            }
        }

        //手机合法验证
        function mobileValidator(mobile) {
            var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!mobile) {
                return;
            };

            if (!reg.test(mobile)) {
                return '请输入正确的手机号码';
            }
            else {
                return true;
            }
        }

        //二次验证弹出框
        function showValidatemodal(data) {
            data.mobile = vm.data.mobile;
            data.mobileFormat = utils.isMobile(vm.data.mobile) ? utils.mobileFormat(vm.data.mobile) : utils.emailFormat(vm.data.mobile);
            $uibModal.open({
                templateUrl: 'app/account/forgetPassword/validate.modal.html',
                controller: 'forgetPasswordValidateModalController',
                controllerAs: 'vm',
                backdrop: 'static',
                windowTopClass: "dialog__modal__fix",
                size: 'zm',
                resolve: {
                    injectData: data
                }
            });
        }


        //提交修改的密码
        function updatePassword() {
            var params = {
                mobile: vm.data.mobile,
                varifyCode: vm.data.varifyCode,
                newpassword: vm.data.newpassword
            }

            console.log(params);
            ForgetPasswordService.updatePassword(utils.urlencoded(params), function (res) {
                if (res.httpCode == 200) {
                    toastr.success(res.msg, '温馨提示', { closeButton: true });
                    $state.go('LoginMain');
                } else {
                    toastr.error(res.msg, '温馨提示', { closeButton: true });
                }
            })
        }

        //验证密码长度和复杂度
        function newpasswordValidator(password) {
            var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;
            if (!password) { return; }
            if (!reg.test(password)) {
                return '输入8~16位字符，包括大写字母、小写字母和数字';
            } else {
                return true;
            }
        }


        function confirmpasswordValidator(password) {
            console.log(password, vm.data.newpassword)
            if (!password) { return; }
            if (password != vm.data.newpassword) {
                return '两次输入的密码不一致';
            } else {
                return true;
            }
        }



        $scope.$on('passwordVarifySuccess', function (event, data) {
            //console.log(1);
            console.log(event, data);
            vm.data.varifyCode = data.varifyCode;
            vm.data.flag = false;
        })
    }
})();
