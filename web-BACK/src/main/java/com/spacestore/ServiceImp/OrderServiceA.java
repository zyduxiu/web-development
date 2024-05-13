package com.spacestore.Service;

import com.spacestore.Entity.CartItem;
import com.spacestore.Entity.Carttable;
import com.spacestore.Entity.orderItem;
import com.spacestore.repository.LoginUserRepository;
import com.spacestore.repository.OrderItemRepository;
import com.spacestore.repository.OrderRepository;
import jakarta.annotation.Resource;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import com.spacestore.Entity.ordertable;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderServiceA implements OrderService {
    @Resource
    LoginUserRepository loginUserRepository;
    @Resource
    OrderItemRepository orderItemRepository;

    @Resource
    OrderRepository orderRepository;
    public List<ordertable> getOrder(String user) {

        if (loginUserRepository.getReferenceById(user).getorders() != null) {
           // System.out.println(loginUserRepository.findById(user).get().getorders());
            ordertable ordertable;
            return loginUserRepository.findById(user).get().getorders();

        }
        return null;
    }
    @Transactional
    public void submitBookorder(String buyer, String phonenumber, Integer amount,String address, String book_id, String username){
    ordertable tmp=new ordertable();
        Date now=new Date();
        tmp.setAddress(address);
        tmp.setPhonenumber(phonenumber);
        tmp.setTime(now);
        tmp.setLoginuser(loginUserRepository.findByUsername(username));
        tmp.setBuyer(buyer);
        List<orderItem> tmpp=new ArrayList<>();
        //orderRepository.save(tmp);
        orderItem tmp2=new orderItem();
        tmp2.setBook_id(Integer.parseInt(book_id));
        tmp2.setAmount(amount);
        tmp2.setOrderTable(tmp);
        tmpp.add(tmp2);

        tmp.setOrderItems(tmpp);
        orderRepository.save(tmp);
    }

}

