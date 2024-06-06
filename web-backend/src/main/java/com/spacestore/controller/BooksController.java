package com.spacestore.controller;
import java.util.List;
import com.spacestore.Entity.bookdto;
import com.spacestore.Service.BooksService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class BooksController {
    @Autowired
    BooksService booksService;
    @CrossOrigin // 允许来自http://localhost:3000的请求
    @GetMapping("/home")
    public Page<bookdto> returnBooks(@RequestParam(defaultValue = "0") int page,
                                     @RequestParam(defaultValue = "10") int size){
        Pageable pageable = PageRequest.of(page, size);
        System.out.println(pageable);
        return booksService.getBooks(pageable);
    }

    @CrossOrigin
    @GetMapping("/search")
    public List<bookdto> returnSearchBooks(String searchtitle){
        return booksService.getSearchBooks(searchtitle);
    }

    @CrossOrigin
    @PostMapping("/alterInventory")
    public ResponseEntity<String> checkRequest(@RequestBody alter pd){
         int id=pd.getId();
         String title=pd.getTitle();
         String author=pd.getAuthor();
         int price=pd.getPrice();
         int amount=pd.getAmount();
         String imageUrl=pd.getImageUrl();
         String instruction=pd.getInstruction();
         System.out.println(id);
         System.out.println(amount);
         booksService.alterbookInventory(id,title,author,amount,price,imageUrl,instruction);
         return ResponseEntity.ok("Data received successfully!");
    }

    @CrossOrigin
    @PostMapping("/deletebook")
    public ResponseEntity<String> delete(@RequestBody boid pd){
        int id=pd.getId();
        System.out.println(id);
        booksService.deleteInventory(id);
        return ResponseEntity.ok("Data received successfully!");
    }
    @Data
    static class alter{
        int id;
        String title;
        String author;
        int amount;
        int price;
        String imageUrl;
        String instruction;
    }

    @Data
    static class boid{
        int id;
    }
}
