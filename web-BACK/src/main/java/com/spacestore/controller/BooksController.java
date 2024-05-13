package com.spacestore.controller;
import java.util.List;
import com.spacestore.Entity.bookdto;
import com.spacestore.Service.BooksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class BooksController {
    @Autowired
    BooksService booksService;
    @CrossOrigin // 允许来自http://localhost:3000的请求
    @GetMapping("/home")
    public List<bookdto> returnBooks(){
        return booksService.getBooks();
    }
}
