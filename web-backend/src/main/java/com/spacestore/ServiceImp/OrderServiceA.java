package com.spacestore.ServiceImp;

import com.spacestore.Entity.*;
import com.spacestore.Service.BooklistService;
import com.spacestore.Service.OrderService;
import com.spacestore.repository.Bookrepository;
import com.spacestore.repository.UserauthRepository;
import com.spacestore.repository.OrderRepository;
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

@Service
public class OrderServiceA implements OrderService {
    @Resource
    UserauthRepository userauthRepository;

    @Resource
    OrderRepository orderRepository;

    @Resource
    Bookrepository bookrepository;

    public Page<ordertable> getOrder(String user,Pageable pageable) {

        if (userauthRepository.findByUsername(user).getorders() != null) {
            // System.out.println(loginUserRepository.findById(user).get().getorders());
            ordertable ordertable;
            List<ordertable> orderItems = userauthRepository.findByUsername(user).getorders();
            int totalElements = orderItems.size();
            Sort sort = pageable.getSort();
            int pageSize = pageable.getPageSize();
            int pageNumber = pageable.getPageNumber();
            int startOffset = pageNumber * pageSize;

            // 确保开始偏移量不会超出结果列表的大小
            if (startOffset >= totalElements) {
                startOffset = 0;
            }

            List<ordertable> pagedResult = new ArrayList<>();
            for (int i = startOffset; i < Math.min(startOffset + pageSize, totalElements); i++) {
                pagedResult.add(orderItems.get(i));
            }

            // 创建并返回分页对象
            return new PageImpl<>(pagedResult, pageable, totalElements);
        }
        return null;
    }

    @Transactional
    public void submitBookorder(String buyer, String phonenumber, Integer amount, String address, String book_id, String username) {
        booktable booktable=bookrepository.findByBookid(Integer.parseInt(book_id));
        booktable.setAmount(booktable.getAmount()-amount);
        bookrepository.save(booktable);
        ordertable tmp = new ordertable();
        Date now = new Date();
        tmp.setAddress(address);
        tmp.setPhonenumber(phonenumber);
        tmp.setTime(now);
        tmp.setLoginuser(userauthRepository.findByUsername(username));
        tmp.setBuyer(buyer);
        List<orderItem> tmpp = new ArrayList<>();
        //orderRepository.save(tmp);
        orderItem tmp2 = new orderItem();
        tmp2.setBook_id(Integer.parseInt(book_id));
        tmp2.setAmount(amount);
        tmp2.setOrderTable(tmp);
        tmpp.add(tmp2);

        tmp.setOrderItems(tmpp);
        orderRepository.save(tmp);
    }

    public Page<ordertable> getOrders(Pageable pageable) {
        return orderRepository.findAll(pageable);
    }

    public Page<ordertable> getSearch(String username, String searchitem, Date Startdate, Date Enddate, Pageable pageable) {
        if(searchitem.equals("null")&&Startdate==null&&Enddate==null){
            return getOrder(username,pageable);
        }
        List<ordertable> table = new ArrayList<>();
        List<booktable> booktables;
        if(searchitem.equals("null")){
            booktables=bookrepository.findAll();
        }
        else{
            booktables = bookrepository.findByTitleLike(searchitem);
        }
        List<ordertable> result = new ArrayList<>();
        List<ordertable> intime = new ArrayList<>();
        if (userauthRepository.findByUsername(username).getorders() != null) {
            // System.out.println(loginUserRepository.findById(user).get().getorders());
            ordertable ordertable;
            table = userauthRepository.findByUsername(username).getorders();
        }
        if (Startdate == null) {
            intime = table;
        } else {
            for (ordertable order : table) {
                if (order.getTime().compareTo(Startdate) >= 0 && order.getTime().compareTo(Enddate) <= 0) {
                    intime.add(order);
                }
            }
        }
        for (ordertable order : intime) {
            for (orderItem orderItem : order.getOrderItems()) {
                booktable tmp = bookrepository.findByBookid(orderItem.getBook_id());
                if (booktables.contains(tmp)) {
                    result.add(order);
                    break;
                }
            }
        }
        int totalElements = result.size();
        Sort sort = pageable.getSort();
        int pageSize = pageable.getPageSize();
        int pageNumber = pageable.getPageNumber();
        int startOffset = pageNumber * pageSize;

        // 确保开始偏移量不会超出结果列表的大小
        if (startOffset >= totalElements) {
            startOffset = 0;
        }

        List<ordertable> pagedResult = new ArrayList<>();
        for (int i = startOffset; i < Math.min(startOffset + pageSize, totalElements); i++) {
            pagedResult.add(result.get(i));
        }

        // 创建并返回分页对象
        return new PageImpl<>(pagedResult, pageable, totalElements);
    }

    public Page<ordertable> getAllSearch(String searchitem, Date Startdate, Date Enddate, Pageable pageable) {
        if (searchitem.equals("null") && Startdate == null && Enddate == null) {
            return getOrders(pageable);
        }

        List<ordertable> table = new ArrayList<>();
        List<booktable> booktables;
        if (searchitem.equals("null")) {
            booktables = bookrepository.findAll();
        } else {
            booktables = bookrepository.findByTitleLike(searchitem);
        }

        List<ordertable> result = new ArrayList<>();
        List<ordertable> intime = new ArrayList<>();
        table = orderRepository.findAll();

        if (Startdate == null) {
            intime = table;
        } else {
            for (ordertable order : table) {
                if (order.getTime().compareTo(Startdate) >= 0 && order.getTime().compareTo(Enddate) <= 0) {
                    intime.add(order);
                }
            }
        }

        for (ordertable order : intime) {
            for (orderItem orderItem : order.getOrderItems()) {
                booktable tmp = bookrepository.findByBookid(orderItem.getBook_id());
                if (booktables.contains(tmp)) {
                    result.add(order);
                    break;
                }
            }
        }

        // 手动分页逻辑
        int totalElements = result.size();
        Sort sort = pageable.getSort();
        int pageSize = pageable.getPageSize();
        int pageNumber = pageable.getPageNumber();
        int startOffset = pageNumber * pageSize;

        // 确保开始偏移量不会超出结果列表的大小
        if (startOffset >= totalElements) {
            startOffset = 0;
        }

        List<ordertable> pagedResult = new ArrayList<>();
        for (int i = startOffset; i < Math.min(startOffset + pageSize, totalElements); i++) {
            pagedResult.add(result.get(i));
        }

        // 创建并返回分页对象
        return new PageImpl<>(pagedResult, pageable, totalElements);
    }

    public statics getstastic(String username,Date Startdate,Date Enddate){
        List<ordertable> table=new ArrayList<>();
        List<ordertable> intime=new ArrayList<>();
        int totalcost=0;
        int totalamount=0;
        statics result=new statics();
        if (userauthRepository.findByUsername(username).getorders() != null) {
            // System.out.println(loginUserRepository.findById(user).get().getorders());
            ordertable ordertable;
            table = userauthRepository.findByUsername(username).getorders();
        }
        if (Startdate == null) {
            intime = table;
        }
        else{
            for (ordertable order : table) {
                if (order.getTime().compareTo(Startdate) >= 0 && order.getTime().compareTo(Enddate) <= 0) {
                    intime.add(order);
                }
            }
        }
        for(ordertable order:intime){
            for(orderItem orderItem:order.getOrderItems()){
                int bookid=orderItem.getBook_id();
                booktable book=new booktable();
                if(bookrepository.findByBookid(bookid)!=null){
                    book=bookrepository.findByBookid(bookid);
                    result.addBookInList(book.getTitle(),orderItem.getAmount());
                    totalamount+=orderItem.getAmount();
                    totalcost+=orderItem.getAmount()*book.getPrice();
                }
            }
        }
        result.setTotalbooks(totalamount);
        result.setTotalprice(totalcost);
        return result;
    }

    public statics getbookstastic(Date Startdate,Date Enddate){
        List<ordertable> table=new ArrayList<>();
        List<ordertable> intime=new ArrayList<>();
        int totalcost=0;
        int totalamount=0;
        statics result=new statics();
        table=orderRepository.findAll();
        if (Startdate == null) {
            intime = table;
        }
        else{
            for (ordertable order : table) {
                if (order.getTime().compareTo(Startdate) >= 0 && order.getTime().compareTo(Enddate) <= 0) {
                    intime.add(order);
                }
            }
        }
        for(ordertable order:intime){
            for(orderItem orderItem:order.getOrderItems()){
                int bookid=orderItem.getBook_id();
                booktable book=new booktable();
                if(bookrepository.findByBookid(bookid)!=null){
                    book=bookrepository.findByBookid(bookid);
                    result.addBookInList(book.getTitle(),orderItem.getAmount());
                    totalamount+=orderItem.getAmount();
                    totalcost+=orderItem.getAmount()*book.getPrice();
                }

            }
        }
        result.setTotalbooks(totalamount);
        result.setTotalprice(totalcost);
        return result;
    }

    public statics getuserstastic(Date Startdate,Date Enddate){
        List<ordertable> table=new ArrayList<>();
        List<ordertable> intime=new ArrayList<>();
        int totalcost=0;
        int totalamount=0;
        statics result=new statics();
        table=orderRepository.findAll();
        if (Startdate == null) {
            intime = table;
        }
        else{
            for (ordertable order : table) {
                if (order.getTime().compareTo(Startdate) >= 0 && order.getTime().compareTo(Enddate) <= 0) {
                    intime.add(order);
                }
            }
        }
        for(ordertable order:intime) {
            Userauth userauth=order.getLoginuser();
            String username=userauth.getUsername();
            for(orderItem orderItem:order.getOrderItems()){
                booktable book=new booktable();
                int price=0;
                if(bookrepository.findByBookid(orderItem.getBook_id())!=null){
                    book=bookrepository.findByBookid(orderItem.getBook_id());
                    price=book.getPrice();
                }
                result.addBookInList(username,orderItem.getAmount()*(price));
            }
        }
        return result;
    }
    public statics getuserbookstastic(Date Startdate,Date Enddate){
        List<ordertable> table=new ArrayList<>();
        List<ordertable> intime=new ArrayList<>();
        int totalcost=0;
        int totalamount=0;
        statics result=new statics();
        table=orderRepository.findAll();
        if (Startdate == null) {
            intime = table;
        }
        else{
            for (ordertable order : table) {
                if (order.getTime().compareTo(Startdate) >= 0 && order.getTime().compareTo(Enddate) <= 0) {
                    intime.add(order);
                }
            }
        }
        for(ordertable order:intime) {
            Userauth userauth=order.getLoginuser();
            String username=userauth.getUsername();
            for(orderItem orderItem:order.getOrderItems()){
                booktable book=new booktable();
                int price=0;
                if(bookrepository.findByBookid(orderItem.getBook_id())!=null){
                    book=bookrepository.findByBookid(orderItem.getBook_id());
                    price=book.getPrice();
                }
                result.addBookInList(username,orderItem.getAmount());
            }
        }
        return result;
    }
}

