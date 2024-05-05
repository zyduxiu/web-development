package com.spacestore.controller;

import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class getCartController {
    @CrossOrigin
    @PostMapping("/submit")
    public ResponseEntity<String> checkRequest(@RequestBody cartInformation pd){
        System.out.println("Received name: " + pd.getBuyer());
        System.out.println("Received phonenumber: " + pd.getPhonenumber());
        System.out.println("Received address: " + pd.getAddress());

        return ResponseEntity.ok("Data received successfully!");
    }
    @Data
    static class cartInformation{
        private String buyer;
        private String phonenumber;
        private String address;
    }
}
