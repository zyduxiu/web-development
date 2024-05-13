package com.spacestore.controller;
import com.spacestore.Entity.bookdto;
import com.spacestore.Service.BooklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin
public class BooklistController {
    @Autowired
    BooklistService booklistService;
    @CrossOrigin // 允许来自http://localhost:3000的请求
    @GetMapping("/book")
    public bookdto getlist(int id){
        return booklistService.getBooklist(id);
    }

}

