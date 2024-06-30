package com.spacestore.ServiceImp;

import com.spacestore.Entity.*;
import com.spacestore.Service.CartService;
import com.spacestore.repository.*;
import jakarta.annotation.Resource;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.spacestore.repository.UserauthRepository;
@Service
public class CartServiceA implements CartService{
    @Resource
    UserauthRepository userauthRepository;

    @Resource
    UserTableRepository userTableRepository;

@Resource
Bookrepository bookrepository;
    @Resource
    CartRepository cartRepository;
    @Resource
    OrderRepository orderRepository;
    public Page<CartItem> getCart(String user, Pageable pageable){
        Userauth userauth=userauthRepository.findByUsername(user);
        List<CartItem> cartItems=userauth.getcart().getCartItems();
        int totalElements = cartItems.size();
        Sort sort = pageable.getSort();
        int pageSize = pageable.getPageSize();
        int pageNumber = pageable.getPageNumber();
        int startOffset = pageNumber * pageSize;

        if (startOffset >= totalElements) {
            startOffset = 0;
        }

        List<CartItem> pagedResult = new ArrayList<>();
        for (int i = startOffset; i < Math.min(startOffset + pageSize, totalElements); i++) {
            pagedResult.add(cartItems.get(i));
        }

        return new PageImpl<>(pagedResult, pageable, totalElements);
    }

    public CartItem findByBookid(Carttable carts,int bookid){
       if(carts.getCartItems()==null){
           return null;
       }
        List<CartItem> cartitems=carts.getCartItems();
        for(CartItem cartitem:cartitems){
            if(cartitem.getBookid()==bookid){
                return cartitem;
            }
        }
        return null;
    }

@Transactional
    public boolean submitCart(String buyer,String phonenumber,String address,String username){
        ordertable tmp=new ordertable();
        Userauth userauth=userauthRepository.findByUsername(username);

        Date now=new Date();
        tmp.setAddress(address);
        tmp.setPhonenumber(phonenumber);
        tmp.setTime(now);
        tmp.setLoginuser(userauthRepository.findByUsername(username));
        tmp.setBuyer(buyer);
        List<orderItem> tmpp=new ArrayList<>();
        Userauth loginuser=userauthRepository.findByUsername(username);
        Carttable carttable=loginuser.getcart();
        if(carttable.getCartItems()==null||carttable.getCartItems().size()==0){
            return true;
        }
        for(CartItem cartItem:carttable.getCartItems()){
            if(cartItem.getAmount()>bookrepository.findByBookid(cartItem.getBookid()).getAmount()){
                return false;
            }
            if(bookrepository.findByBookid(cartItem.getBookid()).isDeleted()){
                return false;
            }
        }
        int totalPrice=0;
        //orderRepository.save(tmp);
        for(CartItem cart:carttable.getCartItems()){
            booktable booktable=bookrepository.findByBookid(cart.getBookid());
            booktable.setAmount(booktable.getAmount()-cart.getAmount());
            bookrepository.save(booktable);
            orderItem tmp2=new orderItem();
            tmp2.setBook_id(cart.getBookid());
            tmp2.setAmount(cart.getAmount());
            tmp2.setOrderTable(tmp);
           // orderItemRepository.save(tmp2);
            tmpp.add(tmp2);
            totalPrice+=bookrepository.findByBookid(cart.getBookid()).getPrice()*cart.getAmount();
        }
        tmp.setOrderItems(tmpp);
        tmp.setTotalprice(totalPrice);
        orderRepository.save(tmp);
        carttable.getCartItems().clear();
        cartRepository.save(carttable);
        return true;
//        cartItemRepository.deleteAll();
//        cartRepository.deleteAll();
    }

    @Transactional
    public void setnewBook(String username,int amount,int book_id) {
        Userauth user = userauthRepository.findByUsername(username);
        if (user == null) {
            return;
        }
        if(user.getcart()==null){
            Carttable carttable=new Carttable();
            carttable.setUser(user);
            user.setCart(carttable);
        }
        Carttable carttable = user.getcart();
        if (carttable == null) {
            carttable = new Carttable();
            user.setCart(carttable);
            userauthRepository.save(user);
        }
        CartItem cartItem = new CartItem();
        if(findByBookid(carttable,book_id)==null) {
            cartItem.setAmount(amount);
            cartItem.setBookid(book_id);
            cartItem.setCarttable(carttable);
        }
        else{
            CartItem tmp = findByBookid(carttable,book_id);
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

       // cartItemRepository.save(cartItem);

        return;
    }
    @Transactional
    public void deleteOnebook(String username,Integer book_id){
        Userauth loginuser=userauthRepository.findByUsername(username);
        Carttable carttable=loginuser.getcart();
        CartItem cart=new CartItem();
        for(CartItem cartItem:carttable.getCartItems()) {
            if(cartItem.getBookid()==book_id){
                cart=cartItem;
                break;
            }
        }
        carttable.getCartItems().remove(cart);
        cartRepository.save(carttable);
    }

}
