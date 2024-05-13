package com.spacestore.controller;
import com.spacestore.Entity.Loginuser;
import com.spacestore.Service.SignupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SignupController {
    @Autowired
    private SignupService signupService;
    @PostMapping("/adduser")
    public String savenewuser(@RequestBody Loginuser newuser){
        return signupService.Signupservice(newuser);
    }
}
