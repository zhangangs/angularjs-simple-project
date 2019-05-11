(function () {
    'use strict';
    /**
     * @ 公共方法，处理数据
     * Author:Veiss, Date: 2018/10/28
     */
    var app = angular.module('App');
    app.factory('utils', utils);
    utils.$inject = [];

    function utils() {
        var data = {};

        // 转码操作
        data.urlencoded = function (json) {
            return Object.keys(json).map(function (key) {
                return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
            }).join("&");
        }

        //router解析,返回router搜索字段键值对
        data.locationSerch = function (url) {
            var obj = {}, local = url;
            //检测url
            if (!local) { console.error("没有参数"); return obj; }
            //去掉？和切割成数组
            var arr = local.split("&");
            //数组循环储存到obj
            for (var i = 0; i < arr.length; i++) {
                var sp = arr[i].split("=");
                obj[sp[0]] = sp[1];
            }
            return obj;
        }

        //检查是否为手机号码
        data.isMobile = function (mobile) {
            var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!mobile) return;
            return reg.test(mobile);
        }

        //检测是否为邮箱地址
        data.isEmail = function (email) {
            var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if (!email) return;
            return reg.test(email);
        }

        //手机号码格式化, 15123418253 => 151****8253
        data.mobileFormat = function (mobile) {
            if (!mobile) return;
            return mobile.substring(0, 3) + "****" + mobile.substring(8, 11);
        }

        //邮箱号码格式化, zhangangs@163.com => zhan****@163.com
        data.emailFormat = function (email) {
            if (!email) return;
            var end = Math.ceil(email.split('@')[0].length / 2);
            return email.substring(0, end) + '****@' + email.split("@")[1];
        }

        //通用格式化
        data.baseFormat = function (str, num) {
            if (!str) return;
            var start = Math.ceil((str.length - num) / 2);
            return str.substring(0, start) + '****' + str.substring(num + start, str.length);
        }

        //用户名格式化
        data.userNameFormat = function (userName) {
            if (!userName) return;

            if (this.isMobile(userName)) {
                return this.mobileFormat(userName);
            }
            else if (this.isEmail(userName)) {
                return this.emailFormat(userName);
            }
            else {
                return userName;
            }
        }

        //用户个人信息格式化，包括手机、邮箱、用户名
        data.accountFormat = function (account) {
            if (!account) return;
            account.mobileFormat = this.mobileFormat(account.mobile);
            account.emailFormat = this.emailFormat(account.email);
            account.userNameFormat = this.userNameFormat(account.userName);
            return account;
        }

        //阿拉伯数字转换为简写汉字
        data.upperCNY = function (n) {
            var fraction = ['角', '分'];
            var digit = [
                '零', '壹', '贰', '叁', '肆',
                '伍', '陆', '柒', '捌', '玖'
            ];
            var unit = [
                ['元', '万', '亿'],
                ['', '拾', '佰', '仟']
            ];
            var head = n < 0 ? '欠' : '';
            n = Math.abs(n);
            var s = '';
            for (var i = 0; i < fraction.length; i++) {
                s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
            }
            s = s || '整';
            n = Math.floor(n);
            for (var i = 0; i < unit[0].length && n > 0; i++) {
                var p = '';
                for (var j = 0; j < unit[1].length && n > 0; j++) {
                    p = digit[n % 10] + unit[1][j] + p;
                    n = Math.floor(n / 10);
                }
                s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
            }
            return head + s.replace(/(零.)*零元/, '元')
                .replace(/(零.)+/g, '零')
                .replace(/^整$/, '零元整');
        };

        //获取时区，根据时区转换时间
        // @date:时间    format：格式[YYYY-MM-DD HH:mm:ss]
        data.dateFormat = function (date, formatDate) {
            //默认YYYY-MM-DD HH:mm:ss格式
            var format = formatDate || 'YYYY-MM-DD HH:mm:ss';
            var hours = moment(date).utcOffset() / 60;
            var newDate = moment(date).add(hours, 'hours').format(format);
            return newDate;
        }

        //展示大图
        data.showBigPic = function (url) {
            if (!url) return;
            var showUrl = '/exchmarcket-web-biz/bizspace/uploadfile/down?fileId=' + url;
            var $container = $('<div id="showBigPic"><a href="javascript:;" class="showBigPic-colse" title="关闭"><i class="iconfont icon-mdelete"></i></a><div class="showBigPic-container"><img src="' + showUrl + '" /></div></div>');
            $container.find('.showBigPic-colse').on('click', function () {
                $container.remove();
            })
            $('body').append($container);
        }

        return data;
    }
})();