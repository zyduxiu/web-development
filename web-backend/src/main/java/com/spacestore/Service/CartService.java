package com.spacestore.Service;
import com.spacestore.Entity.CartItem;
import com.spacestore.Entity.Carttable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CartService {
    public Page<CartItem> getCart(String user, Pageable pageable);
    public boolean submitCart(String buyer,String phonenumber,String address,String username);

    public void setnewBook(String username,int amount,int book_id);
    public void deleteOnebook(String username,Integer book_id);
    public CartItem findByBookid(Carttable carts,int bookid);
}
