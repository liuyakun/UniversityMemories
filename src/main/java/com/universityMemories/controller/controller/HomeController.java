package com.universityMemories.controller.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by 刘亚坤 on 2016/8/16.
 */
@Controller
public class HomeController {
    /**
     * 静态页面处理程序
     * 主页面
     * @return 返回HTML静态页面
     */
    @RequestMapping(path={"/", "/web/**"}, method = RequestMethod.GET)
    public String forwardIndex() {
        return "forward:/index.html";
    }
}
