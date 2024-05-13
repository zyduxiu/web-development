package com.spacestore.Service;

import com.spacestore.Entity.CartItem;
import com.spacestore.repository.*;
import jakarta.annotation.Resource;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import com.spacestore.Entity.Carttable;
import com.spacestore.Entity.logintable;
import com.spacestore.Entity.ordertable;
import java.util.OptionalInt;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import com.spacestore.Entity.orderItem;
import com.spacestore.repository.CartItemRepository;
import com.spacestore.repository.LoginUserRepository;
@Service
public class CartServiceA implements CartService{
    @Resource
    LoginUserRepository loginUserRepository;

    @Resource
    CartRepository cartRepository;
    @Resource
    OrderItemRepository orderItemRepository;
    @Resource
    CartItemRepository cartItemRepository;
    @Resource
    OrderRepository orderRepository;
    public Carttable getCart(String user){
        return loginUserRepository.findById(user).get().getcart();
    }
@Transactional
    public void submitCart(String buyer,String phonenumber,String address,Carttable carts,String username){
        ordertable tmp=new ordertable();
        Date now=new Date();
        tmp.setAddress(address);
        tmp.setPhonenumber(phonenumber);
        tmp.setTime(now);
        tmp.setLoginuser(loginUserRepository.findByUsername(username));
        tmp.setBuyer(buyer);
        List<orderItem> tmpp=new ArrayList<>();
        //orderRepository.save(tmp);
        for(CartItem cart:carts.getCartItems()){
            orderItem tmp2=new orderItem();
            tmp2.setBook_id(cart.getBookid());
            tmp2.setAmount(cart.getAmount());
            tmp2.setOrderTable(tmp);
           // orderItemRepository.save(tmp2);
            tmpp.add(tmp2);
        }
        tmp.setOrderItems(tmpp);
        orderRepository.save(tmp);
        cartItemRepository.deleteAll();
//        cartRepository.deleteAll();
    }

    @Transactional
    public void setnewBook(String username,int amount,int book_id) {
        logintable user = loginUserRepository.findByUsername(username);
        if (user == null) {
            return;
        }

        Carttable carttable = user.getcart();
        if (carttable == null) {
            carttable = new Carttable();
            user.setCart(carttable);
            loginUserRepository.save(user);
        }
        CartItem cartItem = new CartItem();
        if(cartItemRepository.findByBookid(book_id)==null) {
            cartItem.setAmount(amount);
            cartItem.setBookid(book_id);
            cartItem.setCarttable(carttable);
        }
        else{
            CartItem tmp = cartItemRepository.findByBookid(book_id);
            tmp.setAmount(tmp.getAmount() + amount);
            cartItem = tmp;
        }

        List<CartItem> cartItems = carttable.getCartItems();
        if (cartItems == null) {
            cartItems = List.of(cartItem);
        } else {
            cartItems.add(cartItem);
        }
        carttable.setCartItems(cartItems);

        cartItemRepository.save(cartItem);

        return;
    }
    @Transactional
    public void deleteOnebook(String username,Integer book_id){
        logintable user = loginUserRepository.findByUsername(username);
        CartItem cart=cartItemRepository.findByBookid(book_id);
        cartItemRepository.delete(cart);
    }

}
