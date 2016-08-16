define(['../script/ba','jquery','../script/service/loginMgrService','../script/service/vendorService','../script/service/menuService','../script/service/baService'],function(module,$,LoginMgrService,VendorService,MenuService){
    module.controller("indexCtrl",function($rootScope,$scope,$http,$resource,$location,baService,$route,$timeout) {
        //console.log("mgr index page");
        var _this = this;

        var loginMgrService = new LoginMgrService($resource);
        var vendorService = new VendorService($resource);
        var menuService = new MenuService($resource);

        //监控login
        $rootScope.isLogin = false;
        $rootScope.$on('$locationChangeSuccess', function (e) {
            $rootScope.path = $location.path();
            if ($rootScope.path === '/mge/login') {
                $rootScope.isLogin = false;
            } else {
                $("#loginShow").removeClass("hide").addClass("show");
                $rootScope.isLogin = true;
            }
        });

        //注销
        this.logout = function () {
            loginMgrService.logout(function (data) {
                if (data.status == "false") {
                    baService.deleteCookie("token_staff");
                }
                window.location.href = "/mge/login";
            })
        };

        //通过token获得用户信息
        this.userInfo = {};
        this.loginInfo = function (loginCookie) {
            var _this = this;
            loginMgrService.loginInfo(loginCookie, function (data) {
                if (data.status == "true") {
                    _this.userInfo = data.message;
                    _this.getUserDetail(_this.userInfo);

                } else {
                    baService.deleteCookie("token_staff");
                    $location.path("/mge/login");
                }

            })
        };

        $rootScope.isVendor = true;
        this.activeMenu = [];
        //获取登录用户详细信息
        this.getUserDetail = function (userInfo) {
            var _this = this;
            loginMgrService.getStaffById(userInfo.id, function (data) {
                if (data.status == "true") {
                    $rootScope.userDetail = data.message;
                    $rootScope.userDetail.vendorId = userInfo.vendorId;

                    //获取员工的角色 ； 默认数组中的第一个角色名称
                    loginMgrService.getStaffRole(function (data) {
                        if (data.status == "true") {
                            $rootScope.userDetail.roleShow = data.message;
                        } else {
                            console.log(data.message)
                        }
                    });

                    //获取顶级导航
                    menuService.getSubMenu(0, function (data) {
                        if (data.status == "true") {

                            _this.firstNav = data.message;
                            _this.limitSubMenusState = false; //限制此判断只做一次
                            var url = $location.url();

                            for(var i=0;i<data.message.length;i++){
                                var urlMenu = {'url':data.message[i].url,'active':false};
                                _this.activeMenu.push(urlMenu);

                                //固定相应的子菜单
                                if (url.indexOf(_this.activeMenu[i].url) > -1) {
                                    _this.getSubMenus(_this.firstNav[i].id); //根据顶级导航的第一个JSON查对应的子菜单
                                }else if(url == "/mge" &&　!_this.limitSubMenusState){
                                    _this.getSubMenus(_this.firstNav[0].id); //根据顶级导航的第一个JSON查对应的子菜单
                                    _this.limitSubMenusState = true; //限制此判断只做一次
                                }
                            }

                            _this.currentPath();

                        } else {
                            console.log(data.message);
                        }
                    });


                    //获取员工的商户信息
                    vendorService.getVendor(userInfo.vendorId, function (data) {
                        if (data.status == "true") {
                            $rootScope.userDetail.vendorShow = data.message;
                        } else {
                            console.log(data.message);
                        }
                    });
                }
            })
        };

        //刷新页面
        this.refresh = function () {
            $route.reload();
        };


        //token登录权限
        var loginCookie = baService.getCookie('token_staff');//获取token
        if (loginCookie == "") {
            $location.path('/mge/login');
        } else {
            this.loginInfo(loginCookie, false);
        }

        //index:顶级导航的序列   flag：true 默认顶级导航的第一个JSON 样式  url:当前路径
        this.activeClass = function (index,flag,url) {
            for (var i = 0; i < this.activeMenu.length; i++) {
                this.activeMenu[i].active = false;
                if (index == i) {

                    if(!flag){
                        $location.path(url);
                    }

                    this.activeMenu[i].active = true;
                }
            }
        };


        //二级菜单样式
        this.activeClassTwo = function (index,flag,url) {
            for (var i = 0; i < _this.activeMenuTwo.length; i++) {
                _this.activeMenuTwo[i].active = false;  //控制二级菜单的高亮，控制三级菜单显示隐藏，控制伸展收缩的图标
                _this.activeMenuTwo[i].activeState = false;  //控制二级菜单的高亮
                if (index == i) {

                    if(!flag){
                        $location.path(url);
                    }


                    _this.activeMenuTwo[i].active = true;
                    _this.activeMenuThree = _this.activeMenuTwo[i].submenu;


                    for (var j = 0; j < _this.activeMenuThree.length; j++) {
                        _this.activeMenuThree[j].active = false;
                        if(!flag){  //解决：切换顶级菜单时，会保留上一步的三级菜单高亮样式
                            var urlTwo = $location.url();
                            if(urlTwo == _this.activeMenuThree[j].url) {
                                _this.activeMenuThree[j].active = true;
                                _this.activeMenuTwo[i].activeState = true;  //控制二级菜单的高亮
                            }
                        }
                    }
                }
            }

        };

        //三级菜单样式
        this.activeClassThree = function (index,flag,url) {

            for (var i = 0; i < _this.activeMenuThree.length; i++) {
                _this.activeMenuThree[i].active = false;  //三级菜单高亮
                if (index == i) {

                    if(!flag){
                        $location.path(url);
                    }

                    _this.activeMenuThree[i].active = true;

                    //取消二级菜单的高亮
                    for (var j = 0; j < _this.activeMenuTwo.length; j++) {
                        if(_this.activeMenuTwo[j].active){
                            _this.activeMenuTwo[j].activeState = true;
                        }else{
                            _this.activeMenuTwo[j].activeState = false;
                        }
                    }
                }
            }
        };

        //获取当前路径
        var url = $location.url();
        this.currentPath = function () {

            //默认 '/mge' 等同于 顶级导航的第一个JSON 样式
            if(url === '/mge'){
                this.activeClass(0,true);
                return;
            }

            for (var i = 0; i < this.activeMenu.length; i++) {
                if (url.indexOf(this.activeMenu[i].url) > -1) {
                    this.activeClass(i,false,url);
                }
            }
        };

        // version
        $http.get('/version').then(function (response) {
            _this.appver = response.data;
        });


        //--------------------------------------------------------------
        this.activeMenuTwo = [];
        //获取顶级导航下的子菜单
        this.getSubMenus = function (id) {
            menuService.getSubMenus(id, function (data) {
                if (data.status == "true") {
                    _this.twoNav = data.message;

                    //生成二级菜单数组
                    for(var i=0;i<data.message.length;i++){
                        var urlMenuTwo = {'url':data.message[i].url,'active':false,activeState:false,submenu:data.message[i].submenu};
                        _this.activeMenuTwo.push(urlMenuTwo);
                    }

                    //默认 '/mge' '/mge/operation' ...  等同于 二级导航的第一个JSON 样式
                    if(url === '/mge' || url == '/mge/operation' || url == '/mge/vehicle' || url == '/mge/customer' || url == '/mge/finance' || url == '/mge/information'){
                        _this.activeClassTwo(0,true);
                        return;
                    }

                    //加载二级菜单的高亮
                    for (var j = 0; j < _this.activeMenuTwo.length; j++) {
                        if (url.indexOf(_this.activeMenuTwo[j].url) > -1 && _this.urlTwo == undefined) {
                            _this.activeClassTwo(j,false,url);
                            _this.urlTwo = url;
                        }
                    }

                } else {
                    console.log(data.message);
                }
            })
        };


        //----------------一级导航栏展示---------------------------------------



    });
});