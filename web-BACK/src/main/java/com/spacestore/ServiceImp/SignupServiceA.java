package com.spacestore.Service;
import com.spacestore.Entity.Loginuser;
import com.spacestore.repository.SignupMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SignupServiceA implements SignupService{
    @Autowired
    public SignupMapper newmapper;
    public String Signupservice(Loginuser newuser){
        newmapper.insertLoginUser(newuser.getUsername(), newuser.getPassword());
        return "Add OK";
    }
}
