package com.spacestore.controller;

import com.spacestore.Entity.CartItem;
import com.spacestore.Entity.Carttable;
import com.spacestore.Service.CartService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class CartsServeController {
    @Autowired
    CartService cartService;
    @CrossOrigin
    @GetMapping("/cart")
    public Page<CartItem> returnCart(HttpServletRequest request,
                                     @RequestParam(defaultValue = "0") int page,
                                     @RequestParam(defaultValue = "5") int size){
        Pageable pageable = PageRequest.of(page, size);
        HttpSession session=request.getSession(false);
        Object userName=session.getAttribute("userName");
        String username=userName.toString();
        return cartService.getCart(username,pageable);
    }

}
