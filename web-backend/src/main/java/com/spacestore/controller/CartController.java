package com.spacestore.controller;

import com.spacestore.Entity.CartItem;
import com.spacestore.Service.CartService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class CartController {
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

	@CrossOrigin
	@PostMapping("/deletecart")
	public ResponseEntity<String> checkRequest(@RequestBody deletebookInformation pd, HttpServletRequest request){
		System.out.println("Received username: "+pd.getUsername());
		HttpSession session=request.getSession(false);
		Object userName=session.getAttribute("userName");
		String username=userName.toString();
		System.out.println("Received bookid: "+pd.getBook_id());
		// cartService.submitCart(pd.getBuyer(),pd.getPhonenumber(),pd.getAddress(),pd.getCarts(),pd.getUsername());
		cartService.deleteOnebook(username, pd.book_id);
		return ResponseEntity.ok("Data received successfully!");
	}

	@CrossOrigin
	@PostMapping("/postcart")
	public ResponseEntity<String> checkRequest(@RequestBody cartInformation pd, HttpServletRequest request){
		System.out.println("Received name: " + pd.getBuyer());
		System.out.println("Received phonenumber: " + pd.getPhonenumber());
		System.out.println("Received address: " + pd.getAddress());
		HttpSession session=request.getSession(false);
		Object userName=session.getAttribute("userName");
		String username=userName.toString();
		if(cartService.submitCart(pd.getBuyer(),pd.getPhonenumber(),pd.getAddress(),username)) {
			return ResponseEntity.ok("Data received successfully!");
		}
		else{
			return ResponseEntity.badRequest().body("false");
		}
	}

	@CrossOrigin
	@PostMapping("/cartitem")
	public ResponseEntity<String> checkRequest(@RequestBody cartItem pd, HttpServletRequest request) {
		System.out.println("Received name: " + pd.getUsername());
		System.out.println("Received amount: " + pd.getAmount());
		System.out.println("Received book_id: " + pd.getBook_id());
		HttpSession session=request.getSession(false);
		Object userName=session.getAttribute("userName");
		String username=userName.toString();
		cartService.setnewBook(username,pd.getAmount(),pd.getBook_id());
		return ResponseEntity.ok("Data received successfully!");
	}
	@Data
	static class cartItem{
		String username;
		int amount;
		int book_id;
	}

	@Data
	static class cartInformation{
		private String buyer;
		private String phonenumber;
		private String address;
	}

	@Data
	static class deletebookInformation{
		private String username;
		private int book_id;
	}
}
