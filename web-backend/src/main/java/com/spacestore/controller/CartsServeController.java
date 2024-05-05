package com.spacestore.controller;

import com.spacestore.Dao.Carttable;
import com.spacestore.Service.CartService;
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
    public Carttable returnCart(String username){
        return cartService.getCart(username);
    }
}
