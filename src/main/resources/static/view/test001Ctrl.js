/**
 * Created by 刘亚坤 on 2016/8/19.
 */
define(['../script/um','jquery'],function(module, $){
    module.controller('test001Ctrl',function($resource,$scope,$rootScope,$timeout,$location,commonService){
        $rootScope.mainMenuIndex = 1;
        console.log("test001Ctrl");
    });
});