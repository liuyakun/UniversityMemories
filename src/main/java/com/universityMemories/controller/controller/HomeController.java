package com.universityMemories.controller.controller;

import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by 刘亚坤 on 2016/8/16.
 */
public class HomeController {
    /**
     * 静态页面处理程序
     * 主页面
     * @return 返回HTML静态页面
     */
    @RequestMapping("/web/**")
    public String forwardIndex() {
        return "forward:/index.html";
    }
}
