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
public class getCartitemController {
    @Autowired
    CartService cartService;
    @CrossOrigin
    @PostMapping("/cartitem")
    public ResponseEntity<String> checkRequest(@RequestBody cartItem pd, HttpServletRequest request) {
        System.out.println("Received name: " + pd.getUsername());
        System.out.println("Received amount: " + pd.getAmount());
        System.out.println("Received book_id: " + pd.getBook_id());
        HttpSession session=request.getSession(false);
        Object userName=session.getAttribute("userName");
        String username=userName.toString();
        cartService.setnewBook(username,pd.getAmount(),pd.getBook_id());
        return ResponseEntity.ok("Data received successfully!");
    }
@Data
    static class cartItem{
        String username;
        int amount;
        int book_id;
    }
}
