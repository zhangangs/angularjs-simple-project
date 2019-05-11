(function () {
    'use strict';

    var app = angular.module('App');

    //异步验证手机号码
    app.directive('mobileAsync', ['Register', 'utils', '$q', function (Register, utils, $q) {
        return {
            require: 'ngModel',
            link: function (scope, ele, attrs, ctrl) {
                //通过检测属性ngModel的名称的变化，动态查询是否存在相应的用户名
                scope.$watch(attrs.ngModel, function (newVal, oldVal) {
                    if (newVal && newVal.length < 11) {
                        return;
                    }
                    else if (newVal) {
                        Register.checkMobile(utils.urlencoded({ mobile: newVal }), function (res) {
                            if (res.data == 1) {
                                ctrl.$setValidity('unique', true);
                            } else {
                                ctrl.$setValidity('unique', false);
                            }
                        })
                    }
                })
            }
        }
    }]);

    //异步验证邮箱是否注册
    app.directive('emailAsync', ['Register', 'utils', function (Register, utils) {
        var directive = {
            require: 'ngModel',
            link: function (scope, ele, attrs, ctrl) {
                scope.$watch(attrs.ngModel, function (newVal, oldVal) {
                    if (!newVal) {
                        return;
                    }
                    else if (newVal) {
                        Register.checkEmailExists(utils.urlencoded({ email: newVal }), function (res) {
                            console.log(res);
                            if (res.httpCode == 200) {
                                if (res.data == 1) {
                                    ctrl.$setValidity('unique', true);
                                } else {
                                    ctrl.$setValidity('unique', false);
                                }
                            }
                        })
                    }
                })
            }
        };

        return directive;
    }]);

    //鼠标焦点事件
    app.directive('ngFocus', [function () {
        var FOCUS_CLASS = "ng-focused";
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                ctrl.$focused = false;
                element.bind('focus', function (evt) {
                    element.addClass(FOCUS_CLASS);
                    scope.$apply(function () { ctrl.$focused = true; });
                }).bind('blur', function (evt) {
                    element.removeClass(FOCUS_CLASS);
                    scope.$apply(function () { ctrl.$focused = false; });
                });
            }
        }
    }]);

    //重复密码
    app.directive('passwordCheck', [function () {
        return {
            require: "ngModel",
            link: function (scope, elem, attrs, ctrl) {
                var otherInput = elem.inheritedData("$formController")[attrs.passwordCheck];
                ctrl.$parsers.push(function (value) {
                    if (value === otherInput.$viewValue) {
                        ctrl.$setValidity("repeat", true);
                        return value;
                    }
                    ctrl.$setValidity("repeat", false);
                });

                otherInput.$parsers.push(function (value) {
                    ctrl.$setValidity("repeat", value === ctrl.$viewValue);
                    return value;
                });
            }
        };
    }]);

    //异步验证手机号码
    // function mobileAsyncValidator(Register, utils, $q) {
    //     return {
    //         require: 'ngModel',
    //         link: function (scope, ele, attrs, ctrl) {
    //             //通过检测属性ngModel的名称的变化，动态查询是否存在相应的用户名
    //             scope.$watch(attrs.ngModel, function (newVal, oldVal) {
    //                 if (newVal && newVal.length < 11) {
    //                     return;
    //                 }
    //                 else if (newVal) {
    //                     Register.checkMobile(utils.urlencoded({ mobile: newVal }), function (res) {
    //                         if (res.data == 1) {
    //                             ctrl.$setValidity('unique', true);
    //                         } else {
    //                             ctrl.$setValidity('unique', false);
    //                         }
    //                     })
    //                 }
    //             })
    //         }
    //     }
    // }


    //异步验证邮箱是否注册
    // function emailAsyncValidator(Register, utils) {
    //     var directive = {
    //         require: 'ngModel',
    //         link: function (scope, ele, attrs, ctrl) {
    //             scope.$watch(attrs.ngModel, function (newVal, oldVal) {
    //                 if (!newVal) {
    //                     return;
    //                 }
    //                 else if (newVal) {
    //                     Register.checkEmailExists(utils.urlencoded({ email: newVal }), function (res) {
    //                         console.log(res);
    //                         if (res.httpCode == 200) {
    //                             if (res.data == 1) {
    //                                 ctrl.$setValidity('unique', true);
    //                             } else {
    //                                 ctrl.$setValidity('unique', false);
    //                             }
    //                         }
    //                     })
    //                 }

    //             })
    //         }
    //     };

    //     return directive;
    // }
})();


