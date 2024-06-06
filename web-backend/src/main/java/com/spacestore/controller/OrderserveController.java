package com.spacestore.controller;

import com.spacestore.Service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.spacestore.Entity.ordertable;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
@RestController
@CrossOrigin
public class OrderserveController {
    @Autowired
    OrderService orderService;
    @CrossOrigin
    @GetMapping("/order")
    public List<ordertable> returnOrders(HttpServletRequest request){
        HttpSession session=request.getSession(false);
        Object userName=session.getAttribute("userName");
        String username=userName.toString();
        List<ordertable> ss=orderService.getOrder(username);
        return orderService.getOrder(username);
    }

    @CrossOrigin
    @GetMapping("/getorders")
    public List<ordertable> returnAllOrders(){
        List<ordertable> ss=orderService.getOrders();
        return orderService.getOrders();
    }

    @CrossOrigin
    @GetMapping("/searchthings")
    public List<ordertable> returnSearchedOrders(
            HttpServletRequest request,
            @RequestParam(value = "searchtitle", required = false) String searchtitle,
            @RequestParam(value = "startdate", required = false) String startdate,
            @RequestParam(value = "enddate", required = false) String enddate) throws ParseException {

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
            return orderService.getOrder(username);
        }
        if(startdate!=null) {
            return orderService.getSearch(username, searchtitle, Startdate, Enddate);
        }
        else{
            return orderService.getSearch(username,searchtitle,null,null);
        }
    }

    @CrossOrigin
    @GetMapping("/searchallthings")
    public List<ordertable> returnAllSearchedOrders(
            @RequestParam(value = "searchtitle", required = false) String searchtitle,
            @RequestParam(value = "startdate", required = false) String startdate,
            @RequestParam(value = "enddate", required = false) String enddate) throws ParseException {

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
            return orderService.getOrders();
        }
        if(startdate!=null) {
            return orderService.getAllSearch( searchtitle, Startdate, Enddate);
        }
        else{
            return orderService.getAllSearch(searchtitle,null,null);
        }
    }

    @Data
    static class searchthings{
        private String username;
        private String searchitem;
        private String startdate;
        private String enddate;
    }
}