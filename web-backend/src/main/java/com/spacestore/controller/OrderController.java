package com.spacestore.controller;

import com.spacestore.Service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.spacestore.Entity.ordertable;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@CrossOrigin
public class OrderController {
    @Autowired
    OrderService orderService;
    @CrossOrigin
    @GetMapping("/order")
    public Page<ordertable> returnOrders(@RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "10") int size,HttpServletRequest request){
        HttpSession session=request.getSession(false);
        Object userName=session.getAttribute("userName");
        String username=userName.toString();
        Pageable pageable = PageRequest.of(page, size);
        Page<ordertable> orderPage = orderService.getOrder(username,pageable);

        return orderPage;
    }

    @CrossOrigin
    @GetMapping("/getorders")
    public Page<ordertable> returnAllOrders(@RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "10") int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<ordertable> orderPage = orderService.getOrders(pageable);
        return orderPage;
    }

    @CrossOrigin
    @GetMapping("/searchthings")
    public Page<ordertable> returnSearchedOrders(
            HttpServletRequest request,
            @RequestParam(value = "searchtitle", required = false) String searchtitle,
            @RequestParam(value = "startdate", required = false) String startdate,
            @RequestParam(value = "enddate", required = false) String enddate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) throws ParseException {

        Pageable pageable = PageRequest.of(page, size);
        SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
        Date Startdate=new Date();
        Date Enddate=new Date();
        HttpSession session=request.getSession(false);
        Object userName=session.getAttribute("userName");
        String username=userName.toString();
        if(startdate!=null) {
           Startdate = isoFormat.parse(startdate);
        }
        if(enddate!=null) {
            Enddate = isoFormat.parse(enddate);
        }

        System.out.println("Search Item: " + searchtitle);
        System.out.println("Start Date: " + startdate);
        System.out.println("End Date: " + enddate);
        if(startdate==null&&enddate==null &&searchtitle.equals("null")) {
            return orderService.getOrder(username,pageable);
        }
        if(startdate!=null) {
            return orderService.getSearch(username, searchtitle, Startdate, Enddate,pageable);
        }
        else{
            return orderService.getSearch(username,searchtitle,null,null,pageable);
        }
    }

    @CrossOrigin
    @GetMapping("/searchallthings")
    public Page<ordertable> returnAllSearchedOrders(
            @RequestParam(value = "searchtitle", required = false) String searchtitle,
            @RequestParam(value = "startdate", required = false) String startdate,
            @RequestParam(value = "enddate", required = false) String enddate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
            ) throws ParseException {

        Pageable pageable = PageRequest.of(page, size);
        SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
        Date Startdate=new Date();
        Date Enddate=new Date();
        if(startdate!=null) {
            Startdate = isoFormat.parse(startdate);
        }
        if(enddate!=null) {
            Enddate = isoFormat.parse(enddate);
        }

        System.out.println("Search Item: " + searchtitle);
        System.out.println("Start Date: " + startdate);
        System.out.println("End Date: " + enddate);
        if(startdate==null&&enddate==null &&searchtitle.equals("null")) {
            return orderService.getOrders(pageable);
        }
        if(startdate!=null) {
            return orderService.getAllSearch( searchtitle, Startdate, Enddate,pageable);
        }
        else{
            return orderService.getAllSearch(searchtitle,null,null,pageable);
        }
    }

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

    @Data
    static class searchthings{
        private String username;
        private String searchitem;
        private String startdate;
        private String enddate;
    }
}