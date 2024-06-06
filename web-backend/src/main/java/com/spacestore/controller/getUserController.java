package com.spacestore.controller;

import com.spacestore.Dao.UserDaos;
import com.spacestore.Entity.UserTable;
import com.spacestore.Entity.userDto;
import com.spacestore.Service.Loginservice;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class getUserController {
    @Autowired
    UserDaos userDaos;

    @Autowired
    Loginservice loginservice;
    @CrossOrigin
    @GetMapping("/getuser")
    public userDto getuser(String username){
        return userDaos.getuserDto(username);
    }

    @CrossOrigin
    @GetMapping("/checkadmin")
    public ResponseEntity<String> checkadmin(HttpServletRequest request){
        if("ADMIN".equals(request.getSession(false).getAttribute("identity"))){
            return ResponseEntity.ok("yes");
        }
        return ResponseEntity.badRequest().body("no");
    }

    @CrossOrigin
    @GetMapping("/checksession")
    public ResponseEntity<String> checksession(HttpServletRequest request){
        if(request.getSession(false)!=null){
            return ResponseEntity.ok("yes");
        }
        return ResponseEntity.badRequest().body("no");
    }

    @CrossOrigin
    @GetMapping("/getusers")
    public List<userDto> getuserlist(){return loginservice.getUserlists();}

    @CrossOrigin
    @PostMapping("/changeprofile")
    public ResponseEntity<String> changeProfile(@RequestBody profilechange pd,HttpServletRequest request) {
        HttpSession session=request.getSession(false);
        Object userName=session.getAttribute("userName");
        String username=userName.toString();
        System.out.println("Received surname: " + pd.getSurname());
        System.out.println("Received instruction: " + pd.getInstruction());
        userDaos.changeuserDto(username,pd.getSurname(),pd.getInstruction(),pd.getImageUrl());
        return ResponseEntity.ok("Data received successfully!");
    }

    @CrossOrigin
    @PostMapping("/forbiduser")
    public ResponseEntity<String> forbidUser(@RequestBody usid pd){
        System.out.println(pd.getId());
        boolean test=loginservice.forbidsingleUser(pd.getId());
        if(test){
            return ResponseEntity.ok("this is true");
        }
        else{
            return ResponseEntity.ok("this is false");
        }
    }

    @Data
    static class profilechange{
        private String name;
        private String surname;
        private String instruction;
        private String imageUrl;
    }

    @Data
    static class usid{
        private int id;
    }


}
