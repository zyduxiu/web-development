package com.spacestore.controller;

import com.spacestore.Entity.Carttable;
import com.spacestore.Service.CartService;
import com.spacestore.Service.OrderService;
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
public class buyBookcontroller {
    @Autowired
    OrderService orderService;
    @CrossOrigin
    @PostMapping("/buybook")
    public ResponseEntity<String> checkRequest(@RequestBody bookInformation pd, HttpServletRequest request) {
        HttpSession session=request.getSession(false);
        Object userName=session.getAttribute("userName");
        String username=userName.toString();
        System.out.println("Received name: " + pd.getBuyer());
        System.out.println("Received phonenumber: " + pd.getPhonenumber());
        System.out.println("Received amount: " + pd.getAmount());
        System.out.println("Received address: " + pd.getAddress());
        System.out.println("Received carts: " + pd.getBook_id());
        System.out.println("Received username: " + pd.getUsername());
        orderService.submitBookorder(pd.getBuyer(),pd.getPhonenumber(),pd.getAmount(),pd.getAddress(),pd.getBook_id(),username);
        return ResponseEntity.ok("Data received successfully!");
    }
    @Data
    static class bookInformation{
        private String buyer;
        private String phonenumber;
        private Integer amount;
        private String address;
        private String book_id;
        private String username;
    }
}
