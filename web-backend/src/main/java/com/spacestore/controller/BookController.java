package com.spacestore.controller;

import com.spacestore.DTO.bookdto;
import com.spacestore.Service.BooklistService;
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
public class BookController {
	@Autowired
	BooklistService booklistService;

	@Autowired
	BooksService booksService;
	@CrossOrigin // 允许来自http://localhost:3000的请求
	@GetMapping("/book")
	public bookdto getlist(int id){
		return booklistService.getBooklist(id);
	}

	@GetMapping("/home")
	public Page<bookdto> returnBooks(@RequestParam(defaultValue = "0") int page,
									 @RequestParam(defaultValue = "10") int size){
		Pageable pageable = PageRequest.of(page, size);
		System.out.println(pageable);
		return booksService.getBooks(pageable);
	}

	@CrossOrigin
	@GetMapping("/search")
	public Page<bookdto> returnSearchBooks(String searchtitle,int page,int size){
		Pageable pageable=PageRequest.of(page,size);
		if(searchtitle.equals("undefined")){
			return booksService.getBooks(pageable);
		}
		return booksService.getSearchBooks(searchtitle,pageable);
	}

	@CrossOrigin
	@PostMapping("/alterInventory")
	public ResponseEntity<String> checkRequest(@RequestBody alter pd){
		int id=pd.getId();
		String title=pd.getTitle();
		String author=pd.getAuthor();
		int price=pd.getPrice();
		int amount=pd.getAmount();
		String ISBN=pd.getIsbn();
		String imageUrl=pd.getImageUrl();
		String instruction=pd.getInstruction();
		System.out.println(id);
		System.out.println(amount);
		if(booksService.alterbookInventory(id,title,author,amount,price,imageUrl,instruction,ISBN)){
			return  ResponseEntity.ok("Data received successfully!");
		}
		;
		return ResponseEntity.badRequest().body("false");
	}

	@CrossOrigin
	@PostMapping("/deletebook")
	public ResponseEntity<String> delete(@RequestBody boid pd){
		int id=pd.getId();
		System.out.println(id);
		booksService.deleteInventory(id);
		return ResponseEntity.ok("Data received successfully!");
	}

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
	@Data
	static class alter{
		int id;
		String title;
		String author;
		int amount;
		int price;
		String imageUrl;
		String instruction;
		String isbn;
	}

	@Data
	static class boid{
		int id;
	}
}