
define(['script/app'],function(module){

    return module.service('commonService', (function(){
        function commonService($http,$resource,$timeout,$location){
            this.$http = $http;
            this.$resource = $resource;
            this.$timeout = $timeout;
            this.$location = $location;
        }

        //通用正则表达式
        commonService.prototype.regex = function(type){
            var regex ;
            if(type == 'phone'){
                regex = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;//定义手机phone的正则表达式
            }else if(type == 'password'){
                regex = /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9].{5,17}$/;//定义密码password的正则表达式
            }else if(type == 'email'){
                regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //定义email的正则表达式
            }else if(type == 'birthday'){
                regex = /^(19|20)\d{2}-(1[0-2]|0?[1-9])-(0?[1-9]|[1-2][0-9]|3[0-1])$/; //定义生日的正则表达式
            }else if(type == 'card'){
                regex = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/; //定义身份证的正则表达式
            }else if(type == 'hmpass'){
                regex = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/; //定义港澳通行证的正则表达式
            }else if(type == 'tw'){
                regex = /^(([0-9]{8})|([0-9]{10}))$/; //定义台湾通行证的正则表达式
            }else if(type == 'passport'){
                regex = /^(([a-zA-Z]{5,17})|([a-zA-Z0-9]{5,17}))$/; //定义护照的正则表达式
            }else if(type == 'chinese'){
                regex = /^[\u4e00-\u9fa5]{2,5}$/; //定义真实姓名的正则表达式
            }else if(type == 'code'){
                regex = /^\d{6}$/; //定义验证码的正则表达式
            }else if(type == 'nickName'){
                regex = /^[\u0391-\uFFE5A-Za-z0-9]{2,18}$/; //定义昵称的正则表达式
            }else if(type == 'simple'){
                regex = /^(?=.*\d)(?=.*[a-z]).{5,8}$/; //密码强度弱
            }else if(type == 'normal'){
                regex = /^(?=.*\d)(?=.*[a-z]).{9,17}$/; //密码强度中
            }else if(type == 'strong'){
                regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{12,17}$/; //密码强度强
            }
            return regex;
        };

        //获取cookie
        commonService.prototype.getCookie = function(name){
            var arr = document.cookie.split("; ");
            for(var i=0,len=arr.length;i<len;i++){
                var item = arr[i].split("=");
                if(item[0]==name){
                    return item[1];
                }
            }
            return "";
        };

        //创建cookie
        commonService.prototype.addCookie = function(name,value){
            document.cookie= name+"="+value+";path=/";
        };

        //删除cookie
        commonService.prototype.deleteCookie = function(name){
            var exp = new Date();
            exp.setTime(exp.getTime() - 1000);
            var cval=this.getCookie(name);
            if(cval!=null){
                document.cookie= name+"="+cval+";expires="+exp.toUTCString()+"; path=/";
            }
        };

        //毫秒转日期
        commonService.prototype.dateFormat = function(time, format){
            var t = new Date(time);
            var tf = function(i){return (i < 10 ? '0' : '') + i};
            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
                switch(a){
                    case 'yyyy':
                        return tf(t.getFullYear());
                        break;
                    case 'MM':
                        return tf(t.getMonth() + 1);
                        break;
                    case 'mm':
                        return tf(t.getMinutes());
                        break;
                    case 'dd':
                        return tf(t.getDate());
                        break;
                    case 'HH':
                        return tf(t.getHours());
                        break;
                    case 'ss':
                        return tf(t.getSeconds());
                        break;
                }
            })
        };

        //获取登录用户信息
        commonService.prototype.getLoginInfo = function(cb){
            var loginReInfoApi = this.$resource('/api/login/:token');  //返回登录用户的信息
            var token = this.getCookie("token");
            loginReInfoApi.get({token:token},function(data){
                cb(data);
            },function(errData){
                console.log(errData.data.error);
            })
        };


        //加载日期控件
        commonService.prototype.changeDatePicker = function(type,ids){
            if(type == "date"){
                angular.forEach(ids,function(id){
                    $('#'+id).datetimepicker({
                        language:  'zh-CN',
                        weekStart: 1,
                        todayBtn:  1,
                        autoclose: 1,
                        todayHighlight: 1,
                        startView: 2,
                        minView: 2,
                        forceParse: 0
                    });
                })
            }else if(type == "time"){
                angular.forEach(ids,function(id){
                    $('#'+id).datetimepicker({
                        language:  'zh-CN',
                        weekStart: 1,
                        todayBtn:  1,
                        autoclose: 1,
                        todayHighlight: 1,
                        startView: 1,
                        minView: 0,
                        maxView: 1,
                        forceParse: 0
                    });
                })
            }else if(type == "datetime"){
                angular.forEach(ids,function(id){
                    $('#'+id).datetimepicker({
                        language:  'zh-CN',
                        weekStart: 1,
                        todayBtn:  1,
                        autoclose: 1,
                        todayHighlight: 1,
                        startView: 2,
                        forceParse: 0,
                        showMeridian: 1
                    });
                })
            }
        };

        //获取月份信息
        commonService.prototype.monthInfo = function(date){
            var month = {
                days: '', //一个月多少天
                weekDay:'',//第一天星期几
                dayArray:[] //day{id:'',val:'',isCur:'',enable:''}
            }
            var firstDay = new Date(date);
            firstDay.setDate(1);
            var endDay = new Date(firstDay);
            endDay.setMonth(firstDay.getMonth() + 1);
            month.days = (endDay.getTime() - firstDay.getTime()) / (1000*60*60*24);
            month.weekDay = firstDay.getDay();
            for(var i=0;i<42;i++){
                if(i < month.weekDay){
                    month.dayArray.push({id:i,val:'',isCur:false,enable:false});
                } else if(i >= month.weekDay && i < (month.weekDay + month.days)){
                    month.dayArray.push({id:i,val:(i+1-month.weekDay),isCur:false,enable:false});
                } else{
                    month.dayArray.push({id:i,val:'',isCur:false,enable:false});
                }
            }

            return month;
        };


        return ['$http', '$resource','$timeout','$location', commonService];
    })());
});