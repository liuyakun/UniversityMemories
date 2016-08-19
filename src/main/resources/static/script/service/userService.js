/**
 * Created by 刘亚坤 on 2016/8/19.
 */
define([], function() {
    function UserService($resource) {
        this.getUserListApi = $resource('/api/user');//通过条件查询用户
    }

    //通过条件查询用户
    UserService.prototype.getUserList = function(user,cb){
        this.getUserListApi.get(user,function(data,headers){
            cb(data,headers);
        },function(errData){
            cb(errData.data.error);
        })
    };

    return UserService;

});