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

@RestController
@CrossOrigin
public class deletecartController {
    @Autowired
    CartService cartService;
    @CrossOrigin
    @PostMapping("/deletecart")
    public ResponseEntity<String> checkRequest(@RequestBody deletebookInformation pd, HttpServletRequest request){
        System.out.println("Received username: "+pd.getUsername());
        HttpSession session=request.getSession(false);
        Object userName=session.getAttribute("userName");
        String username=userName.toString();
        System.out.println("Received bookid: "+pd.getBook_id());
       // cartService.submitCart(pd.getBuyer(),pd.getPhonenumber(),pd.getAddress(),pd.getCarts(),pd.getUsername());
        cartService.deleteOnebook(username, pd.book_id);
        return ResponseEntity.ok("Data received successfully!");
    }
    @Data
    static class deletebookInformation{
        private String username;
        private int book_id;
    }
}
