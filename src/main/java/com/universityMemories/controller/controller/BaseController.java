package com.universityMemories.controller.controller;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.RequestContext;

import javax.servlet.http.HttpServletRequest;

@Component
public class BaseController {
    // 国际化消息文本
    protected static String getMessage(HttpServletRequest request, String code) {
        RequestContext reqCtx = new RequestContext(request);
        return reqCtx.getMessage(code);
    }
}
