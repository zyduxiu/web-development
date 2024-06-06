package com.spacestore.ServiceImp;

import com.spacestore.Entity.*;
import com.spacestore.Service.BooklistService;
import com.spacestore.Service.OrderService;
import com.spacestore.repository.Bookrepository;
import com.spacestore.repository.UserauthRepository;
import com.spacestore.repository.OrderRepository;
import jakarta.annotation.Resource;
import jakarta.transaction.Transactional;
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

    public List<ordertable> getOrder(String user) {

        if (userauthRepository.findByUsername(user).getorders() != null) {
            // System.out.println(loginUserRepository.findById(user).get().getorders());
            ordertable ordertable;
            return userauthRepository.findByUsername(user).getorders();
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

    public List<ordertable> getOrders() {
        return orderRepository.findAll();
    }

    public List<ordertable> getSearch(String username, String searchitem, Date Startdate, Date Enddate) {
        if(searchitem.equals("null")&&Startdate==null&&Enddate==null){
            return getOrder(username);
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
        return result;
    }

    public List<ordertable> getAllSearch( String searchitem, Date Startdate, Date Enddate){
        if(searchitem.equals("null")&&Startdate==null&&Enddate==null){
            return getOrders();
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
        table=orderRepository.findAll();
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
        return result;
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
}

