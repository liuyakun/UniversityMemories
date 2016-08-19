define(['../script/um','jquery','../script/service/userService'],function(module, $,UserService){
    module.controller("indexCtrl",function($rootScope,$scope,$http,$resource,$location,commonService,$route,$timeout) {
        console.log("欢迎加入");
        //通过条件查询用户
        var userService = new UserService($resource);
        this.userList = [];
        var _this = this;
        this.getUserList = function(){
            this.userData = {
                currentPage:1,
                pageSize:20
            };
            userService.getUserList(this.userData,function(data,headers){
                console.log(JSON.stringify(data));
                if(data.status != 'true') return;
                _this.userList = data.message;
                $(".userList").removeClass("hide");
            });
        };
        this.getUserList();
    });
});