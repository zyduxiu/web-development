package com.spacestore.Service;

import com.spacestore.Entity.Carttable;
import com.spacestore.Entity.ordertable;
import com.spacestore.Entity.statics;
import lombok.Data;

import java.util.Date;
import java.util.List;
public interface OrderService {
        public List<ordertable> getOrder(String user);
        public void submitBookorder(String buyer, String phonenumber,Integer amount, String address, String book_id, String username);

        public List<ordertable> getOrders();

        public List<ordertable> getSearch(String username, String searchitem, Date Startdate,Date Enddate);

        public List<ordertable> getAllSearch(String searchitem, Date Startdate,Date Enddate);

        public statics getstastic(String username,Date Startdate,Date Enddate);

        public statics getbookstastic(Date Startdate,Date Enddate);

        public statics getuserstastic(Date Startdate,Date Enddate);
}
