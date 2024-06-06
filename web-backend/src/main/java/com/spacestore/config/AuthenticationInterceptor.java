//package com.spacestore.config;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.stereotype.Component;
//import org.springframework.web.servlet.HandlerInterceptor;
//import org.springframework.web.servlet.ModelAndView;
//import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Component
//public class AuthenticationInterceptor implements HandlerInterceptor {
//
//    @Override
//    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        // 检查用户是否已登录
//        String jwt = request.getHeader("Authorization");
//        if (jwt != null && !jwt.isEmpty()) {
//            // 解析JWT并验证
//            // ...
//            return true; // 如果验证通过，继续处理请求
//        } else {
//            HttpServletResponse httpServletResponse
//            httpServletResponse.sendRedirect("http://srip.cpu.edu.cn/#/admins");
//            return true;
//           // return false; // 阻止请求继续
//        }
//    }
//
//}
//


