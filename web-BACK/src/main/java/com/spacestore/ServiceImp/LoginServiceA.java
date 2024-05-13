package com.spacestore.Service;
import com.spacestore.repository.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.spacestore.Entity.Loginuser;
@Component
public class LoginServiceA implements Loginservice{
    @Autowired
    private UserMapper userMapper;
    public Loginuser checkLogin(String username,String password){
        Loginuser user=userMapper.findByUsernameAndPassword(username,password);
        return user;
    }
}
