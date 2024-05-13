package com.spacestore.controller;

import com.spacestore.Service.CartService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.spacestore.Entity.Carttable;
@RestController
@CrossOrigin
public class getCartController {
    @Autowired
    CartService cartService;
    @CrossOrigin
    @PostMapping("/submit")
    public ResponseEntity<String> checkRequest(@RequestBody cartInformation pd){
        System.out.println("Received name: " + pd.getBuyer());
        System.out.println("Received phonenumber: " + pd.getPhonenumber());
        System.out.println("Received address: " + pd.getAddress());
        System.out.println("Received carts: "+pd.getCarts());
        System.out.println("Received username: "+pd.getUsername());
        cartService.submitCart(pd.getBuyer(),pd.getPhonenumber(),pd.getAddress(),pd.getCarts(),pd.getUsername());
        return ResponseEntity.ok("Data received successfully!");
    }
    @Data
    static class cartInformation{
        private String buyer;
        private String phonenumber;
        private String address;
        private Carttable carts;
        private String username;
    }
}
