package com.spacestore.controller;

import com.spacestore.Entity.Carttable;
import com.spacestore.Service.CartService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class CartsServeController {
    @Autowired
    CartService cartService;
    @CrossOrigin
    @GetMapping("/cart")
    public Carttable returnCart(HttpServletRequest request){
        HttpSession session=request.getSession(false);
        Object userName=session.getAttribute("userName");
        String username=userName.toString();
        return cartService.getCart(username);
    }

}
