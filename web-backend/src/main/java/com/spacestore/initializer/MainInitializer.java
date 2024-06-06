//package com.spacestore.initializer;
//
//import com.spacestore.config.WebSecurityConfig;
//import org.springframework.security.web.context.AbstractSecurityWebApplicationInitializer;
//import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;
//
//public class MainInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
//    @Override
//    protected Class<?>[] getRootConfigClasses(){
//        return new Class[]{WebSecurityConfig.class};
//    }
//
//    @Override
//    protected Class<?>[] getServletConfigClasses(){
//        return new Class[0];
//    }
//
//    @Override
//    protected String[] getServletMappings(){return new String[]{"/"};}
//}
