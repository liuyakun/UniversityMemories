package com.universityMemories.controller;

import com.universityMemories.controller.controller.BaseController;
import com.universityMemories.controller.controller.ObjectResult;
import com.universityMemories.entityShow.IUserService;
import com.universityMemories.entityShow.UserShow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

/**
 * Created by 刘亚坤 on 2016/8/15.
 */

@RestController
@RequestMapping("/api")
public class UserController extends BaseController {
    private IUserService userService = null;
    @Autowired
    public void setUserService(IUserService userService){ this.userService = userService ;}

    /**
     * 通过条件查询用户
     * @param id 用户id
     * @param name 名称
     * @param address 真实姓名
     * @param phone 用户手机号
     * @return 用户集合
     */
    @RequestMapping(value="/user",method = RequestMethod.GET)
    public ObjectResult findUserShows(
            @RequestParam(value = "id",required = false)  Integer id,
            @RequestParam(value = "name",required = false)  String name,
            @RequestParam(value = "address",required = false)  String address,
            @RequestParam(value = "phone",required = false)  String phone,
            @RequestParam(value = "currentPage",required = false)  Integer currentPage,
            @RequestParam(value = "pageSize",required = false)  Integer pageSize,
            HttpServletResponse response)throws Exception{

        Page<UserShow> list = userService.findByKeys(id,name,address,phone,currentPage,pageSize);
        response.addHeader("Page", String.valueOf(list.getNumber()+1));
        response.addHeader("Page-Count", String.valueOf(list.getTotalPages()));

        return new ObjectResult("true",list.getContent());
    }

}
