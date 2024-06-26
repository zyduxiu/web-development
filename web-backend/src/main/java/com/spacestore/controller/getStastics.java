package com.spacestore.controller;

import com.spacestore.Service.OrderService;
import jakarta.persistence.Id;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.spacestore.Entity.statics;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@CrossOrigin
@RestController
public class getStastics {
    @Autowired
    OrderService orderService;

    @CrossOrigin
    @GetMapping("/getStastics")
    statics getstastic(HttpServletRequest request, @RequestParam(value = "startdate", required = false) String startdate,
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
        HttpSession session=request.getSession(false);
        Object userName=session.getAttribute("userName");
        String username=userName.toString();
        if(startdate!=null&&enddate!=null) {
            return orderService.getstastic(username,Startdate,Enddate);
        }
        else{
            return orderService.getstastic(username,null,null);
        }
    }

    @CrossOrigin
    @GetMapping("/getAllBookStastics")
    statics getbookstastic(@RequestParam(value = "startdate", required = false) String startdate,
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
        if(startdate!=null&&enddate!=null) {
            return orderService.getbookstastic(Startdate,Enddate);
        }
        else{
            return orderService.getbookstastic(null,null);
        }
    }

    @CrossOrigin
    @GetMapping("/getAllUserStastics")
    statics getuserstastic(@RequestParam(value = "startdate", required = false) String startdate,
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
        if(startdate!=null&&enddate!=null) {
            return orderService.getuserstastic(Startdate,Enddate);
        }
        else{
            return orderService.getuserstastic(null,null);
        }
    }

    @CrossOrigin
    @GetMapping("/getAllUserBookStastics")
    statics getuserbookstastic(@RequestParam(value = "startdate", required = false) String startdate,
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
        if(startdate!=null&&enddate!=null) {
            return orderService.getuserbookstastic(Startdate,Enddate);
        }
        else{
            return orderService.getuserbookstastic(null,null);
        }
    }
}
