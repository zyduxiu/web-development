package com.spacestore.controller;
import com.spacestore.Service.Loginservice;
import com.spacestore.Dao.Loginuser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class LoginController {
    @Autowired
    private Loginservice LoginService;
    @GetMapping("/login")
    public String iflogin(String username,String password){
       Loginuser user=LoginService.checkLogin(username,password);
        if(user!=null)
        {
            return "true";
        }
        else{
            return "false";
        }
    }
}
