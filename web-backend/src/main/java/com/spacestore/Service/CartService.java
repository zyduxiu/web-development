package com.spacestore.Service;
import com.spacestore.Entity.CartItem;
import com.spacestore.Entity.Carttable;
public interface CartService {
    public Carttable getCart(String user);
    public boolean submitCart(String buyer,String phonenumber,String address,Carttable carts,String username);

    public void setnewBook(String username,int amount,int book_id);
    public void deleteOnebook(String username,Integer book_id);
    public CartItem findByBookid(Carttable carts,int bookid);
}
