package com.spacestore.controller;

import com.spacestore.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.spacestore.Entity.ordertable;
import java.util.List;
@RestController
@CrossOrigin
public class OrderserveController {
    @Autowired
    OrderService orderService;
    @CrossOrigin
    @GetMapping("/order")
    public List<ordertable> returnOrders(String username){
        List<ordertable> ss=orderService.getOrder(username);
        return orderService.getOrder(username);
    }
}