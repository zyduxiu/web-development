package com.spacestore.Service;
import com.spacestore.Dao.Carttable;
public interface CartService {
    public Carttable getCart(String user);
}
