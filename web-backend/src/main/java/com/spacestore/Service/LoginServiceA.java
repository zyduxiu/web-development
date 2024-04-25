package com.spacestore.Service;
import com.spacestore.Service.Loginservice;
import com.spacestore.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.spacestore.Loginpojo.Loginuser;
@Component
public class LoginServiceA {
    @Autowired
    private UserMapper userMapper;
    public Loginuser checkLogin(String username,String password){
        return userMapper.findByUsernameAndPassword(username,password);
    }
}
