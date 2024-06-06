package com.spacestore.initializer;

import com.spacestore.Util.SessionUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;

@Component
public class SessionInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }
        HttpSession session = request.getSession(false);
        String x=request.getCookies().toString();
        if (session == null) {
            return false;
        }

        String requestUri = request.getRequestURI();
        String[] adminPaths = {"/getAllUserStastics","/getAllBookStastics","/alterInventory",
                "/deletebook","/forbiduser","/manage/book","/manage/register",
               "/manage/order","/stastic/book" ,"/stastic/user"};
        for (String adminPath : adminPaths) {
            if (requestUri.matches(adminPath)) {
                if ("ADMIN".equals(session.getAttribute("identity"))) {
                    return true;
                } else {
                    response.sendError(HttpServletResponse.SC_FORBIDDEN, "Access denied");
                    return false;
                }
            }
        }

        Object username=session.getAttribute("userId");
        return true;

    }
}