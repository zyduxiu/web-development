package com.spacestore.Service;

import com.spacestore.Dao.Carttable;
import com.spacestore.repository.LoginUserRepository;
import com.spacestore.repository.OrderRepository;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import com.spacestore.Dao.ordertable;
import java.util.List;

@Service
public class OrderServiceA implements OrderService {
    @Resource
    LoginUserRepository loginUserRepository;

    public List<ordertable> getOrder(String user) {
        if (loginUserRepository.getReferenceById(user).getorders() != null) {
            return loginUserRepository.findById(user).get().getorders();
        }
        return null;
    }


}

