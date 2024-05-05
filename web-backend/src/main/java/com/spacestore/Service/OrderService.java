package com.spacestore.Service;

import com.spacestore.Dao.ordertable;
import java.util.List;
public interface OrderService {
        public List<ordertable> getOrder(String user);
}
