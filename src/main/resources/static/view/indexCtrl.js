define(['../script/um','jquery','../script/service/userService'],function(module, $,UserService){
    module.controller("indexCtrl",function($rootScope,$scope,$http,$resource,$location,commonService,$route,$timeout) {
        console.log("欢迎加入");


        //初始化路径
        $rootScope.$on('$locationChangeSuccess', function (e) {
            $rootScope.path = $location.path();
            if ($rootScope.path === '/' || $rootScope.path.length === 0) {
                $rootScope.isHome = true;
                //$("#home").removeClass("hide");
                $rootScope.mainMenuIndex = 0; //主菜单索引
                $(".userList").removeClass("hide");
            } else {
                $rootScope.isHome = false;
            }
        });

        $rootScope.changeMainMenu = function(index){
            $rootScope.mainMenuIndex = index;
        };


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
            });
        };
        this.getUserList();
    });
});