package com.spacestore.Service;

import com.spacestore.Entity.Carttable;
import com.spacestore.Entity.ordertable;
import java.util.List;
public interface OrderService {
        public List<ordertable> getOrder(String user);
        public void submitBookorder(String buyer, String phonenumber,Integer amount, String address, String book_id, String username);
}
