package com.spacestore.controller;

import com.spacestore.Service.BooksService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class AlterbookController {
    @Autowired
    BooksService booksService;

    @CrossOrigin
    @PostMapping("/addbook")

    public ResponseEntity<String>  Addbook(@RequestBody bookInformation pd){
        String title=pd.getTitle();
        String author= pd.getAuthor();
        int amount=pd.getAmount();
        int price=pd.getPrice();
        String imageUrl=pd.getImageUrl();
        String instruction=pd.getInstruction();
        String ISBN=pd.getISBN();
        if(booksService.addBook(title,author,amount,price,imageUrl,instruction,ISBN)) {
            return ResponseEntity.ok("Data received successfully!");
        }
        return ResponseEntity.badRequest().body("false");
    }

    @Data
    static class bookInformation {
        private String title;
        private String author;
        private int amount;
        private int price;
        private String imageUrl;
        private String instruction;
        private String ISBN;
    }

}
