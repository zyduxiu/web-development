package com.spacestore.Service;

import com.spacestore.Entity.Carttable;
import com.spacestore.Entity.ordertable;
import com.spacestore.Entity.statics;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;
public interface OrderService {
        public Page<ordertable> getOrder(String user,Pageable pageable);
        public void submitBookorder(String buyer, String phonenumber,Integer amount, String address, String book_id, String username);

        public Page<ordertable> getOrders(Pageable pageable);

        public Page<ordertable> getSearch(String username, String searchitem, Date Startdate,Date Enddate,Pageable pageable);

        public Page<ordertable> getAllSearch(String searchitem, Date Startdate,Date Enddate,Pageable pageable);

        public statics getstastic(String username,Date Startdate,Date Enddate);

        public statics getbookstastic(Date Startdate,Date Enddate);

        public statics getuserstastic(Date Startdate,Date Enddate);

        public statics getuserbookstastic(Date Startdate,Date Enddate);
}
