package com.spacestore.Service;

import com.spacestore.repository.LoginUserRepository;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import com.spacestore.Dao.Carttable;
@Service
public class CartServiceA implements CartService{
    @Resource
    LoginUserRepository loginUserRepository;
    public Carttable getCart(String user){
        return loginUserRepository.findById(user).get().getcart();
    }
}
