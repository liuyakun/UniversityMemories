/**
 * Created by Administrator on 2016/2/25.
 */
define(['../um'],function(module){
    module.filter('sexType',function(){
        return function(input) {
            var sexType = "";
            if (input == 1) sexType = "男";
            else if (input == 2) sexType = "女";
            return sexType;
        }
    });
    
});