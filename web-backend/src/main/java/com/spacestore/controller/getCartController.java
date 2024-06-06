package com.spacestore.controller;

import com.spacestore.Service.CartService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
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
    public ResponseEntity<String> checkRequest(@RequestBody cartInformation pd, HttpServletRequest request){
        System.out.println("Received name: " + pd.getBuyer());
        System.out.println("Received phonenumber: " + pd.getPhonenumber());
        System.out.println("Received address: " + pd.getAddress());
        System.out.println("Received carts: "+pd.getCarts());
        HttpSession session=request.getSession(false);
        Object userName=session.getAttribute("userName");
        String username=userName.toString();
        if(cartService.submitCart(pd.getBuyer(),pd.getPhonenumber(),pd.getAddress(),pd.getCarts(),username)) {
            return ResponseEntity.ok("Data received successfully!");
        }
        else{
            return ResponseEntity.badRequest().body("false");
        }
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
